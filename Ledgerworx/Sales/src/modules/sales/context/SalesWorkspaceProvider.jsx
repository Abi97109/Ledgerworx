import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  convertSalesLead,
  createSalesLead,
  deleteSalesLead,
  fetchSalesContacts,
  fetchSalesLeads
} from "../api/salesPortalApi";

const SalesWorkspaceContext = createContext(null);
const SALES_WORKSPACE_CACHE_KEY = "ledgerworx-sales-workspace-cache";

function shouldAutoloadWorkspace() {
  if (typeof window === "undefined") {
    return true;
  }

  const pathname = String(window.location.pathname || "");
  return !/\/sales\/contacts\/[^/]+\/?$/.test(pathname);
}

function buildDefaultRequestTracking() {
  return [
    { label: "Request for Service", status: "pending" },
    { label: "Documents Upload", status: "pending" },
    { label: "Verification", status: "pending" },
    { label: "Payment", status: "pending" },
    { label: "Processing", status: "pending" },
    { label: "Confirmation", status: "pending" },
    { label: "Service Completion", status: "pending" }
  ];
}

function normalizeContact(contact) {
  return {
    requestedItems: [],
    requestTracking: buildDefaultRequestTracking(),
    documents: [],
    payment: {
      status: "Pending",
      notes: "Payment confirmation will be handled later in the workflow."
    },
    portalStatus: "Invited",
    ...contact
  };
}

function readSalesWorkspaceCache() {
  if (typeof window === "undefined") {
    return { leads: [], contacts: [] };
  }

  try {
    const raw = window.localStorage.getItem(SALES_WORKSPACE_CACHE_KEY);
    if (!raw) {
      return { leads: [], contacts: [] };
    }

    const parsed = JSON.parse(raw);
    return {
      leads: Array.isArray(parsed?.leads) ? parsed.leads : [],
      contacts: Array.isArray(parsed?.contacts) ? parsed.contacts.map(normalizeContact) : []
    };
  } catch {
    return { leads: [], contacts: [] };
  }
}

function saveSalesWorkspaceCache(leads, contacts) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      SALES_WORKSPACE_CACHE_KEY,
      JSON.stringify({
        leads: Array.isArray(leads) ? leads : [],
        contacts: Array.isArray(contacts) ? contacts : []
      })
    );
  } catch {
    // no-op
  }
}

export function SalesWorkspaceProvider({ children }) {
  const cachedWorkspace = useMemo(() => readSalesWorkspaceCache(), []);
  const [leads, setLeads] = useState(cachedWorkspace.leads);
  const [contacts, setContacts] = useState(cachedWorkspace.contacts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const leadsRef = useRef(cachedWorkspace.leads);
  const contactsRef = useRef(cachedWorkspace.contacts);

  useEffect(() => {
    leadsRef.current = leads;
  }, [leads]);

  useEffect(() => {
    contactsRef.current = contacts;
  }, [contacts]);

  const loadWorkspace = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const [leadsResult, contactsResult] = await Promise.allSettled([
      fetchSalesLeads(),
      fetchSalesContacts()
    ]);

    let nextLeads = leadsRef.current;
    let nextContacts = contactsRef.current;
    let nextError = "";

    if (leadsResult.status === "fulfilled") {
      nextLeads = Array.isArray(leadsResult.value?.leads) ? leadsResult.value.leads : [];
      setLeads(nextLeads);
    } else {
      nextError = leadsResult.reason?.message || "Unable to load live leads from Zoho CRM.";
    }

    if (contactsResult.status === "fulfilled") {
      nextContacts = Array.isArray(contactsResult.value?.contacts)
        ? contactsResult.value.contacts.map(normalizeContact)
        : [];
      setContacts(nextContacts);
    } else {
      nextError = nextError || contactsResult.reason?.message || "Unable to load live contacts from Zoho CRM.";
    }

    saveSalesWorkspaceCache(nextLeads, nextContacts);
    setError(nextError);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!shouldAutoloadWorkspace()) {
      setIsLoading(false);
      return;
    }

    loadWorkspace();
  }, [loadWorkspace]);

  const value = useMemo(
    () => ({
      leads,
      contacts,
      isLoading,
      error,
      refreshWorkspace: loadWorkspace,
      async addLead(lead) {
        const payload = await createSalesLead(lead);
        if (payload?.lead) {
          setLeads((prev) => {
            const nextLeads = [payload.lead, ...prev.filter((item) => item.id !== payload.lead.id)];
            saveSalesWorkspaceCache(nextLeads, contactsRef.current);
            return nextLeads;
          });
          return payload.lead;
        }
        await loadWorkspace();
        return null;
      },
      async deleteLead(leadId) {
        await deleteSalesLead(leadId);
        setLeads((prev) => {
          const nextLeads = prev.filter((lead) => lead.id !== leadId);
          saveSalesWorkspaceCache(nextLeads, contactsRef.current);
          return nextLeads;
        });
      },
      async convertLead(leadId) {
        const payload = await convertSalesLead(leadId);
        const nextContact = payload?.contact ? normalizeContact(payload.contact) : null;

        setLeads((prev) => {
          const nextLeads = prev.filter((lead) => lead.id !== leadId);
          saveSalesWorkspaceCache(nextLeads, contactsRef.current);
          return nextLeads;
        });

        if (nextContact) {
          setContacts((prev) => {
            const remaining = prev.filter((contact) => contact.id !== nextContact.id);
            const nextContacts = [nextContact, ...remaining];
            saveSalesWorkspaceCache(leadsRef.current.filter((lead) => lead.id !== leadId), nextContacts);
            return nextContacts;
          });
        } else {
          await loadWorkspace();
        }

        return nextContact;
      },
      getLeadById(leadId) {
        return leads.find((lead) => String(lead.id) === String(leadId)) || null;
      },
      getContactById(contactId) {
        return contacts.find((contact) => String(contact.id) === String(contactId)) || null;
      }
    }),
    [contacts, error, isLoading, leads, loadWorkspace]
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
