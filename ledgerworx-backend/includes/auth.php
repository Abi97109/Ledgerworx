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

function lw_get_portal_base_url_for_role( $role = '' ) {
	switch ( (string) $role ) {
		case 'lw_accountant':
			return home_url( '/portal/accountant/' );
		case 'lw_salesperson':
			return home_url( '/portal/sales/' );
		case 'lw_manager':
			return home_url( '/portal/manager/' );
		case 'administrator':
			return home_url( '/portal/admin/' );
		case 'lw_client':
		default:
			return home_url( '/portal/client/' );
	}
}

function lw_get_signout_page_url_for_role( $role = '' ) {
	switch ( (string) $role ) {
		case 'lw_accountant':
			return home_url( '/portal/accountant/signout' );
		case 'lw_salesperson':
			return home_url( '/portal/sales/signout' );
		case 'lw_manager':
			return home_url( '/portal/manager/signout' );
		case 'administrator':
			return home_url( '/portal/admin/logout' );
		case 'lw_client':
		default:
			return home_url( '/portal/client/signout' );
	}
}

function lw_get_current_portal_role( $user = null ) {
	if ( ! $user ) {
		$user = wp_get_current_user();
	}

	if ( ! $user || empty( $user->roles ) ) {
		return 'lw_client';
	}

	return (string) ( $user->roles[0] ?? 'lw_client' );
}

function lw_get_client_signout_page_url() {
	return lw_get_signout_page_url_for_role( 'lw_client' );
}

function lw_get_portal_base_url( $user = null ) {
	return lw_get_portal_base_url_for_role( lw_get_current_portal_role( $user ) );
}

function lw_get_portal_signout_page_url( $user = null ) {
	return lw_get_signout_page_url_for_role( lw_get_current_portal_role( $user ) );
}

function lw_is_portal_signout_request( $uri = '' ) {
	$uri = (string) $uri;
	$signout_paths = array(
		'/portal/client/signout',
		'/portal/accountant/signout',
		'/portal/sales/signout',
		'/portal/manager/signout',
		'/portal/admin/logout',
	);

	foreach ( $signout_paths as $path ) {
		if ( strpos( $uri, $path ) !== false ) {
			return true;
		}
	}

	return false;
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

function lw_get_logout_url( $redirect_url = '', $user = null ) {
	$target = $redirect_url ? $redirect_url : lw_get_portal_signout_page_url( $user );
	return home_url( '/?lw_action=logout&redirect_to=' . rawurlencode( $target ) );
}

function lw_is_frontend_login_request() {
	$request_uri = $_SERVER['REQUEST_URI'] ?? '';
	$script_name = $_SERVER['SCRIPT_NAME'] ?? '';
	$referer     = function_exists( 'wp_get_raw_referer' ) ? wp_get_raw_referer() : '';

	if ( ! $referer && isset( $_SERVER['HTTP_REFERER'] ) ) {
		$referer = wp_unslash( $_SERVER['HTTP_REFERER'] );
	}

	// Frontend LedgerWorx login should continue to route users into the portal.
	if ( $referer && strpos( $referer, '/login' ) !== false ) {
		return true;
	}

	if ( strpos( $request_uri, '/login' ) !== false ) {
		return true;
	}

	// Native WordPress logins should keep the normal wp-admin behavior.
	if ( $referer && strpos( $referer, '/wp-login.php' ) !== false ) {
		return false;
	}

	if ( strpos( $request_uri, '/wp-login.php' ) !== false || strpos( $script_name, 'wp-login.php' ) !== false ) {
		return false;
	}

	return false;
}

add_filter(
	'login_redirect',
	function( $redirect_to, $request, $user ) {
		if ( ! is_wp_error( $user ) && isset( $user->ID ) && lw_is_frontend_login_request() ) {
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
		if ( ! lw_is_frontend_login_request() ) {
			return;
		}

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
		$is_portal_signout_page = lw_is_portal_signout_request( $uri );

		if ( is_user_logged_in() && strpos( $uri, '/login' ) !== false ) {
			$user = wp_get_current_user();
			wp_safe_redirect( home_url( lw_get_role_redirect( $user ) ) );
			exit;
		}

		if ( ! is_user_logged_in() && strpos( $uri, '/portal' ) !== false && ! $is_portal_signout_page ) {
			wp_safe_redirect( lw_get_login_page_url() );
			exit;
		}
	}
);
