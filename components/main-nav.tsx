"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building, Home, LineChart, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import HederaWallet from "./hedera-wallet"

const mainNavItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Market",
    href: "/market",
    icon: LineChart,
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    icon: BarChart3,
  },
  {
    title: "Companies",
    href: "/companies",
    icon: Building,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex items-center space-x-4 lg:space-x-6 justify-center py-3">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <img src='/image.png' alt="Nairobi icons created by surang - Flaticon" height="64" width="64" className="ml-10" /> 
        <span className="hidden font-bold sm:inline-block">NBX</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}

