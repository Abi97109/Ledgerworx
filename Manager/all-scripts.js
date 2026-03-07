(function () {
  'use strict';

  function byId(id) { return document.getElementById(id); }
  function hasBodyClass(cls) { return document.body && document.body.classList.contains(cls); }

  function initStaffNavbar() {
    const userProfile = byId('userProfile');
    const profileDropdown = byId('profileDropdown');
    const themeToggle = byId('themeToggle');
    const toggleSwitch = byId('toggleSwitch');
    const themeIcon = byId('themeIcon');
    const themeText = byId('themeText');

    if (userProfile && profileDropdown) {
      userProfile.addEventListener('click', function (e) {
        e.stopPropagation();
        userProfile.classList.toggle('active');
        profileDropdown.classList.toggle('active');
      });

      document.addEventListener('click', function (e) {
        if (!profileDropdown.contains(e.target) && !userProfile.contains(e.target)) {
          userProfile.classList.remove('active');
          profileDropdown.classList.remove('active');
        }
      });
    }

    if (themeToggle && toggleSwitch && themeIcon && themeText) {
      const applyTheme = function (isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        document.body.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('dark', isDark);
        toggleSwitch.classList.toggle('active', isDark);
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      };

      const savedTheme = localStorage.getItem('theme') || 'light';
      applyTheme(savedTheme === 'dark');

      themeToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }
  }

  function initHome() {
    if (!hasBodyClass('page-home')) return;

    const tip = byId('tooltip-popup');
    const profileTrigger = byId('profile-trigger');
    const profileDropdown = byId('profile-dropdown');

    if (profileTrigger && profileDropdown) {
      profileTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
      });
      window.addEventListener('click', function () { profileDropdown.classList.remove('show'); });
    }

    const overallRevenueData = {
      week: { main: 'AED 231,590', growth: '+40%', refund: '2.5%', online: '+23.4%', summary: 'Performance is strong this week with a 40% growth rate. Online sales are driving 23.4% of total volume, while refunds remain low at 2.5%.' },
      month: { main: 'AED 942,000', growth: '+12%', refund: '1.8%', online: '+15.2%', summary: 'Steady monthly progress observed. While growth cooled to 12%, refund rates optimized to 1.8%, indicating higher customer satisfaction across the board.' },
      year: { main: 'AED 11,250,000', growth: '+28%', refund: '3.2%', online: '+42.7%', summary: 'Exceptional annual performance with 11.25M AED in revenue. Significant shifts toward online channels (42.7%) highlight a successful digital transformation.' }
    };

    const accountData = { year: { r: 60, c: 40 }, month: { r: 75, c: 25 }, week: { r: 85, c: 15 } };
    const clientData = {
      year: { l: 92, c: 68, lCol: '#94a3b8', cCol: '#2f7f7a' },
      month: { l: 65, c: 42, lCol: '#3b82f6', cCol: '#2f7f7a' },
      week: { l: 48, c: 30, lCol: '#5c6bc0', cCol: '#4db6ac' }
    };

    window.showTip = function (e, text) {
      if (!tip) return;
      tip.innerText = text;
      tip.style.display = 'block';
      tip.style.left = (e.pageX + 15) + 'px';
      tip.style.top = (e.pageY - 30) + 'px';
    };
    window.hideTip = function () { if (tip) tip.style.display = 'none'; };

    window.updateOverallRevenue = function (period) {
      const d = overallRevenueData[period];
      if (!d) return;
      if (byId('rev-main-val')) byId('rev-main-val').innerText = d.main;
      if (byId('rev-growth-val')) byId('rev-growth-val').innerText = d.growth;
      if (byId('rev-refund-val')) byId('rev-refund-val').innerText = d.refund;
      if (byId('rev-online-val')) byId('rev-online-val').innerText = d.online;
      if (byId('rev-summary-text')) byId('rev-summary-text').innerText = d.summary;
    };

    window.toggleSalesSet = function (cls, show) {
      document.querySelectorAll('#sales-container .bar.' + cls).forEach(function (b) { b.classList.toggle('hide-bar', !show); });
    };

    window.switchAccountView = function (sel) {
      ['year', 'month', 'week'].forEach(function (t) { const el = byId('a-tog-' + t); if (el) el.checked = (t === sel); });
      const data = accountData[sel];
      const rSlice = byId('pie-r');
      const cSlice = byId('pie-c');
      const interactor = byId('pie-interactor');
      if (!data || !rSlice || !cSlice || !interactor) return;

      rSlice.style.background = 'conic-gradient(var(--primary) ' + data.r + '%, transparent 0)';
      cSlice.style.background = 'conic-gradient(transparent ' + data.r + '%, var(--secondary) 0)';
      if (byId('leg-r-val')) byId('leg-r-val').innerText = data.r + '%';
      if (byId('leg-c-val')) byId('leg-c-val').innerText = data.c + '%';

      interactor.onmousemove = function (e) {
        const rect = interactor.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        let angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
        if (angle < (data.r / 100) * 360) window.showTip(e, 'Receivables (' + sel + '): ' + data.r + '%');
        else window.showTip(e, 'Cash (' + sel + '): ' + data.c + '%');
      };
    };

    function animateCounter(el, target) {
      let curr = parseInt(el.innerText, 10) || 0;
      const diff = target - curr;
      const step = diff / 20;
      let i = 0;
      const timer = setInterval(function () {
        i += 1;
        el.innerText = Math.floor(curr + (step * i)) + '%';
        if (i >= 20) { el.innerText = target + '%'; clearInterval(timer); }
      }, 30);
    }

    window.switchClientView = function (sel) {
      ['year', 'month', 'week'].forEach(function (t) { const el = byId('c-tog-' + t); if (el) el.checked = (t === sel); });
      const d = clientData[sel];
      const lFill = byId('leads-fill');
      const cFill = byId('cust-fill');
      const lTxt = byId('leads-txt');
      const cTxt = byId('cust-txt');
      const lTrack = byId('l-track');
      const cTrack = byId('c-track');
      if (!d || !lFill || !cFill || !lTxt || !cTxt || !lTrack || !cTrack) return;

      lFill.style.width = d.l + '%';
      lFill.style.backgroundColor = d.lCol;
      cFill.style.width = d.c + '%';
      cFill.style.backgroundColor = d.cCol;
      lTrack.onmouseover = function (e) { window.showTip(e, 'Leads (' + sel + '): ' + d.l + '%'); };
      cTrack.onmouseover = function (e) { window.showTip(e, 'Conversion (' + sel + '): ' + d.c + '%'); };
      animateCounter(lTxt, d.l);
      animateCounter(cTxt, d.c);
    };

    window.switchAccountView('week');
    window.switchClientView('week');
  }

  function initSales() {
    if (!hasBodyClass('page-sales')) return;

    const dashboardData = {
      day: { sales: 'AED 1,500', revenue: 'AED 12k', leads: '5', conv: '20.0%', target: '5%', trends: ['Down 2% vs yesterday', 'Up 5% vs yesterday', '+1 vs yesterday', 'Stable'], funnel: [5, 4, 3, 2, 1, 1], funnelWidths: ['100%', '80%', '60%', '40%', '20%', '20%'], leadsTable: [{ name: 'Daily Client A', source: 'Call', stage: 'Interested', rep: 'Akram', val: 'AED 5k' }, { name: 'Retail Walk-in', source: 'Direct', stage: 'Contacted', rep: 'Rami', val: 'AED 2k' }] },
      week: { sales: 'AED 12,800', revenue: 'AED 250k', leads: '32', conv: '28.5%', target: '22%', trends: ['Up 8% vs last week', 'Up 10% vs last week', '+5 vs last week', 'Avg 12 days to close'], funnel: [32, 28, 20, 15, 12, 9], funnelWidths: ['100%', '85%', '70%', '55%', '40%', '25%'], leadsTable: [{ name: 'Weekly Ops', source: 'Website', stage: 'Negotiation', rep: 'Rami', val: 'AED 20k' }, { name: 'Fast Track', source: 'Referral', stage: 'Interested', rep: 'Karim', val: 'AED 12k' }] },
      month: { sales: 'AED 45,200', revenue: 'AED 1.25M', leads: '124', conv: '33.9%', target: '85%', trends: ['Up 12% vs last month', 'Up 24% vs last month', '+26.5% vs last month', 'Avg 15 days to close'], funnel: [124, 110, 86, 60, 47, 42], funnelWidths: ['100%', '85%', '70%', '55%', '40%', '25%'], leadsTable: [{ name: 'Ahmed Startup', source: 'Website', stage: 'Negotiation', rep: 'Akram', val: 'AED 80k' }, { name: 'Seema Ops', source: 'Referral', stage: 'Interested', rep: 'Rami', val: 'AED 45k' }, { name: 'Beta Traders', source: 'Website', stage: 'Interested', rep: 'Karim', val: 'AED 65k' }] },
      year: { sales: 'AED 580,000', revenue: 'AED 15.4M', leads: '1,540', conv: '41.2%', target: '98%', trends: ['Up 15% vs 2024', 'Up 30% vs 2024', '+12% vs 2024', 'Avg 10 days to close'], funnel: [1540, 1200, 950, 800, 650, 634], funnelWidths: ['100%', '80%', '65%', '55%', '45%', '42%'], leadsTable: [{ name: 'Annual Corp', source: 'Partner', stage: 'Interested', rep: 'Akram', val: 'AED 500k' }, { name: 'Global Ltd', source: 'Website', stage: 'Negotiation', rep: 'Rami', val: 'AED 1.2M' }] }
    };

    window.updateDashboard = function (timeframe, btn) {
      document.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
      const data = dashboardData[timeframe];
      if (!data) return;

      const setText = function (id, v) { const el = byId(id); if (el) el.innerText = v; };
      setText('val-sales', data.sales); setText('val-revenue', data.revenue); setText('val-leads', data.leads); setText('val-conv', data.conv); setText('val-target', data.target);
      setText('trend-sales', data.trends[0]); setText('trend-revenue', data.trends[1]); setText('trend-leads', data.trends[2]); setText('trend-conv', data.trends[3]);

      for (let i = 0; i < 6; i++) {
        setText('f' + (i + 1), data.funnel[i]);
        const bar = byId('bar' + (i + 1));
        if (bar) bar.style.width = data.funnelWidths[i];
      }

      const tbody = document.querySelector('#lead-table tbody');
      if (!tbody) return;
      tbody.innerHTML = '';
      data.leadsTable.forEach(function (row) {
        let badgeClass = 'status-interested';
        if (row.stage === 'Negotiation') badgeClass = 'status-negotiation';
        if (row.stage === 'Contacted') badgeClass = 'status-contacted';
        tbody.innerHTML += '<tr><td>' + row.name + '</td><td>' + row.source + '</td><td><span class="status-badge ' + badgeClass + '">' + row.stage + '</span></td><td>' + row.rep + '</td><td>' + row.val + '</td></tr>';
      });
    };

    window.updateDashboard('day', byId('default-toggle'));
  }

  function initAccounts() {
    if (!hasBodyClass('page-accounts') || typeof Chart === 'undefined') return;

    let currentPeriod = 'month';
    let currentChartType = 'line';
    let showPaid = true;
    let showPending = true;
    let mainChart;
    let statusPieChart;

    const dataController = {
      week: { rev: 'AED 92,500', rec: 'AED 71,000', pen: 'AED 16,500', ovd: 'AED 5,000', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [12000, 18000, 9000, 24000, 19000, 5500, 5000], status: [77, 23], paid: [{ n: 'Al Tayer Motors', i: '#W-101', a: 'AED 12,000' }], pending: [{ n: 'Local Cafe', i: '#W-102', a: 'AED 3,400' }] },
      month: { rev: 'AED 1,250,000', rec: 'AED 950,000', pen: 'AED 254,000', ovd: 'AED 46,000', labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], values: [300000, 450000, 200000, 300000], status: [75, 25], paid: [{ n: 'NexGen Tech', i: 'INV-1100', a: 'AED 900,000' }], pending: [{ n: 'Global Ventures', i: 'INV-1055', a: 'AED 179,000' }] },
      year: { rev: 'AED 14.2M', rec: 'AED 12.8M', pen: 'AED 1.1M', ovd: 'AED 300k', labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [3200000, 4100000, 3500000, 3400000], status: [92, 8], paid: [{ n: 'Emirates Group', i: 'Y-2024-01', a: 'AED 8.2M' }], pending: [{ n: 'SME Logistics', i: 'Y-2024-88', a: 'AED 1.1M' }] }
    };

    function initCharts() {
      const m = byId('mainChart');
      const s = byId('statusPieChart');
      if (!m || !s) return;
      mainChart = new Chart(m.getContext('2d'), { type: 'line', data: { labels: [], datasets: [{ data: [], tension: 0.4, fill: true }] }, options: { responsive: true, maintainAspectRatio: false } });
      statusPieChart = new Chart(s.getContext('2d'), {
        type: 'doughnut',
        data: { labels: ['Paid', 'Pending'], datasets: [{ data: [], backgroundColor: ['#3E8B83', '#E9EDF7'], hoverOffset: 35, borderWidth: 5, borderColor: '#ffffff' }] },
        options: { maintainAspectRatio: false, cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
      });
    }

    window.changeChartType = function (type, btn) {
      document.querySelectorAll('.type-btn').forEach(function (b) { b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
      currentChartType = type;
      const data = dataController[currentPeriod];
      if (mainChart) mainChart.destroy();
      const mainEl = byId('mainChart');
      if (!mainEl) return;
      mainChart = new Chart(mainEl.getContext('2d'), {
        type: type,
        data: { labels: data.labels, datasets: [{ data: data.values, backgroundColor: type === 'pie' ? ['#3E8B83', '#4318FF', '#FFB547', '#EE5D50', '#A3AED0', '#05CD99'] : 'rgba(62, 139, 131, 0.2)', borderColor: type === 'pie' ? '#fff' : '#3E8B83', borderWidth: type === 'pie' ? 4 : 2, tension: type === 'line' ? 0.4 : 0, fill: true, hoverOffset: type === 'pie' ? 40 : 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: type === 'pie', position: 'bottom' } }, scales: type === 'pie' ? { x: { display: false }, y: { display: false } } : { y: { beginAtZero: true } } }
      });
    };

    window.setPeriod = function (p, btn) {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
      currentPeriod = p;
      updateDashboard();
    };

    window.toggleStatus = function (s) {
      if (s === 'paid') { showPaid = !showPaid; const e = byId('tgl-paid'); if (e) e.classList.toggle('active-paid'); }
      else { showPending = !showPending; const e2 = byId('tgl-pending'); if (e2) e2.classList.toggle('active-pending'); }
      renderTable();
    };

    function updateDashboard() {
      const d = dataController[currentPeriod];
      ['rev', 'rec', 'pen', 'ovd'].forEach(function (k) { const el = byId('stat-' + k); if (el) el.innerText = d[k]; });
      window.changeChartType(currentChartType, document.querySelector('.type-btn[onclick*="' + currentChartType + '"]'));
      if (statusPieChart) { statusPieChart.data.datasets[0].data = d.status; statusPieChart.update(); }
      renderTable();
    }

    function renderTable() {
      const d = dataController[currentPeriod];
      let list = [];
      if (showPaid) list = list.concat(d.paid.map(function (x) { return Object.assign({}, x, { type: 'paid' }); }));
      if (showPending) list = list.concat(d.pending.map(function (x) { return Object.assign({}, x, { type: 'pending' }); }));
      const tbody = document.querySelector('#data-table tbody');
      if (!tbody) return;
      tbody.innerHTML = list.map(function (row) { return '<tr><td>' + row.n + '</td><td>' + row.i + '</td><td>' + row.a + '</td><td><span class="status-badge badge-' + row.type + '">' + row.type.toUpperCase() + '</span></td></tr>'; }).join('');
    }

    initCharts();
    updateDashboard();
  }

  function initReports() {
    if (!hasBodyClass('page-reports') || typeof Chart === 'undefined') return;

    const chartPresets = {
      day: { labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'], revenue: [4000, 15000, 8000, 19000, 25000, 12000], payments: [3000, 10000, 7000, 14000, 20000, 9000], status: [12, 5, 2] },
      week: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], revenue: [40000, 52000, 48000, 65000, 60000, 30000, 25000], payments: [35000, 45000, 42000, 58000, 55000, 25000, 20000], status: [38, 11, 4] },
      month: { labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'], revenue: [120000, 160000, 140000, 230000, 260000, 330000], payments: [90000, 130000, 110000, 190000, 220000, 280000], status: [152, 36, 22] },
      year: { labels: ['2022', '2023', '2024', '2025', '2026'], revenue: [1200000, 1800000, 2400000, 2900000, 3500000], payments: [1100000, 1600000, 2100000, 2600000, 3200000], status: [620, 140, 88] }
    };

    let mainChart;
    let statusChart;

    function updateStatusLegend(statusData) {
      if (byId('legend-paid')) byId('legend-paid').textContent = statusData[0];
      if (byId('legend-pending')) byId('legend-pending').textContent = statusData[1];
      if (byId('legend-overdue')) byId('legend-overdue').textContent = statusData[2];
    }

    function initializeDashboard() {
      const r = byId('revenueChart');
      const s = byId('statusChart');
      if (!r || !s) return;

      mainChart = new Chart(r.getContext('2d'), {
        type: 'line',
        data: {
          labels: chartPresets.month.labels,
          datasets: [
            { label: 'Revenue', data: chartPresets.month.revenue, borderColor: '#4318FF', backgroundColor: 'rgba(67, 24, 255, 0.08)', tension: 0.4, fill: true, pointRadius: 0, pointHoverRadius: 10, pointHoverBackgroundColor: '#4318FF', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 4 },
            { label: 'Payments', data: chartPresets.month.payments, borderColor: '#05CD99', backgroundColor: 'rgba(5, 205, 153, 0.08)', tension: 0.4, fill: true, pointRadius: 0, pointHoverRadius: 10, pointHoverBackgroundColor: '#05CD99', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 4 }
          ]
        },
        options: { maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#F4F7FE' } }, x: { grid: { display: false } } } }
      });

      statusChart = new Chart(s.getContext('2d'), { type: 'doughnut', data: { labels: ['Paid', 'Pending', 'Overdue'], datasets: [{ data: chartPresets.month.status, backgroundColor: ['#05CD99', '#4318FF', '#EE5D50'], hoverOffset: 35, borderWidth: 0 }] }, options: { cutout: '80%', maintainAspectRatio: false, plugins: { legend: { display: false } } } });
      updateStatusLegend(chartPresets.month.status);
    }

    window.updateMainChart = function () {
      const select = byId('revTimeframe');
      if (!select || !mainChart || !statusChart) return;
      const data = chartPresets[select.value];
      if (!data) return;
      mainChart.data.labels = data.labels;
      mainChart.data.datasets[0].data = data.revenue;
      mainChart.data.datasets[1].data = data.payments;
      mainChart.update();
      statusChart.data.datasets[0].data = data.status;
      statusChart.update();
      updateStatusLegend(data.status);
    };

    initializeDashboard();
  }

  function initClients() {
    if (!hasBodyClass('page-clients') || typeof Chart === 'undefined') return;

    const APP_DATA = {
      day: { kpis: ['324', '+0.2%', '245', '+0.1%', '2', '+100%', '1', '-50%'], chart: { labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM', '11:59 PM'], values: [298, 301, 307, 314, 320, 318, 321, 323, 324] }, regions: { 'Kochi Central': { total: 12, active: 10, renew: 2 }, 'Trivandrum South': { total: 8, active: 7, renew: 1 }, 'Calicut North': { total: 5, active: 4, renew: 1 } }, table: [{ id: 101, name: 'Global Logistics Hub', project: 'Annual Audit', status: 'Active', manager: 'Akram Khan', expiry: 'Oct 2025' }, { id: 102, name: 'Alpha Tech Systems', project: 'VAT Filing', status: 'Pending', manager: 'Karim Zada', expiry: 'Nov 2025' }] },
      week: { kpis: ['330', '+1.5%', '250', '+1.2%', '8', '+40%', '4', '-10%'], chart: { labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], values: [321, 324, 326, 327, 329, 330, 330] }, regions: { 'Kochi Central': { total: 45, active: 40, renew: 5 }, 'Trivandrum South': { total: 32, active: 28, renew: 4 }, 'Calicut North': { total: 18, active: 15, renew: 3 }, 'Dubai Hub': { total: 12, active: 10, renew: 2 } }, table: [{ id: 201, name: 'Emirates Trading Group', project: 'Corporate Setup', status: 'Active', manager: 'Akram Khan', expiry: 'Jan 2026' }, { id: 202, name: 'Al Noor Medicals', project: 'VAT Quarterly', status: 'Pending', manager: 'Karim Zada', expiry: 'Jul 2025' }, { id: 203, name: 'Z-Tech Solutions', project: 'Payroll Support', status: 'Active', manager: 'Yasmeen B', expiry: 'Dec 2025' }] },
      month: { kpis: ['353', '+5.2%', '280', '+4.7%', '16', '+14.3%', '8', '-11.1%'], chart: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], values: [180, 195, 210, 228, 246, 268, 289, 307, 322, 336, 345, 353] }, regions: { 'Kochi Central': { total: 140, active: 120, renew: 20 }, 'Trivandrum South': { total: 95, active: 80, renew: 15 }, 'Calicut North': { total: 50, active: 42, renew: 8 }, 'Dubai Hub': { total: 28, active: 22, renew: 6 }, 'London Office': { total: 24, active: 20, renew: 4 }, 'Singapore Hub': { total: 16, active: 14, renew: 2 } }, table: [{ id: 301, name: 'Future Innovations LLC', project: 'Import License', status: 'Pending', manager: 'Yasmeen B', expiry: 'May 2026' }, { id: 302, name: 'Bright Solutions Intl', project: 'Bookkeeping', status: 'Active', manager: 'Omar F', expiry: 'Aug 2026' }, { id: 303, name: 'Cityscape Properties', project: 'Audit Services', status: 'Active', manager: 'Ahmed Ali', expiry: 'Jun 2026' }, { id: 304, name: 'NexGen Tech Industries', project: 'License Renewal', status: 'Expired', manager: 'Ahmed Ali', expiry: 'May 2024' }, { id: 305, name: 'Blue Sky Trading', project: 'Mainland Setup', status: 'Active', manager: 'Karim Zada', expiry: 'Jan 2026' }, { id: 306, name: 'Paramount Media', project: 'VAT Compliance', status: 'Pending', manager: 'Akram Khan', expiry: 'Feb 2026' }, { id: 307, name: 'Apex Global Consulting', project: 'Tax Advisory', status: 'Active', manager: 'Yasmeen B', expiry: 'Apr 2026' }] },
      year: { kpis: ['410', '+16.1%', '336', '+20.0%', '42', '+18.8%', '12', '-9.2%'], chart: { labels: ['2021', '2022', '2023', '2024', '2025', '2026'], values: [210, 260, 315, 353, 384, 410] }, regions: { 'Kochi Central': { total: 180, active: 152, renew: 28 }, 'Trivandrum South': { total: 132, active: 110, renew: 22 }, 'Calicut North': { total: 74, active: 60, renew: 14 }, 'Dubai Hub': { total: 44, active: 34, renew: 10 }, 'London Office': { total: 36, active: 29, renew: 7 }, 'Singapore Hub': { total: 24, active: 19, renew: 5 } }, table: [{ id: 401, name: 'Future Innovations LLC', project: 'Import License', status: 'Pending', manager: 'Yasmeen B', expiry: 'May 2026' }, { id: 402, name: 'Bright Solutions Intl', project: 'Bookkeeping', status: 'Active', manager: 'Omar F', expiry: 'Aug 2026' }, { id: 403, name: 'Cityscape Properties', project: 'Audit Services', status: 'Active', manager: 'Ahmed Ali', expiry: 'Jun 2026' }, { id: 404, name: 'NexGen Tech Industries', project: 'License Renewal', status: 'Expired', manager: 'Ahmed Ali', expiry: 'May 2024' }, { id: 405, name: 'Blue Sky Trading', project: 'Mainland Setup', status: 'Active', manager: 'Karim Zada', expiry: 'Jan 2026' }, { id: 406, name: 'Paramount Media', project: 'VAT Compliance', status: 'Pending', manager: 'Akram Khan', expiry: 'Feb 2026' }, { id: 407, name: 'Apex Global Consulting', project: 'Tax Advisory', status: 'Active', manager: 'Yasmeen B', expiry: 'Apr 2026' }] }
    };

    let currentView = 'month';
    let growthChartInstance = null;

    window.updateRegionStats = function (name, pill) {
      document.querySelectorAll('.tab-pill').forEach(function (p) { p.classList.remove('active'); });
      if (pill) pill.classList.add('active');
      const stats = APP_DATA[currentView].regions[name];
      if (!stats) return;
      ['total', 'active', 'renew'].forEach(function (k) {
        const id = 'reg-' + k;
        const el = byId(id);
        if (el) el.innerText = stats[k];
      });
    };

    window.setView = function (timeframe, btn) {
      currentView = timeframe;
      document.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
      const data = APP_DATA[timeframe];
      if (!data) return;

      ['total', 'active', 'new', 'risk'].forEach(function (key, i) {
        const k = byId('kpi-' + key);
        const d = byId('diff-' + key);
        if (k) k.innerText = data.kpis[i * 2];
        if (d) {
          d.innerText = data.kpis[i * 2 + 1] + ' vs prev';
          d.className = data.kpis[i * 2 + 1].includes('+') ? 'stat-diff diff-up' : 'stat-diff diff-down';
        }
      });

      const regionContainer = byId('region-list');
      if (regionContainer) {
        regionContainer.innerHTML = '';
        Object.keys(data.regions).forEach(function (name, idx) {
          const pill = document.createElement('div');
          pill.className = 'tab-pill ' + (idx === 0 ? 'active' : '');
          pill.innerText = name;
          pill.onclick = function () { window.updateRegionStats(name, pill); };
          regionContainer.appendChild(pill);
        });
        window.updateRegionStats(Object.keys(data.regions)[0], regionContainer.firstChild);
      }

      const tbody = byId('tableBody');
      if (tbody) {
        tbody.innerHTML = '';
        data.table.forEach(function (client) {
          const s = client.status.toLowerCase();
          const badgeClass = s === 'active' ? 'bg-active' : (s === 'pending' ? 'bg-pending' : 'bg-expired');
          tbody.innerHTML += '<tr data-name="' + client.name + '"><td><strong>' + client.name + '</strong></td><td>' + client.project + '</td><td><span class="badge ' + badgeClass + '">' + client.status + '</span></td><td>' + client.manager + '</td><td>' + client.expiry + '</td><td><button class="btn btn-outline" style="padding:4px 8px;"><i class="fas fa-ellipsis-v"></i></button></td></tr>';
        });
      }

      if (byId('count-visible')) byId('count-visible').innerText = data.table.length;
      if (byId('count-total')) byId('count-total').innerText = timeframe === 'month' ? '353' : (timeframe === 'year' ? '410' : '330');

      updateGrowthChartData(timeframe);
      updateGrowthChartViewport(timeframe);
    };

    window.handleSearch = function () {
      const input = byId('clientSearch');
      if (!input) return;
      const term = input.value.toUpperCase();
      const rows = document.querySelectorAll('#tableBody tr');
      let visibleCount = 0;
      rows.forEach(function (row) {
        const text = row.innerText.toUpperCase();
        if (text.includes(term)) { row.style.display = ''; visibleCount += 1; }
        else row.style.display = 'none';
      });
      if (byId('count-visible')) byId('count-visible').innerText = visibleCount;
    };

    function initializeCharts() {
      const canvas = byId('growthChart');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (growthChartInstance) growthChartInstance.destroy();
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(62, 139, 131, 0.25)');
      gradient.addColorStop(1, 'rgba(62, 139, 131, 0)');

      growthChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels: APP_DATA[currentView].chart.labels, datasets: [{ label: 'Client Count', data: APP_DATA[currentView].chart.values, borderColor: '#3E8B83', backgroundColor: gradient, borderWidth: 3, fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#fff', pointBorderWidth: 2 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false, beginAtZero: false }, x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 }, autoSkip: false, maxRotation: 0, minRotation: 0 } } } }
      });
    }

    function updateGrowthChartData(timeframe) {
      if (!growthChartInstance || !APP_DATA[timeframe]) return;
      growthChartInstance.data.labels = APP_DATA[timeframe].chart.labels;
      growthChartInstance.data.datasets[0].data = APP_DATA[timeframe].chart.values;
      growthChartInstance.update();
    }

    function updateGrowthChartViewport(timeframe) {
      const wrap = byId('growthChartWrap');
      const canvas = byId('growthChart');
      if (!wrap || !canvas) return;
      if (timeframe === 'month') {
        wrap.classList.add('month-scroll');
        canvas.style.width = '920px';
        canvas.style.minWidth = '920px';
        canvas.style.maxWidth = 'none';
      } else {
        wrap.classList.remove('month-scroll');
        canvas.style.width = '100%';
        canvas.style.minWidth = '100%';
        canvas.style.maxWidth = '100%';
        wrap.scrollLeft = 0;
      }
      if (growthChartInstance) growthChartInstance.resize();
    }

    initializeCharts();
    window.setView('month', byId('view-month'));
  }

  function initProfile() {
    if (!hasBodyClass('page-profile')) return;
    const fileInput = byId('profile-upload');
    const avatarImg = byId('avatar-img');
    const avatarInitials = byId('avatar-initials');
    const avatarDataInput = byId('avatar_data');
    if (!fileInput || !avatarImg || !avatarDataInput) return;

    fileInput.addEventListener('change', function () {
      const file = this.files && this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarImg.src = e.target.result;
        avatarImg.style.display = 'block';
        if (avatarInitials) avatarInitials.style.display = 'none';
        avatarDataInput.value = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function initClient() {
    if (!hasBodyClass('page-client')) return;
    window.updateView = function (timeframe, btn) {
      document.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
      console.log('Switching view to: ' + timeframe);
    };
  }

  function initSettings() {
    if (!hasBodyClass('page-settings')) return;

    let verifiedOnce = false;
    const mainToggle = byId('twoStepToggle');
    if (mainToggle && mainToggle.checked) verifiedOnce = true;

    async function sync2FA(state) {
      try {
        await fetch('sync_2fa.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'enabled=' + (state ? 1 : 0)
        });
      } catch (_err) {
        console.error('Sync failed');
      }
    }

    window.handleToggle = function (checkbox) {
      if (checkbox.checked && !verifiedOnce) {
        const modal = byId('setup2FAModal');
        if (modal) modal.style.display = 'flex';
      } else {
        sync2FA(checkbox.checked);
      }
    };

    window.authorize2FA = function () {
      const input = byId('authCode');
      if (!input) return;
      const val = input.value;
      if (val.length === 6) {
        verifiedOnce = true;
        if (mainToggle) mainToggle.checked = true;
        sync2FA(true);
        const modal = byId('setup2FAModal');
        if (modal) modal.style.display = 'none';
        alert('2-Step Verification enabled.');
      }
    };

    window.closeSetupModal = function () {
      const modal = byId('setup2FAModal');
      if (modal) modal.style.display = 'none';
      if (!verifiedOnce && mainToggle) mainToggle.checked = false;
    };

    window.openPassModal = function () {
      const sect = byId('pass2FASect');
      const modal = byId('passwordModal');
      if (sect) sect.style.display = (mainToggle && mainToggle.checked) ? 'block' : 'none';
      if (modal) modal.style.display = 'flex';
    };

    window.closePassModal = function () {
      const modal = byId('passwordModal');
      if (modal) modal.style.display = 'none';
    };

    window.addEventListener('click', function (e) {
      if (e.target && e.target.className === 'modal-overlay') {
        window.closePassModal();
        window.closeSetupModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initStaffNavbar();
    initHome();
    initSales();
    initAccounts();
    initReports();
    initClients();
    initProfile();
    initClient();
    initSettings();
  });
})();
