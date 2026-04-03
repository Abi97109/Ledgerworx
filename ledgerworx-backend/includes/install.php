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

function lw_install_requests_table() {
	global $wpdb;

	$table_name      = $wpdb->prefix . 'lw_requests';
	$charset_collate = $wpdb->get_charset_collate();

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';

	$sql = "CREATE TABLE {$table_name} (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		request_uid varchar(191) NOT NULL,
		user_id bigint(20) unsigned NOT NULL,
		requester_email varchar(191) NULL,
		requester_name varchar(191) NULL,
		title varchar(255) NOT NULL,
		category varchar(191) NULL,
		amount varchar(191) NULL,
		duration varchar(191) NULL,
		overview longtext NULL,
		notes longtext NULL,
		required_documents longtext NULL,
		uploaded_documents longtext NULL,
		instructions longtext NULL,
		status varchar(191) NULL,
		workflow_stage varchar(191) NULL,
		action_btn varchar(191) NULL,
		due_date varchar(191) NULL,
		submitted_on varchar(191) NULL,
		source varchar(191) NULL,
		payment_contact_name varchar(191) NULL,
		payment_contact_phone varchar(191) NULL,
		payment_whatsapp_link varchar(255) NULL,
		staff_name varchar(191) NULL,
		staff_role varchar(191) NULL,
		icon varchar(191) NULL,
		icon_color varchar(191) NULL,
		icon_tone varchar(50) NULL,
		progress longtext NULL,
		created_at datetime NOT NULL,
		updated_at datetime NOT NULL,
		PRIMARY KEY  (id),
		UNIQUE KEY request_uid (request_uid),
		KEY user_id (user_id),
		KEY status (status),
		KEY workflow_stage (workflow_stage),
		KEY created_at (created_at)
	) {$charset_collate};";

	dbDelta( $sql );
}

function lw_install_documents_table() {
	global $wpdb;

	$table_name      = $wpdb->prefix . 'lw_documents';
	$charset_collate = $wpdb->get_charset_collate();

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';

	$sql = "CREATE TABLE {$table_name} (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		user_id bigint(20) unsigned NOT NULL,
		request_uid varchar(191) NULL,
		document_name varchar(255) NOT NULL,
		file_name varchar(255) NULL,
		file_path text NULL,
		file_url text NULL,
		sync_status varchar(50) NULL,
		created_at datetime NOT NULL,
		updated_at datetime NOT NULL,
		PRIMARY KEY  (id),
		KEY user_id (user_id),
		KEY request_uid (request_uid),
		KEY created_at (created_at)
	) {$charset_collate};";

	dbDelta( $sql );
}

function lw_install_plugin() {
	lw_create_roles();
	lw_install_cache_table();
	lw_install_requests_table();
	lw_install_documents_table();
}

function lw_maybe_install_plugin() {
	$installed_version = get_option( 'lw_portal_cache_schema_version' );
	if ( LW_PORTAL_CACHE_SCHEMA_VERSION !== $installed_version ) {
		lw_install_cache_table();
	}
	lw_install_requests_table();
	lw_install_documents_table();
}
add_action( 'init', 'lw_maybe_install_plugin', 1 );

function lw_assign_client_role( $user_id ) {
	$user = new WP_User( $user_id );
	$user->set_role( 'lw_client' );
}
add_action( 'user_register', 'lw_assign_client_role' );
