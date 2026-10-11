/* Kingdom Life Krakow campus site
   When the church has a public WhatsApp invite, paste it here:
   example: "https://chat.whatsapp.com/AbCdEfGh123"
*/
window.KL = {
  whatsappGroup: "",
  campusEmail: "krakow@kingdomlifeonline.org",
  pastorEmail: "Pastor@kingdomlifeonline.org"
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
