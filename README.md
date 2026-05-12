# Mossbeard the Wanderer

Website for Mossbeard the Wanderer — a Renaissance faire character and keeper of quiet trails and old tales.

**Live site:** hosted on GitHub Pages  
**Facebook:** [Mossbeard the Wanderer](https://www.facebook.com/people/Mossbeard-the-Wanderer/61580016592890/)

---

## Deploying

This site uses [Jekyll](https://jekyllrb.com/), which GitHub Pages builds automatically.

**No local build step is required.** Just push your changes to GitHub and the site updates itself.

To enable GitHub Pages for the first time:
1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`
4. GitHub will build and publish the site — the URL appears at the top of that page

---

## Editing content

All content lives in plain text files. You do not need to touch `index.html` or `_layouts/` for routine updates.

### Faire appearances — `_data/appearances.yml`

Add, remove, or reorder blocks to update the *Find Mossbeard* section.

```yaml
- name:        My New Faire
  location:    City, State
  date:        October 2026
  upcoming:    true        # shows the "Upcoming" badge when true
  description: A wonderful faire in the autumn woods.
  url:         https://example.com
  link_text:   Visit the Faire
```

### Gallery photos — `_data/gallery.yml`

Drop the photo file into `photos/`, then add an entry:

```yaml
- src:   "photos/My New Photo.jpg"
  alt:   A full description for screen readers
  label: Short label shown in the lightbox
```

Reorder entries to change the gallery order.

### Magical relics — `_data/relics.yml`

Each relic is either an icon relic or a photo relic:

```yaml
# Icon relic
- name:        The New Artifact
  icon:        "✦"
  description: What this artifact does.

# Photo relic (omit icon)
- name:        The Visual Artifact
  photo:       photos/artifact.jpg
  photo_alt:   Description of the photo
  description: What this artifact does.
```

### Prose sections — `_includes/content/`

| File | What it controls |
|------|-----------------|
| `wanderer-intro.md` | The pull quote at the top of *The Wanderer* section |
| `wanderer-lore.md` | The origin story paragraphs |
| `forgotten-words.md` | The *Forgotten Words* prose (use `> text` for the mission blockquote) |

Standard Markdown formatting works in all three files.

### Site title & description — `_config.yml`

Update `title` and `description` at the top of `_config.yml`. After changing CSS or JS, increment `css_version` or `js_version` by one so browsers pick up the new files.

---

## Previewing locally (optional)

You only need this if you want to see changes before pushing to GitHub.

**Prerequisites:** Ruby (any version) and Bundler:

```bash
gem install bundler
bundle install
```

**Start the local server:**

```bash
bundle exec jekyll serve
```

Then open [http://localhost:4000](http://localhost:4000). The site reloads automatically when you save files.

---

## Project structure

```
_config.yml              — site settings, cache versions
_data/
  appearances.yml        — faire dates and locations
  relics.yml             — magical artifacts
  gallery.yml            — gallery photos
_includes/content/
  wanderer-intro.md      — Wanderer section pull quote
  wanderer-lore.md       — Wanderer section lore body
  forgotten-words.md     — Forgotten Words section prose
_layouts/
  default.html           — HTML shell (head, footer, scripts)
index.html               — page template using Liquid
css/style.css            — all styles
js/main.js               — gallery lightbox, mobile nav, sticky nav
photos/                  — character photos
docs/                    — source lore documents (not published)
```

### Fonts

- [Cinzel Decorative](https://fonts.google.com/specimen/Cinzel+Decorative) — headings
- [IM Fell English](https://fonts.google.com/specimen/IM+Fell+English) — body text
