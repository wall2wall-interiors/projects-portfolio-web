import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  projects: defineTable({
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
    authorId: v.id("users"),
  })
    .index("by_author", ["authorId"])
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_featured", ["featured"]),

  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    projectType: v.string(),
    message: v.string(),
    isRead: v.boolean(),
  }).index("by_isRead", ["isRead"]),

  testimonials: defineTable({
    clientName: v.string(),
    clientTitle: v.optional(v.string()),
    content: v.string(),
    projectId: v.optional(v.id("projects")),
    rating: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
  })
    .index("by_featured", ["featured"])
    .index("by_project", ["projectId"]),

  services: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    icon: v.optional(v.string()),
    order: v.optional(v.number()),
    featured: v.optional(v.boolean()),
  })
    .index("by_slug", ["slug"])
    .index("by_featured", ["featured"]),
});
