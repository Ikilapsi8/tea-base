// convex/teas.ts
// Tea Base - Tea Queries & Mutations
// Place this file at: convex/teas.ts

import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all teas (for the browse page)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("teas").collect();
  },
});

// Get teas filtered by type
export const listByType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teas")
      .withIndex("by_type", (q) => q.eq("type", args.type as any))
      .collect();
  },
});

// Get teas filtered by caffeine level
export const listByCaffeine = query({
  args: { caffeineLevel: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teas")
      .withIndex("by_caffeine", (q) =>
        q.eq("caffeineLevel", args.caffeineLevel as any)
      )
      .collect();
  },
});

// Get a single tea by slug (for the detail page)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teas")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Search teas by name
export const search = query({
  args: { searchQuery: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teas")
      .withSearchIndex("search_name", (q) => q.search("name", args.searchQuery))
      .collect();
  },
});

// Get a single tea by ID
export const get = query({
  args: { id: v.id("teas") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get all unique tea types (for filter UI)
export const getTypes = query({
  args: {},
  handler: async (ctx) => {
    const teas = await ctx.db.query("teas").collect();
    const types = [...new Set(teas.map((t) => t.type))];
    return types.sort();
  },
});

// Get all unique origins (for filter UI)
export const getOrigins = query({
  args: {},
  handler: async (ctx) => {
    const teas = await ctx.db.query("teas").collect();
    const countries = [...new Set(teas.map((t) => t.origin.country))];
    return countries.sort();
  },
});
