<?php

function lw_get_access_token() {
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

	$body = json_decode( wp_remote_retrieve_body( $response ), true );

	return $body['access_token'] ?? null;
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
