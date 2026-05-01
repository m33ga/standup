import type { SectionKey } from "../types";

export type SectionMeta = {
  label: string;
  hint: string;
  tapeColor: string;
  tapeRotate: number;
};

export const SECTION_META: Record<SectionKey, SectionMeta> = {
  promised: {
    label: "what was promised",
    hint: "auto-filled from last meeting",
    tapeColor: "var(--color-sky)",
    tapeRotate: -2.2,
  },
  done: {
    label: "what was done",
    hint: "tick off what actually happened",
    tapeColor: "var(--color-mint)",
    tapeRotate: 1.5,
  },
  willDo: {
    label: "what will be done",
    hint: "this rolls into next meeting",
    tapeColor: "var(--color-yolk)",
    tapeRotate: -1.2,
  },
  discussion: {
    label: "what needs discussion",
    hint: "blockers, questions, weather",
    tapeColor: "var(--color-peach)",
    tapeRotate: -2,
  },
  notes: {
    label: "notes",
    hint: "anything else worth remembering",
    tapeColor: "var(--color-lilac)",
    tapeRotate: 2,
  },
};
