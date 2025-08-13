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

export default function ChatBox({ langData }) {
  const [position, setPosition] = React.useState("bottom");
  const [messages, setMessages] = React.useState([
    { sender: "Judy", text: langData.greetings },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    setInput("");
  };
  return (
    <div className="">
      <div className="max-w-7xl mx-4 lg:mx-auto my-10 bg-white/20 rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.5px] border border-white/30 p-10">
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/avatar/1.jpg"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-white text-lg">Judy Nguyen</p>
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

        <ScrollArea className="h-[600px]   rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.5px] border border-white/30 p-10 mb-4  ">
          <div className="flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-4 py-2 max-w-[70%] shadow-md ${
                  msg.sender === "You"
                    ? "bg-[#2cb320] text-white self-end rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-none"
                    : "bg-gray-300 text-black self-start rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-none"
                }`}
              >
                <span className="text-sm block">{msg.text}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="text-green-900 bg-green-200"
          />
          <Button
            onClick={handleSend}
            className="bg-green-900 text-white hover:bg-blue-400 hover:text-green-900"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
