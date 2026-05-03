export type Id = string;

// survives JSON round-trip;
export type IsoDate = string;

export const SECTION_KEYS = [
  "promised",
  "done",
  "willDo",
  "discussion",
  "notes",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export type Group = {
  id: Id;
  name: string;
  pinned: boolean;
  createdAt: IsoDate;
};

export type Meeting = {
  id: Id;
  groupId: Id;
  title: string;
  date: IsoDate;
  completed: boolean;
} & Record<SectionKey, string>;

export type Theme = "light" | "dark";
