import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/_contexts/AuthContext"
import { Button } from "./Button"
import toast, { Toaster } from "react-hot-toast"

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter()
  const { setIsAuthenticated } = useAuth()

  async function loginUser(
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ) {
    const response = await fetch("http://localhost:3001/users/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } }),
      credentials: "include",
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.errors[0])
    }

    return response.json()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      await loginUser(email, password)
      setIsAuthenticated(true)
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed", error)
      toast.error(`Login failed: ${(error as Error).message}`)
    }
  }

  return (
    <div className="p-8 bg-white dark:bg-slate-400 shadow-md rounded-lg">
      <Toaster />
      <h2 className="mb-6 text-center text-2xl font-bold dark:text-gray-700">
        Login
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="••••••••"
          />
        </div>
        <div className="text-center">
          <Button text="Sign In" type="submit" />
        </div>
      </form>
      <div className="mt-4 text-center">
        Don&apos;t have an account?
        <Button text="Sign Up" onClick={onSwitch} />
      </div>
    </div>
  )
}

export default LoginForm
