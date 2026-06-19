const heroIconGroups = document.querySelectorAll("[data-hero-icons]");

heroIconGroups.forEach((group) => {
  const icons = Array.from(group.querySelectorAll("[data-hero-icon]"));
  const sections = icons.reduce((sectionList, icon) => {
    const section = document.getElementById(icon.dataset.sectionTarget);

    if (section) {
      sectionList.push(section);
    }

    return sectionList;
  }, []);

  if (icons.length === 0) {
    return;
  }

  const activateIcon = (targetId) => {
    icons.forEach((icon) => {
      const isActive = icon.dataset.sectionTarget === targetId;
      icon.dataset.active = String(isActive);
      icon.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  activateIcon(icons[0].dataset.sectionTarget);

  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      activateIcon(icon.dataset.sectionTarget);
    });
  });

  if (!("IntersectionObserver" in window) || sections.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.reduce((currentEntry, entry) => {
        if (!entry.isIntersecting) {
          return currentEntry;
        }

        if (!currentEntry || entry.intersectionRatio > currentEntry.intersectionRatio) {
          return entry;
        }

        return currentEntry;
      }, null);

      if (visibleEntry) {
        activateIcon(visibleEntry.target.id);
      }
    },
    {
      rootMargin: "-30% 0px -45% 0px",
      threshold: [0.1, 0.25, 0.5, 0.75],
    },
  );

  sections.forEach((section) => observer.observe(section));
});
