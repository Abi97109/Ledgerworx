<?php

function lw_rest_admin_permissions_check() {
	$user = wp_get_current_user();

	if ( ! $user || empty( $user->ID ) ) {
		return new WP_Error(
			'lw_forbidden',
			'You must be logged in to access admin portal data.',
			array( 'status' => 401 )
		);
	}

	if ( in_array( 'administrator', (array) $user->roles, true ) ) {
		return true;
	}

	return new WP_Error(
		'lw_forbidden',
		'You do not have permission to access admin portal data.',
		array( 'status' => 403 )
	);
}

function lw_get_admin_role_label( $role ) {
	$map = array(
		'lw_client'      => 'Client',
		'lw_salesperson' => 'Salesperson',
		'lw_accountant'  => 'Accountant',
		'lw_manager'     => 'Manager',
		'administrator'  => 'Admin',
	);

	return $map[ (string) $role ] ?? ucfirst( str_replace( array( 'lw_', '_' ), array( '', ' ' ), (string) $role ) );
}

function lw_get_admin_department_label( $role ) {
	$map = array(
		'lw_client'      => 'Client',
		'lw_salesperson' => 'Sales',
		'lw_accountant'  => 'Accounts',
		'lw_manager'     => 'Management',
		'administrator'  => 'Admin',
	);

	return $map[ (string) $role ] ?? 'General';
}

function lw_build_admin_user_row( $user ) {
	if ( ! ( $user instanceof WP_User ) ) {
		return null;
	}

	$primary_role = (string) ( $user->roles[0] ?? '' );
	$role_label   = lw_get_admin_role_label( $primary_role );

	return array(
		'id'          => (int) $user->ID,
		'fullName'    => lw_get_user_display_name( $user ),
		'email'       => sanitize_email( (string) $user->user_email ),
		'phone'       => lw_get_user_phone( $user->ID ),
		'department'  => (string) get_user_meta( $user->ID, 'department', true ) ?: lw_get_admin_department_label( $primary_role ),
		'designation' => (string) get_user_meta( $user->ID, 'designation', true ) ?: $role_label,
		'status'      => 'Active',
		'role'        => $role_label,
		'roleClass'   => 'Admin' === $role_label ? 'admin-role' : strtolower( preg_replace( '/\s+/', '', $role_label ) ),
		'lastOnline'  => ! empty( $user->user_registered ) ? mysql2date( 'Y-m-d', $user->user_registered ) : '--',
		'employeeId'  => (string) get_user_meta( $user->ID, 'employee_id', true ) ?: 'EMP-' . str_pad( (string) $user->ID, 3, '0', STR_PAD_LEFT ),
		'username'    => (string) $user->user_login,
		'joiningDate' => ! empty( $user->user_registered ) ? mysql2date( 'Y-m-d', $user->user_registered ) : '',
	);
}

function lw_get_admin_users_payload() {
	$users = get_users(
		array(
			'orderby' => 'registered',
			'order'   => 'DESC',
		)
	);

	$rows = array_values( array_filter( array_map( 'lw_build_admin_user_row', $users ) ) );

	return rest_ensure_response(
		array(
			'users' => $rows,
			'meta'  => array(
				'count'  => count( $rows ),
				'source' => 'backend',
			),
		)
	);
}

function lw_get_admin_payments_payload() {
	$rows = array();

	foreach ( lw_get_accountant_client_users() as $user ) {
		$requests = lw_get_client_requests( $user->ID );
		foreach ( (array) $requests as $request ) {
			$stage = lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? '' );
			if ( ! in_array( $stage, array( 'Payment', 'Processing', 'Confirmation', 'Completed' ), true ) ) {
				continue;
			}

			$request_id = sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) );
			$rows[] = array(
				'id'         => $request_id,
				'customer'   => lw_get_user_display_name( $user ),
				'type'       => 'Invoice',
				'date'       => sanitize_text_field( (string) ( $request['submittedOn'] ?? '' ) ),
				'status'     => $stage,
				'invoiceId'  => $request_id,
				'dueDate'    => sanitize_text_field( (string) ( $request['dueDate'] ?? '' ) ),
				'entryDate'  => sanitize_text_field( (string) ( $request['submittedOn'] ?? '' ) ),
				'itemLabel'  => sanitize_text_field( (string) ( $request['title'] ?? '' ) ),
				'itemAmount' => sanitize_text_field( (string) ( $request['amount'] ?? 'AED 0.00' ) ),
				'discount'   => 'AED 0.00',
				'tax'        => '0',
				'adjustment' => 'AED 0.00',
				'total'      => sanitize_text_field( (string) ( $request['amount'] ?? 'AED 0.00' ) ),
				'assignedTo' => 'Admin',
				'requestId'  => $request_id,
				'stage'      => $stage,
			);
		}
	}

	return rest_ensure_response(
		array(
			'payments' => $rows,
			'meta'     => array(
				'count'  => count( $rows ),
				'source' => 'backend',
			),
		)
	);
}

function lw_admin_advance_internal_request_stage( $request_id ) {
	$request_id = sanitize_text_field( (string) $request_id );
	if ( '' === $request_id ) {
		return new WP_Error( 'lw_invalid_request_id', 'Request ID is required.', array( 'status' => 400 ) );
	}

	foreach ( lw_get_accountant_client_users() as $user ) {
		$requests = lw_get_client_requests( $user->ID );
		foreach ( $requests as $request ) {
			$current_id = sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) );
			if ( $current_id !== $request_id ) {
				continue;
			}

			$current_stage = lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? '' );
			if ( 'Processing' === $current_stage ) {
				return lw_update_client_request(
					$request_id,
					array(
						'workflowStage' => 'Confirmation',
						'status'        => 'Confirmation',
						'actionBtn'     => lw_get_request_action_label( 'Confirmation' ),
						'updatedAt'     => wp_date( 'c' ),
					),
					$user->ID
				);
			}

			if ( 'Confirmation' === $current_stage ) {
				return lw_update_client_request(
					$request_id,
					array(
						'workflowStage' => 'Completed',
						'status'        => 'Completed',
						'actionBtn'     => lw_get_request_action_label( 'Completed' ),
						'updatedAt'     => wp_date( 'c' ),
					),
					$user->ID
				);
			}

			return new WP_Error(
				'lw_invalid_stage_transition',
				'Only requests in Processing or Confirmation can be advanced here.',
				array( 'status' => 409 )
			);
		}
	}

	return new WP_Error( 'lw_not_found', 'Request not found.', array( 'status' => 404 ) );
}

function lw_admin_approve_payment( $request_id ) {
	$request_id = sanitize_text_field( (string) $request_id );
	if ( '' === $request_id ) {
		return new WP_Error( 'lw_invalid_request_id', 'Request ID is required.', array( 'status' => 400 ) );
	}

	foreach ( lw_get_accountant_client_users() as $user ) {
		$requests = lw_get_client_requests( $user->ID );
		foreach ( $requests as $request ) {
			$current_id = sanitize_text_field( (string) ( $request['requestId'] ?? $request['id'] ?? '' ) );
			if ( $current_id !== $request_id ) {
				continue;
			}

			$current_stage = lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? '' );
			if ( 'Payment' !== $current_stage ) {
				return new WP_Error(
					'lw_invalid_stage_transition',
					'Only requests in Payment can be approved by Admin.',
					array( 'status' => 409 )
				);
			}

			return lw_update_client_request(
				$request_id,
				array(
					'workflowStage' => 'Processing',
					'status'        => 'Processing',
					'actionBtn'     => lw_get_request_action_label( 'Processing' ),
					'updatedAt'     => wp_date( 'c' ),
				),
				$user->ID
			);
		}
	}

	return new WP_Error( 'lw_not_found', 'Request not found.', array( 'status' => 404 ) );
}

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'lw/v1',
			'/admin/users',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_admin_permissions_check',
				'callback'            => 'lw_get_admin_users_payload',
			)
		);

		register_rest_route(
			'lw/v1',
			'/admin/payments',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'lw_rest_admin_permissions_check',
				'callback'            => 'lw_get_admin_payments_payload',
			)
		);

		register_rest_route(
			'lw/v1',
			'/admin/requests/(?P<id>[^/]+)/approve-payment',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_admin_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_admin_approve_payment( $request->get_param( 'id' ) );
				},
			)
		);

		register_rest_route(
			'lw/v1',
			'/admin/requests/(?P<id>[^/]+)/advance-stage',
			array(
				'methods'             => 'POST',
				'permission_callback' => 'lw_rest_admin_permissions_check',
				'callback'            => function( WP_REST_Request $request ) {
					return lw_admin_advance_internal_request_stage( $request->get_param( 'id' ) );
				},
			)
		);
	}
);
