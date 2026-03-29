<?php

add_filter(
	'show_admin_bar',
	function( $show ) {
		if ( is_user_logged_in() && lw_is_portal_user() ) {
			return false;
		}

		return $show;
	}
);

add_action(
	'admin_init',
	function() {
		if ( ! is_admin() ) {
			return;
		}

		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		$user = wp_get_current_user();

		if ( lw_is_portal_user( $user ) ) {
			wp_safe_redirect( home_url( lw_get_role_redirect( $user ) ) );
			exit;
		}
	}
);
