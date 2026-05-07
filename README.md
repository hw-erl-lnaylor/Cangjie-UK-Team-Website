# Cangjie UK Team website

We are a team based in the Edinburgh focused on the Cangjie programming language — sharing tutorials, writing blogs, and building practical resources for developers.

## Install dependencies

From the project root:

```bash
npm install
```

Or, for a clean install matching the lockfile:

```bash
npm ci
```

## Run locally

Start the Astro dev server:

```bash
npm run dev
```

Then open:

```text
http://localhost:4321
```

## Build for production

```bash
npm run build
```

## How to add a new blog post

Each blog post lives in its own folder under `src/content/blog/`. The folder name becomes the slug and the public URL.

Create the following layout (only include `figures/` if the post has images):

```text
src/content/blog/
└── my-new-blog-post/
    ├── index.md
    └── figures/
        ├── cover.png
        └── inline-diagram.png
```

Use a lowercase, hyphenated folder name. The post is published at `/blog/my-new-blog-post/`.

Required frontmatter fields:

- `title`
- `description`
- `date` in `DD/MM/YYYY` format
- `authors` as an array

Optional frontmatter fields:

- `repoLink`
- `tags`
- `descriptionVideo`
- `descriptionImage`

Example `index.md`:

```md
---
title: "My New Blog Post"
description: "A short summary for the homepage and SEO."
date: "26/03/2026"
authors:
  - "Author Name"
tags:
  - "Tutorial"
descriptionImage: "./figures/cover.png"
---

# My New Blog Post

Body content here. Reference inline images with a relative path:

![Diagram](./figures/inline-diagram.png)
```

Notes:

- Put all images for the post in its own `figures/` folder, including the cover image
- Use `./figures/...` (with the leading `./`) for both `descriptionImage` and inline Markdown images
- `descriptionImage` is used as the blog cover/summary image
- If you also insert the same image inside the Markdown body, it will appear twice
- For YouTube auto-embed inside the article body, use a normal video URL in a paragraph containing `Video Link`

## How to add a news post

Each news post lives in its own folder under `src/content/news/`, following the same per-entry layout as blog posts:

```text
src/content/news/
└── my-news-post/
    ├── index.md
    └── figures/
        └── inline-image.png
```

Required frontmatter fields:

- `title`
- `date` in `DD/MM/YYYY` format

Example `index.md`:

```md
---
title: "My News Title"
date: "26/03/2026"
---

Some short news copy. Inline images live next to the post:

![Inline](./figures/inline-image.png)
```

Notes:

- Put all images for the news item in its own `figures/` folder
- Use `./figures/...` (with the leading `./`) for inline Markdown images
- News items are rendered from the `news` content collection
- The public route for news is generated from its date-based ordering, not directly from the folder name
