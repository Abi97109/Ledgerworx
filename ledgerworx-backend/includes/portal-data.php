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

	return array(
		'id'          => (int) $user->ID,
		'name'        => lw_get_user_display_name( $user ),
		'email'       => $user->user_email,
		'phone'       => lw_get_user_phone( $user->ID ),
		'companyName' => lw_get_user_company_name( $user->ID ),
		'avatarUrl'   => get_avatar_url( $user->ID, array( 'size' => 96 ) ),
		'status'      => 'Active',
		'clientType'  => lw_get_user_type_label( $user ),
		'userType'    => lw_get_user_type_label( $user ),
		'clientSince' => lw_get_client_since_label( $user ),
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
		'routePath'        => '/client/package?plan=' . rawurlencode( $key ),
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
		'location'  => $location,
		'status'    => $status ? $status : 'Available',
		'price'     => $price_label ? $price_label : 'Price on request',
		'duration'  => $duration ? $duration : 'Duration on request',
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
	$packages = array_map( 'lw_build_package_payload', lw_get_seed_packages() );

	return array(
		'packages' => $packages,
		'meta'     => array(
			'entity'       => 'catalog_packages',
			'refreshedVia' => 'seed',
			'userId'       => (int) $user->ID,
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

	$categories = array_map( 'lw_build_zoho_service_catalog_entry', $zoho_records );

	return array(
		'categories' => $categories,
		'meta'       => array(
			'entity'       => 'catalog_services',
			'refreshedVia' => 'zoho',
			'userId'       => (int) $user->ID,
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

function lw_generate_user_dashboard_notifications( $user ) {
	$requests = lw_get_client_requests( $user->ID );
	$notifications = array();

	if ( ! empty( $requests ) ) {
		$in_progress_count = 0;
		foreach ( $requests as $request ) {
			if ( 'In Progress' === ( $request['status'] ?? '' ) ) {
				$in_progress_count++;
			}
		}

		if ( $in_progress_count > 0 ) {
			$notifications[] = array(
				'id'      => 'requests-in-progress',
				'title'   => 'Requests In Progress',
				'message' => sprintf( 'You have %d service request(s) currently being processed.', $in_progress_count ),
			);
		}

		if ( count( $requests ) > 0 ) {
			$latest_request = $requests[0];
			$notifications[] = array(
				'id'      => 'latest-request-update',
				'title'   => 'Latest Request Update',
				'message' => 'Status update: ' . ( $latest_request['title'] ?? 'Your request' ) . ' is ' . ( $latest_request['status'] ?? 'pending' ) . '.',
			);
		}
	}

	return $notifications;
}

function lw_fetch_dashboard_data( $user ) {
	$profile    = lw_build_profile_payload( $user );
	$packages   = lw_fetch_packages_data( $user );
	$categories = lw_fetch_service_categories_data( $user );
	$service_count = ! empty( $categories['categories'] ) && is_array( $categories['categories'] ) ? count( $categories['categories'] ) : 0;

	/**
	 * Dashboard stats are primarily generated from available data.
	 * - activeServicesCount: Dynamic from Zoho services or portfolio
	 * - invoicesCount: Defaults to 0 if no Zoho/billing integration (graceful degradation)
	 * - dueNow: Defaults to 0 if no Zoho/billing integration (graceful degradation)
	 *
	 * NOTE: Future enhancement - integrate with actual invoice/payment backend when available.
	 */
	$invoices_count = 0;
	$payment_due = 0;

	return array(
		'profile'        => $profile,
		'stats'          => array(
			'activeServicesCount' => $service_count,
			'invoicesCount'       => $invoices_count,
		),
		'payments'       => array(
			'dueNow' => $payment_due,
		),
		'packages'       => $packages['packages'],
		'services'       => array_slice( $categories['categories'], 0, 6 ),
		'recentActivity' => lw_generate_user_dashboard_activity( $user ),
		'notifications'  => lw_generate_user_dashboard_notifications( $user ),
		'meta'           => array(
			'entity'       => 'dashboard',
			'refreshedVia' => 'user-specific',
			'userId'       => (int) $user->ID,
			'note'         => 'Invoice and payment data awaiting Zoho integration or alternative backend setup',
		),
	);
}

function lw_get_cached_packages_payload( $user ) {
	$cache_key = 'catalog_packages';
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

	return $payload;
}

function lw_get_cached_services_payload( $user ) {
	$cache_key = 'catalog_services_v2';
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

	return $payload;
}

function lw_get_cached_dashboard_payload( $user ) {
	$cache_key = 'dashboard_user_v2_' . (int) $user->ID;
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
