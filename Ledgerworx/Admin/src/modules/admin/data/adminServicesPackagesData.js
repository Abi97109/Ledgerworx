export const adminServicesPackagesServices = [
  {
    id: "service-1",
    count: 3,
    title: "Business Setup",
    meta: "3 Packages Created"
  },
  {
    id: "service-2",
    count: 2,
    title: "Accounting & Bookkeeping",
    meta: "2 Packages Created"
  },
  {
    id: "service-3",
    count: 1,
    title: "VAT Registration",
    meta: "1 Package Created"
  },
  {
    id: "service-4",
    count: 1,
    title: "PRO Services",
    meta: "1 Package Created"
  }
];

export const adminServicesPackagesRows = [
  {
    id: "package-1",
    name: "Basic Package",
    service: "Business Setup",
    price: "AED 10,000",
    status: "Enabled",
    isPopular: false
  },
  {
    id: "package-2",
    name: "Standard Package",
    service: "Business Setup",
    price: "AED 20,000",
    status: "Enabled",
    isPopular: true
  },
  {
    id: "package-3",
    name: "Premium Package",
    service: "Business Setup",
    price: "AED 30,000",
    status: "Enabled",
    isPopular: false
  },
  {
    id: "package-4",
    name: "Accounting Starter",
    service: "Accounting & Bookkeeping",
    price: "AED 5,000",
    status: "Enabled",
    isPopular: false
  }
];

export const adminServiceFormDefaults = {
  name: "Appliance Repair",
  description:
    "Repairing household appliances, including washing machines, refrigerators, and microwaves",
  category: "Repair",
  members: "",
  availableDays: "Every business day",
  availableTime: "Same as business hours",
  currency: "AED - UAE Dirham",
  requiredDocument: "",
  duration: "2",
  priority: "Medium",
  location: "On-site",
  visibleTo: "All Clients"
};

export const adminServiceCategoryOptions = ["Repair", "Maintenance", "Consulting", "Support"];

export const adminServiceAvailableDayOptions = [
  "Every business day",
  "All week days",
  "Weekends only",
  "Custom schedule"
];

export const adminServiceAvailableTimeOptions = [
  "Same as business hours",
  "24 x 7",
  "Morning shift",
  "Evening shift"
];

export const adminServiceCurrencyOptions = [
  "INR - Indian Rupee",
  "AED - UAE Dirham",
  "USD - US Dollar"
];

export const adminServiceDurationOptions = ["1", "2", "4", "8"];

export const adminServicePriorityOptions = ["Low", "Medium", "High"];

export const adminServiceLocationOptions = ["On-site", "Remote", "Hybrid"];

export const adminServiceVisibleToOptions = ["All Clients", "Premium Clients", "Internal Team Only"];

export const adminPackageViewOptions = ["All", "Active", "Popular", "Recently Added"];

export const adminPackageServiceOptions = [
  "Business Setup",
  "Accounting & Bookkeeping",
  "VAT Registration",
  "PRO Services"
];

export const adminPackageStatusOptions = ["Enabled", "Disabled", "Draft"];
