import type { Group, Meeting } from "./index";

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function nowPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export const seedGroups: Group[] = [
  { id: "g1", name: "project one", pinned: true, createdAt: nowPlus(-10) },
  { id: "g2", name: "client · lumen co", pinned: true, createdAt: nowPlus(-8) },
  { id: "g3", name: "design crit", pinned: false, createdAt: nowPlus(-5) },
  { id: "g4", name: "ops & people", pinned: false, createdAt: nowPlus(-2) },
];

export const seedMeetings: Meeting[] = [
  {
    id: "m1",
    groupId: "g1",
    title: "standup · kickoff",
    date: todayPlus(-14),
    completed: true,
    promised: "",
    done: "set up the project board\npicked tech stack\nwrote the readme",
    willDo: "sketch the main flows\ntalk to 3 users",
    discussion: "do we really need auth for v1? lean no.",
    notes: "mo to own copy. an to own eng.",
  },
  {
    id: "m2",
    groupId: "g1",
    title: "standup · week 2",
    date: todayPlus(-7),
    completed: true,
    promised: "sketch the main flows\ntalk to 3 users",
    done: "sketched 5 flows (3 good, 2 trash)\ntalked to 4 users",
    willDo: "hi-fi mocks for meeting page\nwire up groups CRUD",
    discussion: "markdown inside sections: ok?\ndark mode in v1?",
    notes: "ry suggested the tape labels. keeping them.",
  },
  {
    id: "m3",
    groupId: "g1",
    title: "standup · today",
    date: todayPlus(0),
    completed: false,
    promised: "hi-fi mocks for meeting page\nwire up groups CRUD",
    done: "",
    willDo: "",
    discussion: "blockers: waiting on copy from mo",
    notes: "",
  },
  {
    id: "m4",
    groupId: "g2",
    title: "lumen · intro call",
    date: todayPlus(-21),
    completed: true,
    promised: "",
    done: "met the team\nwalked through current setup\nsigned NDA",
    willDo: "audit their dashboard\npropose a 4-week scope",
    discussion: "who approves scope changes?",
    notes: "they drink a lot of coffee.",
  },
  {
    id: "m5",
    groupId: "g3",
    title: "crit · homepage v3",
    date: todayPlus(-5),
    completed: true,
    promised: "fresh homepage comp\n2 alternates",
    done: "1 main, 2 alts (one is weird, on purpose)",
    willDo: "pick one, kill the others\ntest on mobile",
    discussion: "is the hero too empty? no, it's breathing.",
    notes: "alt #2 stays alive.",
  },
  {
    id: "m6",
    groupId: "g4",
    title: "team sync · this month",
    date: todayPlus(-12),
    completed: false,
    promised: "",
    done: "hired an\nry starts next monday",
    willDo: "run onboarding for ry\nbook the offsite",
    discussion: "remote fridays: keeping them",
    notes: "an prefers mornings.",
  },
];
