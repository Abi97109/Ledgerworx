export const dashboardData = {
  stats: {
    newLeads: 27,
    dealsClosed: 12,
    targetAmount: 150000,
    achievedPercent: 75,
    followUps: 8,
    activeLeads: 30
  },
  leadStatus: {
    hot: 8,
    warm: 12,
    cold: 6
  },
  recentLeads: [
    { id: "xyz-technologies", name: "XYZ Technologies", status: "hot", email: "hello@xyztech.com", phone: "+971 55 111 2233", owner: "John Carter" },
    { id: "rashid-ali", name: "Rashid Ali", status: "warm", email: "rashid.ali@email.com", phone: "+971 55 444 8877", owner: "Emma Johnson" },
    { id: "global-solutions", name: "Global Solutions", status: "cold", email: "sales@globalsolutions.com", phone: "+971 55 321 9012", owner: "Mark D'Souza" },
    { id: "nadia-trading", name: "Nadia Trading", status: "hot", email: "nadia@tradingco.ae", phone: "+971 55 600 7788", owner: "Sarah Malik" }
  ],
  weeklyChart: {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    leads: [0, 50, 10, 40, 30, 20, 10],
    deals: [1, 20, 3, 40, 5, 6, 7]
  },
  monthlyChart: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    leads: [50, 120, 90, 140],
    deals: [10, 25, 18, 30]
  }
};

export const leadNotes = [
  { id: 1, text: "Requested proposal revision with bundled services.", date: "2026-03-28" },
  { id: 2, text: "Follow-up call completed, waiting for budget approval.", date: "2026-03-29" }
];

export const tasksData = [
  { id: 1, title: "Call Client ABC", lead: "XYZ Technologies", dueDate: "2026-03-30", priority: "urgent" },
  { id: 2, title: "Send revised proposal", lead: "Rashid Ali", dueDate: "2026-03-31", priority: "high" },
  { id: 3, title: "Schedule product demo", lead: "Global Solutions", dueDate: "2026-04-02", priority: "medium" },
  { id: 4, title: "Invoice follow-up", lead: "Nadia Trading", dueDate: "2026-04-04", priority: "low" }
];

export const notificationsData = [
  { id: 1, type: "leads", title: "New hot lead assigned", message: "XYZ Technologies was assigned to you.", time: "5 min ago", unread: true },
  { id: 2, type: "tasks", title: "Task due today", message: "Call Client ABC is due at 4:00 PM.", time: "30 min ago", unread: true },
  { id: 3, type: "invoices", title: "Invoice viewed", message: "Nadia Trading opened invoice INV-2001.", time: "2 hrs ago", unread: false },
  { id: 4, type: "all", title: "Weekly report ready", message: "Your sales performance report is generated.", time: "Yesterday", unread: false }
];

export const reportsData = {
  week: {
    leadsHandled: 45,
    leadsConverted: 12,
    dealsClosed: 10,
    status: { hot: 15, warm: 20, cold: 10, converted: 12 },
    chart: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      leads: [4, 8, 7, 6, 10, 5, 5],
      deals: [1, 2, 2, 1, 2, 1, 1]
    }
  },
  month: {
    leadsHandled: 180,
    leadsConverted: 46,
    dealsClosed: 37,
    status: { hot: 58, warm: 72, cold: 50, converted: 46 },
    chart: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      leads: [42, 38, 47, 53],
      deals: [8, 9, 10, 10]
    }
  }
};
