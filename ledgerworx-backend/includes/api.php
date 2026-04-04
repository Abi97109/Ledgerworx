<?php

function lw_get_bootstrap_payload() {
	$user = wp_get_current_user();

	if ( ! lw_can_access_portal_api( $user ) ) {
		return array(
			'authenticated' => false,
			'role'          => '',
			'profile'       => null,
			'config'        => array(
				'loginUrl'      => lw_get_login_page_url(),
				'logoutUrl'     => lw_get_logout_url(),
				'portalBaseUrl' => lw_get_portal_base_url(),
				'restNonce'     => '',
			),
		);
	}

	$roles = (array) $user->roles;

	return array(
		'authenticated' => true,
		'role'          => (string) ( $roles[0] ?? '' ),
		'profile'       => lw_build_profile_payload( $user ),
		'config'        => array(
			'loginUrl'      => lw_get_login_page_url(),
			'logoutUrl'     => lw_get_logout_url(),
			'portalBaseUrl' => lw_get_portal_base_url(),
			'restNonce'     => wp_create_nonce( 'wp_rest' ),
		),
	);
}

function lw_send_bootstrap_response() {
	wp_send_json( lw_get_bootstrap_payload() );
}

add_action( 'wp_ajax_lw_portal_bootstrap', 'lw_send_bootstrap_response' );
add_action( 'wp_ajax_nopriv_lw_portal_bootstrap', 'lw_send_bootstrap_response' );

function lw_rest_permissions_check() {
	if ( lw_can_access_portal_api() ) {
		return true;
	}

	return new WP_Error(
		'lw_forbidden',
		'You must be logged in to access the portal API.',
		array( 'status' => 401 )
	);
}

function lw_save_company_name_payload( $company_name ) {
	$user         = wp_get_current_user();

	if ( ! lw_can_access_portal_api( $user ) ) {
		return new WP_Error(
			'lw_forbidden',
			'You must be logged in to access the portal API.',
			array( 'status' => 401 )
		);
	}

	$company_name = sanitize_text_field( (string) $company_name );

	if ( ! $company_name ) {
		return new WP_Error(
			'lw_invalid_company_name',
			'Company name is required.',
			array( 'status' => 400 )
		);
	}

	update_user_meta( $user->ID, 'company_name', $company_name );
	update_user_meta( $user->ID, 'billing_company', $company_name );

	return rest_ensure_response(
		array(
			'saved'   => true,
			'profile' => lw_build_profile_payload( $user ),
		)
	);
}

function lw_save_company_name_for_current_user( WP_REST_Request $request ) {
	return lw_save_company_name_payload( $request->get_param( 'companyName' ) );
}

function lw_handle_save_company_name_ajax() {
	$result = lw_save_company_name_payload( $_POST['companyName'] ?? '' );

	if ( is_wp_error( $result ) ) {
		wp_send_json(
			array(
				'message' => $result->get_error_message(),
			),
			(int) $result->get_error_data( 'status' ) ?: 400
		);
	}

	wp_send_json( $result->get_data() );
}

add_action( 'wp_ajax_lw_save_company_name', 'lw_handle_save_company_name_ajax' );

function lw_save_profile_payload( $payload ) {
	$user = wp_get_current_user();

	if ( ! lw_can_access_portal_api( $user ) ) {
		return new WP_Error(
			'lw_forbidden',
			'You must be logged in to access the portal API.',
			array( 'status' => 401 )
		);
	}

	$payload     = is_array( $payload ) ? $payload : array();
	$name        = sanitize_text_field( (string) ( $payload['name'] ?? '' ) );
	$email       = sanitize_email( (string) ( $payload['email'] ?? '' ) );
	$phone       = sanitize_text_field( (string) ( $payload['phone'] ?? '' ) );
	$location    = sanitize_text_field( (string) ( $payload['location'] ?? '' ) );
	$department  = sanitize_text_field( (string) ( $payload['department'] ?? '' ) );
	$designation = sanitize_text_field( (string) ( $payload['designation'] ?? '' ) );

	if ( ! $name ) {
		return new WP_Error( 'lw_invalid_name', 'Full name is required.', array( 'status' => 400 ) );
	}

	if ( ! $email || ! is_email( $email ) ) {
		return new WP_Error( 'lw_invalid_email', 'A valid email address is required.', array( 'status' => 400 ) );
	}

	$update_result = wp_update_user(
		array(
			'ID'           => $user->ID,
			'display_name' => $name,
			'user_email'   => $email,
		)
	);

	if ( is_wp_error( $update_result ) ) {
		return $update_result;
	}

	$name_parts = preg_split( '/\s+/', trim( $name ) );
	$first_name = array_shift( $name_parts );
	$last_name  = implode( ' ', $name_parts );

	update_user_meta( $user->ID, 'first_name', $first_name );
	update_user_meta( $user->ID, 'last_name', $last_name );
	update_user_meta( $user->ID, 'phone', $phone );
	update_user_meta( $user->ID, 'billing_phone', $phone );
	update_user_meta( $user->ID, 'location', $location );
	update_user_meta( $user->ID, 'department', $department );
	update_user_meta( $user->ID, 'designation', $designation );

	return rest_ensure_response(
		array(
			'saved'   => true,
			'profile' => lw_build_profile_payload( get_userdata( $user->ID ) ),
		)
	);
}

function lw_save_profile_for_current_user( WP_REST_Request $request ) {
	return lw_save_profile_payload( (array) $request->get_json_params() );
}

function lw_handle_save_profile_ajax() {
	$result = lw_save_profile_payload( $_POST );

	if ( is_wp_error( $result ) ) {
		wp_send_json(
			array(
				'message' => $result->get_error_message(),
			),
			(int) $result->get_error_data( 'status' ) ?: 400
		);
	}

	wp_send_json( $result->get_data() );
}

add_action( 'wp_ajax_lw_save_portal_profile', 'lw_handle_save_profile_ajax' );

function lw_handle_client_invoices_ajax() {
	if ( ! lw_can_access_portal_api() ) {
		wp_send_json(
			array(
				'message' => 'You must be logged in to access the portal API.',
			),
			401
		);
	}

	try {
		$result = lw_get_cached_client_invoices_payload( wp_get_current_user() );
		wp_send_json( is_array( $result ) ? $result : array( 'invoices' => array(), 'meta' => array() ) );
	} catch ( Throwable $exception ) {
		if ( function_exists( 'error_log' ) ) {
			error_log( 'LedgerWorx invoices ajax fallback: ' . $exception->getMessage() );
		}

		wp_send_json(
			array(
				'invoices' => array(),
				'meta'     => array(
					'entity'           => 'client_invoices',
					'invoiceFallback'  => true,
					'invoiceError'     => 'Invoice sync temporarily unavailable.',
				),
			)
		);
	}
}

add_action( 'wp_ajax_lw_client_invoices', 'lw_handle_client_invoices_ajax' );

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'lw/v1',
			'/session',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function() {
					return rest_ensure_response( lw_get_bootstrap_payload() );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/profile',
			array(
				array(
					'methods'             => 'GET',
					'permission_callback' => 'lw_rest_permissions_check',
					'callback'            => function() {
						return rest_ensure_response(
							array(
								'profile' => lw_build_profile_payload( wp_get_current_user() ),
							)
						);
					},
				),
				array(
					'methods'             => 'POST',
					'permission_callback' => 'lw_rest_permissions_check',
					'callback'            => 'lw_save_profile_for_current_user',
				),
			)
		);

		register_rest_route(
			'lw/v1',
			'/dashboard',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function() {
					try {
						return rest_ensure_response( lw_get_cached_dashboard_payload( wp_get_current_user() ) );
					} catch ( Throwable $exception ) {
						if ( function_exists( 'error_log' ) ) {
							error_log( 'LedgerWorx dashboard fallback: ' . $exception->getMessage() );
						}

						return rest_ensure_response(
							array(
								'profile'        => lw_build_profile_payload( wp_get_current_user() ),
								'stats'          => array(
									'activeServicesCount' => 0,
									'invoicesCount'       => 0,
								),
								'payments'       => array(
									'dueNow' => 0,
								),
								'packages'       => array(),
								'services'       => array(),
								'recentActivity' => array(),
								'notifications'  => array(),
								'meta'           => array(
									'entity'            => 'dashboard',
									'dashboardFallback' => true,
									'dashboardError'    => 'Dashboard data temporarily unavailable.',
								),
							)
						);
					}
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/catalog/packages',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function() {
					return rest_ensure_response( lw_get_cached_packages_payload( wp_get_current_user() ) );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/catalog/services',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function() {
					return rest_ensure_response( lw_get_cached_services_payload( wp_get_current_user() ) );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/invoices',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function() {
					try {
						return rest_ensure_response( lw_get_cached_client_invoices_payload( wp_get_current_user() ) );
					} catch ( Throwable $exception ) {
						if ( function_exists( 'error_log' ) ) {
							error_log( 'LedgerWorx invoices rest fallback: ' . $exception->getMessage() );
						}

						return rest_ensure_response(
							array(
								'invoices' => array(),
								'meta'     => array(
									'entity'          => 'client_invoices',
									'invoiceFallback' => true,
									'invoiceError'    => 'Invoice sync temporarily unavailable.',
								),
							)
						);
					}
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/notifications',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function() {
					return rest_ensure_response( lw_get_client_notifications_payload( wp_get_current_user() ) );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/profile/company',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => 'lw_save_company_name_for_current_user',
			)
		);
	}
);
