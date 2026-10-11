# Kingdom Life Kraków

Public website for the English-speaking Kraków campus of Kingdom Life Christian Fellowship (Społeczność Chrześcijańska Kingdom Life).

Anyone can open the site. No GitHub account and no login are required.

| | |
| --- | --- |
| Live site | https://arnold-rg.github.io/kingdom-life-krakow/ |
| Repository | https://github.com/Arnold-RG/kingdom-life-krakow |
| Official church site | https://kingdomlifeonline.org/ |
| Kraków Instagram | https://www.instagram.com/kingdomlifekrakow/ |
| Poland family | https://www.instagram.com/kingdomlifepl/ |
| YouTube | Kingdom Life Poland, played inside this site |
| Campus email | krakow@kingdomlifeonline.org |

## Who can use it

The GitHub repository is **public**. GitHub Pages for this repository is **public**. Any person, on any browser, can open the live address above.

Visitors can read every page, see the photographs, and press play on the films. They do not receive permission to change the repository. Changes stay with the repository owner.

## The church

Kingdom Life Kraków is an international, English-speaking Church of Christ campus. Google Maps lists it as Kingdom Life Krakow.

- Sunday worship: **12:00–14:00**
- Place: **Hotel Centrum, Osiedle Centrum E 12, 31-934 Kraków** (Nowa Huta)
- Plus code: **32CQ+6V**
- Map: **50.0705027, 20.0396688**
- Weekday prayer: **18:00**
- Kraków pastor: **Dr. Tammy Gbolubo**
- Lead pastor: **Dr. Precious Anoshiri** (Warsaw)
- Executive pastor: **Dr. Priyanka Anoshiri**
- Deacons on the official site: Belinda Mavuwa, Elyse Teta, Gloire Kwizera
- Dcn. Samy is included from the Kraków family portraits
- Parent congregation: Postępu 15C, 02-676 Warszawa
- Tagline: Embracing God’s Love and Living His Light

On arrival, look for Kingdom Life posters and banners inside the hotel. They lead to the room.

## What the website contains

- A home page aimed at people searching for an English church in Kraków.
- Sunday time, address, map, and Google review quotes.
- A Kingdom gallery of people only: gatherings and member photographs. No event posters and no videos in the gallery.
- A Worship section on the home page. Every YouTube film plays there, on the page.
- Daily Bible verse.
- Ask the Pastor, written to the campus email.
- Events and family conference posters.
- Book suggestions.
- A join form for membership and the Kraków WhatsApp group. The group link is not published. The campus sends it.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home. Gallery of people. Worship section with every film. Pastor, verse, map, FAQ. |
| `about.html` | Church facts, campuses, leadership, and the films. |
| `events.html` | Weekly Kraków meetings and conference posters. |
| `teaching.html` | Daily verse and the full film set. |
| `books.html` | Suggested Christian reading. |
| `pastor.html` | Ask Dr. Tammy Gbolubo. |
| `join.html` | Membership and WhatsApp request, plus the films. |
| `css/site.css` | Layout and the video player. |
| `js/site.js` | Menu, forms, WhatsApp setting, and the sermon list. |
| `js/verse.js` | The verse that changes with the date. |
| `assets/` | Logos, portraits, gathering photos, Kraków Instagram stills, Hotel Centrum building. |
| `sitemap.xml` | Public page list for search engines. |
| `robots.txt` | Allows all crawlers and points to the sitemap. |

## Worship films

Films are listed once, in `js/site.js`, under `sermons`. Home, About, Daily Word, and Join render that list inside the page. Pressing play does not send the visitor to YouTube.

The gallery on the home page does not contain these players.

| Film | Who |
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

To add a film, append `{ id, title, speaker }` to the `sermons` array. The `id` is the public YouTube video id. Pages with `data-sermons="all"` pick it up.

## Photographs

Gallery photographs are real pictures of people from the church archive and `@kingdomlifekrakow`. Event and invitation graphics stay on the events page. Find Us shows the Hotel Centrum building at Osiedle Centrum E 12, from hotel-centrum.pl. The reception photo is not on the site.

## How the site is published

This is a static site. There is no build, no database, and no server app.

GitHub Pages publishes the `main` branch from the repository root. The file `.nojekyll` tells GitHub to publish the files as they are.

After a push to `main`, GitHub rebuilds the public site at:

https://arnold-rg.github.io/kingdom-life-krakow/

That address works in Chrome, Edge, Firefox, Safari, and on a phone. It is not limited to the computer that created the site.

## Open it on your own computer

```powershell
Start-Process .\index.html
```

Or double-click `index.html`.

## Update the live site

```powershell
git add -A
git commit -m "Describe the change."
git push origin main
```

Wait a short time, then refresh the live address. A hard refresh (Ctrl+F5) loads the new pages if the browser kept the old ones.

## Forms and WhatsApp

Ask the Pastor and the join form use `mailto:`. They open the visitor’s email program. Nothing is stored in this repository.

When the campus has a public WhatsApp invite, set it in `js/site.js`:

```javascript
whatsappGroup: "https://chat.whatsapp.com/your-invite"
```

Until then, the button asks the campus team by email.

## Ownership

Sermons, photographs, names, and the Kingdom Life mark belong to the church and the people who made them. This repository hosts the campus website. It does not transfer ownership of that material.
