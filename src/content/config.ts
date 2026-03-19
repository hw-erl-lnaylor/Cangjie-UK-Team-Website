import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      authors: z.array(z.string()),
      repoLink: z.string().optional(),
      tags: z.array(z.string()).optional(),
      descriptionVideo: z.string().optional(),
      descriptionImage: image().optional(),
    }),
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    route: z.string(),
  }),
});

const lessons = defineCollection({
  loader: glob({
    base: "./src/content/lessons",
    pattern: "data.json",
  }),
  schema: z.array(z.string()),
});

export const collections = { blog, news, pages, lessons };
