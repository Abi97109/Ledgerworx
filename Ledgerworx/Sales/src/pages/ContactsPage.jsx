import { Link } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import { useSalesWorkspace } from "../modules/sales/context/SalesWorkspaceProvider";
import { buildSalesContactDetailRoute } from "../modules/sales/utils/routePaths";

export default function ContactsPage() {
  const { contacts } = useSalesWorkspace();

  return (
    <SalesLayout pageClass="sales-page--contacts">
      <div className="container">
        <div className="lw-page-header">
          <h1>Contacts</h1>
          <p>Converted leads appear here once the salesperson moves them into the client pipeline.</p>
        </div>

        <div className="leads-toolbar-card">
          <div className="leads-toolbar-top">
            <div className="leads-view-chip">All Contacts</div>
            <button type="button" className="leads-toolbar-more" aria-label="More contact views">
              ...
            </button>
          </div>
        </div>

        <div className="table-card leads-table-card">
          <table className="leads-crm-table">
            <thead>
              <tr>
                <th>Contact Name</th>
                <th>Account Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Contact Owner</th>
                <th>Lead Source</th>
                <th className="leads-settings-cell">...</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length ? (
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>
                      <Link className="leads-name-link" to={buildSalesContactDetailRoute(contact.id)}>
                        {contact.name}
                      </Link>
                    </td>
                    <td>{contact.accountName}</td>
                    <td className="leads-email-cell">{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.owner}</td>
                    <td>{contact.leadSource}</td>
                    <td className="leads-settings-cell">...</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="crm-empty-cell">
                    No converted contacts yet. Convert a lead to client to see it here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SalesLayout>
  );
}
