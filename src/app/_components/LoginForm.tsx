function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
      <form className="space-y-4">
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="••••••••"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}

export default LoginForm
