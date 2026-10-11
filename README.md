# Kingdom Life Kraków

English-speaking international church website for the Kraków campus of Kingdom Life Christian Fellowship (Społeczność Chrześcijańska Kingdom Life).

**Live site:** https://arnold-rg.github.io/kingdom-life-krakow/  
**Official church site:** https://kingdomlifeonline.org/  
**Kraków Instagram:** https://www.instagram.com/kingdomlifekrakow/

The church meets every Sunday, 12:00–14:00, inside Hotel Centrum, Osiedle Centrum E 12, 31-934 Kraków (Nowa Huta). Campus email: krakow@kingdomlifeonline.org.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home. Sunday times, Kingdom gallery, in-page sermons, pastor, daily verse, reviews, map, FAQ. |
| `about.html` | Published church facts, campuses, leadership, and the sermon players. |
| `events.html` | Weekly Kraków meetings and family conference posters. |
| `teaching.html` | Daily Bible verse and the full sermon set. |
| `books.html` | Suggested Christian reading. |
| `pastor.html` | Ask Dr. Tammy Gbolubo. The form opens the visitor’s email app. |
| `join.html` | Membership and WhatsApp request, plus sermons. |

## What a visitor can do

- Find the English Sunday service, the Hotel Centrum address, and a map.
- See real photographs of the congregation, leaders, and the hotel.
- Press play on sermons and worship films without leaving the site.
- Read a date-based Bible verse.
- Write the campus pastor or request the Kraków WhatsApp group.

## Sermons on the site

Players are built from `js/site.js` and shown on Home, About, Daily Word, and Join. Each film is a public video from the Kingdom Life Poland channel. Pressing play stays on the page.

The empty “live now” player was removed. YouTube shows that player as unavailable whenever the channel is not broadcasting.

| Film | Speaker |
| --- | --- |
| How can I Exercise my Faith? | Dr. Tammy Gbolubo, Kraków campus |
| Kingdom Life at Four | Dr. Precious Anoshiri |
| MasterPiece | Dr. Priyanka Zala Anoshiri |
| Mephibosheth (Get Up And Fight) | Dr. Precious Anoshiri |
| Guard The Gates | Kingdom Life Poland, 30 August 2026 |
| An Encounter with God | Kingdom Life Poland |
| Church welcome film | Kingdom Life Christian Fellowship |
| Kingdom Life Worship ft David | Kingdom Life Worship |
| New Thing Coming | Kingdom Life Worship ft Elyse |
| Who Else | Kingdom Life Worship ft Mathia |
| The Principle Of First | Dr. Precious Anoshiri |
| The Life of God | Dr. Precious Anoshiri |
| Born Again | Dr. Precious Anoshiri |
| Goodness of God | Kingdom Life Worship |

To add or remove a film, edit the `sermons` list in `js/site.js`. Any element with `data-sermons="all"` renders the full list.

## Project structure

```
index.html, about.html, events.html, teaching.html, books.html, pastor.html, join.html
css/site.css          parish layout, type, and the sermon player
js/site.js            menu, year, mailto forms, WhatsApp hook, sermon players
js/verse.js           daily verse
assets/               logos, portraits, gathering photos, Instagram stills, Hotel Centrum
sitemap.xml
robots.txt
```

There is no build step and no package manager. The site is static HTML, CSS, and JavaScript.

## Run it locally

Open `index.html` in a browser, or from this folder:

```powershell
Start-Process .\index.html
```

## Publish

The live site is GitHub Pages from the `main` branch, root folder.

```powershell
git add -A
git commit -m "Describe the change."
git push origin main
```

Pages serves https://arnold-rg.github.io/kingdom-life-krakow/ after the push. A `.nojekyll` file is in the root so GitHub publishes the files as they are.

## Church facts used on the site

- Sunday worship: 12:00–14:00, Hotel Centrum, Osiedle Centrum E 12, 31-934 Kraków.
- Map: 50.0705027, 20.0396688. Plus code 32CQ+6V.
- Daily prayer: 18:00.
- Kraków pastor: Dr. Tammy Gbolubo.
- Lead pastor: Dr. Precious Anoshiri. Executive pastor: Dr. Priyanka Anoshiri.
- Deacons named on the official site: Belinda Mavuwa, Elyse Teta, Gloire Kwizera. Dcn. Samy is included from the Kraków family portraits.
- Parent congregation: Postępu 15C, 02-676 Warszawa.

## Photographs

Gallery and portrait images are real photographs from the church archive, the Kraków Instagram account, and the Hotel Centrum website. Event posters stay on the events page and are not mixed into the people gallery.

## Forms

Ask the Pastor and the membership form use `mailto:`. They open the visitor’s own email program. They do not store messages on a server. The WhatsApp group is not published here. When the campus shares a standing invite, set `whatsappGroup` in `js/site.js`.

## Content

Sermons, photographs, names, and the Kingdom Life mark belong to the church and the people who made them. This repository hosts the campus website. It does not transfer ownership of that material.
