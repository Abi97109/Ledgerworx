export const companyManagementSummaryTiles = [
  {
    iconClass: "fa fa-city icon",
    value: "75",
    label: "Total Companies"
  },
  {
    iconClass: "fa fa-check-circle icon",
    value: "60",
    label: "Active Companies"
  },
  {
    iconClass: "fa fa-clock icon",
    value: "10",
    label: "Pending Companies"
  },
  {
    iconClass: "fa fa-ban icon",
    value: "5",
    label: "Expired Companies"
  }
];

export const companyManagementRows = [
  {
    id: "bright-tech-solutions",
    companyName: "Bright Tech Solutions",
    businessId: "CGD20208",
    industry: "Technology",
    ownerName: "Anil Kumar",
    ownerAvatar: "https://i.pravatar.cc/40?img=1",
    status: "Active",
    actionLabel: "Expired",
    actionClass: "suspend",
    vatTrn: "TRN-100245689100003",
    licenseExpiryDate: "2027-12-31",
    companyEmail: "contact@brighttech.com",
    phoneNumber: "+971 50 123 4567",
    address: "Business Bay, Dubai, UAE",
    poBox: "PO Box 44521",
    adminEmail: "anil.kumar@brighttech.com",
    username: "brighttech_admin",
    password: "********"
  },
  {
    id: "emirates-logistics",
    companyName: "Emirates Logistics",
    businessId: "FLG10236",
    industry: "Logistics",
    ownerName: "Sarah Ali",
    ownerAvatar: "https://i.pravatar.cc/40?img=2",
    status: "Pending",
    actionLabel: "Approve",
    actionClass: "approve",
    vatTrn: "TRN-100398451200003",
    licenseExpiryDate: "2026-09-15",
    companyEmail: "info@emirateslogistics.ae",
    phoneNumber: "+971 55 987 6543",
    address: "Al Quoz, Dubai, UAE",
    poBox: "PO Box 11209",
    adminEmail: "sarah.ali@emirateslogistics.ae",
    username: "emirateslog_admin",
    password: "********"
  },
  {
    id: "nova-healthcare",
    companyName: "Nova Healthcare",
    businessId: "MH467920",
    industry: "Healthcare",
    ownerName: "Meera Joshi",
    ownerAvatar: "https://i.pravatar.cc/40?img=3",
    status: "Expired",
    actionLabel: "Reactivate",
    actionClass: "reactivate",
    vatTrn: "TRN-100777234500003",
    licenseExpiryDate: "2025-11-30",
    companyEmail: "hello@novahealthcare.com",
    phoneNumber: "+971 58 222 1100",
    address: "Abu Dhabi, UAE",
    poBox: "PO Box 88761",
    adminEmail: "meera.joshi@novahealthcare.com",
    username: "novahealth_admin",
    password: "********"
  }
];

export const companyManagementFormDefaults = {
  companyName: "",
  tradeLicenseNo: "",
  vatTrn: "",
  licenseExpiryDate: "",
  companyEmail: "",
  phoneNumber: "",
  address: "",
  poBox: "",
  adminName: "",
  adminEmail: "",
  username: "",
  password: ""
};
