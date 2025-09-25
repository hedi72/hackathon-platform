'use client'

import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar, Code, Home, LogOut, Settings, User, Menu, X } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Projects', href: '/projects', icon: Code },
  ]

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
<nav className="sticky top-0  navbar-gradient backdrop-blur-md shadow-lg rounded-b-2xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-purple-600 font-bold text-lg">H</span>
            </div>
            <span className="text-white text-xl font-extrabold tracking-wide">
              HackPlatform
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
            <div style={{ paddingLeft: '50px', paddingRight: '50px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '16px', boxShadow: '0 4px 30px rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
              <div className="flex items-center space-x-6 z-10 rounded-b-2xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center px-4 py-2 rounded-xl bg-transparent text-blue-600 font-semibold  hover:shadow-xl menuButton"
                  >
                    {/* <link.icon className="w-5 h-5" /> */}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button className="bg-yellow-400 text-purple-700 hover:bg-yellow-500 hover:text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                        Dashboard
                      </Button>
                    </Link>

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar className="w-10 h-10 cursor-pointer hover:ring-4 hover:ring-yellow-400/50 transition-all duration-300">
                          <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
                          <AvatarFallback className="bg-yellow-400 text-purple-600 font-bold">
                            {user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-white shadow-2xl rounded-xl p-2">
                        <DropdownMenuItem asChild className="rounded-lg hover:bg-purple-50">
                          <Link href="/profile" className="flex items-center gap-3 px-3 py-2">
                            <User className="w-5 h-5 text-purple-600" />
                            <span className="font-medium">Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-lg hover:bg-purple-50">
                          <Link href="/settings" className="flex items-center gap-3 px-3 py-2">
                            <Settings className="w-5 h-5 text-purple-600" />
                            <span className="font-medium">Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => signOut()}
                          className="rounded-lg hover:bg-red-50 text-red-600"
                        >
                          <div className="flex items-center gap-3 px-3 py-2">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign out</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/auth/signin">
                      <Button className="bg-blue-600 text-white font-semibold shadow-md hover:bg-blue btn-signin">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="bg-white text-purple-700 font-semibold shadow-md hover:bg-yellow-500 hover:text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-3 mb-4 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="py-6 px-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:translate-x-2"
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                ))}

                {!isAuthenticated && (
                  <div className="pt-4 mt-4 border-t border-white/30 space-y-3">
                    <Link href="/auth/signin" onClick={closeMobileMenu}>
                      <Button className="w-full bg-purple-600 text-white font-semibold hover:bg-purple-700">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={closeMobileMenu}>
                      <Button className="w-full bg-yellow-400 text-purple-700 font-semibold hover:bg-yellow-500 hover:text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
