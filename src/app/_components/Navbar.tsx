"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

import { useAuth } from "@/app/_contexts/AuthContext"
import { Button } from "./Button"
import { useTheme } from "@/app/_contexts/ThemeContext"
import { logout } from "../services/login"
import toast from "react-hot-toast"

function Navbar() {
  const router = useRouter()
  const pathName = usePathname()
  const { setIsAuthenticated } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  async function handleLogout() {
    const res = await logout()

    if (res.ok) {
      setIsAuthenticated(false)
      localStorage.removeItem("jwt")
      setIsDropdownOpen(false)
      router.push("/")
      toast.success("Logout successful")
    } else {
      console.error("Logout failed")
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (pathName === "/") {
    return
  }

  const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    )
  }

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center mb-12">
      <div className="font-semibold text-xl">
        <Button text="TravelApp" onClick={() => router.push("/dashboard")} />
      </div>
      <div>
        <Button
          text="My Trips"
          onClick={() => router.push("/trips")}
          className="mr-2"
        />
        <div className="relative inline-block">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Account
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 z-10 mt-2 py-2 w-48 bg-white rounded-md shadow-xl"
            >
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </a>
              {/* <ThemeToggle /> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
