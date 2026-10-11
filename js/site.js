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

  document.querySelectorAll("[data-sermons]").forEach(function (grid) {
    var list = window.KL.sermons || [];
    var limit = grid.getAttribute("data-sermons");
    if (limit && limit !== "all") {
      var count = parseInt(limit, 10);
      if (!isNaN(count)) list = list.slice(0, count);
    }
    list.forEach(function (sermon, index) {
      var article = document.createElement("article");
      article.className = "card sermon";
      var player = document.createElement("div");
      player.className = "player";
      var frame = document.createElement("iframe");
      frame.title = sermon.title;
      frame.src = "https://www.youtube-nocookie.com/embed/" + sermon.id + "?rel=0";
      frame.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      frame.setAttribute("allowfullscreen", "");
      frame.loading = index < 2 ? "eager" : "lazy";
      player.appendChild(frame);
      var heading = document.createElement("h3");
      heading.textContent = sermon.title;
      var who = document.createElement("p");
      who.className = "small muted";
      who.textContent = sermon.speaker;
      article.appendChild(player);
      article.appendChild(heading);
      article.appendChild(who);
      grid.appendChild(article);
    });
  });

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
