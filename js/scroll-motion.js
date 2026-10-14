/**
 * Anime.js v4 scroll motion — readable first, then animate.
 * Progress bar + hero parallax use sync scrubbing.
 * Content uses play-once on enter (never left at opacity 0).
 */
import {
  animate,
  stagger,
  onScroll,
  createTimeline,
} from "./vendor/anime.esm.js";

(function () {
  try {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      document.documentElement.classList.remove("anime-scroll");
      document.querySelectorAll(".reveal").forEach(function (n) {
        n.classList.add("is-visible");
      });
      return;
    }

    /* Only mark ready AFTER the module loaded — site.js can fall back otherwise */
    document.documentElement.classList.add("anime-scroll", "anime-scroll-ready");

    document.querySelectorAll(".reveal").forEach(function (n) {
      n.classList.add("is-visible");
    });

    /* ── Progress bar (safe scrub — decorative only) ── */
    var bar = document.querySelector(".scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "scroll-progress";
      bar.setAttribute("aria-hidden", "true");
      document.body.prepend(bar);
    }
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

    /* ── Hero entrance (play once) ── */
    var hero = document.querySelector(".hero");
    var heroImg = document.querySelector(".hero-bg img");
    var heroCopy = document.querySelector(".hero-copy");
    var heroBits = heroCopy
      ? heroCopy.querySelectorAll(".hero-crown, .kicker, h1, .hero-lede, .hero-actions")
      : [];

    if (heroBits.length) {
      createTimeline({ defaults: { ease: "out(4)" } }).add(heroBits, {
        opacity: [0, 1],
        y: [36, 0],
        delay: stagger(90),
        duration: 900,
      });
    }

    /* Hero parallax — transform only, never opacity */
    if (hero && heroImg) {
      animate(heroImg, {
        y: ["0%", "14%"],
        ease: "linear",
        autoplay: onScroll({
          target: hero,
          enter: "top top",
          leave: "bottom top",
          sync: true,
        }),
      });
    }

    /* ── Play-once when an element enters the viewport ── */
    function revealOnScroll(targets, props, targetEl) {
      if (!targets || (targets.length !== undefined && !targets.length)) return;
      animate(targets, Object.assign({
        opacity: [0, 1],
        y: [40, 0],
        ease: "out(3)",
        duration: 750,
      }, props, {
        autoplay: onScroll({
          target: targetEl,
          enter: "top bottom-=12%",
          leave: "bottom top",
          repeat: false,
        }),
      }));
    }

    var bulletin = document.querySelector(".bulletin");
    if (bulletin && bulletin.children.length) {
      revealOnScroll(bulletin.children, {
        y: [48, 0],
        delay: stagger(100),
      }, bulletin.closest(".bulletin-band") || bulletin);
    }

    var jumps = document.querySelectorAll(".home-jump a");
    if (jumps.length) {
      revealOnScroll(jumps, {
        y: [20, 0],
        delay: stagger(50),
      }, ".home-jump");
    }

    document.querySelectorAll("main .section, main .reveal, .welcome-split").forEach(function (section) {
      var heads = section.querySelectorAll(".kicker, h2");
      if (heads.length) {
        revealOnScroll(heads, { delay: stagger(70) }, section);
      }

      var kids = section.querySelectorAll(
        ".steps > li, .team-card, .photo-tile, .quote, .faq details, .split > div, .card, .find-photos figure"
      );
      if (kids.length) {
        revealOnScroll(kids, {
          y: [36, 0],
          delay: stagger(40, { from: "first" }),
        }, section);
      }
    });

    var footer = document.querySelector(".site-footer");
    if (footer) {
      var parts = footer.querySelectorAll(".foot-grid > div, .legal");
      if (parts.length) {
        revealOnScroll(parts, { delay: stagger(80) }, footer);
      }
    }

    /* Safety net: anything still invisible after 2s becomes visible */
    window.setTimeout(function () {
      document.querySelectorAll(".bulletin > *, .home-jump a, .reveal .kicker, .reveal h2, .team-card, .photo-tile, .steps > li, .quote, .faq details, .split > div, .hero-copy .kicker, .hero-copy h1, .hero-copy .hero-lede, .hero-copy .hero-actions, .hero-crown").forEach(function (el) {
        var op = parseFloat(getComputedStyle(el).opacity);
        if (op < 0.5) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
    }, 2000);

  } catch (err) {
    console.error("[scroll-motion]", err);
    document.documentElement.classList.remove("anime-scroll", "anime-scroll-ready");
    document.querySelectorAll(".reveal").forEach(function (n) {
      n.classList.add("is-visible");
      n.style.opacity = "1";
      n.style.transform = "none";
    });
  }
})();
