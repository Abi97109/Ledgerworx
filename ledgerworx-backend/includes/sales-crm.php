<?php

function lw_rest_sales_permissions_check() {
	$user = wp_get_current_user();

	if ( ! $user || empty( $user->ID ) ) {
		return new WP_Error(
			'lw_forbidden',
			'You must be logged in to access sales CRM data.',
			array( 'status' => 401 )
		);
	}

	$roles = (array) $user->roles;
	if ( in_array( 'lw_salesperson', $roles, true ) || in_array( 'administrator', $roles, true ) || in_array( 'lw_manager', $roles, true ) ) {
		return true;
	}

	return new WP_Error(
		'lw_forbidden',
		'You do not have permission to access sales CRM data.',
		array( 'status' => 403 )
	);
}

function lw_get_sales_lead_temperature_option_key() {
	return 'lw_sales_lead_temperatures';
}

function lw_get_sales_lead_temperature_map() {
	$value = get_option( lw_get_sales_lead_temperature_option_key(), array() );
	return is_array( $value ) ? $value : array();
}

function lw_set_sales_lead_temperature( $lead_id, $temperature ) {
	$lead_id     = sanitize_text_field( (string) $lead_id );
	$temperature = strtolower( sanitize_text_field( (string) $temperature ) );

	if ( '' === $lead_id ) {
		return;
	}

	if ( ! in_array( $temperature, array( 'hot', 'warm', 'cold' ), true ) ) {
		$temperature = 'warm';
	}

	$map            = lw_get_sales_lead_temperature_map();
	$map[ $lead_id ] = $temperature;
	update_option( lw_get_sales_lead_temperature_option_key(), $map, false );
}

function lw_delete_sales_lead_temperature( $lead_id ) {
	$lead_id = sanitize_text_field( (string) $lead_id );
	if ( '' === $lead_id ) {
		return;
	}

	$map = lw_get_sales_lead_temperature_map();
	unset( $map[ $lead_id ] );
	update_option( lw_get_sales_lead_temperature_option_key(), $map, false );
}

function lw_split_contact_name_parts( $full_name ) {
	$full_name = trim( preg_replace( '/\s+/', ' ', (string) $full_name ) );
	if ( '' === $full_name ) {
		return array(
			'first_name' => '',
			'last_name'  => 'Unknown',
		);
	}

	$parts      = explode( ' ', $full_name );
	$last_name  = array_pop( $parts );
	$first_name = implode( ' ', $parts );

	return array(
		'first_name' => sanitize_text_field( $first_name ),
		'last_name'  => sanitize_text_field( $last_name ?: $full_name ),
	);
}

function lw_get_zoho_leads_module_fields() {
	return array(
		'Full_Name',
		'First_Name',
		'Last_Name',
		'Company',
		'Email',
		'Phone',
		'Mobile',
		'Lead_Source',
		'Owner',
		'Description',
		'Created_Time',
		'Modified_Time',
	);
}

function lw_get_zoho_contacts_module_fields() {
	return array(
		'Full_Name',
		'First_Name',
		'Last_Name',
		'Account_Name',
		'Email',
		'Phone',
		'Mobile',
		'Lead_Source',
		'Owner',
		'Created_Time',
		'Modified_Time',
	);
}

function lw_zoho_api_request( $method, $path, $body = null, $query_args = array(), $version = 'v2' ) {
	$access_token = lw_get_access_token();

	if ( ! $access_token ) {
		return new WP_Error(
			'lw_zoho_auth_failed',
			'Unable to authenticate with Zoho CRM.',
			array( 'status' => 500 )
		);
	}

	$url = trailingslashit( lw_get_zoho_crm_api_base_url( $version ) ) . ltrim( (string) $path, '/' );
	if ( ! empty( $query_args ) ) {
		$url = add_query_arg( $query_args, $url );
	}

	$args = array(
		'method'  => strtoupper( (string) $method ),
		'headers' => array(
			'Authorization' => 'Zoho-oauthtoken ' . $access_token,
			'Content-Type'  => 'application/json',
		),
	);

	if ( null !== $body ) {
		$args['body'] = wp_json_encode( $body );
	}

	$response = wp_remote_request( $url, $args );

	if ( is_wp_error( $response ) ) {
		return new WP_Error(
			'lw_zoho_request_failed',
			$response->get_error_message(),
			array( 'status' => 500 )
		);
	}

	$status = (int) wp_remote_retrieve_response_code( $response );
	$raw    = wp_remote_retrieve_body( $response );
	$data   = json_decode( $raw, true );
	$data   = is_array( $data ) ? $data : array();

	if ( $status < 200 || $status >= 300 ) {
		$message = 'Zoho CRM request failed.';

		if ( ! empty( $data['message'] ) ) {
			$message = sanitize_text_field( (string) $data['message'] );
		} elseif ( ! empty( $data['data'][0]['message'] ) ) {
			$message = sanitize_text_field( (string) $data['data'][0]['message'] );
		}

		return new WP_Error(
			'lw_zoho_request_failed',
			$message,
			array(
				'status'  => $status,
				'payload' => $data,
			)
		);
	}

	return $data;
}

function lw_get_zoho_record_by_id( $module_api_name, $record_id, $fields = array(), $version = 'v2' ) {
	$record_id = sanitize_text_field( (string) $record_id );
	if ( '' === $record_id ) {
		return null;
	}

	$query_args = array();
	$fields     = array_values( array_filter( array_map( 'trim', (array) $fields ) ) );
	if ( ! empty( $fields ) ) {
		$query_args['fields'] = implode( ',', array_unique( $fields ) );
	}

	$payload = lw_zoho_api_request( 'GET', $module_api_name . '/' . rawurlencode( $record_id ), null, $query_args, $version );
	if ( is_wp_error( $payload ) || empty( $payload['data'][0] ) || ! is_array( $payload['data'][0] ) ) {
		return null;
	}

	return $payload['data'][0];
}

function lw_map_sales_lead_record( $record ) {
	if ( ! is_array( $record ) || empty( $record['id'] ) ) {
		return null;
	}

	$temperatures = lw_get_sales_lead_temperature_map();
	$id           = sanitize_text_field( (string) $record['id'] );
	$owner_name   = '';

	if ( ! empty( $record['Owner'] ) && is_array( $record['Owner'] ) ) {
		$owner_name = sanitize_text_field( (string) ( $record['Owner']['name'] ?? '' ) );
	}

	$name = sanitize_text_field( (string) ( $record['Full_Name'] ?? '' ) );
	if ( '' === $name ) {
		$name = sanitize_text_field( trim( (string) ( $record['First_Name'] ?? '' ) . ' ' . (string) ( $record['Last_Name'] ?? '' ) ) );
	}
	if ( '' === $name ) {
		$name = sanitize_text_field( (string) ( $record['Last_Name'] ?? 'Unknown Lead' ) );
	}

	$phone = sanitize_text_field( (string) ( $record['Phone'] ?? $record['Mobile'] ?? '' ) );

	return array(
		'id'           => $id,
		'name'         => $name,
		'company'      => sanitize_text_field( (string) ( $record['Company'] ?? '' ) ),
		'email'        => sanitize_email( (string) ( $record['Email'] ?? '' ) ),
		'phone'        => $phone,
		'source'       => sanitize_text_field( (string) ( $record['Lead_Source'] ?? '' ) ),
		'owner'        => $owner_name,
		'status'       => sanitize_text_field( (string) ( $temperatures[ $id ] ?? 'warm' ) ),
		'description'  => sanitize_textarea_field( (string) ( $record['Description'] ?? '' ) ),
		'createdAt'    => sanitize_text_field( (string) ( $record['Created_Time'] ?? '' ) ),
		'modifiedAt'   => sanitize_text_field( (string) ( $record['Modified_Time'] ?? '' ) ),
		'crmSource'    => 'zoho',
	);
}

function lw_map_sales_contact_record( $record ) {
	if ( ! is_array( $record ) || empty( $record['id'] ) ) {
		return null;
	}

	$owner_name = '';
	if ( ! empty( $record['Owner'] ) && is_array( $record['Owner'] ) ) {
		$owner_name = sanitize_text_field( (string) ( $record['Owner']['name'] ?? '' ) );
	}

	$account_name = '';
	if ( ! empty( $record['Account_Name'] ) ) {
		$account_name = is_array( $record['Account_Name'] )
			? sanitize_text_field( (string) ( $record['Account_Name']['name'] ?? '' ) )
			: sanitize_text_field( (string) $record['Account_Name'] );
	}

	$name = sanitize_text_field( (string) ( $record['Full_Name'] ?? '' ) );
	if ( '' === $name ) {
		$name = sanitize_text_field( trim( (string) ( $record['First_Name'] ?? '' ) . ' ' . (string) ( $record['Last_Name'] ?? '' ) ) );
	}
	if ( '' === $name ) {
		$name = sanitize_text_field( (string) ( $record['Last_Name'] ?? 'Unknown Contact' ) );
	}

	return array(
		'id'           => sanitize_text_field( (string) $record['id'] ),
		'name'         => $name,
		'accountName'  => $account_name,
		'email'        => sanitize_email( (string) ( $record['Email'] ?? '' ) ),
		'phone'        => sanitize_text_field( (string) ( $record['Phone'] ?? $record['Mobile'] ?? '' ) ),
		'owner'        => $owner_name,
		'leadSource'   => sanitize_text_field( (string) ( $record['Lead_Source'] ?? '' ) ),
		'portalStatus' => 'Invited',
		'createdAt'    => sanitize_text_field( (string) ( $record['Created_Time'] ?? '' ) ),
		'modifiedAt'   => sanitize_text_field( (string) ( $record['Modified_Time'] ?? '' ) ),
		'crmSource'    => 'zoho',
	);
}

function lw_get_sales_leads_payload() {
	$query_args = array(
		'page'     => 1,
		'per_page' => 200,
		'fields'   => implode( ',', array_unique( lw_get_zoho_leads_module_fields() ) ),
	);
	$payload = lw_zoho_api_request( 'GET', 'Leads', null, $query_args );
	if ( is_wp_error( $payload ) ) {
		return $payload;
	}

	$records = array();

	if ( is_array( $payload ) && ! empty( $payload['data'] ) && is_array( $payload['data'] ) ) {
		$records = $payload['data'];
	}

	$leads = array_values( array_filter( array_map( 'lw_map_sales_lead_record', $records ) ) );

	return array(
		'leads' => $leads,
		'meta'  => array(
			'count'        => count( $leads ),
			'crmSource'    => 'zoho',
			'entity'       => 'sales_leads',
			'crmAvailable' => count( $leads ) > 0,
		),
	);
}

function lw_get_sales_contacts_payload() {
	$query_args = array(
		'page'     => 1,
		'per_page' => 200,
		'fields'   => implode( ',', array_unique( lw_get_zoho_contacts_module_fields() ) ),
	);
	$payload = lw_zoho_api_request( 'GET', 'Contacts', null, $query_args );
	if ( is_wp_error( $payload ) ) {
		return $payload;
	}

	$records = array();

	if ( is_array( $payload ) && ! empty( $payload['data'] ) && is_array( $payload['data'] ) ) {
		$records = $payload['data'];
	}

	$contacts = array_values( array_filter( array_map( 'lw_map_sales_contact_record', $records ) ) );

	return array(
		'contacts' => $contacts,
		'meta'     => array(
			'count'        => count( $contacts ),
			'crmSource'    => 'zoho',
			'entity'       => 'sales_contacts',
			'crmAvailable' => count( $contacts ) > 0,
		),
	);
}

function lw_get_cached_sales_leads_payload() {
	$cache_key = 'sales_leads_v1';

	try {
		$remembered = lw_cache_remember(
			$cache_key,
			LW_PORTAL_CACHE_OPERATIONAL_TTL,
			function() {
				$payload = lw_get_sales_leads_payload();
				if ( is_wp_error( $payload ) ) {
					throw new Exception( $payload->get_error_message() );
				}

				return $payload;
			},
			'sales'
		);

		return is_array( $remembered['data'] ?? null ) ? $remembered['data'] : array( 'leads' => array(), 'meta' => array() );
	} catch ( Exception $exception ) {
		return new WP_Error(
			'lw_sales_leads_unavailable',
			$exception->getMessage(),
			array( 'status' => 500 )
		);
	}
}

function lw_get_cached_sales_contacts_payload() {
	$cache_key = 'sales_contacts_v1';

	try {
		$remembered = lw_cache_remember(
			$cache_key,
			LW_PORTAL_CACHE_OPERATIONAL_TTL,
			function() {
				$payload = lw_get_sales_contacts_payload();
				if ( is_wp_error( $payload ) ) {
					throw new Exception( $payload->get_error_message() );
				}

				return $payload;
			},
			'sales'
		);

		return is_array( $remembered['data'] ?? null ) ? $remembered['data'] : array( 'contacts' => array(), 'meta' => array() );
	} catch ( Exception $exception ) {
		return new WP_Error(
			'lw_sales_contacts_unavailable',
			$exception->getMessage(),
			array( 'status' => 500 )
		);
	}
}

function lw_find_sales_portal_user_for_contact( $contact ) {
	if ( ! is_array( $contact ) ) {
		return null;
	}

	$email = sanitize_email( (string) ( $contact['email'] ?? '' ) );
	if ( $email ) {
		$user = get_user_by( 'email', $email );
		if ( $user instanceof WP_User ) {
			return $user;
		}
	}

	return null;
}

function lw_build_sales_contact_tracking_steps( $request = array() ) {
	$workflow_stage = lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? 'Submitted' );
	$current_index  = lw_get_request_workflow_index( $workflow_stage );
	$steps          = array();

	foreach ( lw_get_request_workflow_steps() as $index => $label ) {
		$status = 'pending';
		if ( 'Completed' === $workflow_stage && 'Completed' === $label ) {
			$status = 'completed';
		} elseif ( $index < $current_index ) {
			$status = 'completed';
		} elseif ( $index === $current_index ) {
			$status = 'current';
		}

		$steps[] = array(
			'label'  => $label,
			'status' => $status,
		);
	}

	return $steps;
}

function lw_build_sales_request_summary( $request, $documents = array() ) {
	$request        = lw_normalize_client_request( $request );
	$request_id     = sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) );
	$workflow_stage = lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? 'Submitted' );
	$request_docs   = array_values(
		array_filter(
			(array) $documents,
			function( $document ) use ( $request_id ) {
				return sanitize_text_field( (string) ( $document['requestId'] ?? '' ) ) === $request_id;
			}
		)
	);

	return array(
		'requestId'        => $request_id,
		'title'            => sanitize_text_field( (string) ( $request['title'] ?? '' ) ),
		'status'           => $workflow_stage,
		'workflowStage'    => $workflow_stage,
		'trackingSteps'    => lw_build_sales_contact_tracking_steps( $request ),
		'requiredDocuments'=> array_values( array_map( 'sanitize_text_field', (array) ( $request['requiredDocuments'] ?? array() ) ) ),
		'uploadedDocuments'=> array_values( array_map( 'sanitize_text_field', (array) ( $request['uploadedDocuments'] ?? array() ) ) ),
		'documents'        => array_map(
			function( $document ) {
				return array(
					'name'      => sanitize_text_field( (string) ( $document['documentName'] ?? '' ) ),
					'status'    => sanitize_text_field( ucfirst( (string) ( $document['syncStatus'] ?? 'pending' ) ) ),
					'url'       => esc_url_raw( (string) ( $document['fileUrl'] ?? '' ) ),
					'requestId' => sanitize_text_field( (string) ( $document['requestId'] ?? '' ) ),
				);
			},
			$request_docs
		),
		'payment'          => array(
			'status' => $workflow_stage,
			'notes'  => sprintf( 'Current workflow stage for this request: %s.', $workflow_stage ),
		),
	);
}

function lw_build_sales_contact_portal_summary( $contact_id ) {
	$contact_id = sanitize_text_field( (string) $contact_id );
	if ( '' === $contact_id ) {
		return new WP_Error(
			'lw_invalid_contact_id',
			'Contact ID is required.',
			array( 'status' => 400 )
		);
	}

	$contact_record = lw_get_zoho_record_by_id( 'Contacts', $contact_id, lw_get_zoho_contacts_module_fields() );
	if ( ! is_array( $contact_record ) ) {
		return new WP_Error(
			'lw_contact_not_found',
			'Contact not found in Zoho CRM.',
			array( 'status' => 404 )
		);
	}

	$contact = lw_map_sales_contact_record( $contact_record );
	if ( ! is_array( $contact ) ) {
		return new WP_Error(
			'lw_contact_not_found',
			'Contact not found in Zoho CRM.',
			array( 'status' => 404 )
		);
	}

	$user = lw_find_sales_portal_user_for_contact( $contact );
	if ( ! ( $user instanceof WP_User ) ) {
		return rest_ensure_response(
			array(
				'contact' => array_merge(
					$contact,
					array(
						'portalStatus' => 'Invited',
					)
				),
				'requests' => array(),
				'documents' => array(),
				'invoices' => array(),
				'payment' => array(
					'status' => 'Pending',
					'notes'  => 'No portal account is linked to this contact yet.',
				),
				'meta' => array(
					'linkedUser' => false,
					'userId'     => 0,
				),
			)
		);
	}

	$requests         = lw_get_client_requests( $user->ID );
	$documents        = lw_get_client_documents( $user->ID );
	$invoice_payload  = lw_get_cached_client_invoices_payload( $user );
	$invoices         = is_array( $invoice_payload['invoices'] ?? null ) ? $invoice_payload['invoices'] : array();
	$requested_items  = array_values(
		array_unique(
			array_filter(
				array_map(
					function( $request ) {
						return sanitize_text_field( (string) ( $request['title'] ?? '' ) );
					},
					(array) $requests
				)
			)
		)
	);
	$request_summaries = array_values(
		array_map(
			function( $request ) use ( $documents ) {
				return lw_build_sales_request_summary( $request, $documents );
			},
			(array) $requests
		)
	);
	$payment_status    = ! empty( $request_summaries[0]['payment']['status'] ) ? $request_summaries[0]['payment']['status'] : 'Pending';
	$payment_notes     = ! empty( $request_summaries[0]['payment']['notes'] ) ? $request_summaries[0]['payment']['notes'] : 'Payment confirmation will be handled later in the workflow.';

	$contact['portalStatus']    = 'Linked';
	$contact['requestedItems']  = $requested_items;
	$contact['requestTracking'] = ! empty( $request_summaries[0]['trackingSteps'] ) ? $request_summaries[0]['trackingSteps'] : lw_build_sales_contact_tracking_steps();
	$contact['documents']       = array_map(
		function( $document ) {
			return array(
				'name'      => sanitize_text_field( (string) ( $document['documentName'] ?? '' ) ),
				'status'    => sanitize_text_field( ucfirst( (string) ( $document['syncStatus'] ?? 'pending' ) ) ),
				'url'       => esc_url_raw( (string) ( $document['fileUrl'] ?? '' ) ),
				'requestId' => sanitize_text_field( (string) ( $document['requestId'] ?? '' ) ),
			);
		},
		(array) $documents
	);
	$contact['payment']         = array(
		'status' => $payment_status,
		'notes'  => $payment_notes,
	);

	return rest_ensure_response(
		array(
			'contact'   => $contact,
			'requests'  => array_values( $requests ),
			'requestSummaries' => $request_summaries,
			'documents' => array_values( $documents ),
			'invoices'  => array_values( $invoices ),
			'payment'   => $contact['payment'],
			'meta'      => array(
				'linkedUser' => true,
				'userId'     => (int) $user->ID,
			),
		)
	);
}

function lw_create_sales_lead( $payload ) {
	$name        = sanitize_text_field( (string) ( $payload['name'] ?? '' ) );
	$company     = sanitize_text_field( (string) ( $payload['company'] ?? '' ) );
	$email       = sanitize_email( (string) ( $payload['email'] ?? '' ) );
	$phone       = sanitize_text_field( (string) ( $payload['phone'] ?? '' ) );
	$source      = sanitize_text_field( (string) ( $payload['source'] ?? '' ) );
	$owner       = sanitize_text_field( (string) ( $payload['owner'] ?? '' ) );
	$temperature = sanitize_text_field( (string) ( $payload['status'] ?? 'warm' ) );

	if ( '' === $name || '' === $email ) {
		return new WP_Error(
			'lw_invalid_lead',
			'Lead name and email are required.',
			array( 'status' => 400 )
		);
	}

	$name_parts = lw_split_contact_name_parts( $name );
	$response   = lw_zoho_api_request(
		'POST',
		'Leads',
		array(
			'data' => array(
				array(
					'First_Name'  => $name_parts['first_name'],
					'Last_Name'   => $name_parts['last_name'],
					'Email'       => $email,
					'Phone'       => $phone,
					'Company'     => $company ?: 'Website Lead',
					'Lead_Source' => $source ?: 'Website',
					'Description' => $owner ? 'Lead Owner: ' . $owner : '',
				),
			),
		)
	);

	if ( is_wp_error( $response ) ) {
		return $response;
	}

	$details = $response['data'][0]['details'] ?? array();
	$lead_id = sanitize_text_field( (string) ( $details['id'] ?? '' ) );
	if ( '' === $lead_id ) {
		return new WP_Error(
			'lw_zoho_lead_create_failed',
			'Zoho CRM did not return a lead ID.',
			array( 'status' => 500 )
		);
	}

	lw_set_sales_lead_temperature( $lead_id, $temperature );

	$record = lw_get_zoho_record_by_id( 'Leads', $lead_id, lw_get_zoho_leads_module_fields() );
	$lead   = $record ? lw_map_sales_lead_record( $record ) : null;

	if ( ! $lead ) {
		$lead = array(
			'id'       => $lead_id,
			'name'     => $name,
			'company'  => $company,
			'email'    => $email,
			'phone'    => $phone,
			'source'   => $source,
			'owner'    => $owner,
			'status'   => strtolower( $temperature ),
			'crmSource'=> 'zoho',
		);
	}

	return rest_ensure_response(
		array(
			'created' => true,
			'lead'    => $lead,
		)
	);
}

function lw_delete_sales_lead( $lead_id ) {
	$lead_id = sanitize_text_field( (string) $lead_id );
	if ( '' === $lead_id ) {
		return new WP_Error(
			'lw_invalid_lead_id',
			'Lead ID is required.',
			array( 'status' => 400 )
		);
	}

	$response = lw_zoho_api_request( 'DELETE', 'Leads/' . rawurlencode( $lead_id ) );
	if ( is_wp_error( $response ) ) {
		return $response;
	}

	lw_delete_sales_lead_temperature( $lead_id );

	return rest_ensure_response(
		array(
			'deleted' => true,
			'id'      => $lead_id,
		)
	);
}

function lw_convert_sales_lead( $lead_id ) {
	$lead_id = sanitize_text_field( (string) $lead_id );
	if ( '' === $lead_id ) {
		return new WP_Error(
			'lw_invalid_lead_id',
			'Lead ID is required.',
			array( 'status' => 400 )
		);
	}

	$lead_record = lw_get_zoho_record_by_id( 'Leads', $lead_id, lw_get_zoho_leads_module_fields() );
	if ( ! is_array( $lead_record ) ) {
		return new WP_Error(
			'lw_lead_not_found',
			'Lead not found in Zoho CRM.',
			array( 'status' => 404 )
		);
	}

	$name_parts = lw_split_contact_name_parts(
		(string) ( $lead_record['Full_Name'] ?? trim( (string) ( $lead_record['First_Name'] ?? '' ) . ' ' . (string) ( $lead_record['Last_Name'] ?? '' ) ) )
	);

	$create_contact = lw_zoho_api_request(
		'POST',
		'Contacts',
		array(
			'data' => array(
				array(
					'First_Name'  => $name_parts['first_name'],
					'Last_Name'   => $name_parts['last_name'],
					'Email'       => sanitize_email( (string) ( $lead_record['Email'] ?? '' ) ),
					'Phone'       => sanitize_text_field( (string) ( $lead_record['Phone'] ?? $lead_record['Mobile'] ?? '' ) ),
					'Lead_Source' => sanitize_text_field( (string) ( $lead_record['Lead_Source'] ?? '' ) ),
				),
			),
		)
	);

	if ( is_wp_error( $create_contact ) ) {
		return $create_contact;
	}

	$contact_id = sanitize_text_field( (string) ( $create_contact['data'][0]['details']['id'] ?? '' ) );
	if ( '' === $contact_id ) {
		return new WP_Error(
			'lw_zoho_contact_create_failed',
			'Zoho CRM did not return a contact ID during conversion.',
			array( 'status' => 500 )
		);
	}

	$delete_lead = lw_zoho_api_request( 'DELETE', 'Leads/' . rawurlencode( $lead_id ) );
	if ( is_wp_error( $delete_lead ) ) {
		return $delete_lead;
	}

	lw_delete_sales_lead_temperature( $lead_id );

	$contact_record = lw_get_zoho_record_by_id( 'Contacts', $contact_id, lw_get_zoho_contacts_module_fields() );
	$contact        = $contact_record ? lw_map_sales_contact_record( $contact_record ) : null;

	if ( ! $contact ) {
		$contact = array(
			'id'          => $contact_id,
			'name'        => sanitize_text_field( (string) ( $lead_record['Full_Name'] ?? $lead_record['Last_Name'] ?? '' ) ),
			'accountName' => sanitize_text_field( (string) ( $lead_record['Company'] ?? '' ) ),
			'email'       => sanitize_email( (string) ( $lead_record['Email'] ?? '' ) ),
			'phone'       => sanitize_text_field( (string) ( $lead_record['Phone'] ?? $lead_record['Mobile'] ?? '' ) ),
			'leadSource'  => sanitize_text_field( (string) ( $lead_record['Lead_Source'] ?? '' ) ),
			'portalStatus'=> 'Invited',
			'crmSource'   => 'zoho',
		);
	}

	return rest_ensure_response(
		array(
			'converted' => true,
			'leadId'    => $lead_id,
			'contact'   => $contact,
		)
	);
}

function lw_parse_sales_ajax_payload( $payload ) {
	if ( ! is_array( $payload ) ) {
		return array();
	}

	$decoded = array();
	foreach ( $payload as $key => $value ) {
		if ( 'action' === $key ) {
			continue;
		}
		$decoded[ $key ] = is_string( $value )
			? sanitize_text_field( wp_unslash( $value ) )
			: $value;
	}

	return $decoded;
}

function lw_send_sales_ajax_response( $result ) {
	if ( is_wp_error( $result ) ) {
		$error_data = $result->get_error_data();
		$status     = is_array( $error_data ) && isset( $error_data['status'] )
			? (int) $error_data['status']
			: (int) $result->get_error_data( 'status' );

		wp_send_json(
			array(
				'message' => $result->get_error_message(),
			),
			$status ?: 400
		);
	}

	if ( is_object( $result ) && method_exists( $result, 'get_data' ) ) {
		wp_send_json( $result->get_data() );
	}

	wp_send_json( $result );
}

function lw_handle_create_sales_lead_ajax() {
	$permission = lw_rest_sales_permissions_check();
	if ( true !== $permission ) {
		$data = $permission->get_error_data();
		wp_send_json( array( 'message' => $permission->get_error_message() ), (int) ( is_array( $data ) && isset( $data['status'] ) ? $data['status'] : 403 ) );
	}

	$result = lw_create_sales_lead( lw_parse_sales_ajax_payload( $_POST ) );
	lw_send_sales_ajax_response( $result );
}

function lw_handle_delete_sales_lead_ajax() {
	$permission = lw_rest_sales_permissions_check();
	if ( true !== $permission ) {
		$data = $permission->get_error_data();
		wp_send_json( array( 'message' => $permission->get_error_message() ), (int) ( is_array( $data ) && isset( $data['status'] ) ? $data['status'] : 403 ) );
	}

	$lead_id = sanitize_text_field( wp_unslash( $_POST['leadId'] ?? '' ) );
	$result  = lw_delete_sales_lead( $lead_id );
	lw_send_sales_ajax_response( $result );
}

function lw_handle_convert_sales_lead_ajax() {
	$permission = lw_rest_sales_permissions_check();
	if ( true !== $permission ) {
		$data = $permission->get_error_data();
		wp_send_json( array( 'message' => $permission->get_error_message() ), (int) ( is_array( $data ) && isset( $data['status'] ) ? $data['status'] : 403 ) );
	}

	$lead_id = sanitize_text_field( wp_unslash( $_POST['leadId'] ?? '' ) );
	$result  = lw_convert_sales_lead( $lead_id );
	lw_send_sales_ajax_response( $result );
}

add_action( 'wp_ajax_lw_create_sales_lead', 'lw_handle_create_sales_lead_ajax' );
add_action( 'wp_ajax_lw_delete_sales_lead', 'lw_handle_delete_sales_lead_ajax' );
add_action( 'wp_ajax_lw_convert_sales_lead', 'lw_handle_convert_sales_lead_ajax' );

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'lw/v1',
			'/sales/leads',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_sales_permissions_check',
				'callback'            => function() {
					$payload = lw_get_cached_sales_leads_payload();
					return is_wp_error( $payload ) ? $payload : rest_ensure_response( $payload );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/sales/contacts',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_sales_permissions_check',
				'callback'            => function() {
					$payload = lw_get_cached_sales_contacts_payload();
					return is_wp_error( $payload ) ? $payload : rest_ensure_response( $payload );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/sales/contacts/(?P<id>[^/]+)/portal-summary',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_sales_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_build_sales_contact_portal_summary( $request->get_param( 'id' ) );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/sales/leads',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_sales_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_create_sales_lead( $request->get_json_params() );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/sales/leads/(?P<id>[^/]+)',
			array(
				'methods'             => 'DELETE',
				'permission_callback' => 'lw_rest_sales_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_delete_sales_lead( $request->get_param( 'id' ) );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/sales/leads/(?P<id>[^/]+)/convert',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_sales_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_convert_sales_lead( $request->get_param( 'id' ) );
				},
			)
		);
	}
);
