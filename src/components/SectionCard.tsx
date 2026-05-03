import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Tape } from "./Tape";

type SectionCardProps = {
  label: string;
  hint: string;
  tapeColor: string;
  tapeRotate: number;
  value: string;
  wide?: boolean;
  onChange: (value: string) => void;
};

export function SectionCard({
  label,
  hint,
  tapeColor,
  tapeRotate,
  value,
  onChange,
}: SectionCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement>(null);

  // autofocus when entering edit mode; place cursor at end
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const len = ref.current.value.length;
      ref.current.setSelectionRange(len, len);
    }
  }, [editing]);

  // auto-resize textarea to fit content
  useLayoutEffect(() => {
    if (!editing || !ref.current) return;
    const el = ref.current;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [draft, editing]);

  const save = () => {
    onChange(draft);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="relative pt-3.5">
      <div className="pointer-events-none absolute top-0 left-3.5 z-10">
        <Tape color={tapeColor} rotate={tapeRotate}>
          {label}
        </Tape>
      </div>

      <div
        onClick={() => !editing && setEditing(true)}
        className={`min-h-40 rounded-lg border-[3.5px] border-ink bg-paper px-5 pt-6 pb-4 shadow-paper-md transition-transform duration-100 ${
          editing
            ? ""
            : "cursor-text hover:-translate-x-px hover:-translate-y-px hover:shadow-paper-lg"
        }`}
      >
        {editing ? (
          <div>
            <textarea
              ref={ref}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  save();
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  cancel();
                }
              }}
              placeholder={`write something here… ${hint}.`}
              className="block w-full resize-none overflow-hidden bg-transparent font-mono text-sm leading-relaxed text-ink outline-none"
            />
          </div>
        ) : value.trim() ? (
          <p className="font-mono text-[15px] leading-relaxed whitespace-pre-wrap text-ink">
            {value}
          </p>
        ) : (
          <p className="font-mono text-sm text-ink/50 italic">empty. {hint}.</p>
        )}
      </div>
    </div>
  );
}
