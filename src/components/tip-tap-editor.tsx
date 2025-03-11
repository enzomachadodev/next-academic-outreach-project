"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, Extensions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { cn } from "@/lib/utils";

interface TipTapEditorProps {
  placeholder?: string;
  className?: string;
  extensions?: Extensions;
  isDragActive?: boolean;
  autoFocus?: boolean;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line
  field?: ControllerRenderProps<any, any>;
  disabled?: boolean;
  onUpdate?: (content: string) => void;
}
export interface TipTapEditorRef {
  editor: Editor | null;
  getText: () => string;
  getHTML: () => string;
  clearContent: () => void;
  setContent: (content: string) => void;
}

const TipTapEditor = forwardRef<TipTapEditorRef, TipTapEditorProps>(
  (
    {
      placeholder = "Start typing...",
      className = "",
      extensions = [],
      isDragActive = false,
      autoFocus = false,
      onPaste,
      field,
      disabled = false,
      onUpdate,
    },
    ref,
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          bold: false,
          italic: false,
        }),
        Placeholder.configure({
          placeholder,
        }),
        ...extensions,
      ],
      immediatelyRender: false,
      content: field?.value || "",
      autofocus: autoFocus,
      editable: !disabled,
      onUpdate: ({ editor }) => {
        const text = editor.getText({ blockSeparator: "\n" });

        if (field) {
          field.onChange(text);
        }

        if (onUpdate) {
          onUpdate(text);
        }
      },
      onBlur: () => {
        if (field) {
          field.onBlur();
        }
      },
    });

    useEffect(() => {
      if (
        editor &&
        field &&
        field.value !== editor.getText({ blockSeparator: "\n" })
      ) {
        editor.commands.setContent(field.value || "");
      }
    }, [editor, field, field?.value]);

    useImperativeHandle(ref, () => ({
      editor,
      getText: () => editor?.getText({ blockSeparator: "\n" }) || "",
      getHTML: () => editor?.getHTML() || "",
      clearContent: () => editor?.commands.clearContent(),
      setContent: (content: string) => editor?.commands.setContent(content),
    }));

    return (
      <div className="relative w-full">
        <EditorContent
          editor={editor}
          className={cn(
            "max-h-60 min-h-16 w-full overflow-y-auto bg-transparent text-base placeholder:font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 focus-visible:disabled:cursor-not-allowed md:text-sm",
            isDragActive && "outline-dashed",
            className,
          )}
          onPaste={onPaste}
          {...(field && { id: field.name })}
        />
      </div>
    );
  },
);

TipTapEditor.displayName = "TipTapEditor";

export { TipTapEditor };
