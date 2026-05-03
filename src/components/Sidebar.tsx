import { Search } from "lucide-react";
import type { Group, Id, Meeting, Theme } from "../types";
import { GroupRow } from "./GroupRow";
import { ThemeToggle } from "./ThemeToggle";

type SidebarProps = {
  groups: Group[];
  meetings: Meeting[];
  selectedMeetingId: Id | null;
  expandedGroupIds: Record<Id, boolean>;
  query: string;
  theme: Theme;
  pendingRenameGroupId: Id | null;
  onToggleExpanded: (id: Id) => void;
  onSelectMeeting: (id: Id) => void;
  onQuery: (q: string) => void;
  onToggleTheme: () => void;
  onCreateGroup: () => void;
  onRenameGroup: (id: Id, name: string) => void;
  onDeleteGroup: (id: Id) => void;
  onTogglePinned: (id: Id) => void;
  onCreateMeeting: (groupId: Id) => void;
  onClearPendingRename: () => void;
};

export function Sidebar({
  groups,
  meetings,
  selectedMeetingId,
  expandedGroupIds,
  query,
  theme,
  pendingRenameGroupId,
  onToggleExpanded,
  onSelectMeeting,
  onQuery,
  onToggleTheme,
  onCreateGroup,
  onRenameGroup,
  onDeleteGroup,
  onTogglePinned,
  onCreateMeeting,
  onClearPendingRename,
}: SidebarProps) {
  const sortedGroups = [...groups].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned),
  );
  const visibleGroups = query.trim()
    ? sortedGroups.filter((g) =>
        g.name.toLowerCase().includes(query.toLowerCase()),
      )
    : sortedGroups;

  return (
    <aside className="flex w-[300px] shrink-0 flex-col border-r-[3px] border-ink bg-paper-2">
      <div className="flex items-center justify-between gap-2 border-b-[2.5px] border-ink px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center border-[2.5px] border-ink bg-yolk font-display text-base font-bold text-ink shadow-paper-sm"
            style={{ transform: "rotate(-3deg)" }}
          >
            s.
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-ink">
            standup.
          </span>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <div className="px-4 pt-4 pb-2.5">
        <div className="flex items-center gap-2 border-2 border-ink bg-paper px-2.5 py-1.5 shadow-paper-sm">
          <Search size={14} className="text-ink/50" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="search groups…"
            className="flex-1 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink/40"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pt-1 pb-6">
        <div className="px-2.5 pt-2.5 pb-1.5 font-sans text-[11px] font-bold tracking-widest text-ink/50 uppercase">
          groups
        </div>
        <button
          type="button"
          onClick={onCreateGroup}
          className="mb-1.5 flex w-full items-center gap-2 rounded-md border-2 border-dashed border-ink/40 px-2.5 py-2 text-left font-sans text-[13px] font-semibold text-ink/70 transition-colors hover:border-ink hover:text-ink"
        >
          <span>+ new group</span>
        </button>
        {visibleGroups.map((g) => (
          <GroupRow
            key={g.id}
            group={g}
            meetings={meetings.filter((m) => m.groupId === g.id)}
            expanded={expandedGroupIds[g.id]}
            selectedMeetingId={selectedMeetingId}
            autoStartEditing={pendingRenameGroupId === g.id}
            onToggleExpanded={onToggleExpanded}
            onSelectMeeting={onSelectMeeting}
            onRename={onRenameGroup}
            onDelete={onDeleteGroup}
            onTogglePinned={onTogglePinned}
            onCreateMeeting={onCreateMeeting}
            onAutoStartEditingHandled={onClearPendingRename}
          />
        ))}
        {visibleGroups.length === 0 && (
          <div className="px-2.5 py-4 text-center font-hand text-base text-ink/50">
            no groups match that.
          </div>
        )}
      </div>
    </aside>
  );
}
