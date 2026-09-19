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

  const supplierVerificationDetails = {
    'Caucasus Mineral Co.': { reviewed: '19 Sep 2026' },
    'Kartli Harvest': { reviewed: '19 Sep 2026' },
    'Tbilisi Fabrication Works': { reviewed: '19 Sep 2026' },
    'Health Line Georgia': { reviewed: '19 Sep 2026' },
    Valinezhad: { reviewed: '19 Sep 2026' }
  };

  const renderSupplierVerificationDetails = function () {
    document.querySelectorAll('[data-supplier-card]').forEach(function (card) {
      if (card.dataset.verificationLevel !== 'gi-hub-verified') return;

      const name = card.querySelector('h3');
      const badge = card.querySelector('[data-supplier-verification]');
      const companyInfo = card.querySelector('[data-supplier-company-info]');
      const details = name && supplierVerificationDetails[name.textContent.trim()];
      if (!details || !badge || !companyInfo) return;

      const verificationMeta = document.createElement('div');
      verificationMeta.className = 'supplier-verification-meta';

      const review = document.createElement('span');
      review.className = 'supplier-last-reviewed';
      review.setAttribute('data-last-reviewed', 'true');
      const reviewLabel = document.createElement('span');
      reviewLabel.textContent = 'Last Reviewed';
      const reviewDate = document.createElement('b');
      reviewDate.textContent = details.reviewed;
      review.appendChild(reviewLabel);
      review.appendChild(reviewDate);

      badge.parentNode.insertBefore(verificationMeta, badge);
      verificationMeta.appendChild(badge);
      verificationMeta.appendChild(review);

      const summary = document.createElement('div');
      summary.className = 'supplier-verification-summary';
      summary.setAttribute('data-verification-summary', 'gi-hub-verified');
      const summaryTitle = document.createElement('p');
      summaryTitle.textContent = 'VERIFICATION SUMMARY';
      summary.appendChild(summaryTitle);

      const summaryList = document.createElement('dl');
      ['Company Registration', 'Business Activity', 'Product Evidence', 'Export Capability'].forEach(function (item) {
        const summaryItem = document.createElement('div');
        const label = document.createElement('dt');
        const status = document.createElement('dd');
        label.textContent = item;
        status.textContent = 'Reviewed';
        summaryItem.appendChild(label);
        summaryItem.appendChild(status);
        summaryList.appendChild(summaryItem);
      });
      summary.appendChild(summaryList);
      companyInfo.insertAdjacentElement('afterend', summary);
    });
  };

  standardizeVerificationBadges();
  renderSupplierVerificationDetails();
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
  const rfqSupplier = params.get('supplier') || params.get('company');
  const storedRfqId = params.get('rfq');
  const rfqForm = document.querySelector('[data-marketplace-form]');
  if (rfqForm && (rfqProduct || rfqSupplier)) {
    const requirementField = rfqForm.querySelector('textarea[name="requirement"]');
    const requestContext = [];
    if (rfqProduct) requestContext.push('Product: ' + rfqProduct);
    if (rfqSupplier) requestContext.push('Preferred supplier: ' + rfqSupplier);
    if (requirementField) requirementField.value = requestContext.join('\n') + '\n\n';
  }
  if (rfqForm && (rfqProduct || rfqSupplier)) {
    const roleField = rfqForm.querySelector('select[name="role"]');
    if (roleField && !roleField.value) roleField.value = 'Buyer';
  }

  const rfqStorageKey = 'gi-hub-rfq-records';
  const getStoredRfq = function (id) {
    if (!id) return null;
    try {
      const records = JSON.parse(window.localStorage.getItem(rfqStorageKey) || '{}');
      return records[id] || null;
    } catch (error) {
      return null;
    }
  };
  const saveRfq = function (record) {
    try {
      const records = JSON.parse(window.localStorage.getItem(rfqStorageKey) || '{}');
      records[record.id] = record;
      window.localStorage.setItem(rfqStorageKey, JSON.stringify(records));
    } catch (error) {
      // The confirmation still renders when browser storage is unavailable.
    }
  };
  const createRfqId = function () {
    const now = new Date();
    const suffix = String(now.getTime()).slice(-6) + Math.random().toString(36).slice(2, 5).toUpperCase();
    return 'GI-RFQ-' + now.getFullYear() + '-' + suffix;
  };
  const renderRfqConfirmation = function (record) {
    const confirmation = document.querySelector('[data-rfq-confirmation]');
    if (!confirmation || !record) return;
    const id = confirmation.querySelector('[data-rfq-id]');
    const summary = confirmation.querySelector('[data-rfq-summary]');
    const nextStep = confirmation.querySelector('[data-rfq-next-step]');
    const supplierLink = confirmation.querySelector('[data-rfq-supplier-link]');
    const reviewStatus = confirmation.querySelector('[data-rfq-step="review"] [data-rfq-step-status]');
    const introductionStatus = confirmation.querySelector('[data-rfq-step="introduction"] [data-rfq-step-status]');
    if (id) id.textContent = record.id;
    if (summary) {
      const productSummary = record.product ? record.product : 'your business requirement';
      const supplierSummary = record.supplier ? ' for ' + record.supplier : '';
      summary.textContent = 'We have captured ' + productSummary + supplierSummary + '. The next step is a GI-Hub review before a supplier introduction.';
    }
    if (nextStep) nextStep.textContent = record.supplier ? 'GI-Hub will review the request and follow up using the business email provided before coordinating an introduction to ' + record.supplier + '.' : 'GI-Hub will review the request and follow up using the business email provided with relevant supplier options.';
    if (reviewStatus) reviewStatus.textContent = '02 · IN REVIEW';
    if (introductionStatus) introductionStatus.textContent = '03 · AFTER REVIEW';
    if (supplierLink) {
      if (record.supplier) {
        const supplierUrl = new URL('suppliers.html', window.location.href);
        supplierUrl.searchParams.set('company', record.supplier);
        if (record.product) supplierUrl.searchParams.set('product', record.product);
        supplierLink.href = 'suppliers.html?' + supplierUrl.searchParams.toString();
        supplierLink.textContent = 'View ' + record.supplier + ' profile →';
      } else {
        supplierLink.href = 'suppliers.html';
        supplierLink.textContent = 'Browse suppliers →';
      }
    }
    confirmation.hidden = false;
  };
  if (rfqForm && storedRfqId) {
    const storedRfq = getStoredRfq(storedRfqId);
    if (storedRfq) {
      rfqForm.hidden = true;
      renderRfqConfirmation(storedRfq);
    }
  }

  const marketQuery = document.querySelector('[data-market-query]');
  const marketCategory = document.querySelector('[data-market-category]');
  const marketVerified = document.querySelector('[data-market-verified]');
  const productCards = Array.from(document.querySelectorAll('[data-product-card]'));
  const sourceProductShowcase = document.querySelector('[data-source-product-showcase]');
  const sourceProductSearchTerms = sourceProductShowcase && sourceProductShowcase.id === 'natural-stone'
    ? ' iranian natural stone stone type origin size thickness finish moq capacity packaging incoterm marble travertine onyx limestone iran large slabs custom slab tile sizes 1 cm 1.5 cm 2 cm 3 cm polished honed tumbled brushed chiseled leathered 1 x 20 ft container project-specific export supply seaworthy wooden crates fumigation to be agreed per rfq'
    : '';
  const resultCount = document.querySelector('[data-result-count]');
  const emptyState = document.querySelector('[data-empty-state]');

  if (marketQuery && marketCategory && (productCards.length || sourceProductShowcase)) {
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

      if (sourceProductShowcase) {
        const sourceSearchIndex = ((sourceProductShowcase.dataset.marketSearch || '') + sourceProductSearchTerms).toLowerCase();
        const sourceMatchesQuery = !query || sourceSearchIndex.includes(query);
        const sourceMatchesCategory = !category || (sourceProductShowcase.dataset.marketCategory || '').toLowerCase() === category;
        const sourceMatchesVerified = !verifiedOnly || sourceProductShowcase.dataset.marketVerified !== 'false';
        const sourceMatches = sourceMatchesQuery && sourceMatchesCategory && sourceMatchesVerified;
        sourceProductShowcase.hidden = !sourceMatches;
        if (sourceMatches) visible += 1;
      }

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
    supplierSector.value = params.get('sector') || '';
    if (!supplierQuery.value && (params.get('company') || params.get('supplier'))) supplierQuery.value = params.get('company') || params.get('supplier');

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
        const requestLink = card.querySelector('a[href^="rfq.html?"]');
        if (requestLink) {
          const linkUrl = new URL(requestLink.getAttribute('href'), window.location.href);
          const supplier = linkUrl.searchParams.get('supplier') || linkUrl.searchParams.get('company');
          if (supplier) {
            linkUrl.searchParams.set('supplier', supplier);
            linkUrl.searchParams.delete('company');
          }
          if (rfqProduct) linkUrl.searchParams.set('product', rfqProduct);
          requestLink.href = 'rfq.html?' + linkUrl.searchParams.toString();
        }
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
      const formData = new FormData(form);
      const record = {
        id: createRfqId(),
        createdAt: new Date().toISOString(),
        product: rfqProduct || '',
        supplier: rfqSupplier || '',
        role: formData.get('role') || '',
        company: formData.get('company') || '',
        email: formData.get('email') || '',
        market: formData.get('market') || '',
        requirement: formData.get('requirement') || ''
      };
      saveRfq(record);
      if (status) status.textContent = 'RFQ ' + record.id + ' submitted.';
      form.hidden = true;
      const confirmationUrl = new URL(window.location.href);
      confirmationUrl.search = '?rfq=' + encodeURIComponent(record.id);
      window.history.replaceState({}, '', confirmationUrl.pathname + confirmationUrl.search);
      renderRfqConfirmation(record);
      const confirmation = document.querySelector('[data-rfq-confirmation]');
      if (confirmation) confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
