import { ChevronDown, Pencil, Pin, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useStore } from "../store";
import type { Id } from "../types";
import { EditableText, type EditableTextHandle } from "./EditableText";
import { MeetingList } from "./MeetingList";
import { useShallow } from "zustand/shallow";

type GroupRowProps = {
  groupId: Id;
  autoStartEditing?: boolean;
};

export function GroupRow({ groupId, autoStartEditing }: GroupRowProps) {
  const group = useStore((s) => s.groups.find((g) => g.id === groupId));
  const meetings = useStore(
    useShallow((s) => s.meetings.filter((m) => m.groupId === groupId)),
  );
  const expanded = useStore((s) => s.expandedGroupIds[groupId]);
  const toggleExpanded = useStore((s) => s.toggleExpanded);
  const renameGroup = useStore((s) => s.renameGroup);
  const deleteGroup = useStore((s) => s.deleteGroup);
  const togglePinned = useStore((s) => s.togglePinned);
  const createMeeting = useStore((s) => s.createMeeting);
  const clearPendingRename = useStore((s) => s.clearPendingRename);

  const nameRef = useRef<EditableTextHandle>(null);

  useEffect(() => {
    if (autoStartEditing) {
      nameRef.current?.startEditing();
      clearPendingRename();
    }
  }, [autoStartEditing, clearPendingRename]);

  if (!group) return null;

  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mb-0.5">
      <div className="group flex items-center gap-1.5 rounded px-2 py-1.5 hover:bg-ink/[0.03]">
        <button
          type="button"
          onClick={() => toggleExpanded(group.id)}
          className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
        >
          <ChevronDown
            size={14}
            className={`text-ink/50 transition-transform duration-100 ${
              expanded ? "" : "-rotate-90"
            }`}
          />
          {group.pinned && <Pin size={10} className="shrink-0 text-ink/40" />}
          <EditableText
            ref={nameRef}
            as="span"
            value={group.name}
            onChange={(name) => renameGroup(group.id, name)}
            clickToEdit={false}
            className="min-w-0 flex-1 truncate border-2 px-1 py-px font-sans text-sm font-semibold text-ink"
            displayClassName="border-transparent"
            inputClassName="border-dashed border-ink bg-paper outline-none"
          />
        </button>
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePinned(group.id);
            }}
            aria-label={group.pinned ? "unpin" : "pin to top"}
            title={group.pinned ? "unpin" : "pin to top"}
            className="flex h-5 w-5 items-center justify-center rounded text-ink/50 hover:text-ink"
          >
            <Pin size={13} className={group.pinned ? "text-ink" : ""} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nameRef.current?.startEditing();
            }}
            aria-label="rename group"
            title="rename"
            className="flex h-5 w-5 items-center justify-center rounded text-ink/50 hover:text-ink"
          >
            <Pencil size={13} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteGroup(group.id);
            }}
            aria-label="delete group"
            title="delete"
            className="flex h-5 w-5 items-center justify-center rounded text-tomato/60 hover:text-tomato"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-1 mb-2 ml-5 border-l border-dashed border-ink/30 pl-2.5">
          <button
            type="button"
            onClick={() => createMeeting(group.id)}
            className="mt-1 flex items-center gap-1.5 rounded px-2 py-1 font-sans text-xs font-semibold text-ink/55 hover:text-ink"
          >
            + new meeting
          </button>
          <MeetingList meetings={sorted} />
        </div>
      )}
    </div>
  );
}
