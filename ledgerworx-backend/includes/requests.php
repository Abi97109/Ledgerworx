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

function lw_get_requests_table_name() {
	global $wpdb;
	return $wpdb->prefix . 'lw_requests';
}

function lw_get_documents_table_name() {
	global $wpdb;
	return $wpdb->prefix . 'lw_documents';
}

function lw_table_exists( $table_name ) {
	global $wpdb;
	$found = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name ) );
	return is_string( $found ) && $found === $table_name;
}

function lw_decode_json_column( $value, $fallback = array() ) {
	if ( '' === $value || null === $value ) {
		return $fallback;
	}

	if ( is_array( $value ) ) {
		return $value;
	}

	$decoded = json_decode( (string) $value, true );
	return is_array( $decoded ) ? $decoded : $fallback;
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
	if ( ! $id && isset( $request['request_uid'] ) ) {
		$id = trim( (string) $request['request_uid'] );
	}
	if ( ! $id ) {
		return null;
	}

	$workflow_stage = isset( $request['workflowStage'] )
		? trim( (string) $request['workflowStage'] )
		: trim( (string) ( $request['workflow_stage'] ?? '' ) );
	$status = isset( $request['status'] ) ? trim( (string) $request['status'] ) : 'Submitted';
	if ( ! $workflow_stage ) {
		$workflow_stage = $status;
	}
	$workflow_stage = lw_normalize_request_workflow_stage( $workflow_stage );
	$status         = $workflow_stage;

	$required_documents = lw_decode_json_column(
		$request['requiredDocuments'] ?? ( $request['required_documents'] ?? array() ),
		array()
	);
	$uploaded_documents = lw_decode_json_column(
		$request['uploadedDocuments'] ?? ( $request['uploaded_documents'] ?? array() ),
		array()
	);
	$instructions = lw_decode_json_column(
		$request['instructions'] ?? array(),
		array()
	);
	$progress = lw_decode_json_column(
		$request['progress'] ?? array(),
		array()
	);
	$instructions = ! empty( $instructions ) ? array_map( 'sanitize_text_field', $instructions ) : lw_get_request_stage_instructions( $workflow_stage );
	$progress     = lw_build_request_progress_steps( $workflow_stage );
	$action_btn   = isset( $request['actionBtn'] ) ? trim( (string) $request['actionBtn'] ) : '';
	if ( '' === $action_btn ) {
		$action_btn = lw_get_request_action_label( $workflow_stage );
	}

	$requester = $request['requester'] ?? array();
	if ( ! is_array( $requester ) ) {
		$requester = array();
	}

	return array(
		'id'              => $id,
		'title'           => isset( $request['title'] ) ? trim( (string) $request['title'] ) : '',
		'icon'            => isset( $request['icon'] ) ? trim( (string) $request['icon'] ) : 'fas fa-briefcase',
		'iconColor'       => isset( $request['iconColor'] ) ? trim( (string) $request['iconColor'] ) : '#3498db',
		'iconTone'        => isset( $request['iconTone'] ) ? trim( (string) $request['iconTone'] ) : 'blue',
		'status'          => $status,
		'workflowStage'   => $workflow_stage,
		'requestId'       => isset( $request['requestId'] ) ? trim( (string) $request['requestId'] ) : ( isset( $request['request_uid'] ) ? trim( (string) $request['request_uid'] ) : $id ),
		'submittedOn'     => isset( $request['submittedOn'] ) ? trim( (string) $request['submittedOn'] ) : trim( (string) ( $request['submitted_on'] ?? wp_date( 'd M Y' ) ) ),
		'dueDate'         => isset( $request['dueDate'] ) ? trim( (string) $request['dueDate'] ) : trim( (string) ( $request['due_date'] ?? '' ) ),
		'category'        => isset( $request['category'] ) ? trim( (string) $request['category'] ) : '',
		'overview'        => isset( $request['overview'] ) ? trim( (string) $request['overview'] ) : '',
		'instructions'    => $instructions,
		'staffName'       => isset( $request['staffName'] ) ? trim( (string) $request['staffName'] ) : trim( (string) ( $request['staff_name'] ?? '' ) ),
		'staffRole'       => isset( $request['staffRole'] ) ? trim( (string) $request['staffRole'] ) : trim( (string) ( $request['staff_role'] ?? '' ) ),
		'progress'        => $progress,
		'actionBtn'       => $action_btn,
		'amount'          => isset( $request['amount'] ) ? trim( (string) $request['amount'] ) : '',
		'duration'        => isset( $request['duration'] ) ? trim( (string) $request['duration'] ) : '',
		'notes'           => isset( $request['notes'] ) ? trim( (string) $request['notes'] ) : '',
		'source'          => isset( $request['source'] ) ? trim( (string) $request['source'] ) : '',
		'requiredDocuments' => array_values( array_map( 'sanitize_text_field', (array) $required_documents ) ),
		'uploadedDocuments' => array_values( array_map( 'sanitize_text_field', (array) $uploaded_documents ) ),
		'paymentContactName' => isset( $request['paymentContactName'] ) ? trim( (string) $request['paymentContactName'] ) : trim( (string) ( $request['payment_contact_name'] ?? '' ) ),
		'paymentContactPhone' => isset( $request['paymentContactPhone'] ) ? trim( (string) $request['paymentContactPhone'] ) : trim( (string) ( $request['payment_contact_phone'] ?? '' ) ),
		'paymentWhatsappLink' => isset( $request['paymentWhatsappLink'] ) ? trim( (string) $request['paymentWhatsappLink'] ) : trim( (string) ( $request['payment_whatsapp_link'] ?? '' ) ),
		'requester'       => array(
			'name'  => isset( $requester['name'] ) ? sanitize_text_field( (string) $requester['name'] ) : trim( (string) ( $request['requester_name'] ?? '' ) ),
			'email' => isset( $requester['email'] ) ? sanitize_email( (string) $requester['email'] ) : sanitize_email( (string) ( $request['requester_email'] ?? '' ) ),
			'phone' => isset( $requester['phone'] ) ? sanitize_text_field( (string) $requester['phone'] ) : '',
		),
		'createdAt'       => isset( $request['createdAt'] ) ? trim( (string) $request['createdAt'] ) : wp_date( 'c' ),
		'updatedAt'       => isset( $request['updatedAt'] ) ? trim( (string) $request['updatedAt'] ) : trim( (string) ( $request['updated_at'] ?? wp_date( 'c' ) ) ),
	);
}

function lw_client_request_id_exists( $request_id, $user_id = null ) {
	$request_id = trim( (string) $request_id );
	if ( '' === $request_id ) {
		return false;
	}

	$table_name = lw_get_requests_table_name();
	if ( lw_table_exists( $table_name ) ) {
		global $wpdb;
		$existing = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT id FROM {$table_name} WHERE request_uid = %s LIMIT 1",
				$request_id
			)
		);

		if ( $existing ) {
			return true;
		}
	}

	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return false;
	}

	$requests = lw_get_stored_client_requests( $user_id );
	foreach ( (array) $requests as $request ) {
		$existing_id = isset( $request['id'] ) ? (string) $request['id'] : ( isset( $request['requestId'] ) ? (string) $request['requestId'] : '' );
		if ( trim( $existing_id ) === $request_id ) {
			return true;
		}
	}

	return false;
}

function lw_generate_next_client_request_id( $requests = array(), $user_id = null ) {
	$attempt = 0;

	do {
		$candidate = 'LW-REQ-' . (string) round( microtime( true ) * 1000 ) . ( $attempt > 0 ? '-' . $attempt : '' );
		$attempt++;
	} while ( lw_client_request_id_exists( $candidate, $user_id ) && $attempt < 20 );

	return $candidate;
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

	if ( empty( $request_data['id'] ) && empty( $request_data['requestId'] ) ) {
		$requests = lw_get_client_requests( $user_id );
		$request_data['requestId'] = lw_generate_next_client_request_id( $requests, $user_id );
	}

	$normalized = lw_normalize_client_request( $request_data );
	if ( ! $normalized ) {
		return new WP_Error(
			'lw_invalid_request_data',
			'Request data is invalid. Please provide required fields.',
			array( 'status' => 400 )
		);
	}

	$table_name = lw_get_requests_table_name();
	if ( lw_table_exists( $table_name ) ) {
		global $wpdb;
		$existing = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT id FROM {$table_name} WHERE request_uid = %s LIMIT 1",
				$normalized['requestId']
			)
		);
		if ( $existing ) {
			return new WP_Error(
				'lw_duplicate_request',
				'A request with this ID already exists.',
				array( 'status' => 409 )
			);
		}

		$row = lw_map_request_to_table_row( $normalized, $user_id );
		$row['created_at'] = current_time( 'mysql' );
		$inserted = $wpdb->insert( $table_name, $row );
		$saved = false !== $inserted;
	} else {
		$requests = lw_get_stored_client_requests( $user_id );
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
	}

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

	$table_requests = lw_get_client_requests_from_table( $user_id );
	if ( is_array( $table_requests ) ) {
		return $table_requests;
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

	$table_name = lw_get_requests_table_name();
	$updated_request = null;

	if ( lw_table_exists( $table_name ) ) {
		global $wpdb;
		$current_row = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT * FROM {$table_name} WHERE request_uid = %s AND user_id = %d LIMIT 1",
				$request_id,
				(int) $user_id
			),
			ARRAY_A
		);

		if ( ! $current_row ) {
			return new WP_Error(
				'lw_not_found',
				'Request not found.',
				array( 'status' => 404 )
			);
		}

		$merged = array_merge(
			lw_normalize_client_request(
				array(
					'id'                    => (string) ( $current_row['request_uid'] ?? '' ),
					'request_uid'           => $current_row['request_uid'] ?? '',
					'title'                 => $current_row['title'] ?? '',
					'category'              => $current_row['category'] ?? '',
					'amount'                => $current_row['amount'] ?? '',
					'duration'              => $current_row['duration'] ?? '',
					'overview'              => $current_row['overview'] ?? '',
					'notes'                 => $current_row['notes'] ?? '',
					'required_documents'    => $current_row['required_documents'] ?? '',
					'uploaded_documents'    => $current_row['uploaded_documents'] ?? '',
					'instructions'          => $current_row['instructions'] ?? '',
					'status'                => $current_row['status'] ?? '',
					'workflow_stage'        => $current_row['workflow_stage'] ?? '',
					'actionBtn'             => $current_row['action_btn'] ?? '',
					'dueDate'               => $current_row['due_date'] ?? '',
					'submittedOn'           => $current_row['submitted_on'] ?? '',
					'source'                => $current_row['source'] ?? '',
					'payment_contact_name'  => $current_row['payment_contact_name'] ?? '',
					'payment_contact_phone' => $current_row['payment_contact_phone'] ?? '',
					'payment_whatsapp_link' => $current_row['payment_whatsapp_link'] ?? '',
					'staff_name'            => $current_row['staff_name'] ?? '',
					'staff_role'            => $current_row['staff_role'] ?? '',
					'icon'                  => $current_row['icon'] ?? '',
					'iconColor'             => $current_row['icon_color'] ?? '',
					'iconTone'              => $current_row['icon_tone'] ?? '',
					'progress'              => $current_row['progress'] ?? '',
					'createdAt'             => ! empty( $current_row['created_at'] ) ? mysql2date( 'c', $current_row['created_at'] ) : wp_date( 'c' ),
					'updatedAt'             => ! empty( $current_row['updated_at'] ) ? mysql2date( 'c', $current_row['updated_at'] ) : wp_date( 'c' ),
					'requester_name'        => $current_row['requester_name'] ?? '',
					'requester_email'       => $current_row['requester_email'] ?? '',
				)
			),
			$request_data
		);

		$normalized = lw_normalize_client_request( array_merge( $merged, array( 'id' => $request_id, 'requestId' => $request_id ) ) );
		if ( ! $normalized ) {
			return new WP_Error(
				'lw_invalid_request',
				'Request data must be an array.',
				array( 'status' => 400 )
			);
		}

		$row = lw_map_request_to_table_row( $normalized, $user_id );
		$updated_count = $wpdb->update(
			$table_name,
			$row,
			array(
				'request_uid' => $request_id,
				'user_id'     => (int) $user_id,
			)
		);

		if ( false === $updated_count ) {
			return new WP_Error(
				'lw_save_failed',
				'Failed to update the request. Please try again.',
				array( 'status' => 500 )
			);
		}

		$updated_request = $normalized;
	} else {
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

		foreach ( $updated as $req ) {
			if ( $req['id'] === $request_id ) {
				$updated_request = $req;
				break;
			}
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

	$table_name = lw_get_requests_table_name();
	if ( lw_table_exists( $table_name ) ) {
		global $wpdb;
		$deleted = $wpdb->delete(
			$table_name,
			array(
				'request_uid' => $request_id,
				'user_id'     => (int) $user_id,
			)
		);

		if ( false === $deleted ) {
			return new WP_Error(
				'lw_save_failed',
				'Failed to delete the request. Please try again.',
				array( 'status' => 500 )
			);
		}

		if ( 0 === (int) $deleted ) {
			return new WP_Error(
				'lw_not_found',
				'Request not found.',
				array( 'status' => 404 )
			);
		}
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

	if ( $found || ! lw_table_exists( $table_name ) ) {
		$saved = lw_save_client_requests( $updated, $user_id );

		if ( ! $saved ) {
			return new WP_Error(
				'lw_save_failed',
				'Failed to delete the request. Please try again.',
				array( 'status' => 500 )
			);
		}
	}

	return rest_ensure_response(
		array(
			'deleted' => true,
			'message' => 'Request deleted successfully',
		)
	);
}

function lw_get_request_workflow_steps() {
	return array(
		'Submitted',
		'Documents Upload',
		'Review',
		'Payment',
		'Processing',
		'Confirmation',
		'Completed',
	);
}

function lw_normalize_request_workflow_stage( $stage ) {
	$stage = trim( (string) $stage );
	if ( '' === $stage ) {
		return 'Submitted';
	}

	$normalized = strtolower( preg_replace( '/\s+/', ' ', $stage ) );
	$map = array(
		'submitted'                     => 'Submitted',
		'documents required'            => 'Documents Upload',
		'document required'             => 'Documents Upload',
		'documents upload'              => 'Documents Upload',
		'document upload'               => 'Documents Upload',
		'under review'                  => 'Review',
		'review'                        => 'Review',
		'payment pending'               => 'Payment',
		'awaiting payment confirmation' => 'Payment',
		'payment'                       => 'Payment',
		'in progress'                   => 'Processing',
		'processing'                    => 'Processing',
		'confirmation'                  => 'Confirmation',
		'completed'                     => 'Completed',
	);

	if ( isset( $map[ $normalized ] ) ) {
		return $map[ $normalized ];
	}

	foreach ( lw_get_request_workflow_steps() as $label ) {
		if ( strtolower( $label ) === $normalized ) {
			return $label;
		}
	}

	return 'Submitted';
}

function lw_get_request_workflow_index( $stage ) {
	$stage = lw_normalize_request_workflow_stage( $stage );
	$steps = lw_get_request_workflow_steps();
	$index = array_search( $stage, $steps, true );

	return false === $index ? 0 : (int) $index;
}

function lw_build_request_progress_steps( $stage ) {
	$current_index = lw_get_request_workflow_index( $stage );
	$steps         = array();

	foreach ( lw_get_request_workflow_steps() as $index => $label ) {
		$steps[] = array(
			'label'     => $label,
			'completed' => $index <= $current_index,
		);
	}

	return $steps;
}

function lw_get_request_action_label( $stage ) {
	switch ( lw_normalize_request_workflow_stage( $stage ) ) {
		case 'Submitted':
		case 'Documents Upload':
			return 'Upload Documents';
		case 'Review':
			return 'Await Review';
		case 'Payment':
			return 'Proceed to Payment';
		case 'Processing':
			return 'Processing';
		case 'Confirmation':
			return 'Await Confirmation';
		case 'Completed':
			return 'View Summary';
		default:
			return 'Upload Documents';
	}
}

function lw_get_request_stage_instructions( $stage ) {
	switch ( lw_normalize_request_workflow_stage( $stage ) ) {
		case 'Submitted':
			return array(
				'Your request has been received by the LedgerWorx team.',
				'Upload the required documents to move the request forward.',
				'We will notify you as soon as the review begins.',
			);
		case 'Documents Upload':
			return array(
				'Please upload every required document for this request.',
				'Missing documents will keep the request in the upload stage.',
				'Once all files are in place, the request will move to review.',
			);
		case 'Review':
			return array(
				'Your submitted documents are under review.',
				'We may contact you if any clarification is needed.',
				'Payment will open once the review is complete.',
			);
		case 'Payment':
			return array(
				'Your request is approved and ready for payment.',
				'Please complete the payment step to continue processing.',
				'We will notify you once payment is confirmed.',
			);
		case 'Processing':
			return array(
				'Your request is currently being processed by our team.',
				'No additional action is needed from you right now.',
				'We will keep you updated as milestones are completed.',
			);
		case 'Confirmation':
			return array(
				'We are finalizing the request outcome and preparing confirmation.',
				'Please keep an eye on notifications for the final update.',
				'Support can help if you need an immediate status check.',
			);
		case 'Completed':
			return array(
				'This request has been completed successfully.',
				'You can review the request details and final documents anytime.',
				'Contact support if you need any follow-up help.',
			);
		default:
			return array();
	}
}

function lw_get_next_request_workflow_stage( $stage ) {
	$steps        = lw_get_request_workflow_steps();
	$current      = lw_get_request_workflow_index( $stage );
	$next_index   = min( count( $steps ) - 1, $current + 1 );

	return $steps[ $next_index ];
}

function lw_advance_client_request_debug( $request_id, $user_id = null ) {
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
	if ( '' === $request_id ) {
		return new WP_Error(
			'lw_invalid_id',
			'Request ID is required.',
			array( 'status' => 400 )
		);
	}

	$existing_request = null;
	foreach ( lw_get_client_requests( $user_id ) as $request ) {
		$current_id = (string) ( $request['requestId'] ?? $request['id'] ?? '' );
		if ( $current_id === $request_id ) {
			$existing_request = $request;
			break;
		}
	}

	if ( ! is_array( $existing_request ) ) {
		return new WP_Error(
			'lw_not_found',
			'Request not found.',
			array( 'status' => 404 )
		);
	}

	$current_stage = lw_normalize_request_workflow_stage( $existing_request['workflowStage'] ?? $existing_request['status'] ?? '' );

	switch ( $current_stage ) {
		case 'Submitted':
			return new WP_Error(
				'lw_debug_stage_blocked',
				'Submitted moves forward only after the client reaches the document upload step.',
				array( 'status' => 409 )
			);
		case 'Documents Upload':
			return new WP_Error(
				'lw_debug_stage_blocked',
				'Documents Upload moves forward only after the required documents are uploaded by the client.',
				array( 'status' => 409 )
			);
		case 'Payment':
			return new WP_Error(
				'lw_debug_stage_blocked',
				'Payment moves forward only after the client completes the payment handoff step.',
				array( 'status' => 409 )
			);
		case 'Completed':
			return new WP_Error(
				'lw_debug_stage_blocked',
				'This request is already completed.',
				array( 'status' => 409 )
			);
	}

	$next_stage = lw_get_next_request_workflow_stage( $current_stage );

	return lw_update_client_request(
		$request_id,
		array(
			'workflowStage' => $next_stage,
			'status'        => $next_stage,
			'actionBtn'     => lw_get_request_action_label( $next_stage ),
			'instructions'  => lw_get_request_stage_instructions( $next_stage ),
			'updatedAt'     => wp_date( 'c' ),
		),
		$user_id
	);
}

function lw_map_request_to_table_row( $request, $user_id ) {
	$normalized = lw_normalize_client_request( $request );
	if ( ! $normalized ) {
		return array();
	}

	return array(
		'request_uid'             => $normalized['requestId'],
		'user_id'                 => (int) $user_id,
		'requester_email'         => sanitize_email( (string) ( $normalized['requester']['email'] ?? '' ) ),
		'requester_name'          => sanitize_text_field( (string) ( $normalized['requester']['name'] ?? '' ) ),
		'title'                   => sanitize_text_field( (string) $normalized['title'] ),
		'category'                => sanitize_text_field( (string) $normalized['category'] ),
		'amount'                  => sanitize_text_field( (string) $normalized['amount'] ),
		'duration'                => sanitize_text_field( (string) $normalized['duration'] ),
		'overview'                => wp_kses_post( (string) $normalized['overview'] ),
		'notes'                   => wp_kses_post( (string) $normalized['notes'] ),
		'required_documents'      => wp_json_encode( (array) $normalized['requiredDocuments'] ),
		'uploaded_documents'      => wp_json_encode( (array) $normalized['uploadedDocuments'] ),
		'instructions'            => wp_json_encode( (array) $normalized['instructions'] ),
		'status'                  => sanitize_text_field( (string) $normalized['status'] ),
		'workflow_stage'          => sanitize_text_field( (string) $normalized['workflowStage'] ),
		'action_btn'              => sanitize_text_field( (string) $normalized['actionBtn'] ),
		'due_date'                => sanitize_text_field( (string) $normalized['dueDate'] ),
		'submitted_on'            => sanitize_text_field( (string) $normalized['submittedOn'] ),
		'source'                  => sanitize_text_field( (string) $normalized['source'] ),
		'payment_contact_name'    => sanitize_text_field( (string) $normalized['paymentContactName'] ),
		'payment_contact_phone'   => sanitize_text_field( (string) $normalized['paymentContactPhone'] ),
		'payment_whatsapp_link'   => esc_url_raw( (string) $normalized['paymentWhatsappLink'] ),
		'staff_name'              => sanitize_text_field( (string) $normalized['staffName'] ),
		'staff_role'              => sanitize_text_field( (string) $normalized['staffRole'] ),
		'icon'                    => sanitize_text_field( (string) $normalized['icon'] ),
		'icon_color'              => sanitize_text_field( (string) $normalized['iconColor'] ),
		'icon_tone'               => sanitize_text_field( (string) $normalized['iconTone'] ),
		'progress'                => wp_json_encode( (array) $normalized['progress'] ),
		'updated_at'              => current_time( 'mysql' ),
	);
}

function lw_get_client_requests_from_table( $user_id ) {
	global $wpdb;
	$table_name = lw_get_requests_table_name();
	if ( ! lw_table_exists( $table_name ) ) {
		return null;
	}

	$rows = $wpdb->get_results(
		$wpdb->prepare(
			"SELECT * FROM {$table_name} WHERE user_id = %d ORDER BY id DESC LIMIT 200",
			(int) $user_id
		),
		ARRAY_A
	);

	if ( ! is_array( $rows ) ) {
		return array();
	}

	$mapped = array();
	foreach ( $rows as $row ) {
		$normalized = lw_normalize_client_request(
			array(
				'id'                    => (string) ( $row['request_uid'] ?? $row['id'] ?? '' ),
				'request_uid'           => (string) ( $row['request_uid'] ?? '' ),
				'title'                 => $row['title'] ?? '',
				'category'              => $row['category'] ?? '',
				'amount'                => $row['amount'] ?? '',
				'duration'              => $row['duration'] ?? '',
				'overview'              => $row['overview'] ?? '',
				'notes'                 => $row['notes'] ?? '',
				'required_documents'    => $row['required_documents'] ?? '',
				'uploaded_documents'    => $row['uploaded_documents'] ?? '',
				'instructions'          => $row['instructions'] ?? '',
				'status'                => $row['status'] ?? '',
				'workflow_stage'        => $row['workflow_stage'] ?? '',
				'actionBtn'             => $row['action_btn'] ?? '',
				'dueDate'               => $row['due_date'] ?? '',
				'submittedOn'           => $row['submitted_on'] ?? '',
				'source'                => $row['source'] ?? '',
				'payment_contact_name'  => $row['payment_contact_name'] ?? '',
				'payment_contact_phone' => $row['payment_contact_phone'] ?? '',
				'payment_whatsapp_link' => $row['payment_whatsapp_link'] ?? '',
				'staff_name'            => $row['staff_name'] ?? '',
				'staff_role'            => $row['staff_role'] ?? '',
				'icon'                  => $row['icon'] ?? '',
				'iconColor'             => $row['icon_color'] ?? '',
				'iconTone'              => $row['icon_tone'] ?? '',
				'progress'              => $row['progress'] ?? '',
				'createdAt'             => ! empty( $row['created_at'] ) ? mysql2date( 'c', $row['created_at'] ) : wp_date( 'c' ),
				'updatedAt'             => ! empty( $row['updated_at'] ) ? mysql2date( 'c', $row['updated_at'] ) : wp_date( 'c' ),
				'requester_name'        => $row['requester_name'] ?? '',
				'requester_email'       => $row['requester_email'] ?? '',
			)
		);
		if ( $normalized ) {
			$mapped[] = $normalized;
		}
	}

	return $mapped;
}

function lw_get_client_documents_user_meta_key() {
	return 'lw_client_documents';
}

function lw_get_stored_client_documents( $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return array();
	}

	$table_name = lw_get_documents_table_name();
	if ( lw_table_exists( $table_name ) ) {
		global $wpdb;
		$rows = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM {$table_name} WHERE user_id = %d ORDER BY id DESC LIMIT 500",
				(int) $user_id
			),
			ARRAY_A
		);

		if ( ! is_array( $rows ) || ! count( $rows ) ) {
			$raw_meta = get_user_meta( (int) $user_id, lw_get_client_documents_user_meta_key(), true );
			return is_array( $raw_meta ) ? $raw_meta : array();
		}

		return array_map(
			function( $row ) {
				return array(
					'id'           => (int) ( $row['id'] ?? 0 ),
					'requestId'    => (string) ( $row['request_uid'] ?? '' ),
					'documentName' => (string) ( $row['document_name'] ?? '' ),
					'fileName'     => (string) ( $row['file_name'] ?? '' ),
					'filePath'     => (string) ( $row['file_path'] ?? '' ),
					'fileUrl'      => (string) ( $row['file_url'] ?? '' ),
					'syncStatus'   => (string) ( $row['sync_status'] ?? 'pending' ),
					'createdAt'    => ! empty( $row['created_at'] ) ? mysql2date( 'c', $row['created_at'] ) : wp_date( 'c' ),
					'updatedAt'    => ! empty( $row['updated_at'] ) ? mysql2date( 'c', $row['updated_at'] ) : wp_date( 'c' ),
				);
			},
			$rows
		);
	}

	$raw_meta = get_user_meta( (int) $user_id, lw_get_client_documents_user_meta_key(), true );

	if ( ! is_array( $raw_meta ) ) {
		return array();
	}

	return $raw_meta;
}

function lw_save_client_documents( $documents, $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return false;
	}

	if ( ! is_array( $documents ) ) {
		$documents = array();
	}

	$table_name = lw_get_documents_table_name();
	if ( lw_table_exists( $table_name ) ) {
		return true;
	}

	return (bool) update_user_meta(
		(int) $user_id,
		lw_get_client_documents_user_meta_key(),
		$documents
	);
}

function lw_normalize_client_document( $document ) {
	if ( ! is_array( $document ) ) {
		return null;
	}

	$id = isset( $document['id'] ) ? (int) $document['id'] : 0;
	if ( $id <= 0 ) {
		$id = (int) round( microtime( true ) * 1000 );
	}

	$request_id = isset( $document['requestId'] ) ? sanitize_text_field( (string) $document['requestId'] ) : '';
	$document_name = isset( $document['documentName'] ) ? sanitize_text_field( (string) $document['documentName'] ) : '';

	if ( ! $document_name ) {
		return null;
	}

	$created_at = isset( $document['createdAt'] ) ? sanitize_text_field( (string) $document['createdAt'] ) : wp_date( 'c' );
	$updated_at = isset( $document['updatedAt'] ) ? sanitize_text_field( (string) $document['updatedAt'] ) : $created_at;

	return array(
		'id'           => $id,
		'requestId'    => $request_id,
		'documentName' => $document_name,
		'fileName'     => isset( $document['fileName'] ) ? sanitize_file_name( (string) $document['fileName'] ) : '',
		'filePath'     => isset( $document['filePath'] ) ? sanitize_text_field( (string) $document['filePath'] ) : '',
		'fileUrl'      => isset( $document['fileUrl'] ) ? esc_url_raw( (string) $document['fileUrl'] ) : '',
		'syncStatus'   => isset( $document['syncStatus'] ) ? sanitize_text_field( (string) $document['syncStatus'] ) : 'pending',
		'createdAt'    => $created_at,
		'updatedAt'    => $updated_at,
	);
}

function lw_get_client_documents( $user_id = null ) {
	$stored_documents = lw_get_stored_client_documents( $user_id );
	$normalized = array();

	foreach ( $stored_documents as $document ) {
		$doc = lw_normalize_client_document( $document );
		if ( $doc ) {
			$normalized[] = $doc;
		}
	}

	$known_keys = array();
	foreach ( $normalized as $doc ) {
		$key = strtolower( trim( (string) ( $doc['requestId'] ?? '' ) ) ) . '::' . strtolower( trim( (string) ( $doc['documentName'] ?? '' ) ) );
		$known_keys[ $key ] = true;
	}

	foreach ( lw_get_client_requests( $user_id ) as $request ) {
		$request_id = sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) );
		$uploaded   = array_values( array_filter( array_map( 'sanitize_text_field', (array) ( $request['uploadedDocuments'] ?? array() ) ) ) );
		$updated_at = sanitize_text_field( (string) ( $request['updatedAt'] ?? $request['createdAt'] ?? wp_date( 'c' ) ) );

		foreach ( $uploaded as $document_name ) {
			$key = strtolower( trim( $request_id ) ) . '::' . strtolower( trim( $document_name ) );
			if ( isset( $known_keys[ $key ] ) ) {
				continue;
			}

			$doc = lw_normalize_client_document(
				array(
					'id'           => (int) round( microtime( true ) * 1000 ) + count( $normalized ),
					'requestId'    => $request_id,
					'documentName' => $document_name,
					'syncStatus'   => 'pending',
					'createdAt'    => $updated_at,
					'updatedAt'    => $updated_at,
				)
			);

			if ( $doc ) {
				$normalized[]       = $doc;
				$known_keys[ $key ] = true;
			}
		}
	}

	usort(
		$normalized,
		function( $left, $right ) {
			$left_ts = strtotime( (string) ( $left['updatedAt'] ?? $left['createdAt'] ?? '' ) );
			$right_ts = strtotime( (string) ( $right['updatedAt'] ?? $right['createdAt'] ?? '' ) );
			return (int) $right_ts <=> (int) $left_ts;
		}
	);

	return $normalized;
}

function lw_sync_request_uploaded_documents( $request_id, $document_name, $operation = 'add', $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id || ! $request_id || ! $document_name ) {
		return null;
	}

	$existing_request = null;
	foreach ( lw_get_client_requests( $user_id ) as $request ) {
		$current_id = (string) ( $request['requestId'] ?? $request['id'] ?? '' );
		if ( $current_id === (string) $request_id ) {
			$existing_request = $request;
			break;
		}
	}

	if ( ! is_array( $existing_request ) ) {
		return null;
	}

	$uploaded = array_values(
		array_filter(
			array_map(
				'sanitize_text_field',
				(array) ( $existing_request['uploadedDocuments'] ?? array() )
			)
		)
	);

	$normalized_target = sanitize_text_field( (string) $document_name );

	if ( 'remove' === $operation ) {
		$uploaded = array_values(
			array_filter(
				$uploaded,
				function( $item ) use ( $normalized_target ) {
					return strtolower( trim( (string) $item ) ) !== strtolower( trim( $normalized_target ) );
				}
			)
		);
	} elseif ( ! in_array( $normalized_target, $uploaded, true ) ) {
		$uploaded[] = $normalized_target;
	}

	$required = array_values(
		array_filter(
			array_map(
				'sanitize_text_field',
				(array) ( $existing_request['requiredDocuments'] ?? array() )
			)
		)
	);

	$required_lookup = array_map(
		function( $item ) {
			return strtolower( trim( (string) $item ) );
		},
		$required
	);
	$uploaded_lookup = array_map(
		function( $item ) {
			return strtolower( trim( (string) $item ) );
		},
		$uploaded
	);

	$all_required_uploaded = count( $required_lookup ) > 0 && count( array_diff( $required_lookup, $uploaded_lookup ) ) === 0;

	$payload = array(
		'uploadedDocuments' => $uploaded,
		'updatedAt'         => wp_date( 'c' ),
	);

	if ( $all_required_uploaded ) {
		$current_stage = lw_normalize_request_workflow_stage( $existing_request['workflowStage'] ?? $existing_request['status'] ?? '' );
		if ( lw_get_request_workflow_index( $current_stage ) < lw_get_request_workflow_index( 'Review' ) ) {
			$payload['workflowStage'] = 'Review';
			$payload['status']        = 'Review';
			$payload['actionBtn']     = lw_get_request_action_label( 'Review' );
		}
	} else {
		$current_stage = lw_normalize_request_workflow_stage( $existing_request['workflowStage'] ?? $existing_request['status'] ?? '' );
		if ( lw_get_request_workflow_index( $current_stage ) < lw_get_request_workflow_index( 'Payment' ) ) {
			$payload['workflowStage'] = 'Documents Upload';
			$payload['status']        = 'Documents Upload';
			$payload['actionBtn']     = lw_get_request_action_label( 'Documents Upload' );
		}
	}

	return lw_update_client_request( $request_id, $payload, $user_id );
}

function lw_store_uploaded_client_document( $request_id, $document_name, $file, $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return new WP_Error(
			'lw_no_user',
			'You must be logged in to upload a document.',
			array( 'status' => 401 )
		);
	}

	if ( empty( $file['tmp_name'] ) || ! is_uploaded_file( $file['tmp_name'] ) ) {
		return new WP_Error(
			'lw_invalid_file',
			'Please choose a valid file to upload.',
			array( 'status' => 400 )
		);
	}

	$upload_dir = wp_upload_dir();
	if ( ! empty( $upload_dir['error'] ) ) {
		return new WP_Error(
			'lw_upload_dir_error',
			$upload_dir['error'],
			array( 'status' => 500 )
		);
	}

	$request_id = sanitize_text_field( (string) $request_id );
	$request_segment = $request_id ? sanitize_title( $request_id ) : 'general';
	$target_subdir = 'ledgerworx/client-documents/user-' . (int) $user_id . '/' . $request_segment;
	$target_dir = trailingslashit( $upload_dir['basedir'] ) . $target_subdir;
	wp_mkdir_p( $target_dir );

	$original_name = sanitize_file_name( (string) ( $file['name'] ?? 'document' ) );
	$target_name = wp_unique_filename( $target_dir, $original_name );
	$target_path = trailingslashit( $target_dir ) . $target_name;

	if ( ! @move_uploaded_file( $file['tmp_name'], $target_path ) ) {
		return new WP_Error(
			'lw_upload_failed',
			'Unable to save the uploaded file.',
			array( 'status' => 500 )
		);
	}

	$relative_path = $target_subdir . '/' . $target_name;
	$file_url = trailingslashit( $upload_dir['baseurl'] ) . $relative_path;
	$now = wp_date( 'c' );
	$normalized_name = $document_name ? sanitize_text_field( (string) $document_name ) : pathinfo( $original_name, PATHINFO_FILENAME );

	$new_document = lw_normalize_client_document(
		array(
			'id'           => (int) round( microtime( true ) * 1000 ),
			'requestId'    => $request_id,
			'documentName' => $normalized_name,
			'fileName'     => $target_name,
			'filePath'     => $relative_path,
			'fileUrl'      => $file_url,
			'syncStatus'   => 'synced',
			'createdAt'    => $now,
			'updatedAt'    => $now,
		)
	);

	$table_name = lw_get_documents_table_name();
	if ( lw_table_exists( $table_name ) ) {
		global $wpdb;
		$saved = false !== $wpdb->insert(
			$table_name,
			array(
				'user_id'       => (int) $user_id,
				'request_uid'   => $request_id,
				'document_name' => $new_document['documentName'],
				'file_name'     => $new_document['fileName'],
				'file_path'     => $new_document['filePath'],
				'file_url'      => $new_document['fileUrl'],
				'sync_status'   => $new_document['syncStatus'],
				'created_at'    => current_time( 'mysql' ),
				'updated_at'    => current_time( 'mysql' ),
			)
		);
		if ( $saved ) {
			$new_document['id'] = (int) $wpdb->insert_id;
		}
	} else {
		$documents = lw_get_stored_client_documents( $user_id );
		$documents[] = $new_document;
		$saved = lw_save_client_documents( $documents, $user_id );
	}

	if ( ! $saved ) {
		return new WP_Error(
			'lw_save_failed',
			'The file was uploaded, but metadata save failed.',
			array( 'status' => 500 )
		);
	}

	lw_sync_request_uploaded_documents( $request_id, $new_document['documentName'], 'add', $user_id );

	return rest_ensure_response(
		array(
			'uploaded' => true,
			'document' => $new_document,
			'zoho'     => array(
				'synced'   => false,
				'warning'  => 'CRM sync is pending; portal upload is already saved.',
			),
		)
	);
}

function lw_delete_client_document( $document_id, $user_id = null ) {
	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id ) {
		return new WP_Error(
			'lw_no_user',
			'You must be logged in to delete a document.',
			array( 'status' => 401 )
		);
	}

	$document_id = (int) $document_id;
	if ( $document_id <= 0 ) {
		return new WP_Error(
			'lw_invalid_document_id',
			'Document ID is required.',
			array( 'status' => 400 )
		);
	}

	$table_name = lw_get_documents_table_name();
	$deleted = null;
	$updated = array();

	if ( lw_table_exists( $table_name ) ) {
		global $wpdb;
		$row = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT * FROM {$table_name} WHERE id = %d AND user_id = %d LIMIT 1",
				(int) $document_id,
				(int) $user_id
			),
			ARRAY_A
		);

		if ( is_array( $row ) ) {
			$deleted = lw_normalize_client_document(
				array(
					'id'           => (int) $row['id'],
					'requestId'    => (string) ( $row['request_uid'] ?? '' ),
					'documentName' => (string) ( $row['document_name'] ?? '' ),
					'fileName'     => (string) ( $row['file_name'] ?? '' ),
					'filePath'     => (string) ( $row['file_path'] ?? '' ),
					'fileUrl'      => (string) ( $row['file_url'] ?? '' ),
					'syncStatus'   => (string) ( $row['sync_status'] ?? 'pending' ),
					'createdAt'    => ! empty( $row['created_at'] ) ? mysql2date( 'c', $row['created_at'] ) : wp_date( 'c' ),
					'updatedAt'    => ! empty( $row['updated_at'] ) ? mysql2date( 'c', $row['updated_at'] ) : wp_date( 'c' ),
				)
			);
		}
	} else {
		$documents = lw_get_stored_client_documents( $user_id );
		foreach ( $documents as $document ) {
			$normalized = lw_normalize_client_document( $document );
			if ( ! $normalized ) {
				continue;
			}

			if ( (int) $normalized['id'] === $document_id && null === $deleted ) {
				$deleted = $normalized;
				continue;
			}

			$updated[] = $normalized;
		}
	}

	if ( null === $deleted ) {
		return new WP_Error(
			'lw_document_not_found',
			'Document not found.',
			array( 'status' => 404 )
		);
	}

	$upload_dir = wp_upload_dir();
	if ( ! empty( $deleted['filePath'] ) ) {
		$absolute_path = trailingslashit( $upload_dir['basedir'] ) . ltrim( (string) $deleted['filePath'], '/' );
		if ( file_exists( $absolute_path ) ) {
			wp_delete_file( $absolute_path );
		}
	}

	if ( lw_table_exists( $table_name ) ) {
		global $wpdb;
		$deleted_count = $wpdb->delete(
			$table_name,
			array(
				'id'      => (int) $document_id,
				'user_id' => (int) $user_id,
			)
		);
		if ( false === $deleted_count ) {
			return new WP_Error(
				'lw_save_failed',
				'Failed to delete the document. Please try again.',
				array( 'status' => 500 )
			);
		}
	} else {
		$saved = lw_save_client_documents( $updated, $user_id );
		if ( ! $saved ) {
			return new WP_Error(
				'lw_save_failed',
				'Failed to delete the document. Please try again.',
				array( 'status' => 500 )
			);
		}
	}

	lw_sync_request_uploaded_documents( $deleted['requestId'] ?? '', $deleted['documentName'] ?? '', 'remove', $user_id );

	return rest_ensure_response(
		array(
			'deleted' => true,
			'id'      => $document_id,
		)
	);
}

function lw_delete_client_document_reference( $document_id, $request_id = '', $document_name = '', $user_id = null ) {
	$result = lw_delete_client_document( $document_id, $user_id );

	if ( ! is_wp_error( $result ) ) {
		return $result;
	}

	if ( 'lw_document_not_found' !== $result->get_error_code() ) {
		return $result;
	}

	$request_id    = sanitize_text_field( (string) $request_id );
	$document_name = sanitize_text_field( (string) $document_name );

	if ( ! $user_id ) {
		$user_id = get_current_user_id();
	}

	if ( ! $user_id || ! $request_id || ! $document_name ) {
		return $result;
	}

	$documents   = lw_get_stored_client_documents( $user_id );
	$updated     = array();
	$removed_any = false;
	$target_name = strtolower( trim( $document_name ) );

	foreach ( $documents as $document ) {
		$normalized = lw_normalize_client_document( $document );
		if ( ! $normalized ) {
			continue;
		}

		$same_request = strtolower( trim( (string) ( $normalized['requestId'] ?? '' ) ) ) === strtolower( trim( $request_id ) );
		$same_name    = strtolower( trim( (string) ( $normalized['documentName'] ?? '' ) ) ) === $target_name;

		if ( $same_request && $same_name ) {
			$removed_any = true;
			continue;
		}

		$updated[] = $normalized;
	}

	if ( $removed_any ) {
		lw_save_client_documents( $updated, $user_id );
	}

	lw_sync_request_uploaded_documents( $request_id, $document_name, 'remove', $user_id );

	return rest_ensure_response(
		array(
			'deleted'   => true,
			'id'        => (int) $document_id,
			'requestId' => $request_id,
			'fallback'  => true,
		)
	);
}

function lw_parse_client_request_ajax_payload( $payload ) {
	if ( ! is_array( $payload ) ) {
		return array();
	}

	$decoded = array();

	foreach ( $payload as $key => $value ) {
		if ( 'action' === $key || 'requestId' === $key || 'documentId' === $key ) {
			continue;
		}

		if ( ! is_string( $value ) ) {
			$decoded[ $key ] = $value;
			continue;
		}

		$trimmed = trim( $value );
		if ( '' === $trimmed ) {
			$decoded[ $key ] = '';
			continue;
		}

		$json_first_char = substr( $trimmed, 0, 1 );
		if ( in_array( $json_first_char, array( '[', '{', '"' ), true ) ) {
			$parsed = json_decode( wp_unslash( $trimmed ), true );
			if ( JSON_ERROR_NONE === json_last_error() ) {
				$decoded[ $key ] = $parsed;
				continue;
			}
		}

		$decoded[ $key ] = sanitize_text_field( wp_unslash( $trimmed ) );
	}

	return $decoded;
}

function lw_send_client_request_ajax_response( $result ) {
	if ( is_wp_error( $result ) ) {
		wp_send_json(
			array(
				'message' => $result->get_error_message(),
			),
			(int) $result->get_error_data( 'status' ) ?: 400
		);
	}

	if ( is_object( $result ) && method_exists( $result, 'get_data' ) ) {
		wp_send_json( $result->get_data() );
	}

	wp_send_json( $result );
}

function lw_handle_create_client_request_ajax() {
	if ( ! lw_can_access_portal_api() ) {
		wp_send_json( array( 'message' => 'You must be logged in to access the portal API.' ), 401 );
	}

	$result = lw_create_client_request( lw_parse_client_request_ajax_payload( $_POST ) );
	lw_send_client_request_ajax_response( $result );
}

function lw_handle_update_client_request_ajax() {
	if ( ! lw_can_access_portal_api() ) {
		wp_send_json( array( 'message' => 'You must be logged in to access the portal API.' ), 401 );
	}

	$request_id = sanitize_text_field( wp_unslash( $_POST['requestId'] ?? '' ) );
	$result     = lw_update_client_request( $request_id, lw_parse_client_request_ajax_payload( $_POST ) );
	lw_send_client_request_ajax_response( $result );
}

function lw_handle_delete_client_request_ajax() {
	if ( ! lw_can_access_portal_api() ) {
		wp_send_json( array( 'message' => 'You must be logged in to access the portal API.' ), 401 );
	}

	$request_id = sanitize_text_field( wp_unslash( $_POST['requestId'] ?? '' ) );
	$result     = lw_delete_client_request( $request_id );
	lw_send_client_request_ajax_response( $result );
}

function lw_handle_delete_client_document_ajax() {
	if ( ! lw_can_access_portal_api() ) {
		wp_send_json( array( 'message' => 'You must be logged in to access the portal API.' ), 401 );
	}

	$document_id   = (int) ( $_POST['documentId'] ?? 0 );
	$request_id    = sanitize_text_field( wp_unslash( $_POST['requestId'] ?? '' ) );
	$document_name = sanitize_text_field( wp_unslash( $_POST['documentName'] ?? '' ) );
	$result        = lw_delete_client_document_reference( $document_id, $request_id, $document_name );
	lw_send_client_request_ajax_response( $result );
}

function lw_handle_advance_client_request_debug_ajax() {
	if ( ! lw_can_access_portal_api() ) {
		wp_send_json( array( 'message' => 'You must be logged in to access the portal API.' ), 401 );
	}

	$request_id = sanitize_text_field( wp_unslash( $_POST['requestId'] ?? '' ) );
	$result     = lw_advance_client_request_debug( $request_id );
	lw_send_client_request_ajax_response( $result );
}

add_action( 'wp_ajax_lw_create_client_request', 'lw_handle_create_client_request_ajax' );
add_action( 'wp_ajax_lw_update_client_request', 'lw_handle_update_client_request_ajax' );
add_action( 'wp_ajax_lw_delete_client_request', 'lw_handle_delete_client_request_ajax' );
add_action( 'wp_ajax_lw_delete_client_document', 'lw_handle_delete_client_document_ajax' );
add_action( 'wp_ajax_lw_advance_client_request_debug', 'lw_handle_advance_client_request_debug_ajax' );

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

		register_rest_route(
			'lw/v1',
			'/client/requests/(?P<id>[^/]+)/advance-debug',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					$request_id = $request->get_param( 'id' );
					return lw_advance_client_request_debug( $request_id );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/requests/(?P<id>[^/]+)/documents',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					$request_id = $request->get_param( 'id' );
					$document_name = $request->get_param( 'documentName' );
					$file_params = $request->get_file_params();
					$file = $file_params['file'] ?? null;

					if ( ! is_array( $file ) ) {
						return new WP_Error(
							'lw_missing_file',
							'Please choose a file to upload.',
							array( 'status' => 400 )
						);
					}

					return lw_store_uploaded_client_document( $request_id, $document_name, $file );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/documents',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function() {
					$documents = lw_get_client_documents();
					return rest_ensure_response(
						array(
							'documents' => $documents,
							'meta'      => array(
								'count' => count( $documents ),
							),
						)
					);
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/client/documents/(?P<id>\d+)',
			array(
				'methods'             => 'DELETE',
				'permission_callback' => 'lw_rest_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					$document_id = (int) $request->get_param( 'id' );
					return lw_delete_client_document( $document_id );
				},
			)
		);
	}
);
