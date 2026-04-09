import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Must be logged in to seed data");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", identity.email!))
      .first();

    const authorId = user?._id ?? (identity.subject as any);

    const projects = [
      {
        title: "Minimalist Industrial Loft",
        slug: "minimalist-loft",
        category: "Residential",
        year: 2024,
        client: "Private Client",
        location: "New York, NY",
        description:
          "A complete transformation of a former warehouse into a sleek, open-concept living space.",
        thumbnail:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
        images: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        ],
        featured: true,
        authorId,
      },
      {
        title: "Azure Sky Penthouse",
        slug: "azure-penthouse",
        category: "Residential",
        year: 2023,
        client: "Skyline Living",
        location: "Miami, FL",
        description:
          "Inspired by the ocean, this penthouse features a palette of blues and whites.",
        thumbnail:
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
        images: [
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
        ],
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        featured: true,
        authorId,
      },
      {
        title: "Zen Tech HQ",
        slug: "zen-office",
        category: "Commercial",
        year: 2024,
        client: "Lumina Tech",
        location: "San Francisco, CA",
        description:
          "A biophilic office design that prioritizes employee well-being.",
        thumbnail:
          "https://images.unsplash.com/photo-1497366216548-37526070297c",
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c",
        ],
        authorId,
      },
      {
        title: "The Velvet Lounge",
        slug: "velvet-lounge",
        category: "Hospitality",
        year: 2023,
        client: "Nocturne Group",
        location: "London, UK",
        description:
          "A moody, high-end cocktail bar that exudes luxury.",
        thumbnail:
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
        images: [
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
        ],
        authorId,
      },
      {
        title: "Scandinavian Forest Retreat",
        slug: "scandinavian-retreat",
        category: "Residential",
        year: 2024,
        client: "Private Client",
        location: "Oslo, Norway",
        description:
          "A cozy, minimalist cabin designed to blend into its natural surroundings.",
        thumbnail:
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
        ],
        authorId,
      },
      {
        title: "Modernist Desert Villa",
        slug: "modernist-villa",
        category: "Residential",
        year: 2023,
        client: "Private Client",
        location: "Palm Springs, CA",
        description:
          "A tribute to mid-century modern architecture with clean lines and geometric shapes.",
        thumbnail:
          "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09",
        images: [
          "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09",
        ],
        authorId,
      },
    ];

    for (const project of projects) {
      await ctx.db.insert("projects", project);
    }
  },
});
