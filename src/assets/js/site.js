document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".nav-menu");

  function closeNavigation() {
    if (!navToggle || !navigation) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.querySelector(".sr-only").textContent = "Open navigation";
    navigation.classList.remove("is-open");
  }

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.querySelector(".sr-only").textContent = isOpen
      ? "Open navigation"
      : "Close navigation";
    navigation?.classList.toggle("is-open", !isOpen);
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      productCards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  const subject = new URLSearchParams(window.location.search).get("subject");
  const subjectSelect = document.querySelector("#subject");
  if (subject && subjectSelect) subjectSelect.value = subject;
});
