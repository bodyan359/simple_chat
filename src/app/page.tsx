"use client";

import { useState } from "react";
import { StartView } from "./StartView";
import { ChatView } from "./ChatView";

enum View {
    START = "START",
    CHAT = "CHAT",
}

export default function Home() {
    const [view, setView] = useState<View>(View.START);
    const [chatPartner, setChatPartner] = useState<string>("");
    const [messages, setMessages] = useState<any[]>([]);
    const [chatInput, setChatInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleStartChat = async () => {
        try {
            setLoading(true);
            setMessages((prev) => [...prev, { role: "user", content: chatPartner }]);

            const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
                    messages: [
                        {
                            role: "user",
                            content: `speak with me like u ` + chatPartner,
                        },
                    ],
                }),
            });

            const data = await resp.json();
            console.log("data", data);

            const assistantReply = data.choices?.[0]?.message?.content || "No response from model.";
            const assistantRole = data.choices?.[0]?.message?.role || "No Role";

            setMessages((prev) => [
                ...prev,
                { role: assistantRole, content: assistantReply },
            ]);
            setView(View.CHAT);
        } catch (error) {
            console.error("Error starting chat:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (userMessage: string) => {
        try {
            if (!userMessage.trim()) return;

            setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
            setChatInput("");
            setLoading(true);

            const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
                    messages: [
                        ...messages,
                        { role: "user", content: userMessage },
                    ],
                }),
            });

            const data = await resp.json();
            console.log("assistant data", data);

            const assistantReply = data.choices?.[0]?.message?.content || "No response.";
            const assistantRole = data.choices?.[0]?.message?.role || "assistant";

            setMessages((prev) => [...prev, { role: assistantRole, content: assistantReply }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "⚠️ Error: failed to get response." },
            ]);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full h-full flex items-center justify-center">
            {loading && view == View.START ? (
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Starting chat...</p>
                </div>
            ) : view === View.START ? (
                <StartView
                    chatPartner={chatPartner}
                    setChatPartner={setChatPartner}
                    handleStartChat={handleStartChat}
                />
            ) : (
                <ChatView
                    messages={messages}
                    chatInput={chatInput}
                    setChatInput={setChatInput}
                    handleSendMessage={handleSendMessage}
                    loading={loading}
                />
            )}
        </div>
    );
}
