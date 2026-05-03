import type { Group, Id, IsoDate, Meeting } from "../types";
import { DatePickerButton } from "./DatePickerButton";
import { EditableText } from "./EditableText";

type MeetingHeaderProps = {
  meeting: Meeting;
  group: Group;
  onRename: (id: Id, title: string) => void;
  onSetDate: (id: Id, date: IsoDate) => void;
  onToggleCompleted: (id: Id) => void;
  onDelete: (id: Id) => void;
};

export function MeetingHeader({
  meeting,
  group,
  onRename,
  onSetDate,
  onToggleCompleted,
  onDelete,
}: MeetingHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 font-sans text-xs text-ink/60">
        <span className="font-semibold text-ink/80">{group.name}</span>
        <span className="opacity-50">/</span>
        <span className="font-mono">meeting</span>
      </div>

      <div className="mt-2 flex flex-wrap items-start gap-5">
        <div className="min-w-[320px] flex-1">
          <EditableText
            as="h1"
            value={meeting.title}
            onChange={(title) => onRename(meeting.id, title)}
            className="w-full box-border h-[64px] flex items-center font-display text-5xl font-bold tracking-tight text-ink border-[2.5px] px-2"
            inputClassName="border-dashed border-ink bg-paper-2 outline-none"
            displayClassName={`border-transparent ${
              meeting.completed
                ? "line-through decoration-yolk decoration-[7px]"
                : ""
            }`}
            title="click to rename"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <DatePickerButton
            value={meeting.date}
            onChange={(date) => onSetDate(meeting.id, date)}
          />

          <button
            type="button"
            onClick={() => onToggleCompleted(meeting.id)}
            className={`inline-flex items-center gap-2 border-[3px] border-ink px-3.5 py-2 font-sans text-sm font-semibold text-ink shadow-paper transition-transform duration-100 hover:-translate-x-px hover:-translate-y-px hover:shadow-paper-lg active:translate-x-1 active:translate-y-1 active:shadow-none ${
              meeting.completed ? "bg-mint" : "bg-paper-2"
            }`}
          >
            {meeting.completed ? "mark undone" : "mark done"}
          </button>
          <button
            type="button"
            onClick={() => onDelete(meeting.id)}
            title="delete meeting"
            className="border-[2.5px] border-ink bg-paper-2 px-3 py-2 font-sans text-sm font-semibold text-tomato shadow-paper transition-transform duration-100 hover:-translate-x-px hover:-translate-y-px hover:shadow-paper-lg active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
