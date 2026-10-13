/**
 * Live scroll UI — Anime.js v4 (local), same engine as https://animejs.com/
 * Uses onScroll({ sync: true }) so motion is scrubbed by the scrollbar.
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
    document.querySelectorAll(".reveal, [data-scroll]").forEach(function (n) {
      n.classList.add("is-visible");
      n.style.opacity = "";
      n.style.transform = "";
    });
    return;
  }

  document.documentElement.classList.add("anime-scroll", "anime-scroll-ready");

  function scrub(targets, props, scrollOpts) {
    return animate(targets, Object.assign({}, props, {
      ease: props.ease || "linear",
      autoplay: onScroll(Object.assign({ sync: true }, scrollOpts)),
    }));
  }

  /* ── 1. Page progress (animejs.com-style scrub) ── */
  var bar = document.querySelector(".scroll-progress");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.prepend(bar);
  }
  scrub(bar, { scaleX: [0, 1] }, {
    target: document.documentElement,
    enter: "top top",
    leave: "bottom bottom",
  });

  /* ── 2. Hero: entrance + scroll-linked stage ── */
  var hero = document.querySelector(".hero");
  var heroImg = document.querySelector(".hero-bg img");
  var heroCopy = document.querySelector(".hero-copy");
  var heroBits = heroCopy
    ? heroCopy.querySelectorAll(".hero-crown, .kicker, h1, .hero-lede, .hero-actions")
    : [];

  if (heroBits.length) {
    createTimeline({ defaults: { ease: "out(4)" } }).add(heroBits, {
      opacity: [0, 1],
      y: [60, 0],
      delay: stagger(100),
      duration: 1000,
    });
  }

  if (hero && heroImg) {
    scrub(heroImg, {
      y: ["0%", "22%"],
      scale: [1.05, 1.22],
    }, {
      target: hero,
      enter: "top top",
      leave: "bottom top",
    });
  }

  if (hero && heroCopy) {
    scrub(heroCopy, {
      y: [0, 120],
      opacity: [1, 0],
    }, {
      target: hero,
      enter: "top top",
      leave: "bottom top",
    });
  }

  /* ── 3. Sunday bulletin — staggered scrub ── */
  var bulletin = document.querySelector(".bulletin");
  if (bulletin && bulletin.children.length) {
    scrub(bulletin.children, {
      opacity: [0, 1],
      y: [80, 0],
      delay: stagger(140),
      ease: "out(3)",
    }, {
      target: bulletin.closest(".bulletin-band") || bulletin,
      enter: "top bottom",
      leave: "center top",
    });
  }

  var jumpLinks = document.querySelectorAll(".home-jump a");
  if (jumpLinks.length) {
    scrub(jumpLinks, {
      opacity: [0, 1],
      y: [28, 0],
      delay: stagger(70),
      ease: "out(3)",
    }, {
      target: ".home-jump",
      enter: "top bottom",
      leave: "bottom top",
    });
  }

  /* ── 4. Sections: alternate slide + scale (live while scrolling) ── */
  var sections = document.querySelectorAll("main .section, main .reveal, .welcome-split");
  sections.forEach(function (section, i) {
    section.setAttribute("data-scroll", "");
    var fromX = i % 2 === 0 ? -48 : 48;

    scrub(section, {
      opacity: [0.15, 1],
      y: [90, 0],
      x: [fromX, 0],
      ease: "out(3)",
    }, {
      target: section,
      enter: "top bottom",
      leave: "bottom top",
    });

    var heads = section.querySelectorAll(".kicker, h2, h3");
    if (heads.length) {
      scrub(heads, {
        opacity: [0, 1],
        y: [40, 0],
        delay: stagger(80),
        ease: "out(3)",
      }, {
        target: section,
        enter: "top bottom-=8%",
        leave: "center top",
      });
    }

    var tiles = section.querySelectorAll(
      ".photo-tile, .team-card, .steps > li, .quote, .faq details, .split > div, .card"
    );
    if (tiles.length) {
      scrub(tiles, {
        opacity: [0, 1],
        y: [70, 0],
        scale: [0.92, 1],
        delay: stagger(45, { from: "first" }),
        ease: "out(3)",
      }, {
        target: section,
        enter: "top bottom-=5%",
        leave: "bottom top+=8%",
      });
    }
  });

  /* ── 5. Photo mosaic: horizontal drift while the gallery is on screen ── */
  var gallery = document.querySelector("#gallery .photo-grid, .photo-grid");
  if (gallery) {
    scrub(gallery, {
      x: [40, -40],
      ease: "linear",
    }, {
      target: "#gallery",
      enter: "top bottom",
      leave: "bottom top",
    });
  }

  /* ── 6. Worship list rows after sermons render ── */
  window.setTimeout(function () {
    var rows = document.querySelectorAll(
      "#worship .worship-item, #worship [data-sermon], #worship button.sermon, #worship .sermon-row, #worship li"
    );
    if (!rows.length) {
      rows = document.querySelectorAll("#worship .worship-list > *, [data-sermons] a, [data-sermons] button");
    }
    if (rows.length) {
      scrub(rows, {
        opacity: [0, 1],
        x: [-36, 0],
        delay: stagger(28),
        ease: "out(3)",
      }, {
        target: "#worship",
        enter: "top bottom",
        leave: "bottom top",
      });
    }
  }, 700);

  /* ── 7. Footer columns ── */
  var footer = document.querySelector(".site-footer");
  if (footer) {
    var footParts = footer.querySelectorAll(".foot-grid > div, .legal");
    if (footParts.length) {
      scrub(footParts, {
        opacity: [0, 1],
        y: [50, 0],
        delay: stagger(110),
        ease: "out(3)",
      }, {
        target: footer,
        enter: "top bottom",
        leave: "top center",
      });
    }
  }

  /* Inner pages */
  if (!document.querySelector("main .reveal") && !document.querySelector("main .section")) {
    var mast = document.querySelector(".page-mast, main");
    if (mast) {
      scrub(mast.querySelectorAll("h1, .lede, .kicker, .card, form, .socials a, article"), {
        opacity: [0, 1],
        y: [50, 0],
        delay: stagger(70),
        ease: "out(3)",
      }, {
        target: mast,
        enter: "top bottom",
        leave: "bottom top",
      });
    }
  }

  } catch (err) {
    console.error("[scroll-motion]", err);
    document.documentElement.classList.remove("anime-scroll");
    document.querySelectorAll(".reveal").forEach(function (n) {
      n.classList.add("is-visible");
      n.style.opacity = "1";
      n.style.transform = "none";
    });
  }
})();
