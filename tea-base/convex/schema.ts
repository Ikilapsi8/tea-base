import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  // Convex Auth tables (accounts, sessions, verification, rate limits, etc.)
  ...authTables,

  teas: defineTable({
    name: v.string(),
    nameNative: v.string(),
    slug: v.string(), // URL-friendly name for routing
    type: v.union(
      v.literal("green"),
      v.literal("black"),
      v.literal("oolong"),
      v.literal("white"),
      v.literal("puerh"),
      v.literal("yellow"),
      v.literal("herbal")
    ),
    origin: v.object({
      country: v.string(),
      region: v.string(),
    }),
    brewing: v.object({
      temperatureC: v.number(),
      temperatureF: v.number(),
      steepTimeSeconds: v.number(),
      resteeps: v.number(),
      ratio: v.string(),
    }),
    flavor: v.array(v.string()),
    caffeineLevel: v.union(
      v.literal("none"),
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    ),
    benefits: v.array(v.string()),
    description: v.string(),
    culturalContext: v.string(),
    imageUrl: v.string(), // dry leaf photo
    imageUrlSteeped: v.optional(v.string()), // steeped liquor photo
    provenance: v.string(),
  })
    .index("by_type", ["type"])
    .index("by_caffeine", ["caffeineLevel"])
    .index("by_slug", ["slug"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["type", "caffeineLevel"],
    }),

  // Keep your existing auth tables - don't remove them!
  // The auth tables (authAccounts, authSessions, etc.) are auto-managed by Convex Auth.

  users: defineTable({
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    phoneVerificationTime: v.optional(v.float64()),
    isAnonymous: v.optional(v.boolean()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  collections: defineTable({
    userId: v.id("users"),
    teaId: v.id("teas"),
    notes: v.optional(v.string()),
    tried: v.optional(v.boolean()),
  })
    .index("by_user", ["userId"])
    .index("by_user_tea", ["userId", "teaId"]),

  // Demo table used by Convex starter functions in `myFunctions.ts`
  numbers: defineTable({
    value: v.number(),
  }),
});
