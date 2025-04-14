"use client";

import { useEffect, useState } from "react";

interface StartViewProps {
    chatPartner: string;
    setChatPartner: (chatPartner: string) => void;
    handleStartChat: () => void;
}

const prankIdeas = [
    "Pretend you're a long-lost billionaire cousin.",
    "Reply only in rhymes for the whole conversation.",
    "Act like you don’t remember who they are.",
    "Insist today is their birthday — with confidence.",
    "Speak only in pirate slang.",
    "Pretend you’re stuck in the year 1999.",
    "Use only song lyrics to communicate.",
    "Keep asking them if they can hear a strange sound.",
    "Act like you’re slowly turning into a cat.",
    "Say everything as if it’s a prophecy.",
    "Pretend you're on a cooking show narrating your every move.",
    "Change the subject to potatoes no matter what they say.",
    "Refer to them only as ‘Commander’ and await orders.",
    "Insist you're their new AI assistant and ignore personal questions.",
    "Speak only using emojis (no words allowed).",
    "Tell them you're outside their house — but you're not.",
    "Repeat everything they say... but backwards.",
    "Pretend you’re trapped in a video game and need their help.",
    "Make up wild fake news stories and ask for their opinion.",
    "Ask if they received ‘the package’ — then act mysterious.",
];


export const StartView = ({
                              chatPartner,
                              setChatPartner,
                              handleStartChat,
                          }: StartViewProps) => {
    const [email, setEmail] = useState<string>("")
    const [prankDescription, setPrankDescription] = useState<string>("")

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" && chatPartner.length > 0) {
                handleStartChat();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleStartChat, chatPartner]);

    const handleGeneratePrank = () => {
        const idea = prankIdeas[Math.floor(Math.random() * prankIdeas.length)];
        setPrankDescription(idea);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 h-full p-4">
            <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl text-center">
                <div className="text-4xl font-extrabold">Simple Chat</div>
                <div className="text-xl font-semibold">Who do you want to chat with?</div>
                <textarea
                    rows={2}
                    className="w-full p-4 bg-neutral-800 border border-neutral-700 rounded-xl resize-none text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-600"
                    placeholder="Describe your chat partner..."
                    value={chatPartner}
                    onChange={(e) => setChatPartner(e.target.value)}
                />
                <button
                    className="bg-neutral-800 px-6 py-3 text-lg font-semibold rounded-xl border border-neutral-700 hover:bg-neutral-700 transition disabled:cursor-not-allowed"
                    onClick={handleStartChat}
                    disabled={chatPartner.length <= 0}
                >
                    Start Chat
                </button>
            </div>

            {/* Prank Panel */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mt-4">
                <div className="flex-1 bg-neutral-900 p-4 rounded-xl border border-neutral-700 shadow-sm">
                    <div className="text-3xl h-1 mb-10 text-red-600">SCAM FRIEND</div>

                    <div className="text-md font-semibold mb-2">Provide Friend's Email</div>
                    <input
                        type="email"
                        className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-600"
                        placeholder="Your friend's email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="text-md font-semibold mb-2 mt-4 flex items-center justify-between">
                        <span>Provide short prank idea</span>
                        <button
                            className="bg-neutral-800 px-3 py-1 text-sm font-medium rounded-lg border border-neutral-700 hover:bg-neutral-700 transition"
                            onClick={handleGeneratePrank}
                        >
                            Generate random idea
                        </button>
                    </div>

                    <textarea
                        rows={3}
                        className="w-full p-4 bg-neutral-800 border border-neutral-700 rounded-lg resize-none text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-600"
                        placeholder="Describe the prank..."
                        value={prankDescription}
                        onChange={(e) => setPrankDescription(e.target.value)}
                    />

                    <button
                        className="bg-neutral-800 mt-4 px-6 py-3 text-lg font-semibold rounded-xl border border-neutral-700 hover:bg-neutral-700 transition disabled:cursor-not-allowed"
                        onClick={handleStartChat}
                        disabled={chatPartner.length <= 0}
                    >
                        SCAM Friend
                    </button>
                </div>
            </div>
        </div>
    );
};
