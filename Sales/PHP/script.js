(function () {
  const page = document.body ? document.body.dataset.salesPage : "";

  const modules = {
    dashboard: createDashboardModule,
    leads: createLeadsModule,
    "lead-detail": createLeadDetailModule,
    tasks: createTasksModule,
    reports: createReportsModule,
    notifications: createNotificationsModule,
    help: createHelpModule
  };

  const sharedActions = {
    "go-dashboard": () => navigate("sales-dashboard.php"),
    "go-leads": () => navigate("sales-leads.php"),
    "go-tasks": () => navigate("sales-tasks.php"),
    "go-reports": () => navigate("sales-reports.php"),
    "go-notifications": () => navigate("sales-notifications.php")
  };

  const moduleFactory = modules[page];
  const activeModule = moduleFactory ? moduleFactory() : null;

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) {
      if (activeModule && typeof activeModule.onDocumentClick === "function") {
        activeModule.onDocumentClick(event);
      }
      return;
    }

    const action = target.dataset.action;

    if (sharedActions[action]) {
      event.preventDefault();
      sharedActions[action](target, event);
      return;
    }

    if (activeModule && typeof activeModule.handleAction === "function") {
      const handled = activeModule.handleAction(action, target, event);
      if (handled) {
        event.preventDefault();
      }
    }
  });

  initStaffNavbar();

  if (activeModule && typeof activeModule.init === "function") {
    activeModule.init();
  }

  function navigate(path) {
    window.location.href = path;
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function query(selector, root) {
    return (root || document).querySelector(selector);
  }

  function queryAll(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function animateCounter(element, finalValue, duration) {
    if (!element) return;

    const target = Number(finalValue) || 0;
    const totalDuration = duration || 1000;
    let currentValue = 0;
    const increment = target / (totalDuration / 16);

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= target) {
        element.textContent = String(target);
        clearInterval(timer);
      } else {
        element.textContent = String(Math.floor(currentValue));
      }
    }, 16);
  }

  function showModalByDisplay(id) {
    const modal = byId(id);
    if (modal) {
      modal.style.display = "flex";
    }
  }

  function hideModalByDisplay(id) {
    const modal = byId(id);
    if (modal) {
      modal.style.display = "none";
    }
  }

  function toggleBodyScroll(locked) {
    document.body.style.overflow = locked ? "hidden" : "auto";
  }

  function initStaffNavbar() {
    const userProfile = byId("userProfile");
    const profileDropdown = byId("profileDropdown");
    const themeToggle = byId("themeToggle");
    const toggleSwitch = byId("toggleSwitch");
    const themeIcon = byId("themeIcon");
    const themeText = byId("themeText");

    if (userProfile && profileDropdown) {
      userProfile.addEventListener("click", (e) => {
        e.stopPropagation();
        userProfile.classList.toggle("active");
        profileDropdown.classList.toggle("active");
      });

      document.addEventListener("click", (e) => {
        if (!profileDropdown.contains(e.target) && !userProfile.contains(e.target)) {
          userProfile.classList.remove("active");
          profileDropdown.classList.remove("active");
        }
      });
    }

    if (themeToggle && toggleSwitch && themeIcon && themeText) {
      const setTheme = (theme) => {
        const isDark = theme === "dark";
        document.body.classList.toggle("dark-mode", isDark);
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
        toggleSwitch.classList.toggle("active", isDark);
        themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
        themeText.textContent = isDark ? "Light Mode" : "Dark Mode";
      };

      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);

      themeToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
      });
    }
  }

  function createHelpModule() {
    return {
      init() {
        // No extra bindings required for the help page.
      }
    };
  }

  function createDashboardModule() {
    let chartInstance = null;

    const data = {
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
        { name: "XYZ Technologies", status: "hot" },
        { name: "Rashid Ali", status: "warm" },
        { name: "Global Solutions", status: "cold" },
        { name: "Nadia Trading", status: "hot" }
      ],
      chart: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        leads: [0, 50, 10, 40, 30, 20, 10],
        deals: [1, 20, 3, 40, 5, 6, 7]
      }
    };

    function init() {
      animateCounter(byId("newLeads"), data.stats.newLeads, 1500);
      animateCounter(byId("dealsClosed"), data.stats.dealsClosed, 1500);
      animateCounter(byId("followUps"), data.stats.followUps, 1500);
      animateCounter(byId("activeLeads"), data.stats.activeLeads, 1500);

      const targetAmount = byId("targetAmount");
      const progressBar = byId("progressBar");
      const progressText = byId("progressText");

      if (targetAmount) {
        targetAmount.textContent = "AED " + data.stats.targetAmount.toLocaleString();
      }
      if (progressBar) {
        progressBar.style.width = data.stats.achievedPercent + "%";
      }
      if (progressText) {
        progressText.textContent = data.stats.achievedPercent + "% of monthly target achieved";
      }

      const hotCount = byId("hotCount");
      const warmCount = byId("warmCount");
      const coldCount = byId("coldCount");
      const hotLeads = byId("hotLeads");
      const warmLeads = byId("warmLeads");
      const coldLeads = byId("coldLeads");

      if (hotCount) hotCount.textContent = String(data.leadStatus.hot);
      if (warmCount) warmCount.textContent = String(data.leadStatus.warm);
      if (coldCount) coldCount.textContent = String(data.leadStatus.cold);

      if (hotLeads) hotLeads.textContent = "Hot Leads: " + data.leadStatus.hot;
      if (warmLeads) warmLeads.textContent = "Warm Leads: " + data.leadStatus.warm;
      if (coldLeads) coldLeads.textContent = "Cold Leads: " + data.leadStatus.cold;

      renderRecentLeads();
      setChartView("week");
    }

    function renderRecentLeads() {
      const recentLeads = byId("recentLeads");
      if (!recentLeads) return;

      recentLeads.innerHTML = "";
      data.recentLeads.forEach((lead) => {
        const div = document.createElement("div");
        div.className = "list-item";
        div.innerHTML =
          lead.name +
          '<span class="lw-badge ' +
          lead.status +
          '">' +
          lead.status +
          "</span>";
        recentLeads.appendChild(div);
      });
    }

    function initChart() {
      if (!window.Chart) return;

      const canvas = byId("salesChart");
      if (!canvas) return;

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new window.Chart(canvas, {
        type: "line",
        data: {
          labels: data.chart.labels,
          datasets: [
            {
              label: "Leads Generated",
              data: data.chart.leads,
              borderColor: "#1a5a8f",
              backgroundColor: "rgba(26, 90, 143, 0.05)",
              tension: 0.4,
              fill: true,
              borderWidth: 3,
              pointRadius: 6,
              pointBackgroundColor: "#1a5a8f",
              pointBorderColor: "white",
              pointBorderWidth: 2,
              pointHoverRadius: 8
            },
            {
              label: "Deals Closed",
              data: data.chart.deals,
              borderColor: "#16a34a",
              backgroundColor: "rgba(22, 163, 74, 0.05)",
              tension: 0.4,
              fill: true,
              borderWidth: 3,
              pointRadius: 6,
              pointBackgroundColor: "#16a34a",
              pointBorderColor: "white",
              pointBorderWidth: 2,
              pointHoverRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                padding: 20,
                font: { size: 13, weight: "600" },
                color: "#64748b",
                usePointStyle: true
              }
            },
            filler: {
              propagate: true
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                color: "rgba(0, 0, 0, 0.05)"
              },
              ticks: {
                color: "#64748b",
                font: { size: 12 }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: "#64748b",
                font: { size: 12 }
              }
            }
          }
        }
      });
    }

    function setChartView(period) {
      if (period === "month") {
        data.chart.labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        data.chart.leads = [50, 120, 90, 140];
        data.chart.deals = [10, 25, 18, 30];
      } else {
        data.chart.labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        data.chart.leads = [0, 50, 10, 40, 30, 20, 10];
        data.chart.deals = [1, 20, 3, 40, 5, 6, 7];
      }

      queryAll('[data-action="toggle-chart-view"]').forEach((button) => {
        const isActive = button.dataset.period === period;
        button.classList.remove("u-inline-10", "u-inline-11");
        button.classList.add(isActive ? "u-inline-10" : "u-inline-11");
      });

      initChart();
    }

    function handleAction(action, target) {
      if (action === "toggle-chart-view") {
        setChartView(target.dataset.period === "month" ? "month" : "week");
        return true;
      }

      return false;
    }

    return {
      init,
      handleAction
    };
  }

  function createLeadsModule() {
    const state = {
      leads: [
        { id: 1, name: "Aisha Khan", company: "XYZ Technologies", email: "xyz@tech.com", phone: "+971 50 123 4564", source: "Website", status: "hot", owner: "Sarah Malik", avatar: "AK", contact: "+971 50 123 4564" },
        { id: 2, name: "Rashid Ali", company: "RA Retail LLC", email: "rashid@email.com", phone: "+971 56 901 1122", source: "Referral", status: "warm", owner: "John Carter", avatar: "RA", contact: "+971 56 901 1122" },
        { id: 3, name: "Nadia Noor", company: "Nadia Trading", email: "nadia@trading.com", phone: "+971 50 987 6543", source: "LinkedIn", status: "cold", owner: "John Carter", avatar: "NN", contact: "+971 50 987 6543" },
        { id: 4, name: "Omar Saeed", company: "Global Solutions", email: "info@global.com", phone: "+971 54 410 2233", source: "Website", status: "cold", owner: "Emma Johnson", avatar: "OS", contact: "+971 54 410 2233" },
        { id: 5, name: "Priya Nair", company: "ABC Corporation", email: "sales@abc.com", phone: "+971 50 654 3210", source: "Cold Call", status: "warm", owner: "John Carter", avatar: "PN", contact: "+971 50 654 3210" },
        { id: 6, name: "Ahmed Khan", company: "Desert Star LLC", email: "ahmed@khan.com", phone: "+971 50 111 2222", source: "Referral", status: "hot", owner: "Sarah Malik", avatar: "AK", contact: "+971 50 111 2222" },
        { id: 7, name: "Maria Lopez", company: "Lopez Interiors", email: "maria@email.com", phone: "+971 58 334 5566", source: "Instagram", status: "warm", owner: "John Carter", avatar: "ML", contact: "+971 58 334 5566" },
        { id: 8, name: "Ravi Menon", company: "Tech Innovations", email: "hello@techinnovate.com", phone: "+971 55 778 8899", source: "Event", status: "cold", owner: "Mark D'Souza", avatar: "RM", contact: "+971 55 778 8899" }
      ],
      currentFilter: "all",
      currentConvertingLeadId: null
    };
    function init() {
      render(getFilteredLeads());

      const searchInput = byId("searchInput");
      if (searchInput) {
        searchInput.addEventListener("input", () => render(getFilteredLeads()));
      }

      const dateFilter = byId("dateFilter");
      if (dateFilter) {
        dateFilter.addEventListener("change", () => applyDateFilter(dateFilter.value));
      }

      const leadModal = byId("leadModal");
      if (leadModal) {
        leadModal.addEventListener("click", (event) => {
          if (event.target === leadModal) {
            closeLeadModal();
          }
        });
      }

      const convertModal = byId("convertModal");
      if (convertModal) {
        convertModal.addEventListener("click", (event) => {
          if (event.target === convertModal) {
            closeConvertModal();
          }
        });
      }
    }

    function getFilteredLeads() {
      let filtered = [...state.leads];

      if (state.currentFilter !== "all") {
        if (state.currentFilter === "converted") {
          filtered = filtered.filter((lead) => lead.status === "converted");
        } else {
          filtered = filtered.filter((lead) => lead.status === state.currentFilter);
        }
      }

      const searchInput = byId("searchInput");
      const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      if (query) {
        filtered = filtered.filter((lead) => {
          return (
            lead.name.toLowerCase().includes(query) ||
            (lead.company || "").toLowerCase().includes(query) ||
            lead.email.toLowerCase().includes(query) ||
            (lead.phone || lead.contact || "").toLowerCase().includes(query) ||
            (lead.source || "").toLowerCase().includes(query) ||
            (lead.owner || "").toLowerCase().includes(query)
          );
        });
      }

      return filtered;
    }

    function render(leads) {
      const table = byId("leadsTable");
      if (!table) return;

      table.innerHTML = "";

      leads.forEach((lead, index) => {
        const phone = lead.phone || lead.contact || "";
        table.innerHTML +=
          '<tr data-action="view-lead" data-id="' + lead.id + '">' +
          "<td>" +
          '<div class="lead-row">' +
          '<div class="lead-avatar">' + lead.avatar + "</div>" +
          "<div>" +
          "<strong>" + lead.name + "</strong>" +
          "</div>" +
          "</div>" +
          "</td>" +
          '<td class="text-muted-small">' + lead.company + "</td>" +
          '<td class="text-muted-small">' + lead.email + "</td>" +
          '<td class="text-muted-small">' + phone + "</td>" +
          '<td class="text-muted-small">' + lead.source + "</td>" +
          '<td class="text-owner">' + lead.owner + "</td>" +
          '<td class="actions" data-action="toggle-lead-menu" data-menu-id="menu-' + index + '">' +
          '<i class="fas fa-ellipsis-v"></i>' +
          '<div class="menu" id="menu-' + index + '">' +
          '<div class="menu-item-inline" data-action="view-lead" data-id="' + lead.id + '"><i class="fas fa-eye menu-item-icon"></i>View Details</div>' +
          '<div class="menu-item-inline"><i class="fas fa-edit menu-item-icon"></i>Edit Lead</div>' +
          '<div class="menu-item-inline"><i class="fas fa-sticky-note menu-item-icon"></i>Add Note</div>' +
          '<div class="menu-item-inline"><i class="fas fa-handshake menu-item-icon"></i>Assign Service</div>' +
          "</div>" +
          "</td>" +
          "</tr>";
      });
    }

    function capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    function setActiveFilterTab(filter) {
      queryAll(".filter-tabs span").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.filter === filter);
      });
    }

    function applyDateFilter(value) {
      if (value === "week") {
        alert("Filtering leads from this week");
      }
      if (value === "month") {
        alert("Filtering leads from this month");
      }
      render(getFilteredLeads());
    }

    function openLeadModal() {
      showModalByDisplay("leadModal");
    }

    function closeLeadModal() {
      hideModalByDisplay("leadModal");
    }

    function addLead() {
      const nameInput = byId("nameInput");
      const companyInput = byId("companyInput");
      const emailInput = byId("emailInput");
      const phoneInput = byId("phoneInput");
      const sourceInput = byId("sourceInput");
      const ownerInput = byId("ownerInput");

      const name = nameInput ? nameInput.value.trim() : "";
      const company = companyInput ? companyInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const source = sourceInput ? sourceInput.value.trim() : "";
      const owner = ownerInput ? ownerInput.value.trim() : "";

      if (!name || !company || !email || !phone || !source || !owner) {
        alert("Please fill in all fields");
        return;
      }

      state.leads.push({
        id: state.leads.length + 1,
        name,
        company,
        email,
        phone,
        source,
        status: "warm",
        owner,
        contact: phone,
        avatar: name
          .split(" ")
          .map((part) => part.charAt(0))
          .join("")
          .toUpperCase()
          .slice(0, 2)
      });

      if (nameInput) nameInput.value = "";
      if (companyInput) companyInput.value = "";
      if (emailInput) emailInput.value = "";
      if (phoneInput) phoneInput.value = "";
      if (sourceInput) sourceInput.value = "";
      if (ownerInput) ownerInput.value = "";

      closeLeadModal();
      render(getFilteredLeads());
    }

    function viewLeadDetails(leadId) {
      const lead = state.leads.find((item) => item.id === leadId);
      if (!lead) return;
      localStorage.setItem("selectedLead", JSON.stringify(lead));
      window.location.href = "sales-lead-detail.php?id=" + leadId;
    }

    function openConvertModal(leadId) {
      const lead = state.leads.find((item) => item.id === leadId);
      if (!lead) return;

      const target = byId("convertLeadName");
      if (target) {
        target.textContent = lead.name;
      }

      state.currentConvertingLeadId = leadId;
      showModalByDisplay("convertModal");
    }

    function closeConvertModal() {
      state.currentConvertingLeadId = null;
      hideModalByDisplay("convertModal");
    }

    function confirmConvertLead() {
      const lead = state.leads.find((item) => item.id === state.currentConvertingLeadId);
      if (!lead) return;

      lead.status = "converted";
      closeConvertModal();
      render(getFilteredLeads());
      alert(lead.name + " has been successfully converted to a client!");
    }

    function sendInvoice(leadId) {
      const lead = state.leads.find((item) => item.id === leadId);
      if (!lead) return;
      alert("Invoice sent to " + lead.name + " at " + lead.email);
    }

    function toggleMenu(menuId) {
      queryAll(".menu").forEach((menu) => {
        menu.style.display = "none";
      });

      const target = byId(menuId);
      if (target) {
        target.style.display = "block";
      }
    }

    function closeMenus() {
      queryAll(".menu").forEach((menu) => {
        menu.style.display = "none";
      });
    }

    function onDocumentClick(event) {
      if (!event.target.closest(".actions")) {
        closeMenus();
      }
    }

    function handleAction(action, target, event) {
      if (action === "filter-leads") {
        state.currentFilter = target.dataset.filter || "all";
        setActiveFilterTab(state.currentFilter);
        render(getFilteredLeads());
        return true;
      }

      if (action === "open-lead-modal") {
        openLeadModal();
        return true;
      }

      if (action === "close-lead-modal") {
        closeLeadModal();
        return true;
      }

      if (action === "save-lead") {
        addLead();
        return true;
      }

      if (action === "view-lead") {
        const leadId = Number(target.dataset.id || target.closest("[data-id]")?.dataset.id);
        if (Number.isFinite(leadId)) {
          viewLeadDetails(leadId);
        }
        return true;
      }

      if (action === "open-convert-modal") {
        const leadId = Number(target.dataset.id);
        if (Number.isFinite(leadId)) {
          openConvertModal(leadId);
        }
        event.stopPropagation();
        return true;
      }

      if (action === "close-convert-modal") {
        closeConvertModal();
        return true;
      }

      if (action === "confirm-convert-lead") {
        confirmConvertLead();
        return true;
      }

      if (action === "send-invoice") {
        const leadId = Number(target.dataset.id);
        if (Number.isFinite(leadId)) {
          sendInvoice(leadId);
        }
        event.stopPropagation();
        return true;
      }

      if (action === "toggle-lead-menu") {
        const menuId = target.dataset.menuId;
        if (menuId) {
          event.stopPropagation();
          toggleMenu(menuId);
        }
        return true;
      }

      return false;
    }

    return {
      init,
      handleAction,
      onDocumentClick
    };
  }

  function createLeadDetailModule() {
    let selectedLead = null;
    let notes = [];

    function init() {
      const stored = localStorage.getItem("selectedLead");
      if (stored) {
        selectedLead = JSON.parse(stored);
      }

      populateLead();

      const noteModal = byId("noteModal");
      if (noteModal) {
        noteModal.addEventListener("click", (event) => {
          if (event.target === noteModal) {
            closeNoteModal();
          }
        });
      }

      ["transferModal", "profileModal", "settingsModal", "logoutModal"].forEach((id) => {
        const modal = byId(id);
        if (modal) {
          modal.addEventListener("click", (event) => {
            if (event.target === modal) {
              hideModalByDisplay(id);
              toggleBodyScroll(false);
            }
          });
        }
      });
    }

    function populateLead() {
      if (!selectedLead) return;

      const leadName = byId("leadName");
      const leadNameBread = byId("leadNameBread");
      const leadEmail = byId("leadEmail");
      const leadPhone = byId("leadPhone");
      const leadStatus = byId("leadStatus");
      const leadOwner = byId("leadOwner");
      const leadAvatar = byId("leadAvatar");

      if (leadName) leadName.textContent = selectedLead.name;
      if (leadNameBread) leadNameBread.textContent = selectedLead.name;
      if (leadEmail) leadEmail.textContent = selectedLead.email;
      if (leadPhone) leadPhone.textContent = selectedLead.phone || selectedLead.contact;
      if (leadStatus) leadStatus.textContent = capitalize(selectedLead.status);
      if (leadOwner) leadOwner.textContent = selectedLead.owner;
      if (leadAvatar) leadAvatar.textContent = selectedLead.avatar;

      const statusBadge = byId("statusBadge");
      if (statusBadge) {
        const badgeClass = selectedLead.status === "hot" ? "hot" : selectedLead.status === "cold" ? "cold" : "";
        statusBadge.className = "info-badge " + badgeClass;
        statusBadge.innerHTML = "<span>" + capitalize(selectedLead.status) + "</span><span>Created: Apr 22, 2024</span>";
      }

      loadNotes();
    }

    function capitalize(value) {
      if (!value) return "";
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    function goBack() {
      window.location.href = "sales-leads.php";
    }

    function openNoteModal() {
      showModalByDisplay("noteModal");
    }

    function closeNoteModal() {
      hideModalByDisplay("noteModal");
      const noteText = byId("noteText");
      const followUpDate = byId("followUpDate");
      if (noteText) noteText.value = "";
      if (followUpDate) followUpDate.value = "";
    }

    function saveNote() {
      if (!selectedLead) return;

      const noteText = byId("noteText");
      const followUpDate = byId("followUpDate");
      const text = noteText ? noteText.value.trim() : "";
      const dateValue = followUpDate ? followUpDate.value : "";

      if (!text) {
        alert("Please write a note");
        return;
      }

      notes.push({
        text,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        followUpDate: dateValue ? new Date(dateValue).toLocaleDateString() : null
      });

      localStorage.setItem("lead_" + selectedLead.id + "_notes", JSON.stringify(notes));
      closeNoteModal();
      loadNotes();
    }

    function loadNotes() {
      if (!selectedLead) return;

      const saved = localStorage.getItem("lead_" + selectedLead.id + "_notes");
      notes = saved ? JSON.parse(saved) : [];

      const notesList = byId("notesList");
      if (!notesList) return;

      if (notes.length === 0) {
        notesList.innerHTML = '<p class="text-muted-small">No notes yet. Add your first note below.</p>';
        return;
      }

      notesList.innerHTML = notes
        .map((note, index) => {
          const followup = note.followUpDate ? '<br><small class="note-followup">Follow-up: ' + note.followUpDate + "</small>" : "";

          return (
            '<div class="note-item">' +
            '<div class="note-title">Note ' + (index + 1) + "</div>" +
            '<p class="note-text">' + note.text + "</p>" +
            '<small class="note-meta">Added: ' + note.date + "</small>" +
            followup +
            "</div>"
          );
        })
        .join("");
    }

    function assignService() {
      alert("Service assignment feature coming soon!");
    }

    function convertToClient() {
      if (window.confirm("Are you sure you want to convert this lead to a client?")) {
        alert("Lead converted to client successfully!");
        goBack();
      }
    }

    function openTransferModal() {
      if (!selectedLead) return;

      const transferLeadName = byId("transferLeadName");
      const transferEmployee = byId("transferEmployee");
      const transferNotes = byId("transferNotes");

      if (transferLeadName) transferLeadName.textContent = selectedLead.name;
      if (transferEmployee) transferEmployee.value = "";
      if (transferNotes) transferNotes.value = "";

      showModalByDisplay("transferModal");
      toggleBodyScroll(true);
    }

    function closeTransferModal() {
      hideModalByDisplay("transferModal");
      toggleBodyScroll(false);
    }

    function proceedTransferLead() {
      if (!selectedLead) return;

      const transferEmployee = byId("transferEmployee");
      const transferNotes = byId("transferNotes");

      const employee = transferEmployee ? transferEmployee.value : "";
      const extraNotes = transferNotes ? transferNotes.value.trim() : "";

      if (!employee) {
        alert("Please select an employee to transfer the lead to");
        return;
      }

      const previousOwner = selectedLead.owner || "Unassigned";
      selectedLead.owner = employee;

      const transferNote = "Lead transferred from " + previousOwner + " to " + employee + "." + (extraNotes ? " Notes: " + extraNotes : "");

      notes.push({
        text: transferNote,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        isSystemNote: true
      });

      localStorage.setItem("lead_" + selectedLead.id + "_notes", JSON.stringify(notes));

      const leadOwner = byId("leadOwner");
      if (leadOwner) {
        leadOwner.textContent = employee;
      }

      closeTransferModal();
      alert('Lead "' + selectedLead.name + '" has been successfully transferred to ' + employee);
      loadNotes();
    }

    function closeProfileModal() {
      hideModalByDisplay("profileModal");
      toggleBodyScroll(false);
    }

    function closeSettingsModal() {
      hideModalByDisplay("settingsModal");
      toggleBodyScroll(false);
    }

    function closeLogoutModal() {
      hideModalByDisplay("logoutModal");
      toggleBodyScroll(false);
    }

    function performLogout() {
      window.location.href = "logout-confirmation.php";
    }

    function handleAction(action) {
      if (action === "go-back") {
        goBack();
        return true;
      }
      if (action === "open-note-modal") {
        openNoteModal();
        return true;
      }
      if (action === "close-note-modal") {
        closeNoteModal();
        return true;
      }
      if (action === "save-note") {
        saveNote();
        return true;
      }
      if (action === "assign-service") {
        assignService();
        return true;
      }
      if (action === "convert-to-client") {
        convertToClient();
        return true;
      }
      if (action === "open-transfer-modal") {
        openTransferModal();
        return true;
      }
      if (action === "close-transfer-modal") {
        closeTransferModal();
        return true;
      }
      if (action === "confirm-transfer-lead") {
        proceedTransferLead();
        return true;
      }
      if (action === "close-profile-modal") {
        closeProfileModal();
        return true;
      }
      if (action === "close-settings-modal") {
        closeSettingsModal();
        return true;
      }
      if (action === "close-logout-modal") {
        closeLogoutModal();
        return true;
      }
      if (action === "perform-logout") {
        performLogout();
        return true;
      }

      return false;
    }

    return { init, handleAction };
  }

  function createTasksModule() {
    const state = {
      tasks: [
        { id: 1, title: "Follow up with XYZ Technologies", badge: "Follow-Up", lead: "XYZ Technologies", dueDate: "Today, 2:00 PM", priority: "high", status: "today" },
        { id: 2, title: "Send proposal to Rashid Ali", badge: "Send Proposal", lead: "Rashid Ali", dueDate: "Today, 4:00 PM", priority: "high", status: "today" },
        { id: 3, title: "Call Global Solutions for demo", badge: "Follow-Up", lead: "Global Solutions", dueDate: "Tomorrow, 10:00 AM", priority: "medium", status: "upcoming" },
        { id: 4, title: "Assign service to Nadia Trading", badge: "Assign Service", lead: "Nadia Trading", dueDate: "Apr 28, 2024", priority: "medium", status: "upcoming" },
        { id: 5, title: "Invoice follow-up: ABC Corp", badge: "Follow-Up", lead: "ABC Corporation", dueDate: "Apr 27, 2024 (OVERDUE)", priority: "urgent", status: "overdue" },
        { id: 6, title: "Complete Ahmed Khan contract", badge: "Proposal", lead: "Ahmed Khan", dueDate: "Apr 26, 2024 (OVERDUE)", priority: "urgent", status: "overdue" },
        { id: 7, title: "Schedule follow-up with Maria Lopez", badge: "Follow-Up", lead: "Maria Lopez", dueDate: "May 2, 2024", priority: "low", status: "upcoming" },
        { id: 8, title: "Tech Innovations - Send quote", badge: "Send Proposal", lead: "Tech Innovations", dueDate: "Apr 30, 2024", priority: "medium", status: "upcoming" }
      ],
      currentStatusFilter: "all",
      currentPriorityFilter: ""
    };
    function init() {
      renderTasks(getFilteredTasks());

      const searchInput = byId("searchInput");
      if (searchInput) {
        searchInput.addEventListener("input", () => renderTasks(getFilteredTasks()));
      }

      const priorityFilter = byId("priorityFilter");
      if (priorityFilter) {
        priorityFilter.addEventListener("change", () => {
          state.currentPriorityFilter = priorityFilter.value;
          renderTasks(getFilteredTasks());
        });
      }

      const addTaskForm = byId("addTaskForm");
      if (addTaskForm) {
        addTaskForm.addEventListener("submit", submitTask);
      }

      const addTaskModal = byId("addTaskModal");
      if (addTaskModal) {
        addTaskModal.addEventListener("click", (event) => {
          if (event.target === addTaskModal) {
            closeTaskModal();
          }
        });
      }
    }

    function getFilteredTasks() {
      const searchInput = byId("searchInput");
      const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

      return state.tasks.filter((task) => {
        if (state.currentStatusFilter !== "all" && task.status !== state.currentStatusFilter) {
          return false;
        }

        if (state.currentPriorityFilter && task.priority !== state.currentPriorityFilter) {
          return false;
        }

        if (query) {
          const text = (task.title + " " + task.lead).toLowerCase();
          return text.includes(query);
        }

        return true;
      });
    }

    function renderTasks(tasks) {
      const tbody = byId("tasksTable");
      if (!tbody) return;

      if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="task-empty">No tasks found</td></tr>';
        updateTaskCount(0);
        return;
      }

      const grouped = {
        overdue: tasks.filter((task) => task.status === "overdue"),
        today: tasks.filter((task) => task.status === "today"),
        upcoming: tasks.filter((task) => task.status === "upcoming")
      };

      let html = "";

      if (grouped.overdue.length > 0) {
        html += '<tr class="task-group-row task-group-row--overdue"><td colspan="6" class="task-group-cell task-group-cell--overdue">OVERDUE TASKS (' + grouped.overdue.length + ")</td></tr>";
        grouped.overdue.forEach((task) => {
          html += renderTaskRow(task);
        });
      }

      if (grouped.today.length > 0) {
        html += '<tr class="task-group-row task-group-row--today"><td colspan="6" class="task-group-cell task-group-cell--today">TODAY (' + grouped.today.length + ")</td></tr>";
        grouped.today.forEach((task) => {
          html += renderTaskRow(task);
        });
      }

      if (grouped.upcoming.length > 0) {
        html += '<tr class="task-group-row task-group-row--upcoming"><td colspan="6" class="task-group-cell task-group-cell--upcoming">UPCOMING (' + grouped.upcoming.length + ")</td></tr>";
        grouped.upcoming.forEach((task) => {
          html += renderTaskRow(task);
        });
      }

      tbody.innerHTML = html;
      updateTaskCount(tasks.length);
    }

    function renderTaskRow(task) {
      const badgeMap = {
        "follow-up": "followup",
        proposal: "proposal",
        "send proposal": "proposal",
        "assign service": "other",
        "new task": "other"
      };

      const badgeClass = badgeMap[task.badge.toLowerCase()] || "other";
      const dueClass = task.status === "overdue" ? "task-due task-due--overdue" : "task-due";

      return (
        "<tr>" +
        '<td><input type="checkbox"></td>' +
        "<td>" +
        '<div class="task-item">' +
        '<div class="task-icon task-icon--' + task.priority + '">' + task.id + "</div>" +
        "<div>" +
        '<strong class="task-title">' + task.title + "</strong>" +
        '<span class="lw-badge ' + badgeClass + '">' + task.badge + "</span>" +
        "</div>" +
        "</div>" +
        "</td>" +
        '<td class="task-lead">' + task.lead + "</td>" +
        '<td class="' + dueClass + '">' + task.dueDate + "</td>" +
        '<td class="actions" data-action="toggle-task-menu" data-id="' + task.id + '">...' +
        '<div class="menu" id="menu-' + task.id + '">' +
        '<div data-action="mark-task-completed" data-id="' + task.id + '"><i class="fas fa-check"></i> Mark as Completed</div>' +
        '<div data-action="reschedule-task" data-id="' + task.id + '"><i class="fas fa-clock"></i> Reschedule</div>' +
        '<div data-action="view-task-lead" data-id="' + task.id + '"><i class="fas fa-eye"></i> View Lead</div>' +
        '<div data-action="add-task-note" data-id="' + task.id + '"><i class="fas fa-sticky-note"></i> Add Note</div>' +
        '<div data-action="edit-task" data-id="' + task.id + '"><i class="fas fa-edit"></i> Edit Task</div>' +
        "</div>" +
        "</td>" +
        "</tr>"
      );
    }

    function updateTaskCount(count) {
      const taskCount = byId("taskCount");
      if (taskCount) {
        taskCount.textContent = count + " tasks";
      }
    }

    function setActiveTaskTab(filter) {
      queryAll(".filter-tabs span").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.filter === filter);
      });
    }

    function toggleTaskMenu(taskId) {
      closeMenus();
      const menu = byId("menu-" + taskId);
      if (menu) {
        menu.style.display = "block";
      }
    }

    function closeMenus() {
      queryAll(".menu").forEach((menu) => {
        menu.style.display = "none";
      });
    }

    function openTaskModal() {
      const modal = byId("addTaskModal");
      if (!modal) return;
      modal.classList.add("active");
      toggleBodyScroll(true);
    }

    function closeTaskModal() {
      const modal = byId("addTaskModal");
      if (!modal) return;
      modal.classList.remove("active");
      toggleBodyScroll(false);

      const form = byId("addTaskForm");
      if (form) {
        form.reset();
      }
    }

    function submitTask(event) {
      event.preventDefault();

      const title = byId("taskTitle") ? byId("taskTitle").value.trim() : "";
      const lead = byId("taskLead") ? byId("taskLead").value.trim() : "";
      const dueDate = byId("taskDueDate") ? byId("taskDueDate").value : "";
      const priority = byId("taskPriority") ? byId("taskPriority").value : "";

      if (!title || !lead || !dueDate || !priority) {
        alert("Please complete all required fields.");
        return;
      }

      const date = new Date(dueDate);
      const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

      state.tasks.push({
        id: state.tasks.length + 1,
        title,
        badge: "New Task",
        lead,
        dueDate: formattedDate,
        priority,
        status: "upcoming"
      });

      closeTaskModal();
      renderTasks(getFilteredTasks());
      alert("Task added successfully!");
    }

    function handleAction(action, target, event) {
      if (action === "filter-tasks") {
        state.currentStatusFilter = target.dataset.filter || "all";
        setActiveTaskTab(state.currentStatusFilter);
        renderTasks(getFilteredTasks());
        return true;
      }
      if (action === "open-task-modal") {
        openTaskModal();
        return true;
      }
      if (action === "close-task-modal") {
        closeTaskModal();
        return true;
      }
      if (action === "toggle-task-menu") {
        event.stopPropagation();
        const taskId = Number(target.dataset.id);
        if (Number.isFinite(taskId)) {
          toggleTaskMenu(taskId);
        }
        return true;
      }
      if (action === "mark-task-completed") {
        const taskId = Number(target.dataset.id);
        const task = state.tasks.find((item) => item.id === taskId);
        if (task) {
          task.status = "completed";
          renderTasks(getFilteredTasks());
          alert("Task marked as completed!");
        }
        closeMenus();
        return true;
      }
      if (action === "reschedule-task") {
        alert("Reschedule feature coming soon!");
        closeMenus();
        return true;
      }
      if (action === "view-task-lead") {
        window.location.href = "sales-leads.php";
        closeMenus();
        return true;
      }
      if (action === "add-task-note") {
        alert("Add note feature coming soon!");
        closeMenus();
        return true;
      }
      if (action === "edit-task") {
        alert("Edit task feature coming soon!");
        closeMenus();
        return true;
      }

      return false;
    }

    function onDocumentClick(event) {
      if (!event.target.closest(".actions")) {
        closeMenus();
      }
    }

    return { init, handleAction, onDocumentClick };
  }

  function createReportsModule() {
    let chartInstance = null;

    const weeklyData = {
      leadsHandled: 45,
      leadsConverted: 12,
      dealsClosed: 10,
      hot: 15,
      warm: 20,
      cold: 10,
      converted: 12,
      conversionRate: "26.7%",
      avgLeadTime: "3.2 days",
      dealValue: "AED 450K",
      targetAchievement: "82%",
      chart: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        leads: [5, 10, 8, 12, 15, 8, 7],
        deals: [2, 3, 1, 4, 2, 1, 1]
      }
    };

    const monthlyData = {
      leadsHandled: 180,
      leadsConverted: 48,
      dealsClosed: 40,
      hot: 60,
      warm: 80,
      cold: 40,
      converted: 48,
      conversionRate: "26.7%",
      avgLeadTime: "4.5 days",
      dealValue: "AED 1.8M",
      targetAchievement: "92%",
      chart: {
        labels: ["W1", "W2", "W3", "W4"],
        leads: [40, 50, 45, 45],
        deals: [10, 12, 8, 10]
      }
    };

    function init() {
      updateReports(weeklyData);
    }

    function updateReports(data) {
      animateCounter(byId("leadsHandled"), data.leadsHandled);
      animateCounter(byId("leadsConverted"), data.leadsConverted);
      animateCounter(byId("dealsClosed"), data.dealsClosed);
      animateCounter(byId("hotCount"), data.hot);
      animateCounter(byId("warmCount"), data.warm);
      animateCounter(byId("coldCount"), data.cold);
      animateCounter(byId("convertedCount"), data.converted);

      const conversionRate = byId("conversionRate");
      const avgLeadTime = byId("avgLeadTime");
      const dealValue = byId("dealValue");
      const targetAchievement = byId("targetAchievement");

      if (conversionRate) conversionRate.textContent = data.conversionRate;
      if (avgLeadTime) avgLeadTime.textContent = data.avgLeadTime;
      if (dealValue) dealValue.textContent = data.dealValue;
      if (targetAchievement) targetAchievement.textContent = data.targetAchievement;

      updateChart(data.chart);
    }

    function updateChart(chartData) {
      if (!window.Chart) return;

      const canvas = byId("performanceChart");
      if (!canvas) return;

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new window.Chart(canvas, {
        type: "bar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Leads Handled",
              data: chartData.leads,
              backgroundColor: "rgba(26, 90, 143, 0.8)",
              borderColor: "#1a5a8f",
              borderWidth: 2,
              borderRadius: 8,
              hoverBackgroundColor: "#0b3e66"
            },
            {
              label: "Deals Closed",
              data: chartData.deals,
              backgroundColor: "rgba(22, 163, 74, 0.8)",
              borderColor: "#16a34a",
              borderWidth: 2,
              borderRadius: 8,
              hoverBackgroundColor: "#15803d"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom"
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    function setActivePeriod(period) {
      queryAll(".toggle-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.period === period);
      });
      updateReports(period === "month" ? monthlyData : weeklyData);
    }

    function handleAction(action, target) {
      if (action === "toggle-period") {
        setActivePeriod(target.dataset.period === "month" ? "month" : "week");
        return true;
      }

      return false;
    }

    return { init, handleAction };
  }

  function createNotificationsModule() {
    const state = {
      notifications: [
        { id: 1, title: "New Lead: Ahmed Khan", message: "A hot lead Ahmed Khan has been added to your pipeline.", time: "2 minutes ago", type: "leads", unread: true },
        { id: 2, title: "Task Completed: Follow-up with XYZ Tech", message: "Follow-up with XYZ Technologies has been marked as completed.", time: "15 minutes ago", type: "tasks", unread: true },
        { id: 3, title: "Invoice Generated: Rashid Ali", message: "An invoice for AED 25,000 has been generated for Rashid Ali.", time: "1 hour ago", type: "invoices", unread: true },
        { id: 4, title: "Lead Status Updated: Global Solutions", message: "Global Solutions was moved from Cold to Warm status.", time: "3 hours ago", type: "leads", unread: false },
        { id: 5, title: "New Task Assigned: Send Proposal", message: "Send the service proposal to Nadia Trading by tomorrow.", time: "5 hours ago", type: "tasks", unread: false },
        { id: 6, title: "Monthly Target Reached", message: "The team has reached 92% of the monthly sales target.", time: "Yesterday at 2:30 PM", type: "system", unread: false }
      ],
      activeFilter: "all"
    };
    function init() {
      render(getFilteredNotifications());
      updateBadge();
    }

    function getFilteredNotifications() {
      if (state.activeFilter === "all") {
        return [...state.notifications];
      }
      if (state.activeFilter === "unread") {
        return state.notifications.filter((item) => item.unread);
      }
      return state.notifications.filter((item) => item.type === state.activeFilter);
    }

    function setActiveTab(filter) {
      queryAll(".tabs span").forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.filter === filter);
      });
    }

    function render(notifications) {
      const container = byId("notificationsList");
      if (!container) return;

      if (notifications.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon"><i class="fas fa-bell"></i></div><div class="empty-title">No Notifications</div><div class="empty-text">You are all caught up. Check back later for updates.</div></div>';
        return;
      }

      const grouped = {
        leads: notifications.filter((item) => item.type === "leads"),
        tasks: notifications.filter((item) => item.type === "tasks"),
        invoices: notifications.filter((item) => item.type === "invoices"),
        system: notifications.filter((item) => item.type === "system")
      };

      let html = "";
      html += renderGroup("leads", "LEAD NOTIFICATIONS", grouped.leads);
      html += renderGroup("tasks", "TASK NOTIFICATIONS", grouped.tasks);
      html += renderGroup("invoices", "INVOICE NOTIFICATIONS", grouped.invoices);
      html += renderGroup("system", "SYSTEM NOTIFICATIONS", grouped.system);
      container.innerHTML = html;
    }

    function renderGroup(type, label, items) {
      if (items.length === 0) return "";

      let html = '<div class="notification-group notification-group--' + type + '">' + label + " (" + items.length + ")</div>";
      items.forEach((item) => {
        html += renderItem(item);
      });

      return html;
    }

    function renderItem(notification) {
      const badgeClassMap = {
        leads: "lead",
        tasks: "task",
        invoices: "invoice",
        system: "system"
      };
      const badgeClass = badgeClassMap[notification.type] || "system";

      return (
        '<div class="notification-item ' + (notification.unread ? "unread" : "") + '" data-id="' + notification.id + '" data-action="mark-notification-read">' +
        '<div class="notification-content">' +
        '<div class="notification-body">' +
        '<div class="notification-header"><div><div class="notification-title">' + notification.title + '</div><div class="notification-time">' + notification.time + "</div></div></div>" +
        '<div class="notification-message">' + notification.message + "</div>" +
        '<span class="status-badge ' + badgeClass + '">' + notification.type.toUpperCase() + "</span>" +
        "</div>" +
        '<div class="notification-action" data-action="delete-notification" data-id="' + notification.id + '">x</div>' +
        "</div>" +
        "</div>"
      );
    }

    function removeNotification(id) {
      const item = query('.notification-item[data-id="' + id + '"]');
      if (!item) return;

      item.classList.add("is-removing");
      setTimeout(() => {
        state.notifications = state.notifications.filter((notification) => notification.id !== id);
        render(getFilteredNotifications());
        updateBadge();
      }, 300);
    }

    function markRead(id) {
      const notification = state.notifications.find((item) => item.id === id);
      if (!notification) return;
      notification.unread = false;
      render(getFilteredNotifications());
      updateBadge();
    }

    function updateBadge() {
      const badge = query(".notification-badge");
      if (!badge) return;
      const unreadCount = state.notifications.filter((item) => item.unread).length;
      badge.textContent = String(unreadCount || 0);
    }

    function handleAction(action, target, event) {
      if (action === "filter-notifications") {
        state.activeFilter = target.dataset.filter || "all";
        setActiveTab(state.activeFilter);
        render(getFilteredNotifications());
        return true;
      }
      if (action === "delete-notification") {
        event.stopPropagation();
        const id = Number(target.dataset.id);
        if (Number.isFinite(id)) {
          removeNotification(id);
        }
        return true;
      }
      if (action === "mark-notification-read") {
        const id = Number(target.dataset.id);
        if (Number.isFinite(id)) {
          markRead(id);
        }
        return true;
      }

      return false;
    }

    return { init, handleAction };
  }
})();
