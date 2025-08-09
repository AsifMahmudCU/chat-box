"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CiMenuKebab } from "react-icons/ci";
export default function Chatbox() {
  const [position, setPosition] = React.useState("bottom");
  const [messages, setMessages] = React.useState([
    { sender: "Judy", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-4 lg:mx-auto my-10 border rounded-lg shadow-md p-4 glass-card">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/avatar/1.jpg"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-lg">Judy Nguyen</p>
              <span className="text-green-600 text-sm">Online</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <CiMenuKebab />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Chat Area */}
        <ScrollArea className="h-[600px] p-3 border border-gray-300 rounded-md mb-4  ">
          <div className="flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[70%] ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-300 text-black self-start"
                }`}
              >
                <span className="text-sm block">{msg.text}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}
