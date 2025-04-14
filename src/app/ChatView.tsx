"use client";

import {useEffect} from "react";

interface ChatViewProps {
  messages: { role: string; content: string }[];
  handleSendMessage: (message: string) => void;
  chatInput: string;
  setChatInput: (chatInput: string) => void;
  loading: boolean;
}

export const ChatView = ({
  messages,
  handleSendMessage,
  chatInput,
  setChatInput,
    loading
}: ChatViewProps) => {


  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" && chatInput.trim().length > 0) {
          handleSendMessage(chatInput);
          setChatInput("");
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [chatInput, handleSendMessage, setChatInput]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              loading={loading}
            />
          ))}
        </div>
        {loading && (
            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p>Assistant is typing...</p>
            </div>
        )}
      </div>
      <div className="p-4 border-t border-neutral-800">
        <div className="flex gap-4">
          <textarea
            className="flex-1 p-4 bg-neutral-800 border border-neutral-700 rounded-lg resize-none text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-600"
            placeholder="Type your message..."
            rows={3}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button
            onClick={() => handleSendMessage(chatInput)}
            className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 disabled:cursor-not-allowed"
            disabled={chatInput.length <= 0}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({ role, content, loading }: { role: string; content: string, loading: boolean }) => {
  return (
    <div
      className={`flex gap-2 items-center ${
        role === "user" ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`${
          role === "user" ? "bg-green-600" : "bg-blue-600"
        } text-xs px-2 py-1 rounded`}
      >
        {role === "user" ? "YOU" : "BOT"}
      </div>
      <div className="bg-neutral-800 p-4 rounded-lg max-w-[80%]">{content}</div>
    </div>
  );
};
