export type JourneySlug =
  | "garhwal"
  | "zanskar"
  | "kumaon"
  | "shivalik"
  | "maa-nanda-devi";

export interface JourneyTheme {
  accent: string;
  muted: string;
}

export const journeyThemes: Record<JourneySlug, JourneyTheme> = {
  garhwal: { accent: "#8B6914", muted: "#F5F0E8" },
  zanskar: { accent: "#5C4A6E", muted: "#EEEAF2" },
  kumaon: { accent: "#4A6741", muted: "#EEF2EC" },
  shivalik: { accent: "#3D6B5E", muted: "#ECF3F0" },
  "maa-nanda-devi": { accent: "#6B4E71", muted: "#F3EEF4" },
};

export function getJourneyTheme(slug: string): JourneyTheme {
  return journeyThemes[slug as JourneySlug] ?? {
    accent: "#5C5346",
    muted: "#F5F2ED",
  };
}
