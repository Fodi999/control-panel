// src/components/NavBar.tsx
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="flex gap-4 p-4">
      <Link href="/">Dashboard</Link>
      <Link href="/calendar">Calendar</Link>
      <Link href="/chat">Chat</Link>
      {/* Добавьте ссылки на другие страницы, если требуется */}
    </nav>
  )
}
