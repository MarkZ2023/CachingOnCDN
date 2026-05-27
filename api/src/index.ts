import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { categories, categoryNavItems } from "./data/categories.js";

const noStore = "private, no-store, no-cache, must-revalidate";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      process.env.WEB_ORIGIN ?? "",
    ].filter(Boolean),
  }),
);

app.get("/health", (c) => c.json({ status: "ok" }));

app.get("/categories", (c) => {
  c.header("Cache-Control", noStore);
  return c.json(categoryNavItems);
});

app.get("/categories/:slug", (c) => {
  const slug = c.req.param("slug");
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return c.json({ error: "Category not found" }, 404);
  }

  c.header("Cache-Control", noStore);
  return c.json(category);
});

const port = Number(process.env.PORT ?? 3001);

serve({ fetch: app.fetch, port }, () => {
  console.log(`Hono API running on http://localhost:${port}`);
});
