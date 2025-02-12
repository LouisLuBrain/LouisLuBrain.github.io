import { useEffect } from "react";

export function useAutoSizeTextArea(
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  value: string
) {
  useEffect(() => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current;
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [textAreaRef, value]);
}
