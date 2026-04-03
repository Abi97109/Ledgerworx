import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dashboardData } from "../../../data/mockData";

const SalesWorkspaceContext = createContext(null);
const SALES_LEADS_STORAGE_KEY = "ledgerworx-sales-leads";
const SALES_CONTACTS_STORAGE_KEY = "ledgerworx-sales-contacts";

function buildInitialLeads() {
  return dashboardData.recentLeads.map((lead) => ({
    company: lead.company || "Website Lead",
    source: lead.source || "Business Setup",
    ...lead
  }));
}

function buildContactFromLead(lead) {
  return {
    id: `contact-${lead.id}`,
    leadId: lead.id,
    name: lead.name,
    accountName: lead.company || "Website Lead",
    email: lead.email,
    phone: lead.phone,
    owner: lead.owner || "John Carter",
    leadSource: lead.source || "Business Setup",
    portalStatus: "Invited",
    proposalStatus: "Proposal Sent",
    requestedItems: [],
    requestTracking: [
      { label: "Request for Service", status: "current" },
      { label: "Documents Upload", status: "pending" },
      { label: "Verification", status: "pending" },
      { label: "Payment", status: "pending" },
      { label: "Processing", status: "pending" },
      { label: "Confirmation", status: "pending" },
      { label: "Service Completion", status: "pending" }
    ],
    documents: [],
    payment: {
      status: "Pending",
      notes: "Payment confirmation should be handled by Accounts or Admin."
    }
  };
}

function readStoredCollection(storageKey, fallbackValue) {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return fallbackValue;
    }

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

export function SalesWorkspaceProvider({ children }) {
  const [leads, setLeads] = useState(() => readStoredCollection(SALES_LEADS_STORAGE_KEY, buildInitialLeads()));
  const [contacts, setContacts] = useState(() => readStoredCollection(SALES_CONTACTS_STORAGE_KEY, []));

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SALES_LEADS_STORAGE_KEY, JSON.stringify(leads));
    }
  }, [leads]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SALES_CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const value = useMemo(
    () => ({
      leads,
      contacts,
      addLead(lead) {
        setLeads((prev) => [lead, ...prev]);
      },
      convertLead(leadId) {
        const matchedLead = leads.find((lead) => lead.id === leadId);
        if (!matchedLead) {
          return null;
        }

        setLeads((prev) => prev.filter((lead) => lead.id !== leadId));

        const contact = buildContactFromLead(matchedLead);
        setContacts((prev) => {
          const exists = prev.some((item) => item.leadId === leadId || item.email === contact.email);
          return exists ? prev : [contact, ...prev];
        });

        return contact;
      },
      getLeadById(leadId) {
        return leads.find((lead) => lead.id === leadId) || null;
      },
      getContactById(contactId) {
        return contacts.find((contact) => contact.id === contactId) || null;
      }
    }),
    [contacts, leads]
  );

  return <SalesWorkspaceContext.Provider value={value}>{children}</SalesWorkspaceContext.Provider>;
}

export function useSalesWorkspace() {
  const context = useContext(SalesWorkspaceContext);
  if (!context) {
    throw new Error("useSalesWorkspace must be used within SalesWorkspaceProvider");
  }
  return context;
}
