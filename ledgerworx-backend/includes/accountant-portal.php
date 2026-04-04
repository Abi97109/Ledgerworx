<?php

function lw_rest_accountant_permissions_check() {
	$user = wp_get_current_user();

	if ( ! $user || empty( $user->ID ) ) {
		return new WP_Error(
			'lw_forbidden',
			'You must be logged in to access accountant portal data.',
			array( 'status' => 401 )
		);
	}

	$roles = (array) $user->roles;
	if ( in_array( 'lw_accountant', $roles, true ) || in_array( 'administrator', $roles, true ) || in_array( 'lw_manager', $roles, true ) ) {
		return true;
	}

	return new WP_Error(
		'lw_forbidden',
		'You do not have permission to access accountant portal data.',
		array( 'status' => 403 )
	);
}

function lw_get_accountant_client_status( $requests ) {
	$requests = is_array( $requests ) ? $requests : array();
	if ( empty( $requests ) ) {
		return 'pending';
	}

	$stages = array_map(
		function( $request ) {
			return lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? '' );
		},
		$requests
	);

	if ( count( $stages ) > 0 && count( array_filter( $stages, function( $stage ) { return 'Completed' !== $stage; } ) ) === 0 ) {
		return 'completed';
	}

	foreach ( $stages as $stage ) {
		if ( in_array( $stage, array( 'Documents Upload', 'Review' ), true ) ) {
			return 'documents-needed';
		}
	}

	foreach ( $stages as $stage ) {
		if ( in_array( $stage, array( 'Payment', 'Processing', 'Confirmation' ), true ) ) {
			return 'in-progress';
		}
	}

	return 'pending';
}

function lw_get_accountant_client_users() {
	return get_users(
		array(
			'role'   => 'lw_client',
			'orderby'=> 'registered',
			'order'  => 'DESC',
		)
	);
}

function lw_build_accountant_client_row( $user ) {
	if ( ! ( $user instanceof WP_User ) ) {
		return null;
	}

	$requests        = lw_get_client_requests( $user->ID );
	$documents       = lw_get_client_documents( $user->ID );
	$requested_items = array_values(
		array_filter(
			array_unique(
				array_map(
					function( $request ) {
						return sanitize_text_field( (string) ( $request['title'] ?? '' ) );
					},
					(array) $requests
				)
			)
		)
	);
	$status = lw_get_accountant_client_status( $requests );

	return array(
		'id'             => (string) $user->ID,
		'name'           => lw_get_user_display_name( $user ),
		'subtitle'       => lw_get_user_company_name( $user->ID ) ?: sanitize_email( (string) $user->user_email ),
		'service'        => ! empty( $requested_items ) ? $requested_items[0] : 'No active requests',
		'status'         => $status,
		'documentsCount' => count( (array) $documents ),
		'email'          => sanitize_email( (string) $user->user_email ),
		'phone'          => lw_get_user_phone( $user->ID ),
		'company'        => lw_get_user_company_name( $user->ID ),
	);
}

function lw_build_accountant_client_payment_rows( $requests, $invoices ) {
	$payments = array();

	foreach ( (array) $requests as $request ) {
		$payments[] = array(
			'id'      => sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) ),
			'amount'  => sanitize_text_field( (string) ( $request['amount'] ?? 'AED 0.00' ) ),
			'service' => sanitize_text_field( (string) ( $request['title'] ?? '' ) ),
			'date'    => sanitize_text_field( (string) ( $request['submittedOn'] ?? '' ) ),
			'status'  => lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? '' ),
		);
	}

	foreach ( (array) $invoices as $invoice ) {
		$payments[] = array(
			'id'      => sanitize_text_field( (string) ( $invoice['id'] ?? $invoice['invoiceNumber'] ?? '' ) ),
			'amount'  => sanitize_text_field( (string) ( $invoice['amount'] ?? 'AED 0.00' ) ),
			'service' => sanitize_text_field( (string) ( $invoice['subject'] ?? $invoice['invoiceNumber'] ?? 'Invoice' ) ),
			'date'    => sanitize_text_field( (string) ( $invoice['invoiceDate'] ?? '' ) ),
			'status'  => sanitize_text_field( (string) ( $invoice['status'] ?? 'Pending' ) ),
		);
	}

	return $payments;
}

function lw_build_accountant_client_detail_payload( $client_id ) {
	$client_id = (int) $client_id;
	if ( $client_id <= 0 ) {
		return new WP_Error( 'lw_invalid_client_id', 'Client ID is required.', array( 'status' => 400 ) );
	}

	$user = get_userdata( $client_id );
	if ( ! ( $user instanceof WP_User ) || ! in_array( 'lw_client', (array) $user->roles, true ) ) {
		return new WP_Error( 'lw_client_not_found', 'Client not found.', array( 'status' => 404 ) );
	}

	$requests        = array_values( lw_get_client_requests( $user->ID ) );
	$documents       = array_values( lw_get_client_documents( $user->ID ) );
	$invoice_payload = lw_get_cached_client_invoices_payload( $user );
	$invoices        = is_array( $invoice_payload['invoices'] ?? null ) ? array_values( $invoice_payload['invoices'] ) : array();

	$assigned_services = array_map(
		function( $request ) {
			$stage = lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? '' );
			$status_class = 'pending';
			if ( 'Completed' === $stage ) {
				$status_class = 'completed';
			} elseif ( in_array( $stage, array( 'Payment', 'Processing', 'Confirmation' ), true ) ) {
				$status_class = 'in-progress';
			}

			return array(
				'id'                    => sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) ),
				'request_id'            => sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) ),
				'name'                  => sanitize_text_field( (string) ( $request['title'] ?? '' ) ),
				'description'           => sanitize_text_field( (string) ( $request['overview'] ?? $request['notes'] ?? '' ) ),
				'amount'                => sanitize_text_field( (string) ( $request['amount'] ?? 'AED 0.00' ) ),
				'status'                => $stage,
				'status_class'          => $status_class,
				'due_date'              => sanitize_text_field( (string) ( $request['dueDate'] ?? '' ) ),
				'canApproveDocuments'   => 'Review' === $stage,
				'requiredDocuments'     => array_values( array_map( 'sanitize_text_field', (array) ( $request['requiredDocuments'] ?? array() ) ) ),
				'uploadedDocuments'     => array_values( array_map( 'sanitize_text_field', (array) ( $request['uploadedDocuments'] ?? array() ) ) ),
			);
		},
		$requests
	);

	$document_rows = array_map(
		function( $document ) use ( $requests ) {
			$request_id = sanitize_text_field( (string) ( $document['requestId'] ?? '' ) );
			$request_title = '';
			foreach ( $requests as $request ) {
				$current_id = sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) );
				if ( $current_id === $request_id ) {
					$request_title = sanitize_text_field( (string) ( $request['title'] ?? '' ) );
					break;
				}
			}

			return array(
				'id'            => sanitize_text_field( (string) ( $document['id'] ?? '' ) ),
				'request_id'    => $request_id,
				'request_title' => $request_title,
				'name'          => sanitize_text_field( (string) ( $document['documentName'] ?? '' ) ),
				'filename'      => sanitize_text_field( (string) ( $document['fileName'] ?? '' ) ),
				'size'          => '',
				'uploaded_date' => sanitize_text_field( (string) ( $document['updatedAt'] ?? $document['createdAt'] ?? '' ) ),
				'uploaded_by'   => 'Client Portal',
				'view_url'      => esc_url_raw( (string) ( $document['fileUrl'] ?? '' ) ),
				'download_url'  => esc_url_raw( (string) ( $document['fileUrl'] ?? '' ) ),
				'sync_status'   => sanitize_text_field( (string) ( $document['syncStatus'] ?? '' ) ),
			);
		},
		$documents
	);

	return rest_ensure_response(
		array(
			'id'                => (string) $user->ID,
			'name'              => lw_get_user_display_name( $user ),
			'contact_person'    => lw_get_user_display_name( $user ),
			'email'             => sanitize_email( (string) $user->user_email ),
			'phone'             => lw_get_user_phone( $user->ID ),
			'website'           => 'Not Available',
			'avatar'            => strtoupper( substr( lw_get_user_display_name( $user ), 0, 1 ) ),
			'color'             => 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
			'status'            => 'Active',
			'status_class'      => 'active',
			'is_active'         => true,
			'assigned_services' => $assigned_services,
			'documents'         => $document_rows,
			'reports'           => array(),
			'payments'          => lw_build_accountant_client_payment_rows( $requests, $invoices ),
		)
	);
}

function lw_get_accountant_clients_payload() {
	$clients = array_values(
		array_filter(
			array_map( 'lw_build_accountant_client_row', lw_get_accountant_client_users() )
		)
	);

	return rest_ensure_response(
		array(
			'clients' => $clients,
			'meta'    => array(
				'count'  => count( $clients ),
				'source' => 'backend',
			),
		)
	);
}

function lw_approve_client_request_documents( $request_id ) {
	$request_id = sanitize_text_field( (string) $request_id );
	if ( '' === $request_id ) {
		return new WP_Error( 'lw_invalid_request_id', 'Request ID is required.', array( 'status' => 400 ) );
	}

	foreach ( lw_get_accountant_client_users() as $user ) {
		$requests = lw_get_client_requests( $user->ID );
		foreach ( $requests as $request ) {
			$current_id = sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) );
			if ( $current_id !== $request_id ) {
				continue;
			}

			$current_stage = lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? '' );
			if ( 'Review' !== $current_stage ) {
				return new WP_Error(
					'lw_invalid_stage_transition',
					'Only requests in Review can be approved by Accountant.',
					array( 'status' => 409 )
				);
			}

			return lw_update_client_request(
				$request_id,
				array(
					'workflowStage' => 'Payment',
					'status'        => 'Payment',
					'actionBtn'     => lw_get_request_action_label( 'Payment' ),
					'updatedAt'     => wp_date( 'c' ),
				),
				$user->ID
			);
		}
	}

	return new WP_Error( 'lw_not_found', 'Request not found.', array( 'status' => 404 ) );
}

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'lw/v1',
			'/accountant/clients',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_accountant_permissions_check',
				'callback'            => 'lw_get_accountant_clients_payload',
			)
		);

		register_rest_route(
			'lw/v1',
			'/accountant/clients/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_accountant_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_build_accountant_client_detail_payload( $request->get_param( 'id' ) );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/accountant/requests/(?P<id>[^/]+)/approve-documents',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_accountant_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_approve_client_request_documents( $request->get_param( 'id' ) );
				},
			)
		);
	}
);
