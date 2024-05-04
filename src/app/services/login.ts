export async function loginUser(
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) {
  const response = await fetch("http://localhost:3001/users/sign_in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
    credentials: "include",
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(
      responseData.errors
        ? responseData.errors[0]
        : "An unknown error occurred."
    )
  }

  localStorage.setItem("jwt", responseData.jwt)

  return responseData
}

export async function logout() {
  const res = await fetch("http://localhost:3001/users/sign_out", {
    method: "DELETE",
    credentials: "include",
  })

  return res
}
