/* Kingdom Life Krakow campus site
   When the church has a public WhatsApp invite, paste it here:
   example: "https://chat.whatsapp.com/AbCdEfGh123"
*/
window.KL = {
  whatsappGroup: "",
  campusEmail: "krakow@kingdomlifeonline.org",
  pastorEmail: "Pastor@kingdomlifeonline.org",
  sermons: [
    { id: "lpQhEXQ9oe0", title: "How can I Exercise my Faith?", speaker: "Dr. Tammy Gbolubo · Krakow campus" },
    { id: "NlZJ8VYXolI", title: "Kingdom Life at Four", speaker: "Dr. Precious Anoshiri" },
    { id: "oCHLzfvUxGQ", title: "MasterPiece", speaker: "Dr. Priyanka Zala Anoshiri" },
    { id: "WjxHygKES94", title: "Mephibosheth (Get Up And Fight)", speaker: "Dr. Precious Anoshiri" },
    { id: "6yoThxoCtu0", title: "Guard The Gates", speaker: "30 August 2026 · Kingdom Life Poland" },
    { id: "IhYRfedWtzM", title: "An Encounter with God", speaker: "Kingdom Life Poland" },
    { id: "QWJ6zl9_ru0", title: "Church welcome film", speaker: "Kingdom Life Christian Fellowship" },
    { id: "iNK48WbbyN4", title: "Kingdom Life Worship ft David", speaker: "Kingdom Life Worship" },
    { id: "hsgDKPB2ag4", title: "New Thing Coming", speaker: "Kingdom Life Worship ft Elyse" },
    { id: "l0IOJQfJcRw", title: "Who Else", speaker: "Kingdom Life Worship ft Mathia" },
    { id: "XycULNJRn4Q", title: "The Principle Of First", speaker: "Dr. Precious Anoshiri" },
    { id: "QmzBRMIrDlo", title: "The Life of God", speaker: "Dr. Precious Anoshiri" },
    { id: "5CXEJe6_YIY", title: "Born Again", speaker: "Dr. Precious Anoshiri" },
    { id: "w546C5B8NkY", title: "Goodness of God", speaker: "Kingdom Life Worship" }
  ]
};

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.querySelector(".menu-btn");
  var links = document.querySelector(".nav-links");
  if (btn && links) {
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  var wa = document.querySelectorAll("[data-whatsapp]");
  wa.forEach(function (el) {
    if (window.KL.whatsappGroup) {
      el.setAttribute("href", window.KL.whatsappGroup);
      el.textContent = el.getAttribute("data-whatsapp-ready") || "Join the WhatsApp group";
    } else {
      el.setAttribute("href", "join.html#whatsapp");
    }
  });

  document.querySelectorAll("[data-sermons]").forEach(function (mount) {
    var list = (window.KL.sermons || []).slice();
    var limit = mount.getAttribute("data-sermons");
    if (limit && limit !== "all") {
      var count = parseInt(limit, 10);
      if (!isNaN(count)) list = list.slice(0, count);
    }
    if (!list.length) return;

    mount.classList.add("worship-stage");

    var player = document.createElement("div");
    player.className = "player";
    var frame = document.createElement("iframe");
    frame.title = list[0].title;
    frame.src = "https://www.youtube-nocookie.com/embed/" + list[0].id + "?rel=0";
    frame.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    frame.setAttribute("allowfullscreen", "");
    player.appendChild(frame);

    var now = document.createElement("p");
    now.className = "worship-now";
    var nowTitle = document.createElement("strong");
    var nowWho = document.createElement("span");
    nowWho.className = "worship-who";
    now.appendChild(nowTitle);
    now.appendChild(nowWho);

    var menu = document.createElement("ol");
    menu.className = "worship-list";
    var buttons = [];

    function show(index, autoplay) {
      var sermon = list[index];
      frame.title = sermon.title;
      frame.src = "https://www.youtube-nocookie.com/embed/" + sermon.id + "?rel=0" + (autoplay ? "&autoplay=1" : "");
      nowTitle.textContent = sermon.title;
      nowWho.textContent = sermon.speaker;
      buttons.forEach(function (button, i) {
        if (i === index) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
    }

    list.forEach(function (sermon, index) {
      var item = document.createElement("li");
      var button = document.createElement("button");
      button.type = "button";
      var title = document.createElement("span");
      title.className = "worship-title";
      title.textContent = sermon.title;
      var who = document.createElement("span");
      who.className = "worship-who";
      who.textContent = sermon.speaker;
      button.appendChild(title);
      button.appendChild(who);
      button.addEventListener("click", function () {
        show(index, true);
      });
      buttons.push(button);
      item.appendChild(button);
      menu.appendChild(item);
    });

    show(0, false);
    mount.appendChild(player);
    mount.appendChild(now);
    mount.appendChild(menu);
  });

  fetch("content/additions.json")
    .then(function (response) { return response.ok ? response.json() : null; })
    .then(function (data) {
      if (!data) return;
      var gallery = document.querySelector(".gallery");
      (data.images || []).forEach(function (item) {
        if (!gallery || !item.src) return;
        var figure = document.createElement("figure");
        var img = document.createElement("img");
        img.src = item.src;
        img.alt = item.caption || "Kingdom Life";
        var cap = document.createElement("figcaption");
        cap.textContent = item.caption || "Kingdom Life family";
        figure.appendChild(img);
        figure.appendChild(cap);
        gallery.appendChild(figure);
      });
      function fillList(selector, items, title) {
        var mount = document.querySelector(selector);
        if (!mount || !items || !items.length) return;
        var heading = document.createElement("h3");
        heading.textContent = title;
        mount.appendChild(heading);
        items.forEach(function (item) {
          if (!item.url) return;
          var link = document.createElement("a");
          link.href = item.url;
          link.textContent = item.label || item.url;
          if (/^https?:/i.test(item.url)) link.target = "_blank";
          link.rel = "noopener";
          mount.appendChild(link);
        });
        mount.hidden = false;
      }
      fillList("[data-admin-links]", data.links, "Links");
      fillList("[data-admin-files]", data.files, "Files");
    })
    .catch(function () {});

  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = form.getAttribute("data-mailto");
      var subject = form.getAttribute("data-subject") || "Message from Kingdom Life Krakow website";
      var parts = [];
      new FormData(form).forEach(function (value, key) {
        parts.push(key + ": " + value);
      });
      var href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(parts.join("\n"));
      window.location.href = href;
    });
  });
});
