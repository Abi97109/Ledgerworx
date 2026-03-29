<?php

function lw_read_cache_row( $cache_key ) {
	global $wpdb;

	$table_name = lw_get_cache_table_name();
	$row        = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table_name} WHERE cache_key = %s", $cache_key ), ARRAY_A );

	if ( ! $row ) {
		return null;
	}

	return array(
		'cache_key'        => $row['cache_key'],
		'scope'            => $row['scope'],
		'payload'          => $row['payload'] ? json_decode( $row['payload'], true ) : null,
		'refreshed_at'     => $row['refreshed_at'],
		'expires_at'       => $row['expires_at'],
		'source_record_id' => $row['source_record_id'],
		'sync_status'      => $row['sync_status'],
		'error_message'    => $row['error_message'],
	);
}

function lw_write_cache_row( $cache_key, $scope, $payload, $ttl, $sync_status = 'fresh', $source_record_id = '', $error_message = '' ) {
	global $wpdb;

	$table_name   = lw_get_cache_table_name();
	$refreshed_at = current_time( 'mysql', true );
	$expires_at   = gmdate( 'Y-m-d H:i:s', time() + max( 1, (int) $ttl ) );

	$wpdb->replace(
		$table_name,
		array(
			'cache_key'        => $cache_key,
			'scope'            => $scope,
			'payload'          => wp_json_encode( $payload ),
			'refreshed_at'     => $refreshed_at,
			'expires_at'       => $expires_at,
			'source_record_id' => $source_record_id,
			'sync_status'      => $sync_status,
			'error_message'    => $error_message,
		),
		array( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
	);

	return lw_read_cache_row( $cache_key );
}

function lw_is_cache_row_fresh( $row ) {
	if ( ! $row || empty( $row['expires_at'] ) ) {
		return false;
	}

	return strtotime( $row['expires_at'] ) >= time();
}

function lw_cache_remember( $cache_key, $ttl, $callback, $scope = 'global' ) {
	$cached = lw_read_cache_row( $cache_key );

	if ( lw_is_cache_row_fresh( $cached ) ) {
		return array(
			'data' => $cached['payload'],
			'meta' => array(
				'cacheKey'    => $cache_key,
				'lastUpdated' => $cached['refreshed_at'],
				'stale'       => false,
				'syncStatus'  => $cached['sync_status'],
				'error'       => $cached['error_message'],
			),
		);
	}

	try {
		$fresh_payload = call_user_func( $callback, $cached );
		$row           = lw_write_cache_row( $cache_key, $scope, $fresh_payload, $ttl, 'fresh' );

		if ( ! $row ) {
			return array(
				'data' => $fresh_payload,
				'meta' => array(
					'cacheKey'    => $cache_key,
					'lastUpdated' => current_time( 'mysql', true ),
					'stale'       => false,
					'syncStatus'  => 'fresh',
					'error'       => '',
				),
			);
		}

		return array(
			'data' => $row['payload'],
			'meta' => array(
				'cacheKey'    => $cache_key,
				'lastUpdated' => $row['refreshed_at'],
				'stale'       => false,
				'syncStatus'  => 'fresh',
				'error'       => '',
			),
		);
	} catch ( Exception $exception ) {
		if ( $cached && ! empty( $cached['payload'] ) ) {
			lw_write_cache_row( $cache_key, $scope, $cached['payload'], 60, 'stale', '', $exception->getMessage() );

			return array(
				'data' => $cached['payload'],
				'meta' => array(
					'cacheKey'    => $cache_key,
					'lastUpdated' => $cached['refreshed_at'],
					'stale'       => true,
					'syncStatus'  => 'stale',
					'error'       => $exception->getMessage(),
				),
			);
		}

		throw $exception;
	}
}
