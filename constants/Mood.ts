export const icons = [
  require("@/assets/images/faces/sad-face.png"),
  require("@/assets/images/faces/neutral-face.png"),
  require("@/assets/images/faces/good-face.png"),
  require("@/assets/images/faces/happy-face.png"),
];

export type MoodValue = 1 | 2 | 3 | 4;
export type MoodMapping = Record<MoodValue, { title: string; image: any }>;

export const MOOD_MAPPING: MoodMapping = {
  1: { title: "Sad", image: icons[0] },
  2: { title: "Neutral", image: icons[1] },
  3: { title: "Good", image: icons[2] },
  4: { title: "Happy", image: icons[3] },
};

export const MOOD_MESSAGES: Record<MoodValue, string> = {
  1: "I feel bad",
  2: "I feel normally",
  3: "I feel good",
  4: "I feel happy",
};
