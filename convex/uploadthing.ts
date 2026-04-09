import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { UploadThingFiles } from "@mzedstudio/uploadthingtrack";
import { components } from "./_generated/api";

const uploadthing = new UploadThingFiles(components.uploadthingFileTracker);

export const configureUploadThing = mutation({
  args: {},
  handler: async (ctx) => {
    await uploadthing.setConfig(ctx, {
      config: {
        defaultTtlMs: 365 * 24 * 60 * 60 * 1000,
        ttlByMimeType: {
          "image/jpeg": 365 * 24 * 60 * 60 * 1000,
          "image/png": 365 * 24 * 60 * 60 * 1000,
          "image/webp": 365 * 24 * 60 * 60 * 1000,
        },
        deleteRemoteOnExpire: true,
      },
    });
  },
});

export const trackUploadedFile = mutation({
  args: {
    key: v.string(),
    url: v.string(),
    name: v.string(),
    size: v.number(),
    mimeType: v.string(),
    folder: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", identity.email!))
      .first();

    await uploadthing.upsertFile(ctx, {
      file: {
        key: args.key,
        url: args.url,
        name: args.name,
        size: args.size,
        mimeType: args.mimeType,
      },
      userId: user?._id ?? identity.subject,
      options: {
        folder: args.folder ?? "projects",
        access: { visibility: "public" },
      },
    });
  },
});

export const listProjectFiles = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await uploadthing.listAllFiles(ctx, {
      viewerUserId: args.userId,
      folder: "projects",
      limit: 100,
    });
  },
});
