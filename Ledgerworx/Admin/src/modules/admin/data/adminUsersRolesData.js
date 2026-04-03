export const adminUsersRolesUsers = [
  {
    id: 1,
    fullName: "System Administrator",
    email: "admin@ledgerworx.me",
    phone: "9988776655",
    department: "Admin",
    designation: "Administrator",
    status: "Active",
    role: "Admin",
    roleClass: "admin-role",
    lastOnline: "Online now",
    employeeId: "EMP-001",
    username: "admin",
    password: "Admin@123",
    joiningDate: "2026-02-14"
  },
  {
    id: 2,
    fullName: "Rahul Sharma",
    email: "rahul@ledgerworx.me",
    phone: "9123456780",
    department: "Sales",
    designation: "Sales Executive",
    status: "Active",
    role: "Salesperson",
    roleClass: "sales",
    lastOnline: "5 min ago",
    employeeId: "EMP-002",
    username: "rahul.sharma",
    password: "Rahul@123",
    joiningDate: "2026-02-13"
  },
  {
    id: 3,
    fullName: "Priya Agarwal",
    email: "priya@ledgerworx.me",
    phone: "9234567890",
    department: "Accounts",
    designation: "Accountant",
    status: "Active",
    role: "Accountant",
    roleClass: "accountant",
    lastOnline: "1 hour ago",
    employeeId: "EMP-003",
    username: "priya.agarwal",
    password: "Priya@123",
    joiningDate: "2026-02-12"
  },
  {
    id: 4,
    fullName: "Rohit Verma",
    email: "rohit.mgr@ledgerworx.me",
    phone: "9345678901",
    department: "Management",
    designation: "Manager",
    status: "Active",
    role: "Manager",
    roleClass: "manager",
    lastOnline: "Yesterday",
    employeeId: "EMP-004",
    username: "rohit.verma",
    password: "Rohit@123",
    joiningDate: "2026-02-11"
  },
  {
    id: 5,
    fullName: "Anand Kapoor",
    email: "anand.client@ledgerworx.me",
    phone: "9456789012",
    department: "Client",
    designation: "Client",
    status: "Active",
    role: "Client",
    roleClass: "client",
    lastOnline: "2 days ago",
    employeeId: "EMP-005",
    username: "anand.kapoor",
    password: "Anand@123",
    joiningDate: "2026-02-10"
  }
];

export const adminUsersRolesAddFormDefaults = {
  fullName: "",
  employeeId: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  role: "",
  status: "",
  username: "",
  password: "",
  joiningDate: ""
};

export const adminUsersRolesAddDepartmentOptions = [
  "Client",
  "Sales",
  "Accounts",
  "Operations",
  "Manager"
];

export const adminUsersRolesEditDepartmentOptions = ["Client", "Sales", "Accounts", "Manager"];

export const adminUsersRolesRoleOptions = ["Client", "Salesperson", "Accountant", "Manager", "Admin"];

export const adminUsersRolesStatusOptions = ["Active", "Inactive"];
