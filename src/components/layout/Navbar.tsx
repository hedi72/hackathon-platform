'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar, Code, Home, LogOut, Settings, User, Menu, X, Building2, ChevronDown, Bell, Search, Mail, Plus, HelpCircle } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function Navbar() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true) // true pour simuler des notifications non lues

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
    // { name: 'Projects', href: '/projects', icon: Code },
    { name: 'Organizations', href: '/organization', icon: Building2 },
  ]

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const getDropdownItemClass = (href: string) => {
    const isActive = pathname === href
    return `rounded-lg ${isActive 
      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200' 
      : 'hover:bg-purple-50'}`
  }

  const getDropdownIconClass = (href: string) => {
    const isActive = pathname === href
    return `w-5 h-5 ${isActive ? 'text-blue-600' : 'text-purple-600'}`
  }

  const getDropdownTextClass = (href: string) => {
    const isActive = pathname === href
    return `font-medium ${isActive ? 'text-blue-700 font-semibold' : ''}`
  }

  return (
<nav className="sticky top-0  navbar-gradient backdrop-blur-md shadow-lg rounded-b-2xl border-b border-white/20 z-50">
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
                 <Select onValueChange={(value) => router.push(value)}>
      <SelectTrigger className="w-40 bg-transparent text-blue-600 font-semibold hover:shadow-xl">
        <SelectValue placeholder="Projects" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-lg rounded-lg">
        <SelectItem value="/projects">BUIDLs</SelectItem>
        <SelectItem value="/collections">Collections</SelectItem>
      </SelectContent>
    </Select>
              </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    {/* Navigation Icons */}
                    <div className="flex items-center space-x-3">
                      {/* Search Icon */}
                      <button className="group p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                        <Search className="w-5 h-5 text-white/80 group-hover:text-yellow-400 transition-colors" />
                      </button>
                      
                      {/* Mail Icon */}
                      <button className="group p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                        <Mail className="w-5 h-5 text-white/80 group-hover:text-yellow-400 transition-colors" />
                      </button>
                      
                      {/* Plus Icon with Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="group p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                          <Plus className="w-5 h-5 text-white/80 group-hover:text-yellow-400 transition-colors" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-xl p-2">
                          <DropdownMenuItem className="rounded-lg hover:bg-purple-50">
                            <div className="flex items-center gap-3 px-2 py-2">
                              <Code className="w-4 h-4 text-purple-600" />
                              <span>New Project</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg hover:bg-purple-50">
                            <div className="flex items-center gap-3 px-2 py-2">
                              <Calendar className="w-4 h-4 text-purple-600" />
                              <span>New Event</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg hover:bg-purple-50">
                            <div className="flex items-center gap-3 px-2 py-2">
                              <Building2 className="w-4 h-4 text-purple-600" />
                              <span>New Organization</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      {/* Help Icon with Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="group p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                          <HelpCircle className="w-5 h-5 text-white/80 group-hover:text-yellow-400 transition-colors" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-xl p-2">
                          <DropdownMenuItem className="rounded-lg hover:bg-purple-50">
                            <div className="flex items-center gap-3 px-2 py-2">
                              <span>Help Center</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg hover:bg-purple-50">
                            <div className="flex items-center gap-3 px-2 py-2">
                              <span>Documentation</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg hover:bg-purple-50">
                            <div className="flex items-center gap-3 px-2 py-2">
                              <span>Contact Support</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* Notifications */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="relative p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                        <Bell className="w-5 h-5 text-white/80 hover:text-yellow-400 transition-colors" />
                        
                        {/* Petit cercle rouge pour notifications non lues */}
                        {hasUnreadNotifications && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" style={{ backgroundColor: 'blue' }}></div>
                        )}
                      </DropdownMenuTrigger>
                      
                      <DropdownMenuContent align="end" className="w-96 bg-white shadow-2xl rounded-xl p-0 border">
                        {/* Header */}
                        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                              Mark all as read
                            </button>
                          </div>
                        </div>
                        
                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto" 
                             style={{ 
                               scrollbarWidth: 'thin', 
                               scrollbarColor: '#cbd5e1 #f1f5f9',
                               scrollBehavior: 'smooth'
                             }}>
                          {/* Notification Item 1 */}
                          <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-medium">🔥 Now ended</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  The AI Innovation Challenge – Code the future of artificial intelligence
                                </p>
                                <p className="text-xs text-blue-600 cursor-pointer hover:underline">View all participating projects</p>
                                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                              </div>
                            </div>
                          </div>

                          {/* Notification Item 2 */}
                          <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">🚀 Now live</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Blockchain Revolution: Build the next DeFi protocol
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-600">Prize pool: $5,000</span>
                                  <span className="text-blue-600 cursor-pointer hover:underline">Join now</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                              </div>
                            </div>
                          </div>

                          {/* Notification Item 3 */}
                          <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">🎯 Reminder</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Don't forget to submit your project for Web3 Hackathon
                                </p>
                                <p className="text-xs text-red-600">Deadline in 2 days</p>
                                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                              </div>
                            </div>
                          </div>

                          {/* Notification Item 4 */}
                          <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">⭐ Achievement</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Congratulations! You won 3rd place in Mobile App Challenge
                                </p>
                                <p className="text-xs text-green-600">Prize: $500 + Certificate</p>
                                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                              </div>
                            </div>
                          </div>

                          {/* Notification Item 5 */}
                          <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">👥 Team</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Sarah Johnson invited you to join "TechInnovators" team
                                </p>
                                <div className="flex gap-2 mt-2">
                                  <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Accept</button>
                                  <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">Decline</button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                              </div>
                            </div>
                          </div>

                          {/* Notification Item 6 */}
                          <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">📢 Announcement</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Platform update: New project collaboration features available
                                </p>
                                <p className="text-xs text-blue-600 cursor-pointer hover:underline">Learn more</p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                              </div>
                            </div>
                          </div>

                            {/* Notification Item 6 */}
                          <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">📢 Announcement</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Platform update: New project collaboration features available
                                </p>
                                <p className="text-xs text-blue-600 cursor-pointer hover:underline">Learn more</p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                              </div>
                            </div>
                          </div>  {/* Notification Item 6 */}
                          <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">📢 Announcement</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Platform update: New project collaboration features available
                                </p>
                                <p className="text-xs text-blue-600 cursor-pointer hover:underline">Learn more</p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                              </div>
                            </div>
                          </div>  {/* Notification Item 6 */}
                          <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">📢 Announcement</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Platform update: New project collaboration features available
                                </p>
                                <p className="text-xs text-blue-600 cursor-pointer hover:underline">Learn more</p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                              </div>
                            </div>
                          </div>  {/* Notification Item 6 */}
                          <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">📢 Announcement</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Platform update: New project collaboration features available
                                </p>
                                <p className="text-xs text-blue-600 cursor-pointer hover:underline">Learn more</p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                              </div>
                            </div>
                          </div>  {/* Notification Item 6 */}
                          <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">📢 Announcement</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Platform update: New project collaboration features available
                                </p>
                                <p className="text-xs text-blue-600 cursor-pointer hover:underline">Learn more</p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                              </div>
                            </div>
                          </div>  {/* Notification Item 6 */}
                          <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">📢 Announcement</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  Platform update: New project collaboration features available
                                </p>
                                <p className="text-xs text-blue-600 cursor-pointer hover:underline">Learn more</p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="p-3 border-t bg-gray-50 text-center">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View all notifications
                          </button>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center space-x-2 group bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-lg">
                        <Avatar className="w-9 h-9 cursor-pointer hover:ring-3 hover:ring-yellow-400/60 transition-all duration-500 hover:scale-105">
                          <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
                          <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-bold text-sm">
                            {user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white group-data-[state=open]:rotate-180 transition-all duration-500 transform group-data-[state=open]:text-yellow-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-white shadow-2xl rounded-xl p-2">
                        <DropdownMenuItem asChild className={getDropdownItemClass('/dashboard')}>
                          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2">
                            <Home className={getDropdownIconClass('/dashboard')} />
                            <span className={getDropdownTextClass('/dashboard')}>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className={getDropdownItemClass('/profile')}>
                          <Link href="/profile" className="flex items-center gap-3 px-3 py-2">
                            <User className={getDropdownIconClass('/profile')} />
                            <span className={getDropdownTextClass('/profile')}>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className={getDropdownItemClass('/settings')}>
                          <Link href="/settings" className="flex items-center gap-3 px-3 py-2">
                            <Settings className={getDropdownIconClass('/settings')} />
                            <span className={getDropdownTextClass('/settings')}>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className={getDropdownItemClass('/my-organization')}>
                          <Link href="/my-organization" className="flex items-center gap-3 px-3 py-2">
                            <Building2 className={getDropdownIconClass('/my-organization')} />
                            <span className={getDropdownTextClass('/my-organization')}>My Organization</span>
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
