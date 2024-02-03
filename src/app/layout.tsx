import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./_components/Navbar"

export const metadata: Metadata = {
  title: "Travel App",
  description: "Plan it, baby",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
