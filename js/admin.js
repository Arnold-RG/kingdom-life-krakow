document.documentElement.classList.add("js");

var REPO = "Arnold-RG/kingdom-life-krakow";
var token = "";

function allowedUrl(value, options) {
  options = options || {};
  var raw = String(value == null ? "" : value).replace(/^\s+|\s+$/g, "");
  if (!raw || /[\u0000-\u001F\u007F]/.test(raw) || raw.indexOf("\\") !== -1) return "";
  var scheme = /^([a-z][a-z0-9+.-]*):/i.exec(raw);
  if (scheme) {
    var protocol = scheme[1].toLowerCase();
    var parsed;
    try { parsed = new URL(raw); } catch (error) { return ""; }
    if (protocol === "https" && parsed.protocol === "https:") return parsed.href;
    if (options.mailto && protocol === "mailto" && parsed.protocol === "mailto:") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.pathname)) return "";
      return parsed.href;
    }
    return "";
  }
  if (!options.relative || raw.slice(0, 2) === "//" || raw.indexOf("..") !== -1) return "";
  if (!/^(?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]+$/.test(raw)) return "";
  return raw;
}

var PHOTO_TYPES = {
  "image/jpeg": { jpg: 1, jpeg: 1 },
  "image/jpg": { jpg: 1, jpeg: 1 },
  "image/png": { png: 1 },
  "image/webp": { webp: 1 }
};
var FILE_TYPES = {
  "image/jpeg": { jpg: 1, jpeg: 1 },
  "image/jpg": { jpg: 1, jpeg: 1 },
  "image/png": { png: 1 },
  "image/webp": { webp: 1 },
  "application/pdf": { pdf: 1 }
};

function uploadError(file, types, label) {
  if (!file) return "Choose a " + label + " under 4 MB.";
  if (file.size > 4000000) return "Choose a " + label + " under 4 MB.";
  var name = String(file.name || "").toLowerCase();
  var parts = name.split(".");
  var exts = parts.slice(1);
  var blocked = { svg: 1, svgz: 1, html: 1, htm: 1, xhtml: 1 };
  var mime = String(file.type || "").toLowerCase();
  var i;
  for (i = 0; i < exts.length; i++) {
    if (blocked[exts[i]]) return "SVG and HTML files are not allowed.";
  }
  if (mime.indexOf("svg") !== -1 || mime === "text/html" || mime === "application/xhtml+xml") {
    return "SVG and HTML files are not allowed.";
  }
  var ext = exts.length ? exts[exts.length - 1] : "";
  var allowed = types[mime];
  if (!allowed || !allowed[ext]) return "Use a " + label + ".";
  return "";
}

function syncChrome() {
  var topbar = document.querySelector(".topbar");
  var header = document.querySelector(".site-header");
  var topH = topbar ? topbar.offsetHeight : 0;
  var headH = header ? header.offsetHeight : 0;
  document.documentElement.style.setProperty("--topbar-h", topH + "px");
  document.documentElement.style.setProperty("--chrome-h", (topH + headH) + "px");
}

function api(path, options) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers.Authorization = "Bearer " + token;
  options.headers.Accept = "application/vnd.github+json";
  return fetch("https://api.github.com" + path, options).then(function (response) {
    return response.json().then(function (body) {
      if (!response.ok) throw new Error(body.message || "GitHub refused the request");
      return body;
    });
  });
}

function safeName(name) {
  return String(name || "file").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "file";
}

function readFile(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () {
      var text = String(reader.result || "");
      var comma = text.indexOf(",");
      resolve(comma >= 0 ? text.slice(comma + 1) : text);
    };
    reader.onerror = function () { reject(new Error("Could not read the file")); };
    reader.readAsDataURL(file);
  });
}

function loadAdditions() {
  return api("/repos/" + REPO + "/contents/content/additions.json?ref=main").then(function (file) {
    var binary = atob(file.content.replace(/\n/g, ""));
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    var json = JSON.parse(new TextDecoder().decode(bytes));
    json.images = json.images || [];
    json.links = json.links || [];
    json.files = json.files || [];
    return { data: json, sha: file.sha };
  });
}

function saveAdditions(record, message) {
  return api("/repos/" + REPO + "/contents/content/additions.json", {
    method: "PUT",
    body: JSON.stringify({
      message: message,
      content: btoa(unescape(encodeURIComponent(JSON.stringify(record.data, null, 2) + "\n"))),
      sha: record.sha,
      branch: "main"
    })
  });
}

function putFile(path, base64, message) {
  return api("/repos/" + REPO + "/contents/" + path, {
    method: "PUT",
    body: JSON.stringify({
      message: message,
      content: base64,
      branch: "main"
    })
  });
}

document.addEventListener("DOMContentLoaded", function () {
  syncChrome();
  window.addEventListener("resize", syncChrome);
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  document.getElementById("gate").addEventListener("submit", function (event) {
    event.preventDefault();
    token = document.getElementById("token").value.trim();
    var msg = document.getElementById("gate-msg");
    msg.textContent = "Checking permission…";
    api("/repos/" + REPO).then(function (repo) {
      if (!repo.permissions || !repo.permissions.push) {
        throw new Error("This token cannot edit the repository.");
      }
      return api("/user");
    }).then(function (user) {
      document.getElementById("tools").hidden = false;
      document.getElementById("who").textContent = "Signed in as " + user.login + ". GitHub confirmed this account can edit the site.";
      msg.textContent = "";
    }).catch(function (error) {
      token = "";
      msg.textContent = error.message;
    });
  });

  document.getElementById("photo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.getElementById("photo");
    var file = input.files[0];
    var caption = document.getElementById("photo-cap").value.trim();
    var status = document.getElementById("save-msg");
    var problem = uploadError(file, PHOTO_TYPES, "JPG, PNG, or WebP image");
    if (problem) {
      status.textContent = problem;
      return;
    }
    status.textContent = "Saving the photo…";
    var path = "assets/uploads/" + Date.now() + "-" + safeName(file.name);
    readFile(file).then(function (base64) {
      return putFile(path, base64, "Add gallery photo from site admin").then(function () {
        return loadAdditions();
      }).then(function (record) {
        record.data.images.push({ src: path, caption: caption });
        return saveAdditions(record, "List the new gallery photo");
      });
    }).then(function () {
      status.textContent = "The photo is saved. It appears in the gallery after GitHub Pages refreshes.";
      event.target.reset();
    }).catch(function (error) {
      status.textContent = error.message;
    });
  });

  document.getElementById("link-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var status = document.getElementById("save-msg");
    var href = allowedUrl(document.getElementById("link-url").value, { mailto: true });
    if (!href) {
      status.textContent = "Use an https:// link, or a mailto: address.";
      return;
    }
    status.textContent = "Saving the link…";
    loadAdditions().then(function (record) {
      record.data.links.push({
        label: document.getElementById("link-label").value.trim(),
        url: href
      });
      return saveAdditions(record, "Add a link from site admin");
    }).then(function () {
      status.textContent = "The link is saved. It appears under the gallery after GitHub Pages refreshes.";
      event.target.reset();
    }).catch(function (error) {
      status.textContent = error.message;
    });
  });

  document.getElementById("file-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.getElementById("file");
    var file = input.files[0];
    var status = document.getElementById("save-msg");
    var problem = uploadError(file, FILE_TYPES, "JPG, PNG, WebP, or PDF file");
    if (problem) {
      status.textContent = problem;
      return;
    }
    status.textContent = "Saving the file…";
    var path = "assets/uploads/" + Date.now() + "-" + safeName(file.name);
    readFile(file).then(function (base64) {
      return putFile(path, base64, "Add a file from site admin").then(function () {
        return loadAdditions();
      }).then(function (record) {
        record.data.files.push({
          label: document.getElementById("file-label").value.trim(),
          url: path
        });
        return saveAdditions(record, "List the new file");
      });
    }).then(function () {
      status.textContent = "The file is saved. It appears under the gallery after GitHub Pages refreshes.";
      event.target.reset();
    }).catch(function (error) {
      status.textContent = error.message;
    });
  });
});
