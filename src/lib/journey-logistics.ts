import type { Journey } from "./types";

type Logistics = Pick<
  Journey,
  | "duration"
  | "bestSeason"
  | "groupSize"
  | "pace"
  | "difficulty"
  | "bestFor"
  | "inclusions"
  | "startingPoint"
  | "moods"
>;

export const journeyLogistics: Record<string, Logistics> = {
  "maa-nanda-devi": {
    duration: "10–14 days",
    bestSeason: "May–Jun, Sep–Oct",
    groupSize: "4–6 travelers",
    pace: "Unhurried, with rest days",
    difficulty: "Moderate",
    startingPoint: "Dehradun / Joshimath region",
    moods: ["devotion", "wilderness"],
    bestFor: ["Spiritual seekers", "Photographers", "Slow travelers"],
    inclusions: ["Small-group guiding", "Curated stays", "Trail photography sessions", "Unscheduled stillness hours"],
  },
  garhwal: {
    duration: "9–12 days",
    bestSeason: "Mar–Jun, Sep–Nov",
    groupSize: "4–8 travelers",
    pace: "Reflective with moderate trekking",
    difficulty: "Moderate",
    startingPoint: "Rishikesh / Uttarakhand",
    moods: ["devotion", "wilderness"],
    bestFor: ["Spiritual travelers", "Temple trail enthusiasts", "Mountain photographers"],
    inclusions: ["Local guides", "Boutique lodges", "Sacred trail visits", "Photography walks"],
  },
  zanskar: {
    duration: "12–16 days",
    bestSeason: "Jun–Sep",
    groupSize: "4–6 travelers",
    pace: "Slow, remote, high-altitude",
    difficulty: "Challenging",
    startingPoint: "Leh, Ladakh",
    moods: ["wilderness", "devotion"],
    bestFor: ["Remote landscape lovers", "Silence seekers", "Experienced slow travelers"],
    inclusions: ["Remote route planning", "Monastery visits", "Camp/lodge mix", "Photography guidance"],
  },
  kumaon: {
    duration: "7–10 days",
    bestSeason: "Mar–Jun, Oct–Nov",
    groupSize: "4–8 travelers",
    pace: "Gentle, village-focused",
    difficulty: "Gentle",
    startingPoint: "Kathgodam / Almora region",
    moods: ["stillness", "freshness"],
    bestFor: ["First-time Himalaya travelers", "Wellness-oriented guests", "Forest path lovers"],
    inclusions: ["Village walks", "Forest trails", "Local hospitality", "Quiet reflection time"],
  },
  shivalik: {
    duration: "5–8 days",
    bestSeason: "Oct–Apr",
    groupSize: "4–8 travelers",
    pace: "Soft entry to the mountains",
    difficulty: "Gentle",
    startingPoint: "Dehradun / Mussoorie foothills",
    moods: ["freshness", "stillness"],
    bestFor: ["Gentle starters", "Forest bathers", "Short spiritual escapes"],
    inclusions: ["Forest paths", "Temple trails", "Easy day hikes", "Photography pauses"],
  },
};

export function withJourneyLogistics(journey: Journey): Journey {
  const extras = journeyLogistics[journey.slug];
  if (!extras) return journey;
  return {
    ...journey,
    duration: journey.duration ?? extras.duration,
    bestSeason: journey.bestSeason ?? extras.bestSeason,
    groupSize: journey.groupSize ?? extras.groupSize,
    pace: journey.pace ?? extras.pace,
    difficulty: journey.difficulty ?? extras.difficulty,
    bestFor: journey.bestFor?.length ? journey.bestFor : extras.bestFor,
    inclusions: journey.inclusions?.length ? journey.inclusions : extras.inclusions,
    startingPoint: journey.startingPoint ?? extras.startingPoint,
    moods: journey.moods?.length ? journey.moods : extras.moods,
  };
}
