# Security Policy — Kingdom Life Kraków and Warsaw

## Supported version and private disclosure
Security fixes target the current `main` branch. Report an unpatched vulnerability privately using GitHub's **Report a vulnerability** / private security advisory feature if enabled; otherwise contact the repository maintainer privately through the linked GitHub profile. Do not publish exploit details, passwords, access tokens, attendee records, or private photographs in an issue.

## Controls appropriate to this project
- **IAM (high priority):** `admin.html` is a public web page, not an authentication boundary. GitHub enforces any repository-write permission, not the page label. Use a fine-grained, short-lived GitHub token limited to this repository and the minimum necessary Contents permission; never share or save it in site files, browser storage, screenshots, or logs. Prefer a proper server-side identity flow before deploying any multi-user editing feature. Revoke compromised tokens immediately.
- **Cloud / hosting:** GitHub Pages is public static hosting. Do not put private keys, passwords, tokens, private attendee files, or privileged APIs in HTML, JavaScript, or `content/`. Keep GitHub Actions credentials scoped and review changes before publication.
- **GRC / privacy:** Obtain consent for identifiable photographs, protect personal and prayer-request information, check approved ministry content and leadership names, and avoid publishing private contact lists. Follow applicable privacy and copyright requirements.
- **Browser security:** Treat submitted captions, links, and filenames as untrusted. Keep text insertion non-executable; validate allowed URL schemes and upload types. Do not assume client-side validation alone prevents unsafe uploads.
- **AI / OT:** Neither is part of the current static website; do not add AI or operational-technology controls without an actual integration and documented threat model.

## Review before release
Check `.github/workflows/quality.yml`, verify public pages and the admin flow, inspect file and link uploads, check GitHub Actions permissions and external dependencies, and verify that no secrets or personal records enter the public repository. Avoid deploying unreviewed changes.
