/**
 * Live scroll motion — Anime.js v4 Scroll Observer
 * Same pattern as https://animejs.com/ (onScroll + sync + stagger)
 */
import { animate, stagger, onScroll, createTimeline } from "https://cdn.jsdelivr.net/npm/animejs@4.0.2/+esm";

(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) {
    document.documentElement.classList.remove("anime-scroll");
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("is-visible");
    });
    return;
  }

  document.documentElement.classList.add("anime-scroll-ready");

  /* Safety: if something fails mid-way, never leave content invisible */
  window.setTimeout(function () {
    document.querySelectorAll(".reveal").forEach(function (node) {
      if (getComputedStyle(node).opacity === "0") {
        node.style.opacity = "1";
        node.style.transform = "none";
      }
    });
  }, 4000);

  /* ── Progress bar scrubbed to page scroll ── */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  animate(bar, {
    scaleX: [0, 1],
    ease: "linear",
    autoplay: onScroll({
      target: "body",
      enter: "top top",
      leave: "bottom bottom",
      sync: true,
    }),
  });

  /* ── Hero: load timeline + scroll-linked parallax ── */
  var hero = document.querySelector(".hero");
  var heroImg = document.querySelector(".hero-bg img");
  var heroCopy = document.querySelector(".hero-copy");
  var heroCrown = document.querySelector(".hero-crown");

  if (heroCopy) {
    createTimeline({ defaults: { ease: "out(4)" } })
      .add(heroCrown || heroCopy, {
        opacity: [0, 1],
        scale: [0.86, 1],
        duration: 900,
      })
      .add(
        heroCopy.querySelectorAll(".kicker, h1, .hero-lede, .hero-actions"),
        {
          opacity: [0, 1],
          y: [40, 0],
          delay: stagger(90),
          duration: 850,
        },
        "-=500"
      );
  }

  if (hero && heroImg) {
    animate(heroImg, {
      y: ["0%", "18%"],
      scale: [1.08, 1.18],
      ease: "linear",
      autoplay: onScroll({
        target: hero,
        enter: "top top",
        leave: "bottom top",
        sync: true,
      }),
    });
  }

  if (hero && heroCopy) {
    animate(heroCopy, {
      y: [0, 80],
      opacity: [1, 0],
      ease: "linear",
      autoplay: onScroll({
        target: hero,
        enter: "top top",
        leave: "bottom top",
        sync: true,
      }),
    });
  }

  /* ── Bulletin strip: staggered scroll sync ── */
  var bulletin = document.querySelector(".bulletin");
  if (bulletin && bulletin.children.length) {
    animate(bulletin.children, {
      opacity: [0, 1],
      y: [64, 0],
      delay: stagger(120),
      ease: "out(3)",
      autoplay: onScroll({
        target: bulletin,
        enter: "top bottom",
        leave: "center top",
        sync: true,
      }),
    });
  }

  var jumps = document.querySelectorAll(".home-jump a");
  if (jumps.length) {
    animate(jumps, {
      opacity: [0, 1],
      y: [20, 0],
      delay: stagger(60),
      ease: "out(3)",
      autoplay: onScroll({
        target: ".home-jump",
        enter: "top bottom",
        leave: "bottom top",
        sync: true,
      }),
    });
  }

  /* ── Every .reveal section: live scrub in / out ── */
  document.querySelectorAll(".reveal").forEach(function (section) {
    section.classList.add("is-visible");

    var head = section.querySelectorAll(".kicker, h2, .gallery-intro p, .lede");
    if (head.length) {
      animate(head, {
        opacity: [0, 1],
        y: [48, 0],
        delay: stagger(70),
        ease: "out(3)",
        autoplay: onScroll({
          target: section,
          enter: "top bottom",
          leave: "center top",
          sync: true,
        }),
      });
    }

    var kids = section.querySelectorAll(
      ".steps > li, .team-card, .photo-tile, .quote, .faq details, .facts > *, .find-photos figure, .split > div, .card, .socials a"
    );
    if (kids.length) {
      animate(kids, {
        opacity: [0, 1],
        y: [56, 0],
        scale: [0.96, 1],
        delay: stagger(55, { from: "first" }),
        ease: "out(3)",
        autoplay: onScroll({
          target: section,
          enter: "top bottom-=5%",
          leave: "bottom top+=10%",
          sync: true,
        }),
      });
    } else {
      animate(section, {
        opacity: [0, 1],
        y: [72, 0],
        ease: "out(3)",
        autoplay: onScroll({
          target: section,
          enter: "top bottom",
          leave: "bottom top",
          sync: true,
        }),
      });
    }
  });

  /* ── Worship list rows ── */
  var worshipHost = document.querySelector("[data-sermons]");
  if (worshipHost) {
    var armWorship = function () {
      var rows = worshipHost.querySelectorAll(".worship-item, .sermon-card, button, a");
      if (!rows.length) return;
      animate(rows, {
        opacity: [0, 1],
        x: [-24, 0],
        delay: stagger(35),
        ease: "out(3)",
        autoplay: onScroll({
          target: "#worship",
          enter: "top bottom",
          leave: "bottom top",
          sync: true,
        }),
      });
    };
    window.setTimeout(armWorship, 600);
  }

  /* ── Footer ── */
  var footer = document.querySelector(".site-footer");
  if (footer) {
    animate(footer.querySelectorAll(".foot-grid > div, .legal"), {
      opacity: [0, 1],
      y: [36, 0],
      delay: stagger(100),
      ease: "out(3)",
      autoplay: onScroll({
        target: footer,
        enter: "top bottom",
        leave: "top center",
        sync: true,
      }),
    });
  }

  /* Inner pages without .reveal still get page mast + cards */
  if (!document.querySelector(".reveal")) {
    var mast = document.querySelector(".page-mast, main");
    if (mast) {
      animate(mast.querySelectorAll("h1, .lede, .kicker, .card, form, .socials a"), {
        opacity: [0, 1],
        y: [40, 0],
        delay: stagger(80),
        ease: "out(3)",
        autoplay: onScroll({
          target: mast,
          enter: "top bottom",
          leave: "bottom top",
          sync: true,
        }),
      });
    }
  }
})();
