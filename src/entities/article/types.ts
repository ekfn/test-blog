import zod from "zod";

export const articleSchema = zod.object({
  id: zod.number(),
  slug: zod.string(),
  title: zod.string(),
  previewText: zod.string(),
  text: zod.string(),
  images: zod.object({
    caption: zod.string(),
    card: zod.object({
      url: zod.string().url(),
      width: zod.number(),
      height: zod.number(),
    }),
    banner: zod.object({
      url: zod.string().url(),
      width: zod.number(),
      height: zod.number(),
    }),
  }),
});

export type ArticleFragment = zod.infer<typeof articleSchema>;

export type ArticleCardFragment = Omit<ArticleFragment, "text">;
