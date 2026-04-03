<?php

function lw_get_client_ip_address() {
	$server_keys = array(
		'HTTP_CF_CONNECTING_IP',
		'HTTP_X_FORWARDED_FOR',
		'REMOTE_ADDR',
	);

	foreach ( $server_keys as $server_key ) {
		$value = isset( $_SERVER[ $server_key ] ) ? wp_unslash( $_SERVER[ $server_key ] ) : '';
		$value = trim( (string) $value );

		if ( ! $value ) {
			continue;
		}

		if ( false !== strpos( $value, ',' ) ) {
			$parts = array_map( 'trim', explode( ',', $value ) );
			$value = (string) reset( $parts );
		}

		return sanitize_text_field( $value );
	}

	return 'unknown';
}

function lw_get_login_rate_limit_key( $username ) {
	$username = sanitize_user( (string) $username, true );
	$ip       = lw_get_client_ip_address();

	return 'lw_login_rate_' . md5( strtolower( $username ) . '|' . strtolower( $ip ) );
}

function lw_get_login_rate_limit_state( $username ) {
	$key   = lw_get_login_rate_limit_key( $username );
	$state = get_transient( $key );

	if ( ! is_array( $state ) ) {
		$state = array(
			'count'       => 0,
			'lockedUntil' => 0,
		);
	}

	$state['key'] = $key;

	return $state;
}

function lw_get_login_lockout_threshold() {
	return (int) apply_filters( 'lw_login_lockout_threshold', 5 );
}

function lw_get_login_lockout_window_seconds() {
	return (int) apply_filters( 'lw_login_lockout_window_seconds', 15 * MINUTE_IN_SECONDS );
}

function lw_get_login_lockout_duration_seconds() {
	return (int) apply_filters( 'lw_login_lockout_duration_seconds', 15 * MINUTE_IN_SECONDS );
}

function lw_is_login_locked_out( $username ) {
	$state = lw_get_login_rate_limit_state( $username );

	return ! empty( $state['lockedUntil'] ) && (int) $state['lockedUntil'] > time();
}

function lw_get_remaining_lockout_minutes( $username ) {
	$state = lw_get_login_rate_limit_state( $username );

	if ( empty( $state['lockedUntil'] ) ) {
		return 0;
	}

	return max( 1, (int) ceil( ( (int) $state['lockedUntil'] - time() ) / 60 ) );
}

function lw_increment_login_failure_counter( $username ) {
	$username = sanitize_user( (string) $username, true );

	if ( '' === $username ) {
		return;
	}

	$state              = lw_get_login_rate_limit_state( $username );
	$state['count']     = isset( $state['count'] ) ? (int) $state['count'] + 1 : 1;
	$state['lockedUntil'] = 0;

	if ( $state['count'] >= lw_get_login_lockout_threshold() ) {
		$state['lockedUntil'] = time() + lw_get_login_lockout_duration_seconds();
	}

	set_transient(
		$state['key'],
		array(
			'count'       => $state['count'],
			'lockedUntil' => $state['lockedUntil'],
		),
		lw_get_login_lockout_window_seconds()
	);
}

function lw_clear_login_failure_counter_by_username( $username ) {
	$username = sanitize_user( (string) $username, true );

	if ( '' === $username ) {
		return;
	}

	delete_transient( lw_get_login_rate_limit_key( $username ) );
}

function lw_clear_login_failure_counter_by_user( $user_login, $user ) {
	lw_clear_login_failure_counter_by_username( $user_login );

	if ( $user instanceof WP_User && ! empty( $user->user_email ) ) {
		lw_clear_login_failure_counter_by_username( $user->user_email );
	}
}

function lw_block_locked_login_attempts( $validation_error, $username ) {
	if ( ! $validation_error instanceof WP_Error ) {
		$validation_error = new WP_Error();
	}

	if ( lw_is_login_locked_out( $username ) ) {
		$validation_error->add(
			'lw_login_locked',
			sprintf(
				/* translators: %d: remaining lockout minutes */
				__( 'Too many login attempts. Please wait %d minute(s) before trying again.', 'ledgerworx-backend' ),
				lw_get_remaining_lockout_minutes( $username )
			)
		);
	}

	return $validation_error;
}

function lw_capture_failed_login_attempt( $username ) {
	lw_increment_login_failure_counter( $username );
}

function lw_make_login_errors_generic( $validation_error, $username, $password ) {
	if ( ! $validation_error instanceof WP_Error ) {
		$validation_error = new WP_Error();
	}

	$error_codes = $validation_error->get_error_codes();
	$account_enumeration_codes = array(
		'unknown_email',
		'invalid_username',
		'invalid_email',
		'incorrect_password',
		'empty_password',
	);

	foreach ( $account_enumeration_codes as $code ) {
		if ( in_array( $code, $error_codes, true ) ) {
			$validation_error->remove( $code );
		}
	}

	if ( count( $error_codes ) > 0 ) {
		$account_enumeration_found = array_intersect( $account_enumeration_codes, $error_codes );
		if ( ! empty( $account_enumeration_found ) ) {
			$validation_error->add(
				'lw_generic_login_error',
				__( 'Invalid username or password. Please try again.', 'ledgerworx-backend' )
			);
		}
	}

	return $validation_error;
}

add_filter( 'user_registration_process_login_errors', 'lw_make_login_errors_generic', 5, 3 );
add_filter( 'user_registration_process_login_errors', 'lw_block_locked_login_attempts', 10, 2 );
add_action( 'wp_login_failed', 'lw_capture_failed_login_attempt' );
add_action( 'wp_login', 'lw_clear_login_failure_counter_by_user', 5, 2 );
