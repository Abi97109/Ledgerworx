(function () {
  try {
    if (localStorage.getItem('ledger_dark') === '1') {
      document.documentElement.classList.add('dark');
      if (document.body) document.body.classList.add('dark');
    }
  } catch (e) {}
})();
