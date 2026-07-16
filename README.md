# Athena Personal Academic Page

Athena Personal Academic Page is a React + Vite template for a modern personal academic website. It is built for researchers who want one clean place for their profile, publications, projects, teaching, talks, awards, service, and publication metrics.

The name keeps the Greek deity convention while making the repository purpose explicit.

## Features

- Modern single-page academic layout with sticky navigation, a compact profile sidebar, responsive mobile collapse, and a clean publication-first reading flow.
- Light and dark themes with system-theme detection and a manual toggle.
- Polished UI details: soft surfaces, subtle shadows, hover states, semantic section icons, rounded media frames, compact action chips, and mobile-safe typography.
- Publication analytics generated from `src/content/publications.js`: yearly count, research area distribution, publication type, venue family, selected papers, and open artifacts.
- Publication cards with featured figures, grouped paper sections, and a horizontally scrollable project rail that supports any number of projects.
- Configurable sections for news, projects, teaching, talks, education, experience, awards, and academic service.
- SEO and social preview metadata injected from `src/content/site.js`.
- GitHub Pages deployment workflow included.

## Quick Start

1. Fork this repository.
2. Rename the fork to `USERNAME.github.io` for a personal GitHub Pages site. Replace `USERNAME` with your GitHub username.
3. Clone your fork:

```bash
git clone https://github.com/USERNAME/USERNAME.github.io.git
cd USERNAME.github.io
```

4. Install dependencies and start the local server:

```bash
npm install
npm run dev
```

5. Open `http://127.0.0.1:5173/`.
6. Edit your data in `src/content/` and put images in `public/images/`.
7. Check the production build:

```bash
npm run build
npm run preview
```

8. Commit and push to `main`. The included GitHub Pages workflow builds `dist/` and deploys it.

## GitHub Pages Setup

This template is designed for a root personal site such as `https://USERNAME.github.io/`.

In your GitHub repository:

1. Open `Settings -> Pages`.
2. Set `Build and deployment -> Source` to `GitHub Actions`.
3. Push to `main`.
4. Wait for the `Deploy Pages` workflow to finish.

If you deploy to a custom domain, set `siteMeta.url` in `src/content/site.js` to that domain. The included Vite config uses `/` for `USERNAME.github.io` repos and `/<repo-name>/` for project Pages builds, so the template also works as a project-page demo.

## Content

Editable content lives in `src/content/`. In normal use, this is the only folder you edit for data and copy.

The complete field-by-field reference is in [`src/content/README.md`](src/content/README.md). It documents every exported content object, publication grouping and card selection, rich text fragments, link options, image paths, and WebP generation.

- `site.js`: brand, SEO metadata, repository link, section order, section labels, section visibility, and publication group order.
- `profile.js`: identity, affiliation, contact links, research focus, and about paragraphs.
- `publications.js`: papers, venues, years, groups, links, tags, selected publication flags, and optional images.
- `projects.js`, `teaching.js`, `talks.js`: optional academic activity sections.
- `news.js`, `education.js`, `experience.js`, `awards.js`, `services.js`: standard homepage sections.

Recommended fill order:

1. `profile.js`
2. `publications.js`
3. `site.js`
4. Optional activity files

Publication charts are computed automatically from `publications.js`.

### Publication groups and card sizes

Each paper needs a `group` string. Groups are matched by exact text and rendered in the preferred order from `publicationGroups` in `src/content/site.js`. A group used by a paper but omitted from `publicationGroups` is still shown after the preferred groups. Papers without a group are not rendered in the publication section.

`featured` alone determines the publication layout:

- `featured: true` renders the large publication card.
- Missing or false `featured` renders the compact publication row.
- A featured paper may omit `image`; the card then shows a generated text placeholder.
- `image` does not make a paper featured. Compact rows do not render publication images.

Featured papers are shown before compact papers inside each group. Array order is preserved within those two sets.

Section order, titles, navigation labels, small notes, and visibility are all controlled by the single `sections` array in `src/content/site.js`, so there is no separate nav list to keep in sync.

To hide a built-in section, set `enabled: false`:

```js
{ id: "talks", title: "Talks", nav: "Talks", enabled: false }
```

To keep a section on the page but remove it from the top navigation, set `nav: false`.

## Images

Put all site images in `public/images/`. This keeps image paths easy to find and lets Vite serve them directly from stable URLs such as `images/avatar.webp` or `images/project-cover.png`.

Recommended layout:

- Profile photo: `public/images/avatar.webp`, then set `profile.avatar` in `src/content/profile.js`.
- Publication figures: `public/images/<paper-slug>.png` plus a same-name `.webp`, or one standalone `.svg`/`.webp`, then set `image` in `src/content/publications.js`.
- Social preview image and favicon assets: keep them in `public/images/` and reference them from `src/content/site.js` or `index.html`.

Use paths without a leading slash, for example `images/avatar.webp`. That keeps both `USERNAME.github.io` deployments and project-page demos working.

Publication figures use a `16:9` frame with `object-fit: contain`, so a `16:9` source usually gives the cleanest result.

### PNG/JPEG and WebP pairs

When a publication `image` ends in `.png`, `.jpg`, or `.jpeg`, Athena automatically requests a same-name `.webp` first and keeps the original file as the fallback:

```js
image: "images/my-paper.png"
```

Both files should exist:

```text
public/images/my-paper.png
public/images/my-paper.webp
```

A missing WebP can appear as a broken image in browsers that select the WebP source. Do not delete the original PNG/JPEG; it remains the compatibility fallback.

Generate the WebP with `cwebp`:

```bash
# macOS, one-time install
brew install webp

cwebp -q 90 public/images/my-paper.png -o public/images/my-paper.webp
```

Or use ImageMagick:

```bash
magick public/images/my-paper.png -quality 90 public/images/my-paper.webp
```

If `image` points directly to `.webp` or `.svg`, Athena uses that file as-is and does not look for another format.

For favicon generation, the AcadHomepage template recommends [redketchup favicon-generator](https://redketchup.io/favicon-generator). Generate the favicon package there, then copy the needed outputs into `public/images/`.

## Link Labels

Publication and project link icons are inferred from labels. These labels work out of the box:

`Paper`, `Code`, `Dataset`, `Demo`, `Slides`, `Video`, `DOI`, `BibTeX`, `Poster`, `Documentation`, `Project`, and `Download`.

For GitHub repository links, add a numeric `stars` field when you want a reliable fallback badge without depending on the GitHub API:

```js
{ label: "Code", href: "https://github.com/owner/repo", stars: 128 }
```

The fallback star count renders immediately. The badge refreshes from the GitHub API after the initial page load when the persistent browser cache is missing or stale, and keeps the last successful cached value when anonymous GitHub API requests are rate-limited. Fork counts are not displayed.

By default, GitHub stats only appear on repository-style links such as `Code`, `GitHub`, `Repo`, or `Repository`. Release, documentation, and demo links stay clean unless you set `showGithubStats: true`.

Profile link icon keys include:

`Email`, `Scholar`, `ORCID`, `DBLP`, `GitHub`, `LinkedIn`, `Website`, `Lab`, `CV`, and `HuggingFace`.

News icon keys include:

`release`, `accepted`, `dataset`, `code`, `talk`, `teaching`, `award`, `career`, `degree`, `visit`, and `service`.

## Verification Checklist

Before pushing:

```bash
npm run build
npm run preview
```

Then check:

- The profile sidebar shows the right name, role, email, location, links, and avatar.
- Every publication link opens correctly.
- Publication figures load from `public/images/`; every PNG/JPEG figure has its same-name WebP file.
- The top navigation scrolls to the expected sections.
- Light and dark mode both look correct.
- Mobile layout is readable.
- `siteMeta.url`, `siteMeta.image`, and `siteMeta.repositoryUrl` are set.

## Project Structure

```text
src/content/          Profile data and editable website content
src/App.jsx           Page rendering logic
src/icons.js          Icon mappings
src/styles.css        Design system and responsive styling
src/assets/fonts/     Bundled icon fonts processed by Vite
public/images/        Avatars, publication figures, favicon, and preview images
.github/workflows/    GitHub Pages deployment
```

## Build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`. The included GitHub Pages workflow deploys that directory from `main`.
