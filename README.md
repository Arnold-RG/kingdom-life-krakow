# Kingdom Life — Kraków & Warsaw

**Church community website** · [GitHub repository](https://github.com/Arnold-RG/kingdom-life-krakow)

## What this project does

Church community web project containing location information, events, ministry content and navigation for Kraków and Warsaw. Accurate campus leadership, consented photography and verified service details are essential.

**Primary stack:** Static HTML/CSS/JavaScript, curated content and images.

> **Project verification:** This README describes observed source structure and release expectations. Not every feature, dependency or target device has been certified. Consult actual CI results and source before making public claims.

## Repository architecture

| File or directory | Purpose |
| --- | --- |
| `index.html` | Main website |
| `about.html` | Mission and ministry information |
| `events.html` | Community events |
| `pastor.html` | Leadership information |
| `join.html` | Community invitation |
| `books.html` | Reading/resources |
| `admin.html` | Administrative-facing page: authentication must be audited |
| `assets/` | Site images and branding |
| `css/` | Styles |
| `js/` | Browser behavior |
| `content/` | Editorial data |

## Local development

Install Git and the required language runtime. Use a clean environment and review configuration files for secrets before starting network services.

```sh
python -m http.server 8000
# Open http://localhost:8000
```

**Environment note:** This is a static browser site. Any editing backend/admin function requires separate authentication and security review.

## User experience and core requirements

- Keep Kraków and Warsaw campus details separate, including verified photos and leadership.
- Use the church's approved logo, vision, mission and scriptural references accurately.
- Make service times, directions and contact requests straightforward on phones.

Build for real customer journeys: clear navigation, accessible controls, responsive layouts, truthful claims, human-readable errors and meaningful loading/empty states.

## Security, data and privacy

- Never treat an admin.html page as secured merely because it is not linked in navigation.
- Do not expose attendees' contact information or publish photos without consent.
- Validate external forms and never store passwords or keys in client-side JavaScript.

Review secrets, trust boundaries, external services and permission handling. Use scoped credentials, a private disclosure channel (see `SECURITY.md` if present), and secure dependency updates.

## Quality and operations

| Area | Release acceptance criterion |
| --- | --- |
| Implementation | Maintainable code, clear ownership, documented configuration |
| Testing | Actual unit/integration checks or a documented repeatable smoke test |
| Security | Input and dependency checks, least privilege and no exposed credentials |
| Accessibility | Keyboard, contrast, touch and responsive testing for user-facing screens |
| CI/CD | Reproducible builds, protected release jobs, owner-approved publication |
| Reliability | Error monitoring; backups/recovery for persisted data; rollback plan |

**These are intended gates, not an assertion of passing tests.** Kubernetes is unnecessary for purely static pages; reassess it only where multi-service infrastructure warrants the complexity.

## Next engineering milestones

1. Verify leadership images, bios and campus separation.
2. Check keyboard/mobile navigation and working links.
3. Document publishing steps and editorial approval procedure.

## Contributions and release policy

Use reviewable branches and pull requests. Don't add unlicensed visual assets, mock client testimonials, private customer data or unverified integrations. Owners approve public releases; note remaining limitations in the release report.
