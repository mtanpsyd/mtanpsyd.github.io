/* ═══════════════════════════════════════════
   Main JS
   ═══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Sticky header scroll state ──
  const header = document.getElementById("site-header");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    },
    { passive: true }
  );

  // ── Mobile nav toggle ──
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  const bars = toggle ? toggle.querySelectorAll(".nav-toggle-bar") : [];

  function openNav() {
    nav.classList.add("is-open");
    header.classList.add("nav-open");
    document.body.classList.add("nav-is-open");
    toggle.setAttribute("aria-expanded", "true");
    bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  }

  function closeNav() {
    nav.classList.remove("is-open");
    header.classList.remove("nav-open");
    document.body.classList.remove("nav-is-open");
    toggle.setAttribute("aria-expanded", "false");
    bars[0].style.transform = "";
    bars[1].style.opacity = "";
    bars[2].style.transform = "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.contains("is-open") ? closeNav() : openNav();
    });

    // Close nav when tapping the overlay (body::after)
    document.addEventListener("click", (e) => {
      if (
        document.body.classList.contains("nav-is-open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeNav();
      }
    });

    // Close nav on link click
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  // ── Scroll-triggered animations ──
  const animatedEls = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && animatedEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    animatedEls.forEach((el) => observer.observe(el));
  } else {
    animatedEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ── Smooth scroll for anchor links (fallback for Safari) ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, null, id);
      }
    });
  });
});
