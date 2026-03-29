<?php

function lw_get_role_redirect( $user ) {
	if ( ! $user || ! isset( $user->roles ) ) {
		return '/portal/client';
	}

	$role = $user->roles[0];

	switch ( $role ) {
		case 'lw_client':
			return '/portal/client';
		case 'lw_accountant':
			return '/portal/accountant';
		case 'lw_salesperson':
			return '/portal/sales';
		case 'lw_manager':
			return '/portal/manager';
		case 'administrator':
			return '/portal/admin';
		default:
			return '/portal/client';
	}
}

function lw_get_login_page_url() {
	return home_url( '/login/' );
}

function lw_get_client_signout_page_url() {
	return home_url( '/portal/client/signout' );
}

function lw_get_portal_base_url() {
	return home_url( '/portal/client/' );
}

function lw_is_portal_user( $user = null ) {
	if ( ! $user ) {
		$user = wp_get_current_user();
	}

	if ( ! $user || empty( $user->roles ) ) {
		return false;
	}

	$roles        = (array) $user->roles;
	$portal_roles = array( 'lw_client', 'lw_accountant', 'lw_salesperson', 'lw_manager' );

	return (bool) array_intersect( $portal_roles, $roles );
}

function lw_can_access_portal_api( $user = null ) {
	if ( ! $user ) {
		$user = wp_get_current_user();
	}

	if ( ! $user || empty( $user->ID ) ) {
		return false;
	}

	$roles = (array) $user->roles;

	return lw_is_portal_user( $user ) || in_array( 'administrator', $roles, true );
}

function lw_get_logout_url( $redirect_url = '' ) {
	$target = $redirect_url ? $redirect_url : lw_get_client_signout_page_url();
	return home_url( '/?lw_action=logout&redirect_to=' . rawurlencode( $target ) );
}

add_filter(
	'login_redirect',
	function( $redirect_to, $request, $user ) {
		if ( ! is_wp_error( $user ) && isset( $user->ID ) ) {
			return home_url( lw_get_role_redirect( $user ) );
		}

		return $redirect_to;
	},
	999,
	3
);

add_action(
	'wp_login',
	function( $user_login, $user ) {
		$redirect = lw_get_role_redirect( $user );
		wp_safe_redirect( home_url( $redirect ) );
		exit;
	},
	10,
	2
);

add_action(
	'init',
	function() {
		if ( ( $_GET['lw_action'] ?? '' ) !== 'logout' ) {
			return;
		}

		wp_logout();
		nocache_headers();

		$redirect = isset( $_GET['redirect_to'] )
			? esc_url_raw( wp_unslash( $_GET['redirect_to'] ) )
			: lw_get_client_signout_page_url();

		if ( ! $redirect ) {
			$redirect = lw_get_login_page_url();
		}

		wp_safe_redirect( $redirect );
		exit;
	}
);

add_action(
	'send_headers',
	function() {
		$uri = $_SERVER['REQUEST_URI'] ?? '';

		if ( strpos( $uri, '/portal' ) !== false || strpos( $uri, '/login' ) !== false ) {
			nocache_headers();
			header( 'Cache-Control: no-store, no-cache, must-revalidate, max-age=0' );
			header( 'Pragma: no-cache' );
			header( 'Expires: Wed, 11 Jan 1984 05:00:00 GMT' );
		}
	}
);

add_action(
	'template_redirect',
	function() {
		if ( ( $_SERVER['REQUEST_METHOD'] ?? 'GET' ) === 'POST' ) {
			return;
		}

		$uri                    = $_SERVER['REQUEST_URI'] ?? '';
		$is_client_signout_page = strpos( $uri, '/portal/client/signout' ) !== false;

		if ( is_user_logged_in() && strpos( $uri, '/login' ) !== false ) {
			$user = wp_get_current_user();
			wp_safe_redirect( home_url( lw_get_role_redirect( $user ) ) );
			exit;
		}

		if ( ! is_user_logged_in() && strpos( $uri, '/portal' ) !== false && ! $is_client_signout_page ) {
			wp_safe_redirect( lw_get_login_page_url() );
			exit;
		}
	}
);
