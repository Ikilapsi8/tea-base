// convex/seedTeas.ts
// Tea Base - Seed Script
// Place this file at: convex/seedTeas.ts
//
// Run with: npx convex run seedTeas:seed
// This will populate your database with all 28 teas.
// Safe to run multiple times — it clears existing teas first.

import { internalMutation } from "./_generated/server";

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing teas to avoid duplicates
    const existingTeas = await ctx.db.query("teas").collect();
    for (const tea of existingTeas) {
      await ctx.db.delete(tea._id);
    }
    console.log(`Cleared ${existingTeas.length} existing teas.`);

    const teas = [
      // ═══════════════════════════════════
      // CHINESE GREEN TEAS
      // ═══════════════════════════════════
      {
        name: "Long Jing (Dragon Well)",
        nameNative: "龙井",
        slug: "long-jing",
        type: "green" as const,
        origin: { country: "China", region: "Hangzhou, Zhejiang" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 120,
          resteeps: 4,
          ratio: "3g per 150ml",
        },
        flavor: ["sweet chestnut", "fresh butter", "orchid blooms", "gentle vegetal"],
        caffeineLevel: "medium" as const,
        benefits: [
          "Rich in antioxidants",
          "Promotes mental clarity",
          "Supports cardiovascular health",
        ],
        description:
          "Legend tells of a dragon who lived in the well near these tea fields, blessing the leaves with its essence. Longjing's flat, jade-green leaves are pan-fired by hand—a technique perfected over centuries. When you pour hot water over them, watch as they dance and unfurl, releasing a butter-smooth sweetness that speaks of spring in West Lake. This is the tea that emperors treasured, and once you taste it, you'll understand why.",
        culturalContext:
          "One of China's Ten Famous Teas, produced near West Lake since the Tang Dynasty",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/xi-hu-longjing-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/xi-hu-longjing-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Bi Luo Chun (Green Snail Spring)",
        nameNative: "碧螺春",
        slug: "bi-luo-chun",
        type: "green" as const,
        origin: { country: "China", region: "Dongting Mountain, Jiangsu" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 90,
          resteeps: 4,
          ratio: "2.5g per 150ml",
        },
        flavor: ["fresh flowers", "sweet peach", "honey notes", "light fruity"],
        caffeineLevel: "medium" as const,
        benefits: ["Boosts metabolism", "Enhances focus", "Natural energizer"],
        description:
          "Picked in early spring when fruit trees blossom nearby, Biluochun captures the essence of awakening nature. Its tightly curled leaves, covered in fine white hairs, spiral like tiny snails—hence the poetic name. The aroma is intoxicating: imagine walking through a peach orchard in bloom. When brewed with gentle water, it yields a delicate, naturally sweet liquor that needs no sugar. This is spring itself, captured in a cup.",
        culturalContext:
          "Named for its spiral shape and spring harvest, grown among fruit trees",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/vesnyani_kucheri-1-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/bi-lo-chun-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Huang Shan Mao Feng (Yellow Mountain Fur Peak)",
        nameNative: "黄山毛峰",
        slug: "huang-shan-mao-feng",
        type: "green" as const,
        origin: { country: "China", region: "Huangshan, Anhui" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 150,
          resteeps: 3,
          ratio: "3g per 150ml",
        },
        flavor: [
          "orchid whispers",
          "subtle sweetness",
          "misty mountain air",
          "clean finish",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "Aids digestion",
          "Reduces stress",
          "Supports immune system",
        ],
        description:
          "From the legendary Yellow Mountains, where granite peaks pierce morning clouds, comes this elegant tea. The fuzzy tips give it its name ('hairy peak'), and these tender shoots are picked only in early spring. Locals say the tea absorbs the spirit of the mountains—their majesty, their mystery. Each sip carries notes of orchid and the clean, fresh taste of high-altitude mist. It's contemplative tea, perfect for quiet moments.",
        culturalContext:
          "Grown in the UNESCO World Heritage Yellow Mountains since Ming Dynasty",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/mao-feng-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/bi-lo-chun-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "An Ji Bai Cha (Anji White Tea)",
        nameNative: "安吉白茶",
        slug: "an-ji-bai-cha",
        type: "green" as const,
        origin: { country: "China", region: "Anji County, Zhejiang" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 120,
          resteeps: 3,
          ratio: "3g per 150ml",
        },
        flavor: [
          "delicate sweetness",
          "fresh bamboo",
          "subtle umami",
          "light florals",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "High amino acids",
          "Calming effect",
          "Low in caffeine naturally",
        ],
        description:
          "Despite its name, this is actually a green tea made from a rare albino tea plant varietals that produce white leaves in early spring. The unique genetics create exceptionally high amino acid content (especially L-theanine), resulting in remarkable sweetness and umami with very little bitterness. The flavor is gentle, bamboo-like, refreshing—like spring morning dew. It's delicate and requires careful brewing, but rewards attention with pure, clean taste. Modern discovery (1980s) of an ancient varietal.",
        culturalContext:
          "Green tea from rare albino cultivar, rediscovered in 1980s",
        imageUrl:
          "https://sevencups.com/files/2015/05/GT-MiAnJi21-Cupped-3m195F.jpg",
        imageUrlSteeped:
          "https://sevencups.com/files/2015/05/GT-MiAnJi21-Cupped-3m195F.jpg",
        provenance: "AI-generated, manually verified",
      },

      // ═══════════════════════════════════
      // CHINESE OOLONG TEAS
      // ═══════════════════════════════════
      {
        name: "Tie Guan Yin (Iron Goddess of Mercy)",
        nameNative: "铁观音",
        slug: "tie-guan-yin",
        type: "oolong" as const,
        origin: { country: "China", region: "Anxi, Fujian" },
        brewing: {
          temperatureC: 95,
          temperatureF: 203,
          steepTimeSeconds: 45,
          resteeps: 8,
          ratio: "5g per 150ml",
        },
        flavor: [
          "orchid florals",
          "toasted rice",
          "stone fruit",
          "lingering sweetness",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "Promotes weight management",
          "Rich in antioxidants",
          "Supports dental health",
        ],
        description:
          "Named after Guanyin, the Buddhist Goddess of Mercy, this tea is said to be heavy as iron and precious as gold. The tightly rolled leaves unfurl into whole leaves through multiple infusions, each steeping revealing new layers—from floral brightness to creamy smoothness to mineral depth. Traditional processing involves up to twelve steps. This is a tea to slow down for, to steep again and again, discovering something new with each cup.",
        culturalContext:
          "Premium oolong with origins dating to 1725, involves complex processing",
        imageUrl:
          "https://www.theteaspot.com/cdn/shop/products/organic-iron-goddess-oolong-x-xa.jpg?v=1743101507",
        imageUrlSteeped:
          "https://www.theteaspot.com/cdn/shop/products/iron-goddess-oolong-steeped-19x.jpg?v=1743101509",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Da Hong Pao (Big Red Robe)",
        nameNative: "大红袍",
        slug: "da-hong-pao",
        type: "oolong" as const,
        origin: { country: "China", region: "Wuyi Mountains, Fujian" },
        brewing: {
          temperatureC: 95,
          temperatureF: 203,
          steepTimeSeconds: 30,
          resteeps: 8,
          ratio: "5g per 150ml",
        },
        flavor: [
          "roasted warmth",
          "mineral depth",
          "dark chocolate",
          "stone fruit",
          "woody sweetness",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "Aids digestion",
          "Warming properties",
          "Supports metabolism",
        ],
        description:
          "Legend tells of a scholar cured by this tea, who draped his red robe over the bushes in gratitude. The original four bushes still grow on cliff faces in Wuyi Mountains, their leaves now priceless. Modern Da Hong Pao captures that same bold, warming character—heavily roasted over charcoal, yielding a deep amber brew with layers of cocoa, dried fruit, and mineral terroir. This is a tea with presence, commanding your attention and rewarding patience.",
        culturalContext:
          "Most famous Wuyi rock tea, original bushes over 350 years old",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/da-hong-pao-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/da-hong-pao-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Tie Luo Han (Iron Arhat)",
        nameNative: "铁罗汉",
        slug: "tie-luo-han",
        type: "oolong" as const,
        origin: { country: "China", region: "Wuyi Mountains, Fujian" },
        brewing: {
          temperatureC: 95,
          temperatureF: 203,
          steepTimeSeconds: 30,
          resteeps: 7,
          ratio: "5g per 150ml",
        },
        flavor: [
          "mineral depth",
          "roasted grain",
          "floral undertones",
          "stone fruit",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "Digestive support",
          "Warming effect",
          "Antioxidant rich",
        ],
        description:
          "One of the Four Famous Wuyi Rock Teas, named after the legendary Buddhist Arhat (saint) as strong as iron. Growing among mineral-rich cliffs, the tea absorbs unique 'rock flavor' (岩韵)—a prized characteristic combining minerality with floral sweetness. Medium-roasted over charcoal, it balances earthy depth with delicate orchid notes. The liquor is bright orange, the aroma is complex, and each steep reveals new dimensions. This is tea for slow, contemplative drinking.",
        culturalContext:
          "One of Four Famous Wuyi Rock Teas, named after Buddhist saint",
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/5aec6f1a7c9327e2f144e1c0/1641415879965-0QRNYQUZ6PVGL4M250MN/Tie%2BLuo%2BHan.jpg?format=1500w",
        imageUrlSteeped:
          "https://images.squarespace-cdn.com/content/v1/5aec6f1a7c9327e2f144e1c0/1598998642920-VE5Y3E2QRJH7AY64515F/IMG_2868.jpg?format=1500w",
        provenance: "AI-generated, manually verified",
      },

      // ═══════════════════════════════════
      // TAIWANESE OOLONG TEAS
      // ═══════════════════════════════════
      {
        name: "Dong Ding (Frozen Summit)",
        nameNative: "凍頂烏龍",
        slug: "dong-ding",
        type: "oolong" as const,
        origin: { country: "Taiwan", region: "Nantou County" },
        brewing: {
          temperatureC: 95,
          temperatureF: 203,
          steepTimeSeconds: 60,
          resteeps: 6,
          ratio: "5g per 150ml",
        },
        flavor: [
          "buttery smoothness",
          "roasted nuts",
          "honey sweetness",
          "orchid hints",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "Boosts energy gently",
          "Supports focus",
          "Rich in polyphenols",
        ],
        description:
          "From Taiwan's 'Frozen Summit' mountain, where cool mists embrace high-elevation tea gardens, comes this beautifully balanced oolong. Medium-roasted to bring out buttery, nutty sweetness while preserving floral elegance. The tightly rolled balls unfurl slowly, releasing their character across multiple infusions. It's the kind of tea that makes you pause mid-sip, close your eyes, and simply appreciate. Perfect for both morning focus and evening contemplation.",
        culturalContext:
          "Taiwan's most famous oolong, grown at 600-1200m elevation",
        imageUrl:
          "https://thesteepery.com.au/cdn/shop/products/Dong_Ding_dry_leaf_MOD_35850771-7e70-4eec-b72b-d28ee697404e_1024x1024.jpg?v=1539139583",
        imageUrlSteeped:
          "https://thesteepery.com.au/cdn/shop/products/Dong_Ding_wet_leaf_liquor_MOD_2c165202-e285-45cf-8d74-0551ebcc0bea_1024x1024.jpg?v=1539139583",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Dong Fang Mei Ren (Oriental Beauty)",
        nameNative: "東方美人",
        slug: "dong-fang-mei-ren",
        type: "oolong" as const,
        origin: { country: "Taiwan", region: "Hsinchu County" },
        brewing: {
          temperatureC: 85,
          temperatureF: 185,
          steepTimeSeconds: 120,
          resteeps: 5,
          ratio: "4g per 150ml",
        },
        flavor: ["honey nectar", "ripe peach", "muscatel", "sweet flowers"],
        caffeineLevel: "low" as const,
        benefits: [
          "Gentle on stomach",
          "Antioxidant rich",
          "Naturally sweet",
        ],
        description:
          "This tea's beauty comes from an unlikely source: tiny insects called leafhoppers. When they nibble the leaves, the plant responds by producing extra sweetness and complexity. The result is enchanting—natural honey notes, fruity complexity, and a gorgeous multicolored appearance of white, green, and red leaves. It's one of the world's most oxidized oolongs, bridging the gap to black tea territory, yet retains oolong's sophisticated character.",
        culturalContext:
          "Also called 'White Tip Oolong', requires specific insect activity",
        imageUrl:
          "https://kteashop.com/cdn/shop/files/IMG_5520.heic?v=1732109261&width=1646",
        imageUrlSteeped:
          "https://kteashop.com/cdn/shop/files/IMG_5521.heic?v=1732109261&width=1646",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Ali Shan",
        nameNative: "阿里山烏龍",
        slug: "ali-shan",
        type: "oolong" as const,
        origin: { country: "Taiwan", region: "Ali Shan, Chiayi County" },
        brewing: {
          temperatureC: 90,
          temperatureF: 194,
          steepTimeSeconds: 90,
          resteeps: 6,
          ratio: "4g per 150ml",
        },
        flavor: [
          "creamy florals",
          "mountain mist",
          "butter smoothness",
          "orchid notes",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "Stress relief",
          "Antioxidant rich",
          "Mental clarity",
        ],
        description:
          "From Taiwan's famous Ali Mountain, where persistent mist and cool temperatures slow leaf growth, creating concentrated flavor. The high elevation (1000-2600m) and cool climate produce teas of exceptional clarity and floral character. Ali Shan oolong is lightly oxidized, tightly rolled, and when steeped reveals buttery smoothness layered with orchid-like florals. Each sip tastes like mountain air—clean, crisp, elevating. This is morning tea that feels like a mountain retreat.",
        culturalContext:
          "High-mountain Taiwanese oolong, grown at 1000-2600m elevation",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/ali-shan-oolong-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/ali-shan-oolong-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Jin Xuan (Milk Oolong)",
        nameNative: "金萱",
        slug: "jin-xuan",
        type: "oolong" as const,
        origin: { country: "Taiwan", region: "Various regions" },
        brewing: {
          temperatureC: 90,
          temperatureF: 194,
          steepTimeSeconds: 120,
          resteeps: 5,
          ratio: "4g per 150ml",
        },
        flavor: [
          "creamy milk",
          "butter richness",
          "orchid sweetness",
          "smooth silk",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "Smooth on stomach",
          "Calming properties",
          "Antioxidant benefits",
        ],
        description:
          "A cultivar developed in the 1980s that naturally produces creamy, milky characteristics—no flavoring added (beware artificially scented versions). Named after the breeder's grandmother, Jin Xuan offers remarkable smoothness and a butter-cream texture that's almost dessert-like. The name 'Milk Oolong' can be misleading; authentic Jin Xuan's creaminess comes from the plant itself. It's approachable, forgiving to brew, and crowd-pleasing. Perfect introduction to Taiwanese high-mountain oolongs.",
        culturalContext:
          "Modern cultivar (1980s) with naturally creamy, milky characteristics",
        imageUrl:
          "https://eco-cha.com/cdn/shop/products/Jin_Xuan_Oolong_-_Top_Dry_Leaves_2000x2000.jpg?v=1658633427",
        imageUrlSteeped:
          "https://eco-cha.com/cdn/shop/products/Jin_Xuan_Oolong_-_Top_Brewed_2-1080px_1080x1080.jpg?v=1658633427",
        provenance: "AI-generated, manually verified",
      },

      // ═══════════════════════════════════
      // CHINESE BLACK TEAS
      // ═══════════════════════════════════
      {
        name: "Keemun",
        nameNative: "祁门红茶",
        slug: "keemun",
        type: "black" as const,
        origin: { country: "China", region: "Qimen County, Anhui" },
        brewing: {
          temperatureC: 100,
          temperatureF: 212,
          steepTimeSeconds: 180,
          resteeps: 3,
          ratio: "3g per 150ml",
        },
        flavor: [
          "wine-like depth",
          "smoky pine",
          "orchid notes",
          "subtle cocoa",
        ],
        caffeineLevel: "high" as const,
        benefits: ["Energy boost", "Heart healthy", "Digestive support"],
        description:
          "Developed in 1875, Keemun quickly became the black tea of choice for English breakfast blends, prized for its wine-like complexity. Unlike aggressive black teas, Keemun is refined—think of it as the tea world's fine burgundy. Its orchid-like aroma, sometimes called 'Qimen fragrance,' is unmistakable. The liquor is clear and bright, with layers that reveal themselves slowly. This is a morning tea for those who appreciate subtlety over boldness.",
        culturalContext:
          "One of China's most famous black teas, often used in English Breakfast blends",
        imageUrl:
          "https://teasenz.eu/cdn/shop/files/qimen_black_tea.jpg?v=1761224669",
        imageUrlSteeped:
          "https://teasenz.eu/cdn/shop/files/keemun_black_tea.jpg?v=1761224669&width=2200",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Lapsang Souchong",
        nameNative: "正山小种",
        slug: "lapsang-souchong",
        type: "black" as const,
        origin: { country: "China", region: "Wuyi Mountains, Fujian" },
        brewing: {
          temperatureC: 100,
          temperatureF: 212,
          steepTimeSeconds: 180,
          resteeps: 3,
          ratio: "3g per 150ml",
        },
        flavor: [
          "pine smoke",
          "dried longan",
          "sweet wood",
          "campfire warmth",
        ],
        caffeineLevel: "high" as const,
        benefits: [
          "Warming properties",
          "Rich in antioxidants",
          "Energy sustaining",
        ],
        description:
          "The world's first black tea, born from happy accident when leaves needed quick-drying over pine fires. The result? An intensely smoky tea that divides opinion—you'll either fall in love or run away. Those who love it describe drinking liquid campfire, transported to misty mountain forests. It's bold, unapologetic, memorable. Try it on a cold morning or after dinner, perhaps with a touch of honey to balance the smoke.",
        culturalContext:
          "World's first black tea, traditionally dried over pine wood fires",
        imageUrl:
          "https://harneyshop.eu/cdn/shop/products/Cup_Shots_Lapsang_Souchong.jpg?v=1752582718&width=1100",
        imageUrlSteeped:
          "https://harneyshop.eu/cdn/shop/products/Cup_Shots_Lapsang_Souchong.jpg?v=1752582718&width=1100",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Dian Hong (Yunnan Gold)",
        nameNative: "滇红",
        slug: "dian-hong",
        type: "black" as const,
        origin: { country: "China", region: "Yunnan Province" },
        brewing: {
          temperatureC: 100,
          temperatureF: 212,
          steepTimeSeconds: 180,
          resteeps: 4,
          ratio: "3g per 150ml",
        },
        flavor: [
          "malty sweetness",
          "cocoa richness",
          "peppery spice",
          "honey smooth",
        ],
        caffeineLevel: "high" as const,
        benefits: [
          "Energy boosting",
          "Metabolism support",
          "Digestive aid",
        ],
        description:
          "From the birthplace of tea itself, Yunnan Province, comes this gorgeous black tea recognizable by its abundance of golden tips. Each sip delivers malty sweetness reminiscent of dark chocolate and honey, with peppery complexity that keeps things interesting. Unlike many black teas, Dian Hong remains smooth even when oversteeped—forgiving and generous. The liquor glows amber-orange in sunlight. It's breakfast tea elevated to art form.",
        culturalContext:
          "Relatively young tea (1930s), from ancient tea-growing region of Yunnan",
        imageUrl:
          "https://sevencups.com/files/2019/06/BT-LaoShu21-Dry-Leaf.jpg",
        imageUrlSteeped:
          "https://sevencups.com/files/2019/06/BT-LaoShu21-Cupped-212F3M.jpg",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Dian Hong Jin Ya (Yunnan Golden Tips)",
        nameNative: "滇红金芽",
        slug: "dian-hong-jin-ya",
        type: "black" as const,
        origin: { country: "China", region: "Yunnan Province" },
        brewing: {
          temperatureC: 90,
          temperatureF: 194,
          steepTimeSeconds: 150,
          resteeps: 4,
          ratio: "3g per 150ml",
        },
        flavor: [
          "sweet cocoa",
          "honey richness",
          "malt warmth",
          "gentle spice",
        ],
        caffeineLevel: "high" as const,
        benefits: [
          "Energy boost",
          "Heart health",
          "Warming properties",
        ],
        description:
          "Premium grade of Dian Hong made entirely from golden buds—the most tender shoots covered in fine golden fuzz. The result is smoother, sweeter, and more refined than standard Dian Hong, with less astringency and more honey-chocolate notes. The liquor glows bright amber-gold, giving it the name. It's luxurious without being precious, energizing without being harsh. Perfect for mornings when you want something special, or as an elegant afternoon tea that needs no accompaniments.",
        culturalContext: "Premium all-bud version of Yunnan black tea",
        imageUrl:
          "https://justonecup.eu/cdn/shop/files/GoldenTipsblack.jpg?v=1698529131&width=2200",
        imageUrlSteeped:
          "https://justonecup.eu/cdn/shop/files/GoldenTipsblack.jpg?v=1698529131&width=2200",
        provenance: "AI-generated, manually verified",
      },

      // ═══════════════════════════════════
      // CHINESE WHITE TEAS
      // ═══════════════════════════════════
      {
        name: "Bai Hao Yin Zhen (Silver Needle)",
        nameNative: "白毫银针",
        slug: "silver-needle",
        type: "white" as const,
        origin: { country: "China", region: "Fuding, Fujian" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 180,
          resteeps: 4,
          ratio: "4g per 150ml",
        },
        flavor: [
          "delicate sweetness",
          "melon freshness",
          "hay notes",
          "subtle florals",
        ],
        caffeineLevel: "low" as const,
        benefits: [
          "High in antioxidants",
          "Anti-aging properties",
          "Gentle energy",
        ],
        description:
          "The emperor's tea—only the newest, unopened buds, harvested in early spring during a brief two-week window. Each silvery bud is covered in fine white hairs, hence the name. The processing is minimal: just withering and drying, allowing nature to work its magic. The result is tea in its purest form—sweet, delicate, nuanced. It's meditation in a cup, rewarding those who slow down and pay attention. Best sipped slowly on quiet afternoons.",
        culturalContext:
          "Most prized white tea, made only from buds, minimal processing",
        imageUrl:
          "https://www.theteaspot.com/cdn/shop/products/silver-needle-tea-zoom-x.jpg?v=1743101651",
        imageUrlSteeped:
          "https://www.theteaspot.com/cdn/shop/products/silver-needle-white-tea-sq-z.jpg?v=1743101656",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Bai Mu Dan (White Peony)",
        nameNative: "白牡丹",
        slug: "white-peony",
        type: "white" as const,
        origin: { country: "China", region: "Fujian Province" },
        brewing: {
          temperatureC: 85,
          temperatureF: 185,
          steepTimeSeconds: 150,
          resteeps: 4,
          ratio: "3g per 150ml",
        },
        flavor: [
          "sweet hay",
          "stone fruit",
          "gentle florals",
          "honey notes",
        ],
        caffeineLevel: "low" as const,
        benefits: [
          "Cooling properties",
          "Supports skin health",
          "Gentle detox",
        ],
        description:
          "Named for its appearance when steeped—the furled leaves unfurl like blooming peonies. Made from young buds and leaves, it's more robust than Silver Needle yet retains white tea's characteristic gentleness. The flavor profile walks a beautiful line between delicate and satisfying, with natural sweetness and just enough body to feel substantial. It's the perfect introduction to white tea, approachable yet sophisticated.",
        culturalContext:
          "Second-grade white tea, more accessible than Silver Needle",
        imageUrl:
          "https://happymugcoffee.com/cdn/shop/files/WhitePeony_China.jpg?v=1740676008&width=1100",
        imageUrlSteeped:
          "https://happymugcoffee.com/cdn/shop/files/WhitePeony_China.jpg?v=1740676008&width=1100",
        provenance: "AI-generated, manually verified",
      },

      // ═══════════════════════════════════
      // CHINESE PU-ERH TEAS
      // ═══════════════════════════════════
      {
        name: "Sheng Pu Erh",
        nameNative: "生普洱",
        slug: "sheng-pu-erh",
        type: "puerh" as const,
        origin: { country: "China", region: "Yunnan Province" },
        brewing: {
          temperatureC: 100,
          temperatureF: 212,
          steepTimeSeconds: 20,
          resteeps: 10,
          ratio: "5g per 150ml",
        },
        flavor: [
          "wild honey",
          "hay sweetness",
          "mineral depth",
          "camphor notes",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "Aids digestion",
          "Supports weight management",
          "Probiotic benefits",
        ],
        description:
          "Living tea—sheng pu-erh continues to evolve over decades, developing complexity like fine wine. Young sheng can be assertive, almost green-tea-like, but with age it mellows into something profound: honey, camphor, old wood, mountain air. This is the tea of serious collectors, who store cakes for years or decades. Each steep reveals new layers; experienced drinkers might do 15+ infusions from the same leaves. It's a journey, not just a cup of tea.",
        culturalContext:
          "Compressed tea that ages and improves over decades, highly collectible",
        imageUrl:
          "https://teahouseemporium.co.uk/wp-content/uploads/2013/08/Green-Pu-Erh-Sheng.jpg",
        imageUrlSteeped:
          "https://teahouseemporium.co.uk/wp-content/uploads/2013/08/Green-Pu-Erh-Sheng.jpg",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Shou Pu Erh",
        nameNative: "熟普洱",
        slug: "shou-pu-erh",
        type: "puerh" as const,
        origin: { country: "China", region: "Yunnan Province" },
        brewing: {
          temperatureC: 100,
          temperatureF: 212,
          steepTimeSeconds: 20,
          resteeps: 8,
          ratio: "5g per 150ml",
        },
        flavor: [
          "earthy depth",
          "dark chocolate",
          "forest floor",
          "sweet dates",
        ],
        caffeineLevel: "low" as const,
        benefits: [
          "Digestive health",
          "Probiotic rich",
          "Gentle on stomach",
        ],
        description:
          "Invented in the 1970s to accelerate the aging process, shou pu-erh undergoes controlled fermentation that yields earthy, smooth tea in months rather than years. Think forest after rain, dark chocolate, ancient wood. It's deeply comforting, warming from the inside. Many drink it after heavy meals for its digestive properties. The first rinse washes away dust; subsequent steeps grow smoother, sweeter. This is tea that grounds you, connects you to earth.",
        culturalContext:
          "Modern invention (1970s) using accelerated fermentation process",
        imageUrl:
          "https://www.theteaspot.com/cdn/shop/products/organic-puerh-tea-x-xa.jpg?v=1743102134",
        imageUrlSteeped:
          "https://www.theteaspot.com/cdn/shop/products/organic-puerh-tea-steeped-x.jpg?v=1743102135",
        provenance: "AI-generated, manually verified",
      },

      // ═══════════════════════════════════
      // JAPANESE GREEN TEAS
      // ═══════════════════════════════════
      {
        name: "Sencha",
        nameNative: "煎茶",
        slug: "sencha",
        type: "green" as const,
        origin: { country: "Japan", region: "Shizuoka Prefecture" },
        brewing: {
          temperatureC: 75,
          temperatureF: 167,
          steepTimeSeconds: 60,
          resteeps: 3,
          ratio: "3g per 150ml",
        },
        flavor: [
          "fresh grass",
          "ocean breeze",
          "sweet umami",
          "vegetal notes",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "High in catechins",
          "Boosts metabolism",
          "Mental clarity",
        ],
        description:
          "Japan's everyday luxury—steamed rather than pan-fired, giving it that distinctive bright green color and fresh, grassy character. The steaming locks in nutrients and creates sencha's unique umami sweetness, a savory depth that's hard to describe but impossible to forget. Best brewed cooler than you'd expect; hot water brings bitterness. Done right, sencha is oceanic, vegetal, refreshing—like liquid sunshine filtered through bamboo groves.",
        culturalContext:
          "Most popular tea in Japan, steamed processing unique to Japanese teas",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/sencha-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/sencha-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Gyokuro (Jade Dew)",
        nameNative: "玉露",
        slug: "gyokuro",
        type: "green" as const,
        origin: { country: "Japan", region: "Uji, Kyoto" },
        brewing: {
          temperatureC: 50,
          temperatureF: 122,
          steepTimeSeconds: 120,
          resteeps: 3,
          ratio: "4g per 100ml",
        },
        flavor: [
          "intense umami",
          "sweet seaweed",
          "rich vegetal",
          "marine depth",
        ],
        caffeineLevel: "high" as const,
        benefits: [
          "High L-theanine",
          "Sustained energy",
          "Deep focus",
        ],
        description:
          "The pinnacle of Japanese tea craft—shade-grown for three weeks before harvest, forcing plants to produce maximum chlorophyll and amino acids. The result is almost shocking: intensely sweet, deeply savory (umami), rich as broth. Brew it nearly lukewarm to unlock its full character; hot water wastes its magic. This is tea ceremony tea, premium grade, expensive, unforgettable. Sip slowly, with respect. Once you've had true gyokuro, other green teas seem ordinary.",
        culturalContext:
          "Japan's highest-grade tea, shade-grown for weeks before harvest",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/gyokuro-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/gyokuro-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Matcha",
        nameNative: "抹茶",
        slug: "matcha",
        type: "green" as const,
        origin: { country: "Japan", region: "Uji, Kyoto" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 0,
          resteeps: 1,
          ratio: "2g per 80ml",
        },
        flavor: [
          "vibrant vegetal",
          "sweet cream",
          "subtle bitterness",
          "full-bodied",
        ],
        caffeineLevel: "high" as const,
        benefits: [
          "Complete tea leaf nutrition",
          "Sustained energy",
          "High antioxidants",
        ],
        description:
          "Tea leaves ground to fine powder, consumed whole—you're drinking the entire leaf, not just an infusion. Ceremonial grade matcha is sweet, creamy, complex; culinary grade is more bitter, better for lattes. The preparation is a meditation: sift the powder, add water, whisk in a zigzag motion until frothy. That vibrant green foam is pure vitality. Morning matcha provides calm alertness that lasts hours. This is the tea of Zen monks and modern productivity enthusiasts alike.",
        culturalContext:
          "Centerpiece of Japanese tea ceremony, consumed as suspension not infusion",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/nanzan-2_new-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/nanzan-3_new-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Genmaicha (Roasted Rice Tea)",
        nameNative: "玄米茶",
        slug: "genmaicha",
        type: "green" as const,
        origin: { country: "Japan", region: "Various regions" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 90,
          resteeps: 2,
          ratio: "3g per 150ml",
        },
        flavor: [
          "toasted rice",
          "popcorn warmth",
          "light green tea",
          "nutty comfort",
        ],
        caffeineLevel: "low" as const,
        benefits: [
          "Easy on stomach",
          "Comforting properties",
          "Lower caffeine option",
        ],
        description:
          "The people's tea—green tea blended with toasted brown rice, which pops like tiny popcorn during roasting. Born from frugality (rice stretched expensive tea leaves), it became beloved for its warm, toasty, comforting character. The rice adds natural sweetness and reduces caffeine, making it perfect for evening. Some call it 'popcorn tea' and smile at the whimsy. It's unpretentious, friendly, satisfying—the tea equivalent of a warm hug.",
        culturalContext:
          "Originally a way to make tea affordable by adding roasted rice",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/genmaicha-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/genmaicha-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Hojicha (Roasted Tea)",
        nameNative: "ほうじ茶",
        slug: "hojicha",
        type: "green" as const,
        origin: { country: "Japan", region: "Kyoto (originally)" },
        brewing: {
          temperatureC: 90,
          temperatureF: 194,
          steepTimeSeconds: 30,
          resteeps: 2,
          ratio: "3g per 150ml",
        },
        flavor: [
          "roasted warmth",
          "caramel notes",
          "woodsy comfort",
          "light smokiness",
        ],
        caffeineLevel: "low" as const,
        benefits: [
          "Very low caffeine",
          "Gentle on stomach",
          "Warming properties",
        ],
        description:
          "Green tea transformed by roasting—turned reddish-brown, stripped of most caffeine, mellowed into something entirely different. It tastes like autumn: roasted chestnuts, caramel, woodsmoke, comfort. Created in 1920s Kyoto as a way to use tea stems and older leaves, it's now prized for its unique character. Perfect for evening, after meals, or anytime you want warmth without caffeine. Children in Japan often grow up drinking hojicha. It's tea that feels like home.",
        culturalContext:
          "Invented in 1920s Kyoto, roasted green tea with very low caffeine",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/hojicha-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/hojicha-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Kabusecha (Shaded Tea)",
        nameNative: "かぶせ茶",
        slug: "kabusecha",
        type: "green" as const,
        origin: { country: "Japan", region: "Various regions" },
        brewing: {
          temperatureC: 70,
          temperatureF: 158,
          steepTimeSeconds: 90,
          resteeps: 3,
          ratio: "3g per 150ml",
        },
        flavor: [
          "sweet umami",
          "mild vegetal",
          "smooth finish",
          "gentle grassiness",
        ],
        caffeineLevel: "medium" as const,
        benefits: [
          "High L-theanine",
          "Smooth energy",
          "Rich in antioxidants",
        ],
        description:
          "The middle ground between sencha and gyokuro—shade-grown for about one week (gyokuro gets three weeks), resulting in tea that's sweeter and smoother than sencha but more affordable than gyokuro. The brief shading increases amino acids and reduces bitterness while maintaining bright, vegetal character. It's an excellent way to explore shaded teas without gyokuro's price point. Brew cooler than sencha for best results. Think of it as gyokuro's approachable younger sibling.",
        culturalContext:
          "Briefly shaded Japanese green tea, between sencha and gyokuro in quality",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/kabusecha-kinezuka-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/kabusecha-kinezuka-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },
      {
        name: "Kukicha (Twig Tea)",
        nameNative: "茎茶",
        slug: "kukicha",
        type: "green" as const,
        origin: { country: "Japan", region: "Various regions" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 90,
          resteeps: 3,
          ratio: "3g per 150ml",
        },
        flavor: [
          "light sweetness",
          "subtle nuttiness",
          "mild vegetal",
          "clean finish",
        ],
        caffeineLevel: "low" as const,
        benefits: [
          "Very low caffeine",
          "Gentle on stomach",
          "Mineral rich",
        ],
        description:
          "Made from the stems and twigs left over from sencha or gyokuro production—what might seem like waste becomes something wonderful. The stems contain less caffeine but more sweetness, creating a mild, slightly nutty tea that's perfect anytime. When made from gyokuro stems (karigane), it offers hints of premium character at a fraction of the price. It's humble, honest, resourceful—and surprisingly delicious. Great for children, evening drinking, or anyone seeking gentle refreshment.",
        culturalContext:
          "Made from stems/twigs of sencha or gyokuro, very low caffeine",
        imageUrl:
          "https://cdn.oycha.com/public/products-media/kukicha-wild-goose-2-800x800.webp",
        imageUrlSteeped:
          "https://cdn.oycha.com/public/products-media/kukicha-wild-goose-3-800x800.webp",
        provenance: "AI-generated, manually verified",
      },

      // ═══════════════════════════════════
      // CHINESE YELLOW TEA
      // ═══════════════════════════════════
      {
        name: "Jun Shan Yin Zhen (Junshan Silver Needle)",
        nameNative: "君山银针",
        slug: "jun-shan-yin-zhen",
        type: "yellow" as const,
        origin: { country: "China", region: "Junshan Island, Hunan" },
        brewing: {
          temperatureC: 80,
          temperatureF: 176,
          steepTimeSeconds: 150,
          resteeps: 3,
          ratio: "3g per 150ml",
        },
        flavor: [
          "mellow sweetness",
          "subtle corn",
          "gentle florals",
          "smooth finish",
        ],
        caffeineLevel: "low" as const,
        benefits: [
          "Gentle on stomach",
          "Aids digestion",
          "Antioxidant rich",
        ],
        description:
          "Yellow tea is green tea's mysterious cousin—rare, complex, fascinating. After initial firing, leaves undergo 'sealing yellow' (闷黄), wrapped in cloth to gently oxidize. This removes green tea's grassiness while maintaining delicate character. Junshan Yinzhen, made from needle-shaped buds, is the most famous yellow tea. Watch the leaves perform their 'three ups and three downs' dance in the glass—standing upright, rising, falling, a natural ballet. The taste is subtle, sweet, sophisticated. This is tea for the curious.",
        culturalContext:
          "Rare yellow tea category, special processing creates unique character",
        imageUrl:
          "https://sevencups.com/files/2019/04/JunSha21-Wet-Leaf.jpg",
        imageUrlSteeped:
          "https://sevencups.com/files/2019/04/JunSha21-Cupped-195F3M.jpg",
        provenance: "AI-generated, manually verified",
      },

      // ═══════════════════════════════════
      // HERBAL / TISANE
      // ═══════════════════════════════════
      {
        name: "Ju Hua Cha (Chrysanthemum Tea)",
        nameNative: "菊花茶",
        slug: "chrysanthemum",
        type: "herbal" as const,
        origin: {
          country: "China",
          region: "Tongxiang, Zhejiang (Hangzhou area)",
        },
        brewing: {
          temperatureC: 95,
          temperatureF: 203,
          steepTimeSeconds: 300,
          resteeps: 2,
          ratio: "5-6 flowers per 150ml",
        },
        flavor: [
          "light florals",
          "subtle sweetness",
          "honey notes",
          "refreshing",
        ],
        caffeineLevel: "none" as const,
        benefits: [
          "Cooling properties",
          "Eye health support",
          "Calming effect",
        ],
        description:
          "Not technically tea, but beloved throughout China for centuries. Dried chrysanthemum flowers bloom again in hot water, creating a pale yellow liquor that's both refreshing and soothing. Traditional Chinese medicine prizes it for 'cooling' properties—perfect for hot days or when feeling overheated. Often sweetened with rock sugar or combined with pu-erh tea. Watch the flowers slowly unfurl; it's as much a visual meditation as a beverage. Caffeine-free, gentle, timeless.",
        culturalContext:
          "Traditional Chinese herbal tea, often used in Chinese medicine",
        imageUrl:
          "https://dobrateapgh.com/cdn/shop/products/Chrysanthemum.jpg?v=1591448174&width=1500",
        imageUrlSteeped:
          "https://dobrateapgh.com/cdn/shop/products/Chrysanthemum.jpg?v=1591448174&width=1500",
        provenance: "AI-generated, manually verified",
      },
    ];

    // Insert all teas
    let count = 0;
    for (const tea of teas) {
      await ctx.db.insert("teas", tea);
      count++;
    }

    console.log(`✅ Seeded ${count} teas successfully!`);
    return { seeded: count };
  },
});
