import { ChevronDown, Pin } from "lucide-react";
import type { Group, Id, Meeting } from "../types";
import { MeetingList } from "./MeetingList";

type GroupRowProps = {
  group: Group;
  meetings: Meeting[];
  expanded: boolean;
  selectedMeetingId: Id | null;
  onToggleExpanded?: (id: Id) => void;
  onSelectMeeting?: (id: Id) => void;
};

export function GroupRow({
  group,
  meetings,
  expanded,
  selectedMeetingId,
  onToggleExpanded,
  onSelectMeeting,
}: GroupRowProps) {
  // sort meetings in a group by date desc
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mb-0.5">
      <button
        type="button"
        onClick={() => onToggleExpanded?.(group.id)}
        className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left hover:bg-ink/[0.03]"
      >
        <ChevronDown
          size={14}
          className={`text-ink/50 transition-transform duration-100 ${
            expanded ? "" : "-rotate-90"
          }`}
        />
        <span className="flex-1 truncate font-sans text-sm font-semibold text-ink">
          {group.name}
        </span>
        {group.pinned && <Pin size={14} className="text-ink/70" />}
      </button>

      {expanded && (
        <div className="mt-1 mb-2 ml-5 border-l border-dashed border-ink/30 pl-2.5">
          <MeetingList
            meetings={sorted}
            selectedMeetingId={selectedMeetingId}
            onSelect={onSelectMeeting}
          />
        </div>
      )}
    </div>
  );
}
