<?php

/**
 * LedgerWorx Client Requests Management
 *
 * Handles backend persistence for client service requests.
 * Stores requests in WordPress user meta for the logged-in user.
 */

function lw_get_client_requests_user_meta_key() {
	return 'lw_service_requests';
}

function lw_get_stored_client_requests( $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return array();
	}

	$raw_meta = get_user_meta( (int) $user_id, lw_get_client_requests_user_meta_key(), true );

	if ( ! is_array( $raw_meta ) ) {
		return array();
	}

	return $raw_meta;
}

function lw_save_client_requests( $requests, $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return false;
	}

	if ( ! is_array( $requests ) ) {
		$requests = array();
	}

	return (bool) update_user_meta(
		(int) $user_id,
		lw_get_client_requests_user_meta_key(),
		$requests
	);
}

function lw_normalize_client_request( $request ) {
	if ( ! is_array( $request ) ) {
		return null;
	}

	$id = isset( $request['id'] ) ? trim( (string) $request['id'] ) : '';
	if ( ! $id && isset( $request['requestId'] ) ) {
		$id = trim( (string) $request['requestId'] );
	}
	if ( ! $id ) {
		return null;
	}

	return array(
		'id'              => $id,
		'title'           => isset( $request['title'] ) ? trim( (string) $request['title'] ) : '',
		'icon'            => isset( $request['icon'] ) ? trim( (string) $request['icon'] ) : 'fas fa-briefcase',
		'iconColor'       => isset( $request['iconColor'] ) ? trim( (string) $request['iconColor'] ) : '#3498db',
		'iconTone'        => isset( $request['iconTone'] ) ? trim( (string) $request['iconTone'] ) : 'blue',
		'status'          => isset( $request['status'] ) ? trim( (string) $request['status'] ) : 'Submitted',
		'requestId'       => isset( $request['requestId'] ) ? trim( (string) $request['requestId'] ) : $id,
		'submittedOn'     => isset( $request['submittedOn'] ) ? trim( (string) $request['submittedOn'] ) : wp_date( 'd M Y' ),
		'dueDate'         => isset( $request['dueDate'] ) ? trim( (string) $request['dueDate'] ) : '',
		'category'        => isset( $request['category'] ) ? trim( (string) $request['category'] ) : '',
		'overview'        => isset( $request['overview'] ) ? trim( (string) $request['overview'] ) : '',
		'instructions'    => is_array( $request['instructions'] ?? null ) ? array_map( 'sanitize_text_field', $request['instructions'] ) : array(),
		'staffName'       => isset( $request['staffName'] ) ? trim( (string) $request['staffName'] ) : '',
		'staffRole'       => isset( $request['staffRole'] ) ? trim( (string) $request['staffRole'] ) : '',
		'progress'        => lw_normalize_progress_steps( $request['progress'] ?? array() ),
		'actionBtn'       => isset( $request['actionBtn'] ) ? trim( (string) $request['actionBtn'] ) : '',
		'createdAt'       => isset( $request['createdAt'] ) ? trim( (string) $request['createdAt'] ) : wp_date( 'c' ),
	);
}

function lw_generate_next_client_request_id( $requests ) {
	$max_number = 24;

	foreach ( (array) $requests as $request ) {
		$request_id = isset( $request['requestId'] ) ? (string) $request['requestId'] : '';
		if ( preg_match( '/LW-REQ-(\d+)/', $request_id, $matches ) ) {
			$number = (int) $matches[1];
			if ( $number > $max_number ) {
				$max_number = $number;
			}
		}
	}

	return 'LW-REQ-' . str_pad( (string) ( $max_number + 1 ), 3, '0', STR_PAD_LEFT );
}

function lw_normalize_progress_steps( $progress ) {
	if ( ! is_array( $progress ) ) {
		return array();
	}

	return array_map(
		function( $step ) {
			return array(
				'label'     => isset( $step['label'] ) ? trim( (string) $step['label'] ) : '',
				'completed' => (bool) ( $step['completed'] ?? false ),
			);
		},
		$progress
	);
}

function lw_create_client_request( $request_data, $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return new WP_Error(
			'lw_no_user',
			'You must be logged in to create a request.',
			array( 'status' => 401 )
		);
	}

	if ( ! is_array( $request_data ) ) {
		return new WP_Error(
			'lw_invalid_request',
			'Request data must be an array.',
			array( 'status' => 400 )
		);
	}

	$normalized = lw_normalize_client_request( $request_data );
	if ( ! $normalized ) {
		return new WP_Error(
			'lw_invalid_request_data',
			'Request data is invalid. Please provide required fields.',
			array( 'status' => 400 )
		);
	}

	$requests = lw_get_stored_client_requests( $user_id );

	if ( empty( $request_data['id'] ) && empty( $request_data['requestId'] ) ) {
		$request_data['requestId'] = lw_generate_next_client_request_id( $requests );
	}

	foreach ( $requests as $existing ) {
		if ( $existing['id'] === $normalized['id'] ) {
			return new WP_Error(
				'lw_duplicate_request',
				'A request with this ID already exists.',
				array( 'status' => 409 )
			);
		}
	}

	$requests[] = $normalized;
	$saved      = lw_save_client_requests( $requests, $user_id );

	if ( ! $saved ) {
		return new WP_Error(
			'lw_save_failed',
			'Failed to save the request. Please try again.',
			array( 'status' => 500 )
		);
	}

	return rest_ensure_response(
		array(
			'saved'    => true,
			'request'  => $normalized,
			'message'  => 'Request saved successfully',
		)
	);
}

function lw_get_client_requests( $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return array();
	}

	$requests = lw_get_stored_client_requests( $user_id );

	return array_filter(
		array_map( 'lw_normalize_client_request', $requests ),
		function( $r ) {
			return $r !== null;
		}
	);
}

function lw_update_client_request( $request_id, $request_data, $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return new WP_Error(
			'lw_no_user',
			'You must be logged in to update a request.',
			array( 'status' => 401 )
		);
	}

	$request_id = trim( (string) $request_id );
	if ( ! $request_id ) {
		return new WP_Error(
			'lw_invalid_id',
			'Request ID is required.',
			array( 'status' => 400 )
		);
	}

	if ( ! is_array( $request_data ) ) {
		return new WP_Error(
			'lw_invalid_request',
			'Request data must be an array.',
			array( 'status' => 400 )
		);
	}

	$requests = lw_get_stored_client_requests( $user_id );
	$found    = false;
	$updated  = array();

	foreach ( $requests as $existing ) {
		if ( $existing['id'] === $request_id ) {
			$normalized = lw_normalize_client_request( array_merge( $existing, $request_data, array( 'id' => $request_id ) ) );
			if ( $normalized ) {
				$updated[]  = $normalized;
				$found      = true;
			}
		} else {
			$updated[] = $existing;
		}
	}

	if ( ! $found ) {
		return new WP_Error(
			'lw_not_found',
			'Request not found.',
			array( 'status' => 404 )
		);
	}

	$saved = lw_save_client_requests( $updated, $user_id );

	if ( ! $saved ) {
		return new WP_Error(
			'lw_save_failed',
			'Failed to update the request. Please try again.',
			array( 'status' => 500 )
		);
	}

	$updated_request = null;
	foreach ( $updated as $req ) {
		if ( $req['id'] === $request_id ) {
			$updated_request = $req;
			break;
		}
	}

	return rest_ensure_response(
		array(
			'saved'    => true,
			'request'  => $updated_request,
			'message'  => 'Request updated successfully',
		)
	);
}

function lw_delete_client_request( $request_id, $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return new WP_Error(
			'lw_no_user',
			'You must be logged in to delete a request.',
			array( 'status' => 401 )
		);
	}

	$request_id = trim( (string) $request_id );
	if ( ! $request_id ) {
		return new WP_Error(
			'lw_invalid_id',
			'Request ID is required.',
			array( 'status' => 400 )
		);
	}

	$requests = lw_get_stored_client_requests( $user_id );
	$found    = false;
	$updated  = array();

	foreach ( $requests as $existing ) {
		if ( $existing['id'] !== $request_id ) {
			$updated[] = $existing;
		} else {
			$found = true;
		}
	}

	if ( ! $found ) {
		return new WP_Error(
			'lw_not_found',
			'Request not found.',
			array( 'status' => 404 )
		);
	}

	$saved = lw_save_client_requests( $updated, $user_id );

	if ( ! $saved ) {
		return new WP_Error(
			'lw_save_failed',
			'Failed to delete the request. Please try again.',
			array( 'status' => 500 )
		);
	}

	return rest_ensure_response(
		array(
			'deleted' => true,
			'message' => 'Request deleted successfully',
		)
	);
}

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'lw/v1',
			'/client/requests',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function() {
					$requests = lw_get_client_requests();
					return rest_ensure_response(
						array(
							'requests' => $requests,
							'meta'     => array(
								'count'  => count( $requests ),
								'source' => 'backend',
							),
						)
					);
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/requests',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_create_client_request( $request->get_json_params() );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/requests/(?P<id>[^/]+)',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					$request_id = $request->get_param( 'id' );
					return lw_update_client_request( $request_id, $request->get_json_params() );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/requests/(?P<id>[^/]+)',
			array(
				'methods'             => 'DELETE',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					$request_id = $request->get_param( 'id' );
					return lw_delete_client_request( $request_id );
				},
			)
		);
	}
);
