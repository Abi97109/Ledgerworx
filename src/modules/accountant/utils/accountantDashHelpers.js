import {
  ACCOUNTANT_CHART,
  ACCOUNTANT_LIVE_UPDATES,
  ACCOUNTANT_THEME_STORAGE_KEY,
  ACCOUNTANT_USER,
} from "../data/accountantDashData";

const CHART_JS_CDN = "https://cdn.jsdelivr.net/npm/chart.js";

export function getSavedTheme() {
  if (typeof window === "undefined" || !window.localStorage) {
    return "light";
  }

  try {
    return window.localStorage.getItem(ACCOUNTANT_THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch (error) {
    return "light";
  }
}

export function saveTheme(theme) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(ACCOUNTANT_THEME_STORAGE_KEY, theme === "dark" ? "dark" : "light");
  } catch (error) {
    // Ignore storage failures.
  }
}

export function applyBodyTheme(theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.body.classList.toggle("dark-mode", theme === "dark");
}

export function buildUserAvatar(name = ACCOUNTANT_USER.name) {
  const safeName = name && typeof name === "string" ? name.trim() : "Accountant User";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    safeName || "Accountant User",
  )}&background=1f8f8b&color=fff`;
}

export function loadChartJs() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (window.Chart) {
    return Promise.resolve(window.Chart);
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-chartjs="accountant-dashboard"]');

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.Chart || null), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Chart.js")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = CHART_JS_CDN;
    script.async = true;
    script.dataset.chartjs = "accountant-dashboard";
    script.onload = () => resolve(window.Chart || null);
    script.onerror = () => reject(new Error("Failed to load Chart.js"));
    document.head.appendChild(script);
  });
}

export function buildInitialStatsMap(stats) {
  return stats.reduce((accumulator, stat) => {
    accumulator[stat.key] = stat.value;
    return accumulator;
  }, {});
}

export function getRandomizedChartPoint(min = 20, max = 110) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getMockLiveUpdate() {
  if (!Array.isArray(ACCOUNTANT_LIVE_UPDATES) || ACCOUNTANT_LIVE_UPDATES.length === 0) {
    return {
      totalClients: "368",
      paymentsReceived: "AED 950,000",
      pendingPayments: "AED 180,500",
      pendingInvoices: "AED 92,300",
      chartData: {
        income: [...ACCOUNTANT_CHART.income],
        expense: [...ACCOUNTANT_CHART.expense],
      },
    };
  }

  const randomIndex = Math.floor(Math.random() * ACCOUNTANT_LIVE_UPDATES.length);
  return ACCOUNTANT_LIVE_UPDATES[randomIndex];
}
