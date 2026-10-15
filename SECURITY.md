# Security Policy

## Supported site

Kingdom Life Kraków is a static public website hosted on GitHub Pages:

- Live: https://arnold-rg.github.io/kingdom-life-krakow/
- Repository: https://github.com/Arnold-RG/kingdom-life-krakow

## Reporting a vulnerability

Please report security issues privately to the campus team:

- **Campus:** krakow@kingdomlifeonline.org
- **Pastor:** Pastor@kingdomlifeonline.org

Include what you found, how to reproduce it, and impact. Do not open a public GitHub issue for credential or auth problems.

We aim to acknowledge reports within a few business days.

## Scope

In scope:

- Cross-site scripting (XSS) via dynamic content injection
- Broken access control on `admin.html` (GitHub token gate)
- Sensitive data exposure in client-side code
- Open redirects or unsafe external link handling

Out of scope:

- Denial of service against GitHub Pages
- Issues in third-party embeds (YouTube, Google Maps) outside our markup
- Social engineering against church staff

## Hardening already in place

- External links use `rel="noopener noreferrer"`
- Referrer policy: `strict-origin-when-cross-origin`
- Dynamic DOM updates prefer `textContent` over `innerHTML`
- Admin tools require a GitHub token with push access to this repository; tokens are not stored in the site
- No secrets ship in source; `.env` and credentials are gitignored

## Preferred disclosure

Coordinated disclosure. Please give us a reasonable window to patch before public write-ups.
