import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const menuCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/menu" }),
  schema: ({ image }) => z.object({
    name: z.string(),
    description: z.string(),
    price: z.union([z.number(), z.string()]),
    category: z.enum([
      "Traditional Irish Classics",
      "American Pub Fare",
      "Starters",
      "Draft Beers",
      "Bottles & Cans",
      "Irish Whiskey",
      "Bourbon & Rye",
      "Scotch Whisky",
      "Tequila & Mezcal",
      "Gin",
      "Vodka",
      "Rum",
    ]),
    tags: z.array(z.string()).optional().default([]),
    image: image().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

const eventsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    recurrence: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    eventbriteUrl: z.string().url().optional(),
    location: z.string().optional().default("Grogg's Traditional Irish Pub, Clovis, CA"),
  }),
});

export const collections = {
  menu: menuCollection,
  // specials: specialsCollection,
  events: eventsCollection,
};