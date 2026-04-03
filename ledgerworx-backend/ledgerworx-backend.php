<?php
/**
 * Plugin Name: LedgerWorx Backend
 * Version: 3.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! defined( 'LW_PORTAL_PLUGIN_FILE' ) ) {
    define( 'LW_PORTAL_PLUGIN_FILE', __FILE__ );
}

if ( ! defined( 'LW_PORTAL_PLUGIN_DIR' ) ) {
    define( 'LW_PORTAL_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'LW_PORTAL_CACHE_SCHEMA_VERSION' ) ) {
    define( 'LW_PORTAL_CACHE_SCHEMA_VERSION', '1.0.0' );
}

if ( ! defined( 'LW_PORTAL_CACHE_CATALOG_TTL' ) ) {
    define( 'LW_PORTAL_CACHE_CATALOG_TTL', 60 );
}

if ( ! defined( 'LW_PORTAL_CACHE_OPERATIONAL_TTL' ) ) {
    define( 'LW_PORTAL_CACHE_OPERATIONAL_TTL', 20 );
}

require_once LW_PORTAL_PLUGIN_DIR . 'includes/install.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/auth.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/admin.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/cache.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/zoho.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/portal-data.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/requests.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/api.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/registration.php';
require_once LW_PORTAL_PLUGIN_DIR . 'includes/ur-hardening.php';

register_activation_hook( LW_PORTAL_PLUGIN_FILE, 'lw_install_plugin' );
