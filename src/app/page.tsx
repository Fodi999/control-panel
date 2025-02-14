"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (loggedIn === "true") {
      router.push("/dashbord")
    } else {
      router.push("/login")
    }
  }, [router])

  return null
}





