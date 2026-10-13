/**
 * Scroll-linked motion (Anime.js v4) — Kingdom Life Kraków
 * Pattern inspired by https://animejs.com/ Scroll Observer (sync + stagger).
 * Disabled when prefers-reduced-motion is on.
 */
import { animate, stagger, onScroll } from "https://cdn.jsdelivr.net/npm/animejs@4.0.2/+esm";

(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) {
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("is-visible");
    });
    return;
  }

  document.documentElement.classList.add("anime-scroll-ready");

  /* Top reading progress — fills as the page scrolls */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  animate(bar, {
    scaleX: [0, 1],
    ease: "linear",
    autoplay: onScroll({
      target: document.documentElement,
      enter: "top top",
      leave: "bottom bottom",
      sync: true,
    }),
  });

  /* Hero photograph — gentle scroll-linked drift */
  var heroImg = document.querySelector(".hero-bg img");
  if (heroImg) {
    animate(heroImg, {
      y: ["0%", "12%"],
      ease: "linear",
      autoplay: onScroll({
        target: ".hero",
        enter: "top top",
        leave: "bottom top",
        sync: true,
      }),
    });
  }

  var heroCopy = document.querySelector(".hero-copy");
  if (heroCopy) {
    animate(heroCopy, {
      y: [0, 48],
      opacity: [1, 0.35],
      ease: "linear",
      autoplay: onScroll({
        target: ".hero",
        enter: "top top",
        leave: "bottom top",
        sync: true,
      }),
    });
  }

  /* Sunday bulletin columns — stagger in with scroll */
  var bulletin = document.querySelector(".bulletin");
  if (bulletin) {
    var cols = bulletin.children;
    if (cols.length) {
      animate(cols, {
        opacity: [0, 1],
        y: [36, 0],
        delay: stagger(90),
        ease: "out(3)",
        autoplay: onScroll({
          target: bulletin,
          enter: "top bottom-=8%",
          leave: "bottom top+=10%",
          sync: 0.2,
        }),
      });
    }
  }

  /* Sections: live fade/rise tied to scroll position */
  document.querySelectorAll(".reveal").forEach(function (section) {
    section.classList.add("is-visible");
    animate(section, {
      opacity: [0, 1],
      y: [56, 0],
      ease: "out(3)",
      autoplay: onScroll({
        target: section,
        enter: "top bottom-=5%",
        leave: "bottom top+=15%",
        sync: 0.12,
      }),
    });

    var kids = section.querySelectorAll(
      ".steps > li, .team-card, .photo-tile, .quote, .faq details, .facts > *, .find-photos figure"
    );
    if (kids.length) {
      animate(kids, {
        opacity: [0, 1],
        y: [28, 0],
        delay: stagger(48, { from: "first" }),
        ease: "out(3)",
        autoplay: onScroll({
          target: section,
          enter: "top bottom-=10%",
          leave: "bottom top+=12%",
          sync: 0.18,
        }),
      });
    }
  });

  /* Footer rises in as it approaches */
  var footer = document.querySelector(".site-footer");
  if (footer) {
    animate(footer, {
      opacity: [0.55, 1],
      y: [40, 0],
      ease: "out(3)",
      autoplay: onScroll({
        target: footer,
        enter: "top bottom",
        leave: "bottom bottom",
        sync: 0.25,
      }),
    });
  }
})();
