<?php

function lw_get_access_token() {
	$cached_access_token = get_transient( 'lw_zoho_access_token' );
	if ( is_string( $cached_access_token ) && '' !== trim( $cached_access_token ) ) {
		return trim( $cached_access_token );
	}

	$client_id     = get_option( 'lw_zoho_client_id' );
	$client_secret = get_option( 'lw_zoho_client_secret' );
	$refresh_token = get_option( 'lw_zoho_refresh_token' );

	if ( ! $client_id || ! $client_secret || ! $refresh_token ) {
		return null;
	}

	$response = wp_remote_post(
		'https://accounts.zoho.com/oauth/v2/token',
		array(
			'body' => array(
				'grant_type'    => 'refresh_token',
				'client_id'     => $client_id,
				'client_secret' => $client_secret,
				'refresh_token' => $refresh_token,
			),
		)
	);

	if ( is_wp_error( $response ) ) {
		error_log( 'Zoho Token Error: ' . $response->get_error_message() );
		return null;
	}

	$status_code = (int) wp_remote_retrieve_response_code( $response );
	$body = json_decode( wp_remote_retrieve_body( $response ), true );

	if ( $status_code < 200 || $status_code >= 300 || empty( $body['access_token'] ) ) {
		error_log( 'Zoho Token Response Error: ' . wp_remote_retrieve_body( $response ) );
		return null;
	}

	$access_token = sanitize_text_field( (string) $body['access_token'] );
	$expires_in   = isset( $body['expires_in'] ) ? (int) $body['expires_in'] : 3600;
	$ttl          = max( 60, $expires_in - 60 );

	set_transient( 'lw_zoho_access_token', $access_token, $ttl );

	return $access_token;
}

function lw_get_zoho_services_module_api_name() {
	return 'Services__s';
}

function lw_get_zoho_services_module_fields() {
	return array(
		'Service_Name',
		'Description',
		'Duration',
		'Price',
		'Location',
		'Status',
		'Available_From',
		'Available_Till',
		'Record_Image',
		'Tax',
	);
}

function lw_get_zoho_packages_module_api_name() {
	return 'Products';
}

function lw_get_zoho_packages_module_fields() {
	return array(
		'Product_Name',
		'Unit_Price',
		'Description',
		'Duration',
		'Package_Duration',
		'Product_Code',
		'Product_Category',
		'Manufacturer',
		'Qty_in_Stock',
		'Usage_Unit',
		'Sales_Start_Date',
		'Sales_End_Date',
		'Support_Start_Date',
		'Support_Duration',
		'Support_Expiry_Date',
		'Tax',
		'Product_Active',
		'Created_Time',
		'Modified_Time',
	);
}

function lw_get_zoho_invoices_module_api_name() {
	return 'Invoices';
}

function lw_get_zoho_invoices_module_fields() {
	return array(
		'Status',
		'Grand_Total',
		'Modified_Time',
		'Description',
		'Discount',
		'Due_Date',
		'Adjustment',
		'Created_Time',
		'Sub_Total',
		'Invoice_Number',
		'Tax',
		'Invoice_Date',
		'Subject',
		'Contact_Name',
		'Account_Name',
	);
}

function lw_get_zoho_crm_api_base_url( $version = 'v2' ) {
	return 'https://www.zohoapis.com/crm/' . ltrim( (string) $version, '/' );
}

function lw_zoho_api_get( $path, $query_args = array(), $version = 'v2' ) {
	$access_token = lw_get_access_token();

	if ( ! $access_token ) {
		return null;
	}

	$url = trailingslashit( lw_get_zoho_crm_api_base_url( $version ) ) . ltrim( $path, '/' );

	if ( ! empty( $query_args ) ) {
		$url = add_query_arg( $query_args, $url );
	}

	$response = wp_remote_get(
		$url,
		array(
			'headers' => array(
				'Authorization' => 'Zoho-oauthtoken ' . $access_token,
				'Content-Type'  => 'application/json',
			),
		)
	);

	if ( is_wp_error( $response ) ) {
		error_log( 'Zoho GET Error: ' . $response->get_error_message() );
		return null;
	}

	$body = json_decode( wp_remote_retrieve_body( $response ), true );

	return is_array( $body ) ? $body : null;
}

function lw_get_zoho_module_records_payload( $module_api_name, $page = 1, $per_page = 200, $fields = array() ) {
	$module_api_name = trim( (string) $module_api_name );

	if ( ! $module_api_name ) {
		return null;
	}

	$query_args = array(
		'page'     => max( 1, (int) $page ),
		'per_page' => max( 1, min( 200, (int) $per_page ) ),
	);

	$fields = array_values(
		array_filter(
			array_map(
				'trim',
				(array) $fields
			)
		)
	);

	if ( ! empty( $fields ) ) {
		$query_args['fields'] = implode( ',', array_unique( $fields ) );
	}

	$version = 'v2';

	if ( lw_get_zoho_services_module_api_name() === $module_api_name ) {
		$version = 'v8';
	}

	return lw_zoho_api_get( $module_api_name, $query_args, $version );
}

function lw_get_zoho_modules_payload() {
	return lw_zoho_api_get( 'settings/modules' );
}

function lw_find_zoho_contact_by_email( $email ) {
	$email = sanitize_email( $email );

	if ( ! $email ) {
		return null;
	}

	$payload = lw_zoho_api_get( 'Contacts/search', array( 'email' => $email ) );

	if ( ! $payload || empty( $payload['data'] ) || ! is_array( $payload['data'] ) ) {
		return null;
	}

	return $payload['data'][0];
}

function lw_get_zoho_contact_phone( $email ) {
	$contact = lw_find_zoho_contact_by_email( $email );

	if ( ! $contact ) {
		return '';
	}

	$phone_candidates = array(
		$contact['Phone'] ?? '',
		$contact['Mobile'] ?? '',
	);

	foreach ( $phone_candidates as $candidate ) {
		if ( ! empty( $candidate ) ) {
			return (string) $candidate;
		}
	}

	return '';
}

function lw_get_zoho_module_records( $module_api_name, $page = 1, $per_page = 200 ) {
	$payload = lw_get_zoho_module_records_payload( $module_api_name, $page, $per_page );

	if ( ! $payload || empty( $payload['data'] ) || ! is_array( $payload['data'] ) ) {
		return array();
	}

	return $payload['data'];
}

function lw_get_user_zoho_contact_id( $user_id ) {
	return sanitize_text_field( (string) get_user_meta( (int) $user_id, 'lw_zoho_contact_id', true ) );
}

function lw_resolve_user_zoho_contact( $user ) {
	if ( ! $user || empty( $user->ID ) ) {
		return null;
	}

	$stored_id = lw_get_user_zoho_contact_id( (int) $user->ID );
	if ( $stored_id ) {
		return array(
			'id'    => $stored_id,
			'name'  => '',
			'email' => (string) $user->user_email,
		);
	}

	$contact = lw_find_zoho_contact_by_email( (string) $user->user_email );
	if ( ! is_array( $contact ) || empty( $contact['id'] ) ) {
		return null;
	}

	$contact_id = sanitize_text_field( (string) $contact['id'] );
	if ( $contact_id ) {
		update_user_meta( (int) $user->ID, 'lw_zoho_contact_id', $contact_id );
	}

	return array(
		'id'    => $contact_id,
		'name'  => sanitize_text_field( (string) ( $contact['Full_Name'] ?? $contact['Last_Name'] ?? '' ) ),
		'email' => sanitize_email( (string) ( $contact['Email'] ?? $user->user_email ) ),
	);
}

function lw_format_invoice_amount( $value ) {
	if ( '' === $value || null === $value ) {
		return 'AED 0.00';
	}
	if ( is_numeric( $value ) ) {
		return 'AED ' . number_format_i18n( (float) $value, 2 );
	}
	$text = trim( (string) $value );
	return $text ? $text : 'AED 0.00';
}

function lw_format_invoice_date( $date_text ) {
	$date_text = trim( (string) $date_text );
	if ( ! $date_text ) {
		return '-';
	}
	$timestamp = strtotime( $date_text );
	return $timestamp ? wp_date( 'M j, Y', $timestamp ) : $date_text;
}

function lw_format_invoice_time( $date_time_text ) {
	$date_time_text = trim( (string) $date_time_text );
	if ( ! $date_time_text ) {
		return '-';
	}
	$timestamp = strtotime( $date_time_text );
	return $timestamp ? wp_date( 'g:i A', $timestamp ) : '-';
}

function lw_map_zoho_invoice_record( $record ) {
	$contact_name = '';
	$contact_id = '';
	if ( ! empty( $record['Contact_Name'] ) && is_array( $record['Contact_Name'] ) ) {
		$contact_name = sanitize_text_field( (string) ( $record['Contact_Name']['name'] ?? '' ) );
		$contact_id = sanitize_text_field( (string) ( $record['Contact_Name']['id'] ?? '' ) );
	}

	$account_name = '';
	if ( ! empty( $record['Account_Name'] ) && is_array( $record['Account_Name'] ) ) {
		$account_name = sanitize_text_field( (string) ( $record['Account_Name']['name'] ?? '' ) );
	}

	$invoice_number = sanitize_text_field( (string) ( $record['Invoice_Number'] ?? '' ) );
	$invoice_id = sanitize_text_field( (string) ( $record['id'] ?? $invoice_number ) );
	$invoice_date_raw = sanitize_text_field( (string) ( $record['Invoice_Date'] ?? '' ) );

	return array(
		'id'          => $invoice_id,
		'invoiceNumber' => $invoice_number ? $invoice_number : $invoice_id,
		'subject'     => sanitize_text_field( (string) ( $record['Subject'] ?? '' ) ),
		'status'      => sanitize_text_field( (string) ( $record['Status'] ?? '' ) ),
		'invoiceDate' => lw_format_invoice_date( $invoice_date_raw ),
		'invoiceTime' => lw_format_invoice_time( (string) ( $record['Modified_Time'] ?? $record['Created_Time'] ?? '' ) ),
		'dueDate'     => lw_format_invoice_date( (string) ( $record['Due_Date'] ?? '' ) ),
		'amount'      => lw_format_invoice_amount( $record['Grand_Total'] ?? 0 ),
		'contactName' => $contact_name,
		'accountName' => $account_name,
		'description' => wp_kses_post( (string) ( $record['Description'] ?? '' ) ),
		'contactId'   => $contact_id,
		'raw'         => $record,
	);
}

function lw_get_cached_client_invoices_payload( $user ) {
	$user_id = (int) ( $user->ID ?? 0 );
	$cache_key = 'client_invoices_v4_' . $user_id;
	$scope = 'user:' . $user_id;

	$cached = lw_cache_remember(
		$cache_key,
		LW_PORTAL_CACHE_OPERATIONAL_TTL,
		function() use ( $user ) {
			$contact = lw_resolve_user_zoho_contact( $user );
			$contact_id = sanitize_text_field( (string) ( $contact['id'] ?? '' ) );
			$user_email = sanitize_email( (string) ( $user->user_email ?? '' ) );
			$user_company = sanitize_text_field( (string) lw_get_user_company_name( (int) $user->ID ) );
			$user_display_name = strtolower( trim( (string) lw_get_user_display_name( $user ) ) );

			$all_records = array();
			$page = 1;
			$max_pages = 5;
			while ( $page <= $max_pages ) {
				$payload = lw_get_zoho_module_records_payload(
					lw_get_zoho_invoices_module_api_name(),
					$page,
					200,
					lw_get_zoho_invoices_module_fields()
				);

				if ( empty( $payload['data'] ) || ! is_array( $payload['data'] ) ) {
					break;
				}

				foreach ( $payload['data'] as $record ) {
					$all_records[] = $record;
				}

				$more_records = ! empty( $payload['info']['more_records'] );
				if ( ! $more_records ) {
					break;
				}
				$page++;
			}

			$mapped = array_map( 'lw_map_zoho_invoice_record', $all_records );
			$filtered = array_values(
				array_filter(
					$mapped,
					function( $invoice ) use ( $contact_id, $user_email, $user_company, $user_display_name ) {
						$invoice_contact_id = sanitize_text_field( (string) ( $invoice['contactId'] ?? '' ) );
						if ( $contact_id && $invoice_contact_id && $contact_id === $invoice_contact_id ) {
							return true;
						}

						$contact_name = strtolower( trim( (string) ( $invoice['contactName'] ?? '' ) ) );
						if ( $user_display_name && $contact_name && false !== strpos( $contact_name, $user_display_name ) ) {
							return true;
						}
						if ( $user_email && $contact_name && false !== strpos( $contact_name, strtolower( $user_email ) ) ) {
							return true;
						}

						$account_name = strtolower( trim( (string) ( $invoice['accountName'] ?? '' ) ) );
						if ( $user_company && $account_name && false !== strpos( $account_name, strtolower( $user_company ) ) ) {
							return true;
						}

						return false;
					}
				)
			);

			return array(
				'invoices' => $filtered,
				'meta'     => array(
					'entity'          => 'client_invoices',
					'refreshedVia'    => 'zoho',
					'contactId'       => $contact_id,
					'totalFetched'    => count( $mapped ),
					'totalFiltered'   => count( $filtered ),
					'moduleApiName'   => lw_get_zoho_invoices_module_api_name(),
				),
			);
		},
		$scope
	);

	$payload = is_array( $cached['data'] ?? null ) ? $cached['data'] : array( 'invoices' => array(), 'meta' => array() );
	$payload['invoices'] = is_array( $payload['invoices'] ?? null ) ? $payload['invoices'] : array();
	$payload['meta'] = array_merge(
		$payload['meta'] ?? array(),
		$cached['meta'] ?? array(),
		array(
			'cacheKey'   => $cache_key,
			'scope'      => $scope,
			'ttlSeconds' => (int) LW_PORTAL_CACHE_OPERATIONAL_TTL,
		)
	);

	return $payload;
}

add_action(
	'user_register',
	function( $user_id ) {
		update_option( 'lw_last_registered_user', (int) $user_id );
	}
);

add_action(
	'init',
	function() {
		$user_id = (int) get_option( 'lw_last_registered_user' );

		if ( ! $user_id ) {
			return;
		}

		delete_option( 'lw_last_registered_user' );
		do_action( 'lw_create_zoho_contact_event', $user_id );
	}
);

add_action(
	'lw_create_zoho_contact_event',
	function( $user_id ) {
		$user = get_userdata( $user_id );

		if ( ! $user ) {
			return;
		}

		$first_name = '';
		$last_name  = '';
		$phone      = '';
		$meta       = get_user_meta( $user_id );

		foreach ( $meta as $key => $value ) {
			if ( stripos( $key, 'first' ) !== false && ! $first_name ) {
				$first_name = $value[0];
			}

			if ( stripos( $key, 'last' ) !== false && ! $last_name ) {
				$last_name = $value[0];
			}
		}

		$phone = get_user_meta( $user_id, 'user_registration_input_box_1772787029', true );

		if ( ! $phone ) {
			foreach ( $meta as $value ) {
				if ( ! empty( $value[0] ) && is_numeric( $value[0] ) && strlen( $value[0] ) >= 10 ) {
					$phone = $value[0];
					break;
				}
			}
		}

		error_log( 'PHONE META DEBUG: ' . print_r( get_user_meta( $user_id ), true ) );

		$access_token = lw_get_access_token();

		if ( ! $access_token ) {
			error_log( 'Zoho Error: No access token' );
			return;
		}

		$response = wp_remote_post(
			'https://www.zohoapis.com/crm/v2/Contacts',
			array(
				'headers' => array(
					'Authorization' => 'Zoho-oauthtoken ' . $access_token,
					'Content-Type'  => 'application/json',
				),
				'body'    => wp_json_encode(
					array(
						'data' => array(
							array(
								'First_Name' => $first_name ? $first_name : 'User',
								'Last_Name'  => $last_name ? $last_name : 'Unknown',
								'Email'      => $user->user_email,
								'Phone'      => $phone,
							),
						),
					)
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			error_log( 'Zoho API Error: ' . $response->get_error_message() );
		} else {
			error_log( 'Zoho Contact Response: ' . wp_remote_retrieve_body( $response ) );
		}
	}
);
