import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { Calendar } from "lucide-react";
import "react-day-picker/style.css";
import type { IsoDate } from "../types";

function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .toLowerCase();
}

function toIsoDate(date: Date): IsoDate {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}` as IsoDate;
}

function fromIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

type DatePickerButtonProps = {
  value: IsoDate;
  onChange: (date: IsoDate) => void;
};

export function DatePickerButton({ value, onChange }: DatePickerButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // close on outside click or escape
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const selected = fromIsoDate(value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="change date"
        className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-paper-2 px-3.5 py-2 font-sans text-[13px] font-medium text-ink shadow-paper transition-transform duration-100 hover:-translate-x-px hover:-translate-y-px hover:shadow-paper-lg active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        <Calendar size={16} />
        {formatLongDate(value)}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 rounded-lg border-[3px] border-ink bg-paper p-3 shadow-paper-lg">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onChange(toIsoDate(date));
                setOpen(false);
              }
            }}
            defaultMonth={selected}
            showOutsideDays
            classNames={{
              caption_label: "font-display text-lg font-bold text-ink",
              weekday: "font-mono text-xs text-ink/60 uppercase",
              day: "font-sans text-sm text-ink",
              selected: "border-1 border-ink font-bold",
              outside: "text-ink/30",
            }}
          />
        </div>
      )}
    </div>
  );
}
