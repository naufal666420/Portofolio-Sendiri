// =========================================================
// NAUFAL PORTFOLIO — interaksi, animasi, tema, dan kontak
// Ganti email tujuan pada CONTACT_EMAIL sebelum dipublikasikan.
// =========================================================

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");

// Tema disimpan di browser agar pilihan terakhir tetap digunakan.
const savedTheme = localStorage.getItem("naufal-portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  html.dataset.theme = savedTheme;
}
function updateThemeIcon() {
  const icon = themeToggle.querySelector("i");
  icon.className = html.dataset.theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  themeToggle.setAttribute("aria-label", html.dataset.theme === "dark" ? "Aktifkan light mode" : "Aktifkan dark mode");
}
updateThemeIcon();
themeToggle.addEventListener("click", () => {
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("naufal-portfolio-theme", html.dataset.theme);
  updateThemeIcon();
});

// Menu navigasi untuk layar kecil.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector("i").className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector("i").className = "fa-solid fa-bars";
  });
});

// Efek teks berganti.
const typedText = document.getElementById("typedText");
const roles = ["Web Developer", "Tech Enthusiast", "Creative Learner"];
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  typedText.textContent = current.substring(0, charIndex);
  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeRole, 95);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 45);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, deleting ? 1300 : 300);
  }
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) typeRole();

// Animasi elemen ketika masuk viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Filter proyek.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// Navigasi aktif dan tombol kembali ke atas.
const sections = document.querySelectorAll("main section[id]");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 450);
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));


document.getElementById("currentYear").textContent = new Date().getFullYear();
