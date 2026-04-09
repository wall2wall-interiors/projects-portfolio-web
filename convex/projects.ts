import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { auth } from "./auth";

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

export const getAll = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const q = args.category
      ? ctx.db.query("projects").withIndex("by_category", (q) => q.eq("category", args.category!))
      : ctx.db.query("projects");
    return await q.collect();
  },
});

export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    year: v.number(),
    client: v.string(),
    location: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    images: v.array(v.string()),
    youtubeUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("projects", {
      ...args,
      authorId: userId,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    year: v.number(),
    client: v.string(),
    location: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    images: v.array(v.string()),
    youtubeUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const project = await ctx.db.get(id);
    if (!project) {
      throw new Error("Project not found");
    }

    // Optional: check if user is the author
    // if (project.authorId !== userId) throw new Error("Unauthorized");

    await ctx.db.patch(id, data);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const project = await ctx.db.get(args.id);
    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
