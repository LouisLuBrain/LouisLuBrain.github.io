import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../../types";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useAutoSizeTextArea } from "../../hooks/useAutoSizeTextArea";

interface Props {
  onCreate: (issue: Item) => void;
}

export function IssueInput({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoSizeTextArea(textAreaRef, content);

  const handleCreate = () => {
    if (title.trim()) {
      const newIssue: Item = {
        uuid: uuidv4(),
        title,
        content,
      };
      onCreate(newIssue);
      setTitle("");
      setContent("");
    }
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded outline-none"
        onKeyDown={handleKeyPress}
      />
      <textarea
        ref={textAreaRef}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border rounded outline-none resize-none"
        rows={1}
        style={{ overflow: "hidden" }}
      />
      <div className="flex gap-2">
        <button
          onClick={handleCreate}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center"
        >
          <IconPlus size={20} />
        </button>
        {title.trim() && (
          <button
            onClick={handleClear}
            className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 flex items-center justify-center"
          >
            <IconX size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
