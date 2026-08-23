(function () {
  'use strict';

  const page = document.body.dataset.page || '';

  document.querySelectorAll('[data-nav]').forEach(function (link) {
    if (link.dataset.nav === page) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('text-[#547000]');
    }
  });

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  document.querySelectorAll('[data-quick-search]').forEach(function (button) {
    button.addEventListener('click', function () {
      const form = document.querySelector('[data-product-search-form]');
      const input = form && form.querySelector('input[name="q"]');
      if (!form || !input) return;
      input.value = button.dataset.quickSearch || '';
      form.requestSubmit();
    });
  });

  const params = new URLSearchParams(window.location.search);
  const rfqProduct = params.get('product');
  const rfqCompany = params.get('company');
  const rfqForm = document.querySelector('[data-marketplace-form]');
  if (rfqForm && rfqProduct) {
    const requirementField = rfqForm.querySelector('textarea[name="requirement"]');
    if (requirementField) requirementField.value = 'Product: ' + rfqProduct + '\n\n';
  }
  if (rfqForm && rfqCompany) {
    const companyField = rfqForm.querySelector('input[name="company"]');
    if (companyField) companyField.value = rfqCompany;
  }

  const marketQuery = document.querySelector('[data-market-query]');
  const marketCategory = document.querySelector('[data-market-category]');
  const marketVerified = document.querySelector('[data-market-verified]');
  const productCards = Array.from(document.querySelectorAll('[data-product-card]'));
  const resultCount = document.querySelector('[data-result-count]');
  const emptyState = document.querySelector('[data-empty-state]');

  if (marketQuery && marketCategory && productCards.length) {
    marketQuery.value = params.get('q') || '';
    marketCategory.value = params.get('category') || '';

    const applyMarketFilters = function () {
      const query = marketQuery.value.trim().toLowerCase();
      const category = marketCategory.value.toLowerCase();
      const verifiedOnly = Boolean(marketVerified && marketVerified.checked);
      let visible = 0;

      productCards.forEach(function (card) {
        const matchesQuery = !query || (card.dataset.search || '').toLowerCase().includes(query);
        const matchesCategory = !category || (card.dataset.category || '').toLowerCase() === category;
        const matchesVerified = !verifiedOnly || card.dataset.verified === 'true';
        const matches = matchesQuery && matchesCategory && matchesVerified;
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      if (resultCount) resultCount.textContent = visible + ' ' + (visible === 1 ? 'listing' : 'listings') + ' available';
      if (emptyState) emptyState.hidden = visible !== 0;
    };

    [marketQuery, marketCategory, marketVerified].filter(Boolean).forEach(function (control) {
      control.addEventListener('input', applyMarketFilters);
      control.addEventListener('change', applyMarketFilters);
    });

    const clearButton = document.querySelector('[data-clear-filters]');
    if (clearButton) {
      clearButton.addEventListener('click', function () {
        marketQuery.value = '';
        marketCategory.value = '';
        if (marketVerified) marketVerified.checked = false;
        history.replaceState({}, '', window.location.pathname);
        applyMarketFilters();
      });
    }
    applyMarketFilters();
  }

  const supplierQuery = document.querySelector('[data-supplier-query]');
  const supplierSector = document.querySelector('[data-supplier-sector]');
  const supplierCountry = document.querySelector('[data-supplier-country]');
  const supplierCards = Array.from(document.querySelectorAll('[data-supplier-card]'));
  if (supplierQuery && supplierSector && supplierCards.length) {
    const applySupplierFilters = function () {
      const query = supplierQuery.value.trim().toLowerCase();
      const sector = supplierSector.value.toLowerCase();
      const country = supplierCountry ? supplierCountry.value.toLowerCase() : '';
      const verified = document.querySelector('[data-supplier-verified]');
      const verifiedOnly = Boolean(verified && verified.checked);
      let visible = 0;

      supplierCards.forEach(function (card) {
        const haystack = (card.dataset.search || '').toLowerCase();
        const matches = (!query || haystack.includes(query)) &&
          (!sector || (card.dataset.sector || '').toLowerCase() === sector) &&
          (!country || (card.dataset.country || '').toLowerCase() === country) &&
          (!verifiedOnly || card.dataset.verified === 'true');
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      const count = document.querySelector('[data-supplier-count]');
      const empty = document.querySelector('[data-supplier-empty]');
      if (count) count.textContent = visible + ' ' + (visible === 1 ? 'supplier' : 'suppliers') + ' match your filters';
      if (empty) empty.hidden = visible !== 0;
    };

    [supplierQuery, supplierSector, supplierCountry, document.querySelector('[data-supplier-verified]')].filter(Boolean).forEach(function (control) {
      control.addEventListener('input', applySupplierFilters);
      control.addEventListener('change', applySupplierFilters);
    });
    const clearSuppliers = document.querySelector('[data-clear-suppliers]');
    if (clearSuppliers) clearSuppliers.addEventListener('click', function () {
      supplierQuery.value = '';
      supplierSector.value = '';
      if (supplierCountry) supplierCountry.value = '';
      const verified = document.querySelector('[data-supplier-verified]');
      if (verified) verified.checked = false;
      applySupplierFilters();
    });
    applySupplierFilters();
  }

  document.querySelectorAll('[data-marketplace-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const status = form.querySelector('[data-marketplace-form-status]');
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = 'Please complete the required fields.';
        return;
      }
      if (status) status.textContent = 'Your request is ready. Our team will review it and contact you by email.';
      form.reset();
    });
  });
})();
