import type {
  About,
  GalleryImage,
  Journey,
  SiteSettings,
  Story,
  Testimonial,
} from "../types";

function block(text: string) {
  return [
    {
      _type: "block" as const,
      _key: text.slice(0, 8),
      style: "normal" as const,
      markDefs: [],
      children: [{ _type: "span" as const, _key: "span", text, marks: [] }],
    },
  ];
}

function img(url: string, alt: string, caption?: string) {
  return { url, alt, caption };
}

const unsplash = (id: string, alt: string) =>
  img(`https://images.unsplash.com/${id}?w=1920&q=80&auto=format`, alt);

export const seedSiteSettings: SiteSettings = {
  siteTitle: "Sabryatra",
  tagline: "Journeys that take you within",
  introText: "Sabryatra is a way of experiencing the world deeply.",
  contactEmail: "journeys@sabryatra.com",
  phone: "+91-9414856201",
  whatsappNumber: "+919414856201",
  address: "2/13 Vidhyadhar Nagar, Jaipur 302039",
  socialLinks: {
    instagram: "https://instagram.com/sabryatra",
    youtube: "https://youtube.com/@sabryatra",
    pinterest: "https://pinterest.com/sabryatra",
  },
  seo: {
    title: "Sabryatra | Cinematic Travel Stories, Photography & Soulful Journeys",
    description:
      "Discover cinematic travel stories, mountain journeys, photography, reflections, and soulful travel experiences through Sabryatra.",
    focusKeyword: "cinematic travel blog India",
  },
  heroHeadlines: [
    "Journeys that take you within",
    "Sabryatra is a way of experiencing the world deeply.",
    "Journeys that leave room for silence, for breath, for moments of stillness.",
    "Because how you move through the world shapes the world within you.",
  ],
  pillars: ["Small Group", "Slow Travel", "Designed For You", "Wellness Oriented"],
  featuredHeroJourneySlug: "maa-nanda-devi",
  instagramHighlights: [
    { url: "https://instagram.com/sabryatra", caption: "Himalayan light and slow travel moments" },
    { url: "https://instagram.com/sabryatra", caption: "Behind the lens on the trail" },
    { url: "https://instagram.com/sabryatra", caption: "Stillness, presence, and the open valley" },
  ],
};

export const seedAbout: About = {
  founderName: "Vishal",
  pullQuote: "Guiding small groups into landscapes that invite both exploration and quiet reflection.",
  bio: block(
    "Sabryatra began as a personal way of moving through the world — slowly, attentively, with a sense of wonder. Over time, it became something I wanted to share. Through photography, through stillness, through journeys that are not rushed. I'm Vishal, and I share space for these experiences — guiding small groups into landscapes that invite both exploration and quiet reflection. Sabryatra is that shared journey. And somewhere along the way, these journeys stayed with others too.",
  ),
  portrait: unsplash(
    "photo-1507003211169-0a1dd7228f2d?w=800",
    "Vishal, founder and travel photographer at Sabryatra",
  ),
};

export const seedJourneys: Journey[] = [
  {
    _id: "journey-garhwal",
    title: "Garhwal",
    slug: "garhwal",
    subtitle: "Walk this path of Humility | Strength | Holiness",
    themes: ["Humility", "Strength", "Holiness"],
    excerpt:
      "Ridgelines, rivers, and trails past shrines and stories older than memory — where devotion and wilderness exist side by side.",
    body: block(
      "Garhwal rises with strength, but it carries prayer in its air. Ridgelines stretch wide against the sky, rivers move with quiet determination, and the trails unfold past shrines, temple bells, and stories older than memory. Effort is required here — but so is reverence. The mountains do not intimidate; they invite you to arrive with humility. As you travel through Garhwal, faith appears unexpectedly — in small roadside temples, in chants drifting across valleys, in ancient stone steps leading upward. Snow rests on distant peaks like ash from a sacred fire, and every river feels like it remembers something holy. You walk not just toward a summit, but through a landscape where devotion and wilderness exist side by side. And somewhere between the climb and the prayer, something within you grows quieter.",
    ),
    heroImage: unsplash("photo-1542222024-c39e2281f121", "Garhwal Himalaya ridgelines at sunrise — spiritual travel photography"),
    cardImage: unsplash("photo-1542222024-c39e2281f121", "Garhwal Himalayan journey — slow travel India"),
    gallery: [
      unsplash("photo-1542222024-c39e2281f121", "Garhwal mountain ridgelines — Himalaya travel photography"),
      unsplash("photo-1506905925346-21bda4d32df4", "Garhwal valley with distant snow peaks"),
      unsplash("photo-1464822759023-fed622ff2c3b", "Garhwal Himalayan trail through sacred landscape"),
    ],
    order: 2,
    seo: {
      title: "Garhwal Journey | Spiritual Himalayan Slow Travel | Sabryatra",
      description:
        "Walk the Garhwal Himalaya with Sabryatra — spiritual travel stories, temple trails, and soulful slow travel in India.",
      focusKeyword: "spiritual travel stories",
    },
    relatedKeywords: ["Himalaya travel photography", "Garhwal slow travel"],
  },
  {
    _id: "journey-zanskar",
    title: "Zanskar",
    slug: "zanskar",
    subtitle: "Walk this path of Belonging | Vastness | Harmony",
    themes: ["Belonging", "Vastness", "Harmony"],
    excerpt:
      "Long roads, high passes, and silences that stretch wider than the sky — where patience is not a lesson but the landscape itself.",
    body: block(
      "Zanskar is not a destination you arrive at easily. It reveals itself slowly — through long roads, high passes, and silences that stretch wider than the sky. There was a time when the world did not rush here, when the mountains held their distance and the river carved its own conversations through stone. In Zanskar, patience is not a lesson — it is the landscape. Monasteries cling to rock as if grown from it, and the wind carries stories older than maps. You do not conquer this place; you sit with it. And somewhere between the stillness and the vastness, something within you begins to slow down.",
    ),
    heroImage: unsplash("photo-1519681393784-d120267933ba", "Zanskar valley vastness — Ladakh travel experience"),
    cardImage: unsplash("photo-1519681393784-d120267933ba", "Zanskar remote Himalayan journey"),
    gallery: [
      unsplash("photo-1519681393784-d120267933ba", "Zanskar high pass mountain landscape"),
      unsplash("photo-1528360983277-13d401cdc186", "Zanskar monastery on rock cliff — mountain storytelling"),
      unsplash("photo-1486870591958-9b9d0d1dda99", "Zanskar river valley at golden hour"),
    ],
    order: 3,
    seo: {
      title: "Zanskar Journey | Remote Himalayan Travel Experience | Sabryatra",
      description:
        "Experience Zanskar's vastness and silence with Sabryatra — a soulful Ladakh travel experience through remote Himalayan landscapes.",
      focusKeyword: "Zanskar travel experience",
    },
    relatedKeywords: ["Ladakh travel experience", "mountain storytelling"],
  },
  {
    _id: "journey-kumaon",
    title: "Kumaon",
    slug: "kumaon",
    subtitle: "Walk this path of Stillness | Presence | Eternity",
    themes: ["Stillness", "Presence", "Eternity"],
    excerpt:
      "Gentle hills, pine-covered slopes, and villages where time loosens its grip — Kumaon feels less like wilderness and more like returning.",
    body: block(
      "Kumaon never feels like a destination, it feels like returning. The hills rise gently, forests breathe in quiet rhythms, and life unfolds with an ease that asks nothing but presence. Villages rest among orchards and pine-covered slopes, while distant peaks watch silently over valleys filled with light. There is a deep comfort in these mountains. Time loosens its grip, hours pass unnoticed, and the stillness carries a warmth rarely found in the rush of the world. In Kumaon, the landscape feels less like wilderness and more like a quiet embrace — as if the mountains remember every traveller who arrives with an open heart.",
    ),
    heroImage: unsplash("photo-1470071459604-3b5ec3a7fe05", "Kumaon misty hills — slow travel India"),
    cardImage: unsplash("photo-1470071459604-3b5ec3a7fe05", "Kumaon gentle Himalayan journey"),
    gallery: [
      unsplash("photo-1470071459604-3b5ec3a7fe05", "Kumaon forest hills at dawn"),
      unsplash("photo-1441974231531-c6227db76b6e", "Kumaon pine forest path — travel reflections"),
      unsplash("photo-1501854140801-50d01698950b", "Kumaon village valley with mountain backdrop"),
    ],
    order: 4,
    seo: {
      title: "Kumaon Travel | Offbeat Himalayan Slow Travel | Sabryatra",
      description:
        "Discover Kumaon's stillness and presence with Sabryatra — offbeat slow travel in the Indian Himalaya.",
      focusKeyword: "slow travel India",
    },
    relatedKeywords: ["travel reflections", "Kumaon travel"],
  },
  {
    _id: "journey-shivalik",
    title: "Shivalik",
    slug: "shivalik",
    subtitle: "Walk this path of Freshness | Tenderness | Harmony",
    themes: ["Freshness", "Tenderness", "Harmony"],
    excerpt:
      "Gentler mountains wrapped in fresh forests — where the Himalaya greet you softly before the greater heights beyond.",
    body: block(
      "The mountains are gentler here — wrapped in fresh forests, open valleys, and winding trails that move quietly through the landscape. The air carries a certain freshness, the kind that makes every breath feel lighter, as if the mountains are slowly preparing you for the greater heights that lie deeper in the Himalaya. The name itself carries an ancient echo, often understood as the abode of Shiva. Perhaps that is why these hills feel quietly sacred. Small temples appear along forest paths, streams move calmly through the valleys, and villages welcome travellers with a warmth that feels sincere and unhurried. In the Shivalik, the Himalaya do not overwhelm you, they greet you gently.",
    ),
    heroImage: unsplash("photo-1441974231531-c6227db76b6e", "Shivalik forest trails — lower Himalaya slow travel"),
    cardImage: unsplash("photo-1441974231531-c6227db76b6e", "Shivalik hills journey — gentle Himalayan entry"),
    gallery: [
      unsplash("photo-1441974231531-c6227db76b6e", "Shivalik forest mountain trail"),
      unsplash("photo-1518495973542-4542c06a5843", "Shivalik valley stream through green hills"),
      unsplash("photo-1501854140801-50d01698950b", "Shivalik sunrise over gentle Himalayan foothills"),
    ],
    order: 5,
    seo: {
      title: "Shivalik Journey | Slow Travel in the Lower Himalayas | Sabryatra",
      description:
        "Begin your Himalayan journey gently in the Shivalik — fresh forests, sacred trails, and tender slow travel experiences.",
      focusKeyword: "Shivalik hills travel",
    },
    relatedKeywords: ["slow travel India", "Himalaya travel photography"],
  },
  {
    _id: "journey-maa-nanda-devi",
    title: "Maa Nanda Devi",
    slug: "maa-nanda-devi",
    subtitle: "Walk this path of Devotion | Gratitude | Reverence",
    themes: ["Devotion", "Gratitude", "Reverence"],
    excerpt:
      "Nanda Devi is the daughter of the Himalayas and protector of Garhwal–Kumaon — a presence you approach with permission, not conquest.",
    body: block(
      "Nanda Devi is believed to be the manifestation of Goddess Nanda, a form of Parvati — the daughter of the Himalayas and protector of the Garhwal–Kumaon region. For the local communities, she isn't something you climb towards; she's someone you approach with permission. The mountain is treated like a home, not a conquest. Villagers traditionally say: \"Nanda Devi allows you to see her only when she wishes.\" That's why she often remains hidden behind clouds, even on clear days.",
    ),
    heroImage: unsplash("photo-1464822759023-fed622ff2c3b", "Nanda Devi region Himalayan peaks — spiritual pilgrimage"),
    cardImage: unsplash("photo-1464822759023-fed622ff2c3b", "Maa Nanda Devi journey — Uttarakhand spiritual travel"),
    gallery: [
      unsplash("photo-1464822759023-fed622ff2c3b", "Nanda Devi Himalayan wilderness at sunrise"),
      unsplash("photo-1506905925346-21bda4d32df4", "Alpine meadow on Nanda Devi pilgrimage route"),
      unsplash("photo-1464822759023-fed622ff2c3b", "Sacred Himalayan trail toward Nanda Devi"),
    ],
    order: 1,
    seo: {
      title: "Maa Nanda Devi Journey | Spiritual Himalayan Pilgrimage | Sabryatra",
      description:
        "Journey toward Maa Nanda Devi with Sabryatra — a soulful spiritual travel experience in the Uttarakhand Himalaya.",
      focusKeyword: "Nanda Devi pilgrimage",
    },
    relatedKeywords: ["spiritual travel stories", "Uttarakhand travel"],
  },
];

export const seedStories: Story[] = [
  {
    _id: "story-zanskar",
    title: "A Soulful Journey Through Zanskar",
    slug: "zanskar-travel-story",
    excerpt:
      "In Zanskar, patience is not a lesson — it is the landscape. A reflection on moving slowly through one of the Himalaya's most remote valleys.",
    body: block(
      "There are places that refuse to be rushed. Zanskar is one of them. The road itself teaches you — long curves, high passes, and silences that stretch wider than the sky. I remember sitting outside a monastery as the wind moved through prayer flags, feeling no urge to photograph, no urge to move. Just presence. That is what Zanskar offers: not a checklist of sights, but an invitation to slow down until the inner noise quiets. Monasteries cling to rock as if grown from it. Rivers carve conversations through stone that have lasted centuries. And somewhere between the stillness and the vastness, something within you begins to change.",
    ),
    coverImage: unsplash("photo-1519681393784-d120267933ba", "Zanskar valley travel story — cinematic mountain storytelling"),
    publishedAt: "2026-03-15",
    category: "travel-story",
    relatedJourneySlug: "zanskar",
    seo: {
      title: "A Soulful Journey Through Zanskar | Sabryatra Travel Story",
      description:
        "Read a soulful travel reflection from Zanskar — cinematic mountain storytelling and slow travel in the remote Himalaya.",
      focusKeyword: "Zanskar travel experience",
    },
  },
  {
    _id: "story-photography",
    title: "Himalaya Travel Photography — Behind the Lens",
    slug: "himalaya-travel-photography-behind-the-lens",
    excerpt:
      "What it means to photograph the Himalaya not as a trophy, but as a conversation — patience, light, and the art of waiting.",
    body: block(
      "Travel photography in the mountains is not about the perfect shot. It is about waiting — for light, for silence, for the moment when the landscape opens itself. I have learned to put the camera down as often as I pick it up. Some of my most meaningful images came after hours of simply being present: watching cloud shadows move across a Zanskar valley, listening to river stones shift in Garhwal, feeling morning mist lift in Kumaon. The Himalaya do not perform for the lens. They reveal themselves to those who arrive with patience. This is the philosophy behind every Sabryatra journey — and every photograph I share.",
    ),
    coverImage: unsplash("photo-1464822759023-fed622ff2c3b", "Himalaya travel photography — mountain landscape at golden hour"),
    publishedAt: "2026-03-01",
    category: "photography",
    seo: {
      title: "Himalaya Travel Photography — Behind the Lens | Sabryatra",
      description:
        "Discover the philosophy behind Sabryatra's Himalaya travel photography — patience, light, and cinematic mountain storytelling.",
      focusKeyword: "Himalaya travel photography",
    },
  },
];

/** Old sabryatra.com "Whispers from Past Journeys" was a photo carousel only — no quote text. Add testimonials in /studio with photos + quotes. */
export const seedTestimonials: Testimonial[] = [];

export const seedGallery: GalleryImage[] = [
  {
    _id: "gallery-1",
    title: "Zanskar Valley at Dawn",
    altText: "Zanskar valley at dawn — Himalaya travel photography by Sabryatra",
    filename: "zanskar-valley-dawn-travel-photography",
    image: unsplash("photo-1519681393784-d120267933ba", "Zanskar valley at dawn — Himalaya travel photography"),
    journeySlug: "zanskar",
    featured: true,
  },
  {
    _id: "gallery-2",
    title: "Garhwal Sacred Ridgeline",
    altText: "Garhwal Himalayan ridgeline — spiritual travel photography India",
    filename: "garhwal-sacred-ridgeline-travel-photography",
    image: unsplash("photo-1542222024-c39e2281f121", "Garhwal Himalayan ridgeline — spiritual travel photography"),
    journeySlug: "garhwal",
    featured: true,
  },
  {
    _id: "gallery-3",
    title: "Kumaon Misty Forest",
    altText: "Kumaon misty forest hills — slow travel India photography",
    filename: "kumaon-misty-forest-travel-photography",
    image: unsplash("photo-1470071459604-3b5ec3a7fe05", "Kumaon misty forest hills — slow travel India"),
    journeySlug: "kumaon",
    featured: true,
  },
  {
    _id: "gallery-4",
    title: "Shivalik Forest Trail",
    altText: "Shivalik forest mountain trail — lower Himalaya travel photography",
    filename: "shivalik-forest-trail-travel-photography",
    image: unsplash("photo-1441974231531-c6227db76b6e", "Shivalik forest mountain trail"),
    journeySlug: "shivalik",
    featured: true,
  },
  {
    _id: "gallery-5",
    title: "Nanda Devi Wilderness",
    altText: "Nanda Devi Himalayan wilderness — spiritual pilgrimage photography",
    filename: "nanda-devi-wilderness-travel-photography",
    image: unsplash("photo-1464822759023-fed622ff2c3b", "Nanda Devi Himalayan wilderness"),
    journeySlug: "maa-nanda-devi",
    featured: true,
  },
  {
    _id: "gallery-6",
    title: "Himalayan Golden Hour",
    altText: "Himalayan peaks at golden hour — cinematic travel photography India",
    filename: "himalayan-golden-hour-travel-photography",
    image: unsplash("photo-1506905925346-21bda4d32df4", "Himalayan peaks at golden hour"),
    featured: true,
  },
];
