import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedGroups, seedMeetings } from "./types/seed";
import type { Group, Id, IsoDate, Meeting, SectionKey, Theme } from "./types";

function todayISO(): IsoDate {
  return new Date().toISOString().slice(0, 10);
}

export type Store = {
  // state
  groups: Group[];
  meetings: Meeting[];
  selectedMeetingId: Id | null;
  expandedGroupIds: Record<Id, boolean>;
  query: string;
  theme: Theme;
  pendingRenameGroupId: Id | null;

  // group actions
  createGroup: () => void;
  renameGroup: (id: Id, name: string) => void;
  deleteGroup: (id: Id) => void;
  togglePinned: (id: Id) => void;
  clearPendingRename: () => void;

  // meeting actions
  createMeeting: (groupId: Id) => void;
  renameMeeting: (id: Id, title: string) => void;
  setMeetingDate: (id: Id, date: IsoDate) => void;
  deleteMeeting: (id: Id) => void;
  toggleCompleted: (id: Id) => void;
  setSection: (id: Id, key: SectionKey, value: string) => void;

  // ui actions
  selectMeeting: (id: Id | null) => void;
  toggleExpanded: (groupId: Id) => void;
  setQuery: (q: string) => void;
  toggleTheme: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      groups: seedGroups,
      meetings: seedMeetings,
      selectedMeetingId: "m3",
      expandedGroupIds: { g1: true, g2: true },
      query: "",
      theme: "light",
      pendingRenameGroupId: null,

      createGroup: () => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        set((s) => ({
          groups: [
            ...s.groups,
            { id, name: "new group", pinned: false, createdAt: now },
          ],
          expandedGroupIds: { ...s.expandedGroupIds, [id]: true },
          query: "",
          pendingRenameGroupId: id,
        }));
      },

      renameGroup: (id, name) =>
        set((s) => ({
          groups: s.groups.map((g) => (g.id === id ? { ...g, name } : g)),
        })),

      deleteGroup: (id) =>
        set((s) => {
          if (!window.confirm("delete this group and all its meetings?"))
            return s;
          const next = { ...s.expandedGroupIds };
          delete next[id];
          const selectedMeeting = s.meetings.find(
            (m) => m.id === s.selectedMeetingId,
          );
          return {
            groups: s.groups.filter((g) => g.id !== id),
            meetings: s.meetings.filter((m) => m.groupId !== id),
            expandedGroupIds: next,
            selectedMeetingId:
              selectedMeeting?.groupId === id ? null : s.selectedMeetingId,
          };
        }),

      togglePinned: (id) =>
        set((s) => ({
          groups: s.groups.map((g) =>
            g.id === id ? { ...g, pinned: !g.pinned } : g,
          ),
        })),

      clearPendingRename: () => set({ pendingRenameGroupId: null }),

      createMeeting: (groupId) => {
        const previous = get()
          .meetings.filter((m) => m.groupId === groupId)
          .sort((a, b) => b.date.localeCompare(a.date))[0];
        const id = crypto.randomUUID();
        const newMeeting: Meeting = {
          id,
          groupId,
          title: `standup · ${todayISO()}`,
          date: todayISO(),
          completed: false,
          promised: previous?.willDo ?? "",
          done: "",
          willDo: "",
          discussion: "",
          notes: "",
        };
        set((s) => ({
          meetings: [...s.meetings, newMeeting],
          expandedGroupIds: { ...s.expandedGroupIds, [groupId]: true },
          selectedMeetingId: id,
        }));
      },

      renameMeeting: (id, title) =>
        set((s) => ({
          meetings: s.meetings.map((m) => (m.id === id ? { ...m, title } : m)),
        })),

      setMeetingDate: (id, date) =>
        set((s) => ({
          meetings: s.meetings.map((m) => (m.id === id ? { ...m, date } : m)),
        })),

      deleteMeeting: (id) =>
        set((s) => {
          if (!window.confirm("delete this meeting?")) return s;
          return {
            meetings: s.meetings.filter((m) => m.id !== id),
            selectedMeetingId:
              s.selectedMeetingId === id ? null : s.selectedMeetingId,
          };
        }),

      toggleCompleted: (id) =>
        set((s) => ({
          meetings: s.meetings.map((m) =>
            m.id === id ? { ...m, completed: !m.completed } : m,
          ),
        })),

      setSection: (id, key, value) =>
        set((s) => ({
          meetings: s.meetings.map((m) =>
            m.id === id ? { ...m, [key]: value } : m,
          ),
        })),

      selectMeeting: (id) => set({ selectedMeetingId: id }),

      toggleExpanded: (groupId) =>
        set((s) => ({
          expandedGroupIds: {
            ...s.expandedGroupIds,
            [groupId]: !s.expandedGroupIds[groupId],
          },
        })),

      setQuery: (q) => set({ query: q }),

      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
    }),
    {
      name: "standup:v1",
      version: 1,
      partialize: (s) => ({
        groups: s.groups,
        meetings: s.meetings,
        selectedMeetingId: s.selectedMeetingId,
        expandedGroupIds: s.expandedGroupIds,
        theme: s.theme,
      }),
    },
  ),
);
