"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, CheckCheck } from "lucide-react";

interface Message {
  chat_id: string;
  sender: string;
  text: string;
  timestamp: number;
  read: boolean;
}

interface StatusMessage {
  type: "status";
  onlineUsers: string[];
}

interface ChatState {
  messages: Message[];
  onlineUsers: string[];
}

const wsSingleton = {
  instance: null as WebSocket | null,
  // Для админа оставляем уникальный clientId, но задаём имя отдельно:
  clientId: "admin_" + Math.random().toString(36).substr(2, 9),
  chatId: "support_chat",
};

export default function ChatPage() {
  // Задаём имя администратора вручную
  const adminName = "Admin";
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      if (wsSingleton.instance && wsSingleton.instance.readyState === WebSocket.OPEN) {
        setIsConnected(true);
        return;
      }

      // Передаём параметр username=Admin
      const wsUrl = `ws://go-robot-670748333372.us-central1.run.app/ws?client_id=${wsSingleton.clientId}&chat_id=${wsSingleton.chatId}&username=${encodeURIComponent(adminName)}`;

      const socket = new WebSocket(wsUrl);
      wsSingleton.instance = socket;

      socket.onopen = () => {
        console.log("WebSocket connected for Admin Chat");
        setIsConnected(true);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "status") {
          const statusData: StatusMessage = data;
          setOnlineUsers(statusData.onlineUsers.filter((user) => user !== wsSingleton.clientId));
        } else if (data.messages && data.onlineUsers) {
          const state: ChatState = data;
          setMessages(state.messages);
          setOnlineUsers(state.onlineUsers.filter((user) => user !== wsSingleton.clientId));
        } else {
          // Обычное сообщение – если поле read отсутствует, подставляем false.
          const message: Message = {
            ...data,
            read: data.read ?? false,
          };
          setMessages((prev) => [...prev, message]);
        }
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        setIsConnected(false);
      };

      socket.onclose = () => {
        console.log("WebSocket closed for Admin Chat");
        setIsConnected(false);
        setOnlineUsers([]);
        wsSingleton.instance = null;
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = window.setTimeout(connectWebSocket, 2000);
      };
    };

    connectWebSocket();

    return () => {
      if (wsSingleton.instance?.readyState === WebSocket.OPEN) {
        wsSingleton.instance.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [adminName]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !input.trim() ||
      !wsSingleton.instance ||
      wsSingleton.instance.readyState !== WebSocket.OPEN
    )
      return;

    const userMessage: Message = {
      chat_id: wsSingleton.chatId,
      // При отправке сообщения для админа, можно использовать adminName вместо clientId
      sender: adminName,
      text: input,
      timestamp: 0, // Сервер установит время
      read: false,
    };
    wsSingleton.instance.send(JSON.stringify(userMessage));
    setInput("");
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Admin Chat</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm font-medium">Online:</span>
            {onlineUsers.length > 0 ? (
              onlineUsers.map((user) => (
                <span
                  key={user}
                  className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full"
                >
                  {user}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">No users online</span>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">Admin Chat</h1>
          <div className="flex items-center mb-2">
            <span
              className={`h-2 w-2 rounded-full mr-2 ${isConnected ? "bg-green-500" : "bg-red-500"}`}
            ></span>
            <span>{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
          <div className="flex flex-col h-[calc(100vh-12rem)] border rounded-lg p-4">
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              {messages.map((m, index) => (
                <div
                  key={m.timestamp + "-" + index}
                  className={`mb-4 flex ${
                    m.sender === adminName ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      m.sender === adminName
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <div className="font-bold">{m.sender}</div>
                    <div>{m.text}</div>
                    <div className="flex items-center justify-end text-xs opacity-70">
                      <span>{formatTimestamp(m.timestamp)}</span>
                      {m.sender === adminName && (
                        <span className="ml-2 flex">
                          {m.read ? (
                            <>
                              <CheckCheck className="h-4 w-4 text-green-500 ml-1" />
                              <CheckCheck className="h-4 w-4 text-green-500 ml-1" />
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4 text-gray-500 ml-1" />
                              <Check className="h-4 w-4 text-gray-500 ml-1" />
                            </>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button type="submit" disabled={!isConnected}>
                Send
              </Button>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
