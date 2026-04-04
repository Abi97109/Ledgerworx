<?php

function lw_get_user_display_name( $user ) {
	$first_name = get_user_meta( $user->ID, 'first_name', true );
	$last_name  = get_user_meta( $user->ID, 'last_name', true );
	$full_name  = trim( $first_name . ' ' . $last_name );

	if ( $full_name ) {
		return $full_name;
	}

	if ( ! empty( $user->display_name ) ) {
		return $user->display_name;
	}

	return $user->user_login;
}

function lw_get_user_phone( $user_id ) {
	$user = get_userdata( $user_id );

	if ( $user && ! empty( $user->user_email ) ) {
		$zoho_phone = lw_normalize_phone_value( lw_get_zoho_contact_phone( $user->user_email ) );
		if ( $zoho_phone ) {
			return $zoho_phone;
		}
	}

	$candidate_keys = array(
		'phone',
		'billing_phone',
		'mobile',
		'mobile_phone',
		'contact_number',
		'user_phone',
		'user_registration_input_box_1772787029',
	);

	foreach ( $candidate_keys as $key ) {
		$value = lw_normalize_phone_value( get_user_meta( $user_id, $key, true ) );
		if ( $value ) {
			return $value;
		}
	}

	$all_meta = get_user_meta( $user_id );

	foreach ( $all_meta as $key => $values ) {
		if ( stripos( $key, 'phone' ) === false && stripos( $key, 'mobile' ) === false ) {
			continue;
		}

		$value = lw_normalize_phone_value( $values[0] ?? '' );
		if ( $value ) {
			return $value;
		}
	}

	return '';
}

function lw_normalize_phone_value( $value ) {
	$value = trim( (string) $value );

	if ( ! $value ) {
		return '';
	}

	if ( is_email( $value ) ) {
		return '';
	}

	$digits = preg_replace( '/\D+/', '', $value );

	if ( strlen( $digits ) < 7 ) {
		return '';
	}

	return $value;
}

function lw_get_user_company_name( $user_id ) {
	$keys = array(
		'company_name',
		'billing_company',
		'user_registration_company_name',
		'organization_name',
	);

	foreach ( $keys as $key ) {
		$value = get_user_meta( $user_id, $key, true );
		if ( $value ) {
			return $value;
		}
	}

	return '';
}

function lw_get_user_type_label( $user ) {
	$role_labels = array(
		'lw_client'      => 'Client',
		'lw_accountant'  => 'Accountant',
		'lw_salesperson' => 'Salesperson',
		'lw_manager'     => 'Manager',
		'administrator'  => 'Administrator',
	);

	$role = $user->roles[0] ?? '';

	return $role_labels[ $role ] ?? 'User';
}

function lw_get_client_since_label( $user ) {
	if ( empty( $user->user_registered ) ) {
		return '';
	}

	$timestamp = strtotime( $user->user_registered );

	if ( ! $timestamp ) {
		return '';
	}

	return wp_date( 'F j, Y', $timestamp );
}

function lw_build_profile_payload( $user = null ) {
	if ( ! $user ) {
		$user = wp_get_current_user();
	}

	if ( ! $user || empty( $user->ID ) ) {
		return array();
	}

	$roles          = (array) $user->roles;
	$primary_role   = (string) ( $roles[0] ?? '' );
	$role_labels    = array(
		'lw_client'     => 'Client',
		'lw_salesperson'=> 'Sales Executive',
		'lw_accountant' => 'Accountant',
		'lw_manager'    => 'Manager',
		'administrator' => 'Administrator',
	);
	$location_parts = array_filter(
		array(
			get_user_meta( $user->ID, 'billing_city', true ),
			get_user_meta( $user->ID, 'billing_state', true ),
			get_user_meta( $user->ID, 'billing_country', true ),
		)
	);
	$location_label = implode( ', ', $location_parts );

	if ( ! $location_label ) {
		$location_label = (string) get_user_meta( $user->ID, 'location', true );
	}

	return array(
		'id'                  => (int) $user->ID,
		'name'                => lw_get_user_display_name( $user ),
		'username'            => (string) $user->user_login,
		'email'               => $user->user_email,
		'phone'               => lw_get_user_phone( $user->ID ),
		'companyName'         => lw_get_user_company_name( $user->ID ),
		'avatarUrl'           => get_avatar_url( $user->ID, array( 'size' => 96 ) ),
		'status'              => 'Active',
		'clientType'          => lw_get_user_type_label( $user ),
		'userType'            => lw_get_user_type_label( $user ),
		'role'                => (string) ( $role_labels[ $primary_role ] ?? ucfirst( str_replace( array( 'lw_', '_' ), array( '', ' ' ), $primary_role ) ) ),
		'location'            => $location_label,
		'department'          => (string) get_user_meta( $user->ID, 'department', true ),
		'designation'         => (string) get_user_meta( $user->ID, 'designation', true ),
		'employeeId'          => (string) get_user_meta( $user->ID, 'employee_id', true ),
		'joinDate'            => mysql2date( 'F j, Y', $user->user_registered ),
		'clientSince'         => lw_get_client_since_label( $user ),
		'requiresCompanyName' => ! (bool) lw_get_user_company_name( $user->ID ),
	);
}

function lw_get_seed_packages() {
	return array(
		array(
			'id'               => 'basic',
			'key'              => 'basic',
			'name'             => 'Basic Package',
			'title'            => 'BASIC',
			'tagline'          => 'Essential coverage for early-stage operations.',
			'monthlyPrice'     => 'AED 4,500/month',
			'annualPrice'      => 'AED 54,000/year',
			'servicesLimit'    => 'Up to 2 active services',
			'support'          => 'Business hours email support (response within 24 hours)',
			'reports'          => 'Monthly essential report pack',
			'turnaround'       => 'Standard turnaround timelines',
			'onboarding'       => 'One-time onboarding and account setup',
			'includedServices' => array(
				'Business registration guidance',
				'Core bookkeeping assistance',
				'Basic tax compliance reminders',
				'Document checklist support',
			),
			'deliverables'     => array(
				'Monthly summary report',
				'Compliance calendar',
				'Service request tracking access',
			),
			'notIncluded'      => array(
				'Priority queue handling',
				'Dedicated account manager',
				'Advanced MIS analytics',
			),
			'features'         => array(
				'Up to 2 Services',
				'Essential Reports',
				'Basic Support',
			),
		),
		array(
			'id'               => 'pro',
			'key'              => 'pro',
			'name'             => 'Pro Package',
			'title'            => 'PRO',
			'tagline'          => 'Balanced plan for growing teams needing faster support.',
			'monthlyPrice'     => 'AED 7,500/month',
			'annualPrice'      => 'AED 90,000/year',
			'servicesLimit'    => 'Up to 5 active services',
			'support'          => 'Priority email and phone support (same-business-day response)',
			'reports'          => 'Advanced monthly report pack with KPI sections',
			'turnaround'       => 'Accelerated turnaround on standard requests',
			'onboarding'       => 'Onboarding plus process-alignment workshop',
			'includedServices' => array(
				'Everything in Basic',
				'Management reporting and MIS setup',
				'VAT and corporate tax filing support',
				'Contract/document review assistance',
				'Quarterly advisory review call',
			),
			'deliverables'     => array(
				'Advanced MIS report',
				'Quarterly compliance review',
				'Issue escalation handling',
			),
			'notIncluded'      => array(
				'Full retainer strategic board advisory',
				'Dedicated on-site resource',
			),
			'features'         => array(
				'Up to 5 Services',
				'Advanced Reports',
				'Priority Support',
			),
		),
		array(
			'id'               => 'ultimate',
			'key'              => 'ultimate',
			'name'             => 'Ultimate Package',
			'title'            => 'ULTIMATE',
			'tagline'          => 'Comprehensive premium service with strategic advisory.',
			'monthlyPrice'     => 'AED 12,000/month',
			'annualPrice'      => 'AED 144,000/year',
			'servicesLimit'    => 'Up to 8 active services',
			'support'          => 'Dedicated relationship manager and priority SLA support',
			'reports'          => 'Detailed executive reports, dashboards, and recommendations',
			'turnaround'       => 'Fast-track handling across all covered service categories',
			'onboarding'       => 'Full onboarding, governance setup, and roadmap planning',
			'includedServices' => array(
				'Everything in Pro',
				'Virtual CFO oversight and strategic planning',
				'Internal audit and risk advisory support',
				'Board-ready reporting packs',
				'Retainer-based strategy and leadership advisory',
			),
			'deliverables'     => array(
				'Executive monthly dashboard',
				'Quarterly strategy and performance workshop',
				'Governance and risk action tracker',
				'Customized service roadmap',
			),
			'notIncluded'      => array(
				'Out-of-scope legal representation',
				'Government fees paid to external authorities',
			),
			'features'         => array(
				'Comprehensive Premium Services',
				'Up to 8 Services',
				'Detailed Reports',
			),
		),
	);
}

function lw_get_seed_service_categories() {
	return array(
		array(
			'id'        => 'business-setup',
			'key'       => 'business-setup',
			'tag'       => 'Business',
			'title'     => 'Business Setup & Government Services',
			'label'     => 'Business Setup & Government',
			'iconClass' => 'fas fa-building',
			'meta'      => 'End-to-end support for setup, licensing, approvals, and government process handling.',
			'items'     => array(
				array(
					'name'        => 'Company Incorporation',
					'description' => 'Complete support for legal setup, registration workflow, and authority submissions for a new company.',
					'amount'      => 'AED 6,500',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Trade License Issuance',
					'description' => 'Preparation and processing of all required documents for obtaining your initial trade license.',
					'amount'      => 'AED 4,200',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'PRO and Government Liaison Services',
					'description' => 'Dedicated PRO coordination for renewals, attestations, and government-facing formalities.',
					'amount'      => 'AED 3,800',
					'years'       => '1 Year',
				),
			),
		),
		array(
			'id'        => 'accounting-finance',
			'key'       => 'accounting-finance',
			'tag'       => 'Finance',
			'title'     => 'Accounting, Finance & CFO Services',
			'label'     => 'Accounting, Finance & CFO',
			'iconClass' => 'fas fa-chart-line',
			'meta'      => 'Bookkeeping, reporting, and CFO-level guidance for operational and financial clarity.',
			'items'     => array(
				array(
					'name'        => 'Bookkeeping and Accounting Management',
					'description' => 'Monthly bookkeeping, reconciliations, and ledger maintenance for financial accuracy.',
					'amount'      => 'AED 2,400',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Management Reporting and MIS',
					'description' => 'Periodic management reporting packs with KPI tracking and business insights.',
					'amount'      => 'AED 2,100',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Virtual CFO Advisory',
					'description' => 'Strategic financial leadership for planning, controls, and executive decision support.',
					'amount'      => 'AED 8,500',
					'years'       => '1 Year',
				),
			),
		),
		array(
			'id'        => 'taxation-compliance',
			'key'       => 'taxation-compliance',
			'tag'       => 'Compliance',
			'title'     => 'Taxation & Regulatory Compliance',
			'label'     => 'Taxation & Compliance',
			'iconClass' => 'fas fa-file-invoice-dollar',
			'meta'      => 'Tax filing, statutory compliance, and periodic regulatory adherence checks.',
			'items'     => array(
				array(
					'name'        => 'VAT Registration and Return Filing',
					'description' => 'VAT registration, return preparation, and submission support on scheduled timelines.',
					'amount'      => 'AED 1,850',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Corporate Tax Advisory and Filing',
					'description' => 'Tax planning guidance and annual filing preparation aligned with regulatory obligations.',
					'amount'      => 'AED 3,450',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Compliance Health Checks',
					'description' => 'Periodic review of filings and records to identify and fix compliance gaps early.',
					'amount'      => 'AED 1,500',
					'years'       => '1 Year',
				),
			),
		),
		array(
			'id'        => 'audit-risk-governance',
			'key'       => 'audit-risk-governance',
			'tag'       => 'Audit',
			'title'     => 'Audit, Risk & Governance',
			'label'     => 'Audit & Documentation',
			'iconClass' => 'fas fa-clipboard-check',
			'meta'      => 'Audit readiness, risk controls, and governance process enhancement.',
			'items'     => array(
				array(
					'name'        => 'Internal Audit Services',
					'description' => 'Risk-based internal audits to assess control effectiveness and process integrity.',
					'amount'      => 'AED 4,900',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Risk Assessment and Controls',
					'description' => 'Business risk assessment and control design for stronger operational resilience.',
					'amount'      => 'AED 3,100',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Policy and SOP Development',
					'description' => 'Drafting of internal policies and SOPs to standardize processes and controls.',
					'amount'      => 'AED 2,250',
					'years'       => '2 Years',
				),
			),
		),
		array(
			'id'        => 'legal-secretarial',
			'key'       => 'legal-secretarial',
			'tag'       => 'Legal',
			'title'     => 'Legal, Secretarial & Documentation',
			'label'     => 'Legal & Secretarial',
			'iconClass' => 'fas fa-gavel',
			'meta'      => 'Contracts, corporate secretarial actions, and formal business documentation.',
			'items'     => array(
				array(
					'name'        => 'Contract Drafting and Review',
					'description' => 'Preparation and review of commercial contracts to reduce legal and commercial risk.',
					'amount'      => 'AED 2,800',
					'years'       => 'Per Contract (Up to 1 Year Support)',
				),
				array(
					'name'        => 'Corporate Secretarial Compliance',
					'description' => 'End-to-end compliance for statutory registers, annual filings, and corporate records.',
					'amount'      => 'AED 2,450',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Board Resolutions and Minutes',
					'description' => 'Drafting and formatting of resolutions, meeting agendas, and board minutes.',
					'amount'      => 'AED 1,650',
					'years'       => '1 Year',
				),
			),
		),
		array(
			'id'        => 'technology-digital',
			'key'       => 'technology-digital',
			'tag'       => 'Technology',
			'title'     => 'Technology & Digital Enablement',
			'label'     => 'Technology & Digital Enablement',
			'iconClass' => 'fas fa-laptop-code',
			'meta'      => 'System integration and digital process enablement for better efficiency.',
			'items'     => array(
				array(
					'name'        => 'ERP and Accounting System Setup',
					'description' => 'Configuration and deployment of ERP or accounting systems with initial onboarding.',
					'amount'      => 'AED 7,200',
					'years'       => '3 Years',
				),
				array(
					'name'        => 'Workflow Automation',
					'description' => 'Automation of repetitive business processes to improve speed and reduce manual effort.',
					'amount'      => 'AED 4,600',
					'years'       => '2 Years',
				),
				array(
					'name'        => 'Business Intelligence Dashboards',
					'description' => 'Custom dashboard setup for finance and operations performance tracking.',
					'amount'      => 'AED 3,700',
					'years'       => '2 Years',
				),
			),
		),
		array(
			'id'        => 'advisory-strategy-retainer',
			'key'       => 'advisory-strategy-retainer',
			'tag'       => 'Advisory',
			'title'     => 'Advisory, Strategy & Retainer Services',
			'label'     => 'Advisory & Strategy',
			'iconClass' => 'fas fa-lightbulb',
			'meta'      => 'Strategic business advisory and retainer-based expert support.',
			'items'     => array(
				array(
					'name'        => 'Business Growth Strategy Consulting',
					'description' => 'Strategic roadmap support for market growth, profitability, and expansion planning.',
					'amount'      => 'AED 5,900',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Operational Efficiency Advisory',
					'description' => 'Improvement plans for process efficiency, cost reduction, and performance uplift.',
					'amount'      => 'AED 3,850',
					'years'       => '1 Year',
				),
				array(
					'name'        => 'Retainer-Based Advisory Support',
					'description' => 'Ongoing advisory retainer with priority response and monthly executive support.',
					'amount'      => 'AED 4,400',
					'years'       => '1 Year',
				),
			),
		),
	);
}

function lw_get_seed_recent_activity() {
	return array(
		array(
			'id'    => 'invoice-2847',
			'title' => 'Invoice #2847 Generated',
			'meta'  => '2 hours ago',
		),
		array(
			'id'    => 'payment-received',
			'title' => 'Payment Received',
			'meta'  => '1 day ago',
		),
		array(
			'id'    => 'invoice-2821',
			'title' => 'Invoice #2821 Generated',
			'meta'  => '3 days ago',
		),
	);
}

function lw_get_seed_notifications() {
	return array(
		array(
			'id'      => 'monthly-report-approved',
			'title'   => 'Monthly Report Approved',
			'message' => 'Monthly report approved and ready to review.',
		),
		array(
			'id'      => 'id-proof-uploaded',
			'title'   => 'ID Proof Document Uploaded',
			'message' => 'New KYC document uploaded to your account.',
		),
		array(
			'id'      => 'support-message',
			'title'   => 'New message from Sarah',
			'message' => 'Your account manager shared a new update.',
		),
	);
}

function lw_build_package_payload( $package ) {
	$key = sanitize_key( $package['key'] ?? $package['id'] ?? '' );

	return array(
		'id'               => $package['id'] ?? $key,
		'key'              => $key,
		'name'             => $package['name'] ?? '',
		'title'            => $package['title'] ?? '',
		'tagline'          => $package['tagline'] ?? '',
		'monthlyPrice'     => $package['monthlyPrice'] ?? '',
		'annualPrice'      => $package['annualPrice'] ?? '',
		'servicesLimit'    => $package['servicesLimit'] ?? '',
		'support'          => $package['support'] ?? '',
		'reports'          => $package['reports'] ?? '',
		'turnaround'       => $package['turnaround'] ?? '',
		'onboarding'       => $package['onboarding'] ?? '',
		'includedServices' => array_values( $package['includedServices'] ?? array() ),
		'deliverables'     => array_values( $package['deliverables'] ?? array() ),
		'notIncluded'      => array_values( $package['notIncluded'] ?? array() ),
		'features'         => array_values( $package['features'] ?? array() ),
		'duration'         => $package['duration'] ?? '',
		'code'             => $package['code'] ?? '',
		'category'         => $package['category'] ?? '',
		'manufacturer'     => $package['manufacturer'] ?? '',
		'usageUnit'        => $package['usageUnit'] ?? '',
		'taxSummary'       => $package['taxSummary'] ?? '',
		'salesWindow'      => $package['salesWindow'] ?? '',
		'supportWindow'    => $package['supportWindow'] ?? '',
		'qtyInStock'       => $package['qtyInStock'] ?? '',
		'productStatus'    => $package['productStatus'] ?? '',
		'description'      => $package['description'] ?? '',
		'routePath'        => '/client/package?plan=' . rawurlencode( $key ),
	);
}

function lw_clean_catalog_text( $value ) {
	return trim( preg_replace( '/\s+/', ' ', (string) $value ) );
}

function lw_extract_catalog_description_lines( $description ) {
	$lines = array();
	$description = lw_clean_catalog_text( $description );

	if ( ! $description ) {
		return $lines;
	}

	$raw_lines = preg_split( '/\r\n|\r|\n|[;]+/', $description );
	foreach ( (array) $raw_lines as $line ) {
		$clean_line = trim( preg_replace( '/^[\-\*\x{2022}\s]+/u', '', (string) $line ) );
		if ( $clean_line ) {
			$lines[] = $clean_line;
		}
	}

	return array_values( array_unique( $lines ) );
}

function lw_build_zoho_package_catalog_entry( $record ) {
	$id = sanitize_key( (string) ( $record['id'] ?? '' ) );
	$name = trim( (string) ( $record['Product_Name'] ?? $record['Name'] ?? 'Package' ) );
	$unit_price = $record['Unit_Price'] ?? '';
	$price_label = is_numeric( $unit_price ) ? 'AED ' . number_format_i18n( (float) $unit_price, 2 ) : trim( (string) $unit_price );
	$description = trim( (string) ( $record['Description'] ?? '' ) );
	$code = trim( (string) ( $record['Product_Code'] ?? '' ) );
	$category = trim( (string) ( $record['Product_Category'] ?? '' ) );
	$manufacturer = trim( (string) ( $record['Manufacturer'] ?? '' ) );
	$usage_unit = trim( (string) ( $record['Usage_Unit'] ?? '' ) );
	$duration_raw = $record['Duration'] ?? ( $record['Package_Duration'] ?? ( $record['Support_Duration'] ?? '' ) );
	$duration = lw_format_service_duration_label( $duration_raw );
	$sales_start = trim( (string) ( $record['Sales_Start_Date'] ?? '' ) );
	$sales_end = trim( (string) ( $record['Sales_End_Date'] ?? '' ) );
	$support_start = trim( (string) ( $record['Support_Start_Date'] ?? '' ) );
	$support_end = trim( (string) ( $record['Support_Expiry_Date'] ?? '' ) );
	$product_active = $record['Product_Active'] ?? '';
	$product_status = ( '' === $product_active || null === $product_active || true === $product_active || 'true' === strtolower( (string) $product_active ) )
		? 'Active'
		: 'Inactive';
	$tax_summary = '';
	$description_lines = lw_extract_catalog_description_lines( $description );

	if ( ! empty( $record['Tax'] ) && is_array( $record['Tax'] ) ) {
		$parts = array();
		foreach ( $record['Tax'] as $tax_item ) {
			$value = trim( (string) ( $tax_item['value'] ?? '' ) );
			if ( $value ) {
				$parts[] = $value;
			}
		}
		$tax_summary = implode( ', ', array_unique( $parts ) );
	}

	$route_key = sanitize_key( $code ? $code : $id );

	return array(
		'id'               => $id ? $id : sanitize_title( $name ),
		'key'              => $route_key ? $route_key : sanitize_title( $name ),
		'name'             => $name,
		'title'            => $name,
		'tagline'          => $description,
		'monthlyPrice'     => $price_label ? $price_label : 'Price on request',
		'annualPrice'      => '',
		'servicesLimit'    => $category ? $category : '',
		'support'          => trim( $support_start . ( $support_end ? ' - ' . $support_end : '' ) ),
		'reports'          => '',
		'turnaround'       => isset( $record['Qty_in_Stock'] ) ? (string) $record['Qty_in_Stock'] : '',
		'onboarding'       => '',
		'includedServices' => array_slice( $description_lines, 0, 6 ),
		'deliverables'     => array(),
		'notIncluded'      => array(),
		'features'         => array_slice( $description_lines, 0, 4 ),
		'routePath'        => '/client/package?plan=' . rawurlencode( $route_key ? $route_key : sanitize_title( $name ) ),
		'code'             => $code,
		'category'         => $category,
		'duration'         => $duration,
		'manufacturer'     => $manufacturer,
		'usageUnit'        => $usage_unit,
		'taxSummary'       => $tax_summary,
		'salesWindow'      => trim( $sales_start . ( $sales_end ? ' - ' . $sales_end : '' ) ),
		'supportWindow'    => trim( $support_start . ( $support_end ? ' - ' . $support_end : '' ) ),
		'qtyInStock'       => isset( $record['Qty_in_Stock'] ) ? (string) $record['Qty_in_Stock'] : '',
		'productStatus'    => $product_status,
		'description'      => $description,
		'source'           => 'zoho',
	);
}

function lw_build_service_category_payload( $category ) {
	$key = sanitize_key( $category['key'] ?? $category['id'] ?? '' );

	return array(
		'id'        => $category['id'] ?? $key,
		'key'       => $key,
		'tag'       => $category['tag'] ?? '',
		'title'     => $category['title'] ?? '',
		'label'     => $category['label'] ?? '',
		'summary'   => $category['meta'] ?? '',
		'meta'      => $category['meta'] ?? '',
		'iconClass' => $category['iconClass'] ?? 'fas fa-briefcase',
		'routePath' => '/client/sub-services?category=' . rawurlencode( $key ),
		'items'     => array_values( $category['items'] ?? array() ),
	);
}

function lw_format_service_duration_label( $duration_value ) {
	if ( '' === $duration_value || null === $duration_value ) {
		return '';
	}

	if ( ! is_numeric( $duration_value ) ) {
		return trim( (string) $duration_value );
	}

	$total_minutes = (int) round( (float) $duration_value );

	if ( $total_minutes <= 0 ) {
		return '';
	}

	$hours   = intdiv( $total_minutes, 60 );
	$minutes = $total_minutes % 60;
	$parts   = array();

	if ( $hours > 0 ) {
		$parts[] = 1 === $hours ? '1 hr' : $hours . ' hrs';
	}

	if ( $minutes > 0 ) {
		$parts[] = $minutes . ' mins';
	}

	if ( empty( $parts ) ) {
		return $total_minutes . ' mins';
	}

	return implode( ' ', $parts );
}

function lw_pick_service_icon_class( $service_name, $location = '' ) {
	$haystack = strtolower( trim( $service_name . ' ' . $location ) );

	if ( strpos( $haystack, 'visa' ) !== false || strpos( $haystack, 'license' ) !== false ) {
		return 'fas fa-building';
	}

	if ( strpos( $haystack, 'tax' ) !== false || strpos( $haystack, 'vat' ) !== false ) {
		return 'fas fa-file-invoice-dollar';
	}

	if ( strpos( $haystack, 'account' ) !== false || strpos( $haystack, 'finance' ) !== false ) {
		return 'fas fa-chart-line';
	}

	if ( strpos( $haystack, 'legal' ) !== false || strpos( $haystack, 'contract' ) !== false ) {
		return 'fas fa-gavel';
	}

	return 'fas fa-briefcase';
}

function lw_get_service_record_name( $record ) {
	$candidates = array(
		$record['Service_Name'] ?? '',
		$record['Name'] ?? '',
		$record['Service'] ?? '',
	);

	foreach ( $candidates as $candidate ) {
		$value = trim( (string) $candidate );
		if ( $value ) {
			return $value;
		}
	}

	return 'Service';
}

function lw_build_zoho_service_catalog_entry( $record ) {
	$service_name = lw_get_service_record_name( $record );
	$service_id   = (string) ( $record['id'] ?? sanitize_title( $service_name ) );
	$location     = trim( (string) ( $record['Location'] ?? '' ) );
	$duration_raw = $record['Duration'] ?? '';
	$duration     = lw_format_service_duration_label( $duration_raw );
	$description  = trim( (string) ( $record['Description'] ?? '' ) );
	$status       = trim( (string) ( $record['Status'] ?? '' ) );
	$available_from = trim( (string) ( $record['Available_From'] ?? '' ) );
	$available_till = trim( (string) ( $record['Available_Till'] ?? '' ) );
	$price_raw    = $record['Price'] ?? '';
	$price_label  = is_numeric( $price_raw ) ? 'AED ' . number_format_i18n( (float) $price_raw, 2 ) : trim( (string) $price_raw );
	$tax_values   = array();

	if ( ! empty( $record['Tax'] ) && is_array( $record['Tax'] ) ) {
		foreach ( $record['Tax'] as $tax_item ) {
			$tax_label = trim( (string) ( $tax_item['value'] ?? '' ) );
			if ( $tax_label ) {
				$tax_values[] = $tax_label;
			}
		}
	}

	$tax_label = implode( ', ', array_unique( $tax_values ) );
	$summary_bits = array_filter(
		array(
			$duration ? 'Duration: ' . $duration : '',
			$price_label ? 'Price: ' . $price_label : '',
			$location ? 'Location: ' . $location : '',
			$status ? 'Status: ' . $status : '',
		)
	);

	return array(
		'id'        => sanitize_key( $service_id ),
		'key'       => sanitize_key( $service_id ),
		'tag'       => 'Zoho Service',
		'title'     => $service_name,
		'label'     => $service_name,
		'iconClass' => lw_pick_service_icon_class( $service_name, $location ),
		'meta'      => implode( ' | ', $summary_bits ),
		'summary'   => $description ? $description : implode( ' | ', $summary_bits ),
		'location'  => $location,
		'status'    => $status ? $status : 'Available',
		'price'     => $price_label ? $price_label : 'Price on request',
		'duration'  => $duration ? $duration : 'Duration on request',
		'source'    => 'zoho',
		'items'     => array(
			array(
				'name'        => $service_name,
				'description' => $description ? $description : 'Service details will be shared once you request this service.',
				'amount'      => $price_label ? $price_label : 'Price on request',
				'years'       => $duration ? $duration : 'Duration on request',
				'status'      => $status ? $status : 'Available',
				'location'    => $location,
				'tax'         => $tax_label,
				'availableFrom' => $available_from,
				'availableTill' => $available_till,
			),
		),
	);
}

function lw_get_cache_meta( $cache_key, $ttl, $scope = 'global' ) {
	$row = lw_read_cache_row( $cache_key );

	return array(
		'cacheKey'       => $cache_key,
		'scope'          => $scope,
		'ttlSeconds'     => (int) $ttl,
		'refreshedAt'    => $row['refreshed_at'] ?? null,
		'expiresAt'      => $row['expires_at'] ?? null,
		'syncStatus'     => $row['sync_status'] ?? 'fresh',
		'stale'          => $row ? ! lw_is_cache_row_fresh( $row ) : false,
		'sourceRecordId' => $row['source_record_id'] ?? null,
		'error'          => $row['error_message'] ?? null,
	);
}

function lw_fetch_packages_data( $user ) {
	$payload = lw_get_zoho_module_records_payload(
		lw_get_zoho_packages_module_api_name(),
		1,
		200,
		lw_get_zoho_packages_module_fields()
	);
	$zoho_records = array();

	if ( ! empty( $payload['data'] ) && is_array( $payload['data'] ) ) {
		$zoho_records = $payload['data'];
	}

	$packages = array_values( array_filter( array_map( 'lw_build_zoho_package_catalog_entry', $zoho_records ) ) );
	$crm_unavailable = ! count( $packages );

	return array(
		'packages' => $packages,
		'meta'     => array(
			'entity'       => 'catalog_packages',
			'refreshedVia' => 'zoho',
			'userId'       => (int) $user->ID,
			'total'        => count( $packages ),
			'crmUnavailable' => $crm_unavailable,
			'error'          => $crm_unavailable ? 'Package data is temporarily unavailable from Zoho CRM. Please wait or contact support.' : '',
		),
	);
}

function lw_fetch_service_categories_data( $user ) {
	$payload = lw_get_zoho_module_records_payload(
		lw_get_zoho_services_module_api_name(),
		1,
		200,
		lw_get_zoho_services_module_fields()
	);
	$zoho_records = array();

	if ( ! empty( $payload['data'] ) && is_array( $payload['data'] ) ) {
		$zoho_records = $payload['data'];
	}

	$categories = array_values( array_filter( array_map( 'lw_build_zoho_service_catalog_entry', $zoho_records ) ) );
	$crm_unavailable = ! count( $categories );

	return array(
		'categories' => $categories,
		'meta'       => array(
			'entity'       => 'catalog_services',
			'refreshedVia' => 'zoho',
			'userId'       => (int) $user->ID,
			'total'        => count( $categories ),
			'crmUnavailable' => $crm_unavailable,
			'error'          => $crm_unavailable ? 'Service data is temporarily unavailable from Zoho CRM. Please wait or contact support.' : '',
		),
	);
}

function lw_generate_user_dashboard_activity( $user ) {
	$requests = lw_get_client_requests( $user->ID );
	$activity = array();

	if ( ! empty( $requests ) ) {
		$recent_requests = array_slice( $requests, 0, 3 );
		foreach ( $recent_requests as $request ) {
			$activity[] = array(
				'id'    => $request['id'] ?? '',
				'title' => $request['title'] ?? 'Service Request',
				'meta'  => $request['submittedOn'] ?? 'Recently',
			);
		}
	}

	return $activity;
}

function lw_build_client_notification_item( $id, $title, $message, $tag, $date_time = '' ) {
	$date_time = $date_time ? $date_time : wp_date( 'c' );

	return array(
		'id'          => sanitize_key( $id ),
		'title'       => sanitize_text_field( $title ),
		'message'     => sanitize_text_field( $message ),
		'tag'         => sanitize_text_field( $tag ),
		'dateTime'    => $date_time,
		'defaultSeen' => false,
	);
}

function lw_get_catalog_notification_snapshot_option_key( $type ) {
	return 'lw_catalog_snapshot_' . sanitize_key( $type );
}

function lw_get_catalog_notification_events_option_key( $type ) {
	return 'lw_catalog_notifications_' . sanitize_key( $type );
}

function lw_record_catalog_change_notifications( $type, $items ) {
	$type = sanitize_key( $type );
	if ( ! in_array( $type, array( 'packages', 'services' ), true ) ) {
		return;
	}

	$current_snapshot = array();
	foreach ( (array) $items as $item ) {
		$id    = trim( (string) ( $item['id'] ?? $item['key'] ?? '' ) );
		$title = trim( (string) ( $item['name'] ?? $item['title'] ?? $item['label'] ?? '' ) );
		if ( '' === $id || '' === $title ) {
			continue;
		}

		$current_snapshot[ $id ] = $title;
	}

	if ( empty( $current_snapshot ) ) {
		return;
	}

	$snapshot_key = lw_get_catalog_notification_snapshot_option_key( $type );
	$events_key   = lw_get_catalog_notification_events_option_key( $type );
	$previous     = get_option( $snapshot_key, null );

	if ( ! is_array( $previous ) ) {
		update_option( $snapshot_key, $current_snapshot, false );
		return;
	}

	$new_ids = array_diff( array_keys( $current_snapshot ), array_keys( $previous ) );
	if ( empty( $new_ids ) ) {
		update_option( $snapshot_key, $current_snapshot, false );
		return;
	}

	$existing_events = get_option( $events_key, array() );
	if ( ! is_array( $existing_events ) ) {
		$existing_events = array();
	}

	$label = 'packages' === $type ? 'Package' : 'Service';
	$tag   = 'packages' === $type ? 'Packages' : 'Services';
	$time  = wp_date( 'c' );

	foreach ( $new_ids as $new_id ) {
		$title = $current_snapshot[ $new_id ] ?? '';
		if ( '' === $title ) {
			continue;
		}

		array_unshift(
			$existing_events,
			lw_build_client_notification_item(
				$type . '-added-' . $new_id,
				'New ' . $label . ' Added',
				$title . ' is now available in the client portal catalog.',
				$tag,
				$time
			)
		);
	}

	update_option( $events_key, array_slice( $existing_events, 0, 25 ), false );
	update_option( $snapshot_key, $current_snapshot, false );
}

function lw_get_catalog_change_notifications() {
	$notifications = array_merge(
		(array) get_option( lw_get_catalog_notification_events_option_key( 'packages' ), array() ),
		(array) get_option( lw_get_catalog_notification_events_option_key( 'services' ), array() )
	);

	usort(
		$notifications,
		function( $left, $right ) {
			return strtotime( (string) ( $right['dateTime'] ?? '' ) ) <=> strtotime( (string) ( $left['dateTime'] ?? '' ) );
		}
	);

	return array_values( $notifications );
}

function lw_get_request_stage_notifications( $requests ) {
	$notifications = array();

	foreach ( array_slice( (array) $requests, 0, 12 ) as $request ) {
		$request_id = (string) ( $request['requestId'] ?? $request['id'] ?? '' );
		$title      = trim( (string) ( $request['title'] ?? 'Your request' ) );
		$stage      = lw_normalize_request_workflow_stage( $request['workflowStage'] ?? $request['status'] ?? 'Submitted' );
		$updated_at = trim( (string) ( $request['updatedAt'] ?? $request['createdAt'] ?? wp_date( 'c' ) ) );

		switch ( $stage ) {
			case 'Documents Upload':
				$message = $title . ' is waiting for document upload.';
				break;
			case 'Review':
				$message = $title . ' is under review now.';
				break;
			case 'Payment':
				$message = $title . ' is ready for payment.';
				break;
			case 'Processing':
				$message = $title . ' is currently being processed.';
				break;
			case 'Confirmation':
				$message = $title . ' is in confirmation stage.';
				break;
			case 'Completed':
				$message = $title . ' has been completed.';
				break;
			default:
				$message = $title . ' has been submitted successfully.';
				break;
		}

		$notifications[] = lw_build_client_notification_item(
			'request-' . sanitize_key( $request_id ) . '-' . sanitize_key( strtolower( $stage ) ),
			'Request Update',
			$message,
			'Requests',
			$updated_at
		);
	}

	return $notifications;
}

function lw_get_client_notifications_payload( $user ) {
	$requests       = lw_get_client_requests( $user->ID );
	$notifications  = array_merge(
		lw_get_request_stage_notifications( $requests ),
		lw_get_catalog_change_notifications()
	);

	usort(
		$notifications,
		function( $left, $right ) {
			return strtotime( (string) ( $right['dateTime'] ?? '' ) ) <=> strtotime( (string) ( $left['dateTime'] ?? '' ) );
		}
	);

	return array(
		'notifications' => array_values( $notifications ),
		'meta'          => array(
			'count'  => count( $notifications ),
			'userId' => (int) $user->ID,
			'source' => 'backend',
		),
	);
}

function lw_generate_user_dashboard_notifications( $user ) {
	$payload = lw_get_client_notifications_payload( $user );
	return array_slice( (array) ( $payload['notifications'] ?? array() ), 0, 5 );
}

function lw_fetch_dashboard_data( $user ) {
	$profile    = lw_build_profile_payload( $user );
	$packages   = lw_get_cached_packages_payload( $user );
	$categories = lw_get_cached_services_payload( $user );
	$package_rows = ! empty( $packages['packages'] ) && is_array( $packages['packages'] ) ? $packages['packages'] : array();
	$service_rows = ! empty( $categories['categories'] ) && is_array( $categories['categories'] ) ? $categories['categories'] : array();
	$service_count = count( $service_rows );
	$requests = lw_get_client_requests( $user->ID );

	$invoices_count = 0;
	$invoice_meta   = array();

	try {
		$invoices_payload = lw_get_cached_client_invoices_payload( $user );
		$invoices         = is_array( $invoices_payload['invoices'] ?? null ) ? $invoices_payload['invoices'] : array();
		$invoices_count   = count( $invoices );
		$invoice_meta     = is_array( $invoices_payload['meta'] ?? null ) ? $invoices_payload['meta'] : array();
	} catch ( Throwable $exception ) {
		if ( function_exists( 'error_log' ) ) {
			error_log( 'LedgerWorx dashboard invoice fallback: ' . $exception->getMessage() );
		}

		$invoice_meta = array(
			'invoiceFallback' => true,
			'invoiceError'    => 'Invoice sync temporarily unavailable.',
		);
	}

	$payment_due = 0.0;
	foreach ( $requests as $request ) {
		$stage = strtolower( trim( (string) ( $request['workflowStage'] ?? $request['status'] ?? '' ) ) );
		if ( false === strpos( $stage, 'payment' ) || false !== strpos( $stage, 'awaiting payment confirmation' ) ) {
			continue;
		}

		$amount_text = (string) ( $request['amount'] ?? '' );
		$numeric = preg_replace( '/[^0-9.\-]/', '', $amount_text );
		$value = (float) $numeric;
		if ( $value > 0 ) {
			$payment_due += $value;
		}
	}

	return array(
		'profile'        => $profile,
		'stats'          => array(
			'activeServicesCount' => $service_count,
			'invoicesCount'       => $invoices_count,
		),
		'payments'       => array(
			'dueNow' => round( $payment_due, 2 ),
		),
		'packages'       => $package_rows,
		'services'       => array_slice( $service_rows, 0, 5 ),
		'recentActivity' => lw_generate_user_dashboard_activity( $user ),
		'notifications'  => lw_generate_user_dashboard_notifications( $user ),
		'meta'           => array(
			'entity'       => 'dashboard',
			'refreshedVia' => 'user-specific',
			'userId'       => (int) $user->ID,
			'note'         => 'Dashboard stats are derived from live requests and invoice sync payloads.',
			'invoices'     => $invoice_meta,
			'catalog'      => array(
				'packages' => $packages['meta'] ?? array(),
				'services' => $categories['meta'] ?? array(),
			),
			'crmUnavailable' => ! count( $package_rows ) || ! count( $service_rows ),
			'crmMessage'     => ( ! count( $package_rows ) || ! count( $service_rows ) ) ? 'Live catalog data from Zoho CRM is temporarily unavailable. Please wait or contact client support.' : '',
		),
	);
}

function lw_get_cached_packages_payload( $user ) {
	$cache_key = 'catalog_packages_v3';
	$cached    = lw_cache_remember(
		$cache_key,
		LW_PORTAL_CACHE_CATALOG_TTL,
		function() use ( $user ) {
			return lw_fetch_packages_data( $user );
		}
	);

	$payload = is_array( $cached['data'] ?? null ) ? $cached['data'] : array();

	$payload['meta'] = array_merge(
		$payload['meta'] ?? array(),
		$cached['meta'] ?? array(),
		lw_get_cache_meta( $cache_key, LW_PORTAL_CACHE_CATALOG_TTL )
	);

	lw_record_catalog_change_notifications( 'packages', $payload['packages'] ?? array() );

	return $payload;
}

function lw_get_cached_services_payload( $user ) {
	$cache_key = 'catalog_services_v3';
	$cached    = lw_cache_remember(
		$cache_key,
		LW_PORTAL_CACHE_CATALOG_TTL,
		function() use ( $user ) {
			return lw_fetch_service_categories_data( $user );
		}
	);

	$payload = is_array( $cached['data'] ?? null ) ? $cached['data'] : array();

	$payload['meta'] = array_merge(
		$payload['meta'] ?? array(),
		$cached['meta'] ?? array(),
		lw_get_cache_meta( $cache_key, LW_PORTAL_CACHE_CATALOG_TTL )
	);

	lw_record_catalog_change_notifications( 'services', $payload['categories'] ?? array() );

	return $payload;
}

function lw_get_cached_dashboard_payload( $user ) {
	$cache_key = 'dashboard_user_v5_' . (int) $user->ID;
	$cached    = lw_cache_remember(
		$cache_key,
		LW_PORTAL_CACHE_OPERATIONAL_TTL,
		function() use ( $user ) {
			return lw_fetch_dashboard_data( $user );
		},
		'user:' . (int) $user->ID
	);

	$payload = is_array( $cached['data'] ?? null ) ? $cached['data'] : array();

	$payload['meta'] = array_merge(
		$payload['meta'] ?? array(),
		$cached['meta'] ?? array(),
		lw_get_cache_meta( $cache_key, LW_PORTAL_CACHE_OPERATIONAL_TTL, 'user:' . (int) $user->ID )
	);

	return $payload;
}
