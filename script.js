// FORGE ATHLETICS — update the number below before using WhatsApp.
const FORGE_CONFIG = {
  // India example: 919876543210 (country code + number, digits only)
  whatsappNumber: "91XXXXXXXXXX",
  gymName: "FORGE ATHLETICS",
  defaultMessage: "Hi! I would like to book a free trial session and learn about memberships."
};

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  const toast = document.querySelector(".toast");
  const validNumber = /^\d{10,15}$/.test(FORGE_CONFIG.whatsappNumber);
  const waLink = message => `https://wa.me/${FORGE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("open", !open);
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }));

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll(".whatsapp-main, .wa-float").forEach(link => {
    link.href = validNumber ? waLink(FORGE_CONFIG.defaultMessage) : "#contact";
    link.addEventListener("click", e => {
      if (!validNumber) {
        e.preventDefault();
        showToast("Add your WhatsApp number in script.js first (country code + number, digits only).");
      }
    });
  });

  document.querySelectorAll("[data-plan]").forEach(link => {
    const plan = link.dataset.plan;
    link.href = validNumber ? waLink(`Hi! I am interested in the ${plan} plan at ${FORGE_CONFIG.gymName}. Please share details.`) : "#contact";
    link.addEventListener("click", e => {
      if (!validNumber) {
        e.preventDefault();
        showToast(`You selected ${plan}. Add your WhatsApp number in script.js to enable enquiries.`);
      }
    });
  });

  const revealItems = document.querySelectorAll(".manifesto, .class-card, .quote-content, .team-photo, .team-copy, .plan, .contact-left, .contact-details");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealItems.forEach(el => { el.classList.add("reveal"); observer.observe(el); });
  } else revealItems.forEach(el => el.classList.add("visible"));

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 3200);
  }
});