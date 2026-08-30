(function () {
  'use strict';

  const page = document.body.dataset.page || '';

  const enhanceTextSymbols = function (symbol, className, iconId) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      if (currentNode.nodeValue && currentNode.nodeValue.includes(symbol)) textNodes.push(currentNode);
    }

    textNodes.forEach(function (textNode) {
      const parts = textNode.nodeValue.split(symbol);
      const fragment = document.createDocumentFragment();
      parts.forEach(function (part, index) {
        if (part) fragment.appendChild(document.createTextNode(part));
        if (index < parts.length - 1) {
          const icon = document.createElement('span');
          icon.className = className;
          icon.setAttribute('aria-hidden', 'true');
          icon.innerHTML = '<svg viewBox="0 0 24 24" focusable="false"><use href="assets/images/icons.svg#' + iconId + '"></use></svg>';
          fragment.appendChild(icon);
        }
      });
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  };

  const standardizeVerificationBadges = function () {
    const labels = {
      registered: 'Registered',
      'business-verified': 'Business Verified',
      'gi-hub-verified': 'GI-Hub Verified'
    };
    document.querySelectorAll('[data-supplier-verification], [data-marketplace-verification]').forEach(function (badge) {
      const card = badge.closest('[data-supplier-card], [data-product-card]');
      const explicitLevel = (card && card.dataset.verificationLevel) || badge.dataset.verificationLevel;
      const level = Object.prototype.hasOwnProperty.call(labels, explicitLevel) ? explicitLevel : (card && card.dataset.verified === 'true' ? 'gi-hub-verified' : 'business-verified');
      if (card) card.dataset.verificationLevel = level;
      badge.dataset.verificationLevel = level;
      badge.setAttribute('aria-label', 'Verification level: ' + labels[level]);
      badge.textContent = level === 'registered' ? 'REGISTERED' : '✓ ' + labels[level].toUpperCase();
    });
  };

  standardizeVerificationBadges();
  enhanceTextSymbols('→', 'icon-arrow', 'arrow');
  enhanceTextSymbols('✓', 'icon-check', 'check');

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
        const verificationLevel = card.dataset.verificationLevel || (card.dataset.verified === 'true' ? 'gi-hub-verified' : 'registered');
        const matchesVerified = !verifiedOnly || verificationLevel !== 'registered';
        const matches = matchesQuery && matchesCategory && matchesVerified;
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      if (resultCount) {
        resultCount.textContent = visible + ' ' + (visible === 1 ? 'listing' : 'listings') + ' available';
        resultCount.hidden = visible === 0;
      }
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
        const verificationLevel = card.dataset.verificationLevel || (card.dataset.verified === 'true' ? 'gi-hub-verified' : 'registered');
        const matches = (!query || haystack.includes(query)) &&
          (!sector || (card.dataset.sector || '').toLowerCase() === sector) &&
          (!country || (card.dataset.country || '').toLowerCase() === country) &&
          (!verifiedOnly || verificationLevel !== 'registered');
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      const count = document.querySelector('[data-supplier-count]');
      const empty = document.querySelector('[data-supplier-empty]');
      if (count) {
        count.textContent = visible + ' ' + (visible === 1 ? 'supplier' : 'suppliers') + ' match your filters';
        count.hidden = visible === 0;
      }
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

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-trigger]'));
  if (lightbox && lightboxTriggers.length) {
    const lightboxImage = lightbox.querySelector('[data-lightbox-image]');
    const lightboxCaption = lightbox.querySelector('[data-lightbox-caption]');
    const lightboxCloseButtons = lightbox.querySelectorAll('[data-lightbox-close]');
    let previousFocus = null;

    const closeLightbox = function () {
      lightbox.hidden = true;
      document.body.classList.remove('source-product-lightbox-open');
      if (lightboxImage) lightboxImage.removeAttribute('src');
      if (previousFocus) previousFocus.focus();
      previousFocus = null;
    };

    const openLightbox = function (trigger) {
      if (!lightboxImage) return;
      previousFocus = trigger;
      lightboxImage.src = trigger.dataset.lightboxSrc || '';
      lightboxImage.alt = trigger.dataset.lightboxAlt || '';
      if (lightboxCaption) lightboxCaption.textContent = trigger.dataset.lightboxCaption || '';
      lightbox.hidden = false;
      document.body.classList.add('source-product-lightbox-open');
      const closeButton = lightbox.querySelector('[data-lightbox-close]');
      if (closeButton) closeButton.focus();
    };

    lightboxTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        openLightbox(trigger);
      });
    });

    lightboxCloseButtons.forEach(function (button) {
      button.addEventListener('click', closeLightbox);
    });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (event) {
      if (!lightbox.hidden && event.key === 'Escape') closeLightbox();
    });
  }
})();
