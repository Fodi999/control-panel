"use client"

import React, { useState, ChangeEvent, FormEvent } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Тип сообщения
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

// Dummy hook для имитации функционала чата
function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Имитируем ответ ассистента через 1 секунду
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "This is a simulated response.",
    }
    setMessages((prev) => [...prev, assistantMessage])
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  }
}

// Компонент шапки чата
function ChatHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Chat</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}

// Компонент для отображения списка сообщений
interface ChatMessageListProps {
  messages: Message[]
  isTyping: boolean
}

function ChatMessageList({ messages, isTyping }: ChatMessageListProps) {
  return (
    <ScrollArea className="flex-1 pr-4">
      {messages.map((m) => (
        <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
          <span
            className={`inline-block p-2 rounded-lg ${
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            {m.content}
          </span>
        </div>
      ))}
      {isTyping && (
        <div className="text-left">
          <span className="inline-block p-2 rounded-lg bg-muted">AI is typing...</span>
        </div>
      )}
    </ScrollArea>
  )
}

// Компонент формы ввода сообщения
interface ChatInputProps {
  input: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  disabled: boolean
}

function ChatInput({ input, onChange, onSubmit, disabled }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex space-x-2 mt-4">
      <Input value={input} onChange={onChange} placeholder="Type your message..." className="flex-grow" />
      <Button type="submit" disabled={disabled}>
        Send
      </Button>
    </form>
  )
}

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsTyping(true)
    await handleSubmit(e)
    setIsTyping(false)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ChatHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">Chat</h1>
          <div className="flex flex-col h-[calc(100vh-12rem)]">
            <ChatMessageList messages={messages} isTyping={isTyping} />
            <ChatInput input={input} onChange={handleInputChange} onSubmit={onSubmit} disabled={isTyping} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}




