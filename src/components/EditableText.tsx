import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type EditableTextHandle = { startEditing: () => void };

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
  displayClassName?: string;
  placeholder?: string;
  title?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  clickToEdit?: boolean;
};

export const EditableText = forwardRef<EditableTextHandle, EditableTextProps>(
  function EditableText(
    {
      value,
      onChange,
      className = "",
      inputClassName = "",
      displayClassName = "",
      placeholder,
      title = "click to edit",
      as: Tag = "span",
      clickToEdit = true,
    },
    ref,
  ) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        startEditing: () => {
          setDraft(value);
          setEditing(true);
        },
      }),
      [value],
    );

    useEffect(() => {
      if (editing && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [editing]);

    const save = () => {
      onChange(draft.trim() || value);
      setEditing(false);
    };

    const cancel = () => {
      setDraft(value);
      setEditing(false);
    };

    if (editing) {
      return (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
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

    if (!clickToEdit) {
      return <Tag className={`${className} ${displayClassName}`}>{value}</Tag>;
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
  },
);
