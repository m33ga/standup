import { useCallback, useEffect, useState } from "react";
import { EmptyState } from "./components/EmptyState";
import { MeetingView } from "./components/MeetingView";
import { Sidebar } from "./components/Sidebar";
import { seedGroups, seedMeetings } from "./types/seed";
import type { Group, Id, IsoDate, Meeting, SectionKey, Theme } from "./types";

function todayISO(): IsoDate {
  return new Date().toISOString().slice(0, 10);
}

function App() {
  const [groups, setGroups] = useState<Group[]>(seedGroups);
  const [meetings, setMeetings] = useState<Meeting[]>(seedMeetings);
  const [selectedMeetingId, setSelectedMeetingId] = useState<Id | null>("m3");
  const [expandedGroupIds, setExpandedGroupIds] = useState<Record<Id, boolean>>(
    { g1: true, g2: true },
  );
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<Theme>("light");
  const [pendingRenameGroupId, setPendingRenameGroupId] = useState<Id | null>(
    null,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const clearPendingRename = useCallback(() => {
    setPendingRenameGroupId(null);
  }, []);

  const meeting = meetings.find((m) => m.id === selectedMeetingId);
  const group = meeting
    ? groups.find((g) => g.id === meeting.groupId)
    : undefined;

  const createGroup = () => {
    const id = crypto.randomUUID();
    setGroups((gs) => [...gs, { id, name: "new group", pinned: false }]);
    setExpandedGroupIds((e) => ({ ...e, [id]: true }));
    setQuery("");
    setPendingRenameGroupId(id);
  };

  const renameGroup = (id: Id, name: string) => {
    setGroups((gs) => gs.map((g) => (g.id === id ? { ...g, name } : g)));
  };

  const deleteGroup = (id: Id) => {
    if (!window.confirm("delete this group and all its meetings?")) return;
    setGroups((gs) => gs.filter((g) => g.id !== id));
    setMeetings((ms) => ms.filter((m) => m.groupId !== id));
    setExpandedGroupIds((e) => {
      const next = { ...e };
      delete next[id];
      return next;
    });
    if (meeting?.groupId === id) setSelectedMeetingId(null);
  };

  const togglePinned = (id: Id) => {
    setGroups((gs) =>
      gs.map((g) => (g.id === id ? { ...g, pinned: !g.pinned } : g)),
    );
  };

  const createMeeting = (groupId: Id) => {
    // autofill: previous meeting's willDo -> new meeting's promised
    const previousMeeting = meetings
      .filter((m) => m.groupId === groupId)
      .sort((a, b) => b.date.localeCompare(a.date))[0];
    const id = crypto.randomUUID();
    const newMeeting: Meeting = {
      id,
      groupId,
      title: `standup · ${todayISO()}`,
      date: todayISO(),
      completed: false,
      promised: previousMeeting?.willDo ?? "",
      done: "",
      willDo: "",
      discussion: "",
      notes: "",
    };
    setMeetings((ms) => [...ms, newMeeting]);
    setExpandedGroupIds((e) => ({ ...e, [groupId]: true }));
    setSelectedMeetingId(id);
  };

  const renameMeeting = (id: Id, title: string) => {
    setMeetings((ms) => ms.map((m) => (m.id === id ? { ...m, title } : m)));
  };

  const setMeetingDate = (id: Id, date: IsoDate) => {
    setMeetings((ms) => ms.map((m) => (m.id === id ? { ...m, date } : m)));
  };

  const deleteMeeting = (id: Id) => {
    if (!window.confirm("delete this meeting?")) return;
    setMeetings((ms) => ms.filter((m) => m.id !== id));
    if (selectedMeetingId === id) setSelectedMeetingId(null);
  };

  const toggleCompleted = (id: Id) => {
    setMeetings((ms) =>
      ms.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)),
    );
  };

  const setSection = (id: Id, key: SectionKey, value: string) => {
    setMeetings((ms) =>
      ms.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    );
  };

  const toggleExpanded = (id: Id) => {
    setExpandedGroupIds((e) => ({ ...e, [id]: !e[id] }));
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <Sidebar
        groups={groups}
        meetings={meetings}
        selectedMeetingId={selectedMeetingId}
        expandedGroupIds={expandedGroupIds}
        query={query}
        theme={theme}
        pendingRenameGroupId={pendingRenameGroupId}
        onToggleExpanded={toggleExpanded}
        onSelectMeeting={setSelectedMeetingId}
        onQuery={setQuery}
        onToggleTheme={toggleTheme}
        onCreateGroup={createGroup}
        onRenameGroup={renameGroup}
        onDeleteGroup={deleteGroup}
        onTogglePinned={togglePinned}
        onCreateMeeting={createMeeting}
        onClearPendingRename={clearPendingRename}
      />
      <main className="flex-1">
        {meeting && group ? (
          <MeetingView
            key={meeting.id}
            meeting={meeting}
            group={group}
            onRenameMeeting={renameMeeting}
            onSetMeetingDate={setMeetingDate}
            onDeleteMeeting={deleteMeeting}
            onToggleCompleted={toggleCompleted}
            onSetSection={setSection}
          />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;
