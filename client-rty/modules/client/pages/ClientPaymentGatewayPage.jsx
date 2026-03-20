import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { clientPaymentGatewayContent, clientPaymentGatewayDefaults } from '../data/paymentGatewayData';
import { usePageStyles } from '../hooks/usePageStyles';
import { buildLegacyUrl } from '../../../utils/legacyLinks';
import clientPaymentGatewayCssUrl from '../styles/clientPaymentGateway.css?url';
import clientBreadcrumbCssUrl from '../styles/clientBreadcrumb.css?url';
import companyLogoPng from '../../../../client-assets/logo.png';
import companyLogoSvg from '../../../../client-assets/logo.svg';

function ClientPaymentGatewayPage() {
    usePageStyles([clientPaymentGatewayCssUrl, clientBreadcrumbCssUrl]);

    const [searchParams] = useSearchParams();
    const {
        packageName: defaultPackageName,
        packagePrice: defaultPackagePrice,
        fullName: defaultFullName,
        email: defaultEmail,
        phone: defaultPhone,
        companyName: defaultCompanyName,
        notes: defaultNotes
    } = clientPaymentGatewayDefaults;

    const packageName = searchParams.get('package_name') || defaultPackageName;
    const packagePrice = searchParams.get('package_price') || defaultPackagePrice;
    const fullName = searchParams.get('full_name') || defaultFullName;
    const email = searchParams.get('email') || defaultEmail;
    const phone = searchParams.get('phone') || defaultPhone;
    const companyName = searchParams.get('company_name') || defaultCompanyName;
    const notes = searchParams.get('notes') || defaultNotes;

    const { title, subtitle, successAlert } = useMemo(() => clientPaymentGatewayContent, []);

    return (
        <main className="gateway">
            <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                <Link to="/client/dashboard">Dashboard</Link>
                <span className="crumb-sep">/</span>
                <a href={buildLegacyUrl('client-payments.php')}>Payments</a>
                <span className="crumb-sep">/</span>
                <span className="current">Payment Gateway</span>
            </nav>
            <header className="gateway-head">
                <img
                    src={companyLogoPng}
                    alt="Ledger Workx logo"
                    className="gateway-logo"
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.src = companyLogoSvg;
                    }}
                />
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </header>
            <section className="gateway-body">
                <div className="row">
                    <span className="label">Package</span>
                    <div className="value">{packageName}</div>
                </div>
                <div className="row">
                    <span className="label">Full Name</span>
                    <div className="value">{fullName}</div>
                </div>
                <div className="row">
                    <span className="label">Email</span>
                    <div className="value">{email}</div>
                </div>
                <div className="row">
                    <span className="label">Phone</span>
                    <div className="value">{phone}</div>
                </div>
                <div className="row">
                    <span className="label">Company</span>
                    <div className="value">{companyName}</div>
                </div>
                <div className="row">
                    <span className="label">Notes</span>
                    <div className="value" style={{ whiteSpace: 'pre-line' }}>
                        {notes}
                    </div>
                </div>
                <div className="paybar">
                    <div>
                        <span className="label">Amount</span>
                        <div className="amount">{packagePrice}</div>
                    </div>
                    <button className="pay-btn" type="button" onClick={() => window.alert(successAlert)}>
                        Pay Securely
                    </button>
                </div>
            </section>
        </main>
    );
}

export default ClientPaymentGatewayPage;
