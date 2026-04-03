<?php

function lw_debug_rest_permissions_check() {
	if ( ! is_user_logged_in() ) {
		return new WP_Error(
			'lw_debug_forbidden',
			'You must be logged in.',
			array( 'status' => 401 )
		);
	}

	if ( current_user_can( 'manage_options' ) ) {
		return true;
	}

	return new WP_Error(
		'lw_debug_forbidden',
		'Administrator access is required for debug endpoints.',
		array( 'status' => 403 )
	);
}

function lw_debug_invoices_sample_payload( WP_REST_Request $request ) {
	$page     = max( 1, (int) $request->get_param( 'page' ) );
	$per_page = max( 1, min( 50, (int) $request->get_param( 'per_page' ) ?: 20 ) );
	$limit    = max( 1, min( 10, (int) $request->get_param( 'limit' ) ?: 3 ) );
	$user     = wp_get_current_user();

	$payload = lw_get_zoho_module_records_payload(
		lw_get_zoho_invoices_module_api_name(),
		$page,
		$per_page,
		lw_get_zoho_invoices_module_fields()
	);

	if ( ! is_array( $payload ) ) {
		return new WP_Error(
			'lw_debug_zoho_failed',
			'Zoho invoice payload was empty or invalid.',
			array( 'status' => 502 )
		);
	}

	$records = ! empty( $payload['data'] ) && is_array( $payload['data'] )
		? array_values( $payload['data'] )
		: array();

	$sample_records = array_slice( $records, 0, $limit );
	$field_keys     = array();

	foreach ( $sample_records as $sample ) {
		foreach ( array_keys( (array) $sample ) as $key ) {
			$field_keys[ (string) $key ] = true;
		}
	}

	$zoho_contact = lw_resolve_user_zoho_contact( $user );

	return rest_ensure_response(
		array(
			'moduleApiName' => lw_get_zoho_invoices_module_api_name(),
			'requested'     => array(
				'page'    => $page,
				'perPage' => $per_page,
				'limit'   => $limit,
			),
			'user'          => array(
				'id'        => (int) $user->ID,
				'email'     => (string) $user->user_email,
				'name'      => lw_get_user_display_name( $user ),
				'company'   => lw_get_user_company_name( $user->ID ),
				'storedZohoContactId' => lw_get_user_zoho_contact_id( (int) $user->ID ),
				'zohoContactId' => sanitize_text_field( (string) ( $zoho_contact['id'] ?? '' ) ),
			),
			'counts'        => array(
				'totalReturnedByZoho' => count( $records ),
				'sampleCount'         => count( $sample_records ),
			),
			'sampleFieldKeys' => array_values( array_keys( $field_keys ) ),
			'sampleRecords'   => $sample_records,
			'rawInfo'         => array(
				'hasInfo' => ! empty( $payload['info'] ) && is_array( $payload['info'] ),
				'info'    => $payload['info'] ?? array(),
			),
		)
	);
}

function lw_debug_invoices_fields_payload() {
	$payload = lw_zoho_api_get(
		'settings/fields',
		array(
			'module' => lw_get_zoho_invoices_module_api_name(),
		)
	);

	if ( ! is_array( $payload ) ) {
		return new WP_Error(
			'lw_debug_zoho_fields_failed',
			'Unable to fetch invoice fields metadata from Zoho.',
			array( 'status' => 502 )
		);
	}

	return rest_ensure_response(
		array(
			'moduleApiName' => lw_get_zoho_invoices_module_api_name(),
			'fieldsPayload' => $payload,
		)
	);
}

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'lw/v1',
			'/debug/zoho/invoices/sample',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_debug_rest_permissions_check',
				'callback'            => 'lw_debug_invoices_sample_payload',
			)
		);

		register_rest_route(
			'lw/v1',
			'/debug/zoho/invoices/fields',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_debug_rest_permissions_check',
				'callback'            => 'lw_debug_invoices_fields_payload',
			)
		);
	}
);

function lw_handle_debug_zoho_invoices_sample_ajax() {
	$permission = lw_debug_rest_permissions_check();
	if ( is_wp_error( $permission ) ) {
		wp_send_json(
			array(
				'message' => $permission->get_error_message(),
			),
			(int) $permission->get_error_data( 'status' ) ?: 403
		);
	}

	$request = new WP_REST_Request( 'GET', '/lw/v1/debug/zoho/invoices/sample' );
	$request->set_param( 'page', isset( $_GET['page'] ) ? (int) $_GET['page'] : 1 );
	$request->set_param( 'per_page', isset( $_GET['per_page'] ) ? (int) $_GET['per_page'] : 20 );
	$request->set_param( 'limit', isset( $_GET['limit'] ) ? (int) $_GET['limit'] : 3 );

	$result = lw_debug_invoices_sample_payload( $request );
	if ( is_wp_error( $result ) ) {
		wp_send_json(
			array(
				'message' => $result->get_error_message(),
			),
			(int) $result->get_error_data( 'status' ) ?: 502
		);
	}

	wp_send_json( $result->get_data() );
}

function lw_handle_debug_zoho_invoices_fields_ajax() {
	$permission = lw_debug_rest_permissions_check();
	if ( is_wp_error( $permission ) ) {
		wp_send_json(
			array(
				'message' => $permission->get_error_message(),
			),
			(int) $permission->get_error_data( 'status' ) ?: 403
		);
	}

	$result = lw_debug_invoices_fields_payload();
	if ( is_wp_error( $result ) ) {
		wp_send_json(
			array(
				'message' => $result->get_error_message(),
			),
			(int) $result->get_error_data( 'status' ) ?: 502
		);
	}

	wp_send_json( $result->get_data() );
}

add_action( 'wp_ajax_lw_debug_zoho_invoices_sample', 'lw_handle_debug_zoho_invoices_sample_ajax' );
add_action( 'wp_ajax_lw_debug_zoho_invoices_fields', 'lw_handle_debug_zoho_invoices_fields_ajax' );
