const heroIconGroups = document.querySelectorAll("[data-hero-icons]");

heroIconGroups.forEach((group) => {
  const icons = Array.from(group.querySelectorAll("[data-hero-icon]"));

  if (icons.length === 0) {
    return;
  }

  let activeIndex = 0;
  let isPaused = false;

  const activateIcon = (index) => {
    icons.forEach((icon, iconIndex) => {
      icon.dataset.active = String(iconIndex === index);
    });
  };

  activateIcon(activeIndex);

  icons.forEach((icon, index) => {
    icon.addEventListener("mouseenter", () => {
      isPaused = true;
      activeIndex = index;
      activateIcon(activeIndex);
    });

    icon.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    icon.addEventListener("focusin", () => {
      isPaused = true;
      activeIndex = index;
      activateIcon(activeIndex);
    });

    icon.addEventListener("focusout", () => {
      isPaused = false;
    });
  });

  window.setInterval(() => {
    if (isPaused) {
      return;
    }

    activeIndex = (activeIndex + 1) % icons.length;
    activateIcon(activeIndex);
  }, 1800);
});
