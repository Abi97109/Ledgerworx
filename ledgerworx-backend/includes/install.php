<?php

function lw_get_cache_table_name() {
	global $wpdb;
	return $wpdb->prefix . 'lw_portal_cache';
}

function lw_create_roles() {
	if ( ! get_role( 'lw_client' ) ) {
		add_role( 'lw_client', 'Client', array( 'read' => true ) );
	}

	if ( ! get_role( 'lw_accountant' ) ) {
		add_role( 'lw_accountant', 'Accountant', array( 'read' => true ) );
	}

	if ( ! get_role( 'lw_salesperson' ) ) {
		add_role( 'lw_salesperson', 'Salesperson', array( 'read' => true ) );
	}

	if ( ! get_role( 'lw_manager' ) ) {
		add_role( 'lw_manager', 'Manager', array( 'read' => true ) );
	}
}

function lw_install_cache_table() {
	global $wpdb;

	$table_name      = lw_get_cache_table_name();
	$charset_collate = $wpdb->get_charset_collate();

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';

	$sql = "CREATE TABLE {$table_name} (
		cache_key varchar(191) NOT NULL,
		scope varchar(50) NOT NULL DEFAULT 'global',
		payload longtext NULL,
		refreshed_at datetime NOT NULL,
		expires_at datetime NOT NULL,
		source_record_id varchar(191) NULL,
		sync_status varchar(20) NOT NULL DEFAULT 'fresh',
		error_message text NULL,
		PRIMARY KEY  (cache_key),
		KEY expires_at (expires_at),
		KEY scope (scope)
	) {$charset_collate};";

	dbDelta( $sql );
	update_option( 'lw_portal_cache_schema_version', LW_PORTAL_CACHE_SCHEMA_VERSION );
}

function lw_install_plugin() {
	lw_create_roles();
	lw_install_cache_table();
}

function lw_maybe_install_plugin() {
	$installed_version = get_option( 'lw_portal_cache_schema_version' );
	if ( LW_PORTAL_CACHE_SCHEMA_VERSION !== $installed_version ) {
		lw_install_cache_table();
	}
}
add_action( 'init', 'lw_maybe_install_plugin', 1 );

function lw_assign_client_role( $user_id ) {
	$user = new WP_User( $user_id );
	$user->set_role( 'lw_client' );
}
add_action( 'user_register', 'lw_assign_client_role' );
