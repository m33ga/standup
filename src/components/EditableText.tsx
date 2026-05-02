import { useEffect, useRef, useState } from "react";

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  displayClassName?: string;
  placeholder?: string;
  title?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
};

export function EditableText({
  value,
  onChange,
  className = "",
  inputClassName = "",
  displayClassName = "",
  placeholder,
  title = "click to edit",
  as: Tag = "span",
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editing]);

  const save = () => {
    onChange(draft.trim() || value); // empty input falls back to original
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={ref}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            save();
          } else if (e.key === "Escape") {
            e.preventDefault();
            cancel();
          }
        }}
        placeholder={placeholder}
        className={`${className} ${inputClassName}`}
      />
    );
  }

  return (
    <Tag
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      title={title}
      className={`cursor-text ${className} ${displayClassName}`}
    >
      {value}
    </Tag>
  );
}
