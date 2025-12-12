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
import { Calendar, Code, Home, LogOut, Settings, User, Menu, Building2, ChevronDown, Bell, Search, Mail, Plus, HelpCircle, BookOpen, Users as UsersIcon, MessageSquare, Check, Loader2 } from 'lucide-react'
// Import X séparément pour éviter le conflit
import { X } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ButtonUI from '../ui/button'
import { useNotifications } from '@/src/hooks/useNotifications'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { NotificationItem, NotificationType } from '@/src/api/notifications/getNotifications'

export function Navbar() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [processingNotifications, setProcessingNotifications] = useState<Set<string>>(new Set());
  
  const {
    notifications,
    loading,
    error,
    page,
    total,
    nextPage,
    prevPage,
    markAsRead,
    markAllAsRead,
    acceptTeamInvite,
    declineTeamInvite,
    hasUnreadNotifications,
    refresh,
  } = useNotifications(1, 10);

  useEffect(() => {
    console.log('User authentication status:', isAuthenticated)
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const navLinks = [
    { name: 'Hackathons', href: '/hackathons', icon: Code },
    { name: 'Learn', href: '/learn', icon: BookOpen },
    { name: 'Community', href: '/community', icon: UsersIcon },
    { name: 'Blog', href: '/blog', icon: MessageSquare },
  ]

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const getDropdownItemClass = (href: string) => {
    const isActive = pathname === href
    return `rounded-lg ${isActive 
      ? 'bg-gradient-to-r from-primary-50 to-indigo-50 border border-primary-200' 
      : 'hover:bg-purple-50'}`
  }

  const getDropdownIconClass = (href: string) => {
    const isActive = pathname === href
    return `w-5 h-5 ${isActive ? 'text-primary-600' : 'text-purple-600'}`
  }

  const getDropdownTextClass = (href: string) => {
    const isActive = pathname === href
    return `font-medium ${isActive ? 'text-primary-700 font-semibold' : ''}`
  }

  const getNavLinkClass = (href: string) => {
    const isActive = pathname === href
    return `group flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
      isActive 
        ? 'text-black bg-white/20 ' 
        : 'text-gray-500'
    }`
  }

  const handleAcceptInvite = async (notificationId: string, teamId?: string, hackathonId?: string) => {
    if (!teamId || !hackathonId) return;
    
    setProcessingNotifications(prev => {
      const newSet = new Set(prev);
      newSet.add(notificationId);
      return newSet;
    });
    
    try {
      // Le hook attend hackathonId, teamId, invitationId (notificationId)
      await acceptTeamInvite(hackathonId, teamId, notificationId);
      // Rafraîchir les notifications après acceptation
      setTimeout(() => {
        refresh();
      }, 500);
    } catch (error) {
      console.error('Failed to accept invite:', error);
    } finally {
      setProcessingNotifications(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  const handleDeclineInvite = async (notificationId: string, teamId?: string, hackathonId?: string) => {
    if (!teamId || !hackathonId) return;
    
    setProcessingNotifications(prev => {
      const newSet = new Set(prev);
      newSet.add(notificationId);
      return newSet;
    });
    
    try {
      // Le hook attend hackathonId, teamId, invitationId (notificationId)
      await declineTeamInvite(hackathonId, teamId, notificationId);
      // Rafraîchir les notifications après refus
      setTimeout(() => {
        refresh();
      }, 500);
    } catch (error) {
      console.error('Failed to decline invite:', error);
    } finally {
      setProcessingNotifications(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'TEAM_INVITE':
      case 'TEAM_JOIN_REQUEST':
        return <UsersIcon className="w-5 h-5 text-primary-500" />;
      case 'SYSTEM':
        return <Bell className="w-5 h-5 text-gray-500" />;
      case 'MESSAGE':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-purple-500" />;
    }
  };

  const getNotificationTitle = (type: NotificationType) => {
    switch (type) {
      case 'TEAM_INVITE':
        return 'Team Invitation';
      case 'TEAM_JOIN_REQUEST':
        return 'Team Join Request';
      case 'MESSAGE':
        return 'New Message';
      case 'SYSTEM':
        return 'System Notification';
      default:
        return 'Notification';
    }
  };

  const renderNotificationContent = (notification: NotificationItem) => {
    const isTeamInvite = notification.type === 'TEAM_INVITE';
    const isUnread = !notification.isRead;
    const isProcessing = processingNotifications.has(notification.id);
    
    // Extraire les IDs depuis le payload
    const teamId = notification.payload?.teamId;
    const hackathonId = notification.payload?.hackathonId;

    return (
      <div className={cn(
        "p-3 border-b last:border-b-0 transition-colors",
        isUnread ? "bg-primary-50" : "bg-white"
      )}>
        <div className="flex items-start gap-3">
          <div className="mt-1">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 mb-1">
              {getNotificationTitle(notification.type)}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              {notification.content}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </span>
              {isUnread && !isProcessing && (
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
              )}
            </div>
            
            {isTeamInvite && teamId && hackathonId && (
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAcceptInvite(notification.id, teamId, hackathonId);
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                  ) : (
                    <Check className="w-3 h-3 mr-1" />
                  )}
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 border-red-200 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeclineInvite(notification.id, teamId, hackathonId);
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                  ) : (
                    <X className="w-3 h-3 mr-1" />
                  )}
                  Decline
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 navbar-gradient backdrop-blur-md border-b-2 border-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <img src='/images/logo-small.png'/>
            </div>
            <span className="text-white text-xl font-extrabold tracking-wide">
              
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center space-x-1 px-4 py-2 bg-white/10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={getNavLinkClass(link.href)}
                    >
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    {/* Notifications */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="relative p-2 bg-primary-500 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                        <Bell className="w-5 h-5 text-white/80 hover:text-yellow-400 transition-colors" />
                        
                        {hasUnreadNotifications && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>
                        )}
                      </DropdownMenuTrigger>
                      
                      <DropdownMenuContent align="end" className="w-96 bg-white shadow-2xl rounded-xl p-0 border">
                        <div className="p-4 border-b bg-gradient-to-r from-primary-50 to-indigo-50">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
                            {hasUnreadNotifications && (
                              <button 
                                onClick={markAllAsRead}
                                className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                              >
                                Mark all as read
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto">
                          {loading ? (
                            <div className="p-8 text-center">
                              <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">Loading notifications...</p>
                            </div>
                          ) : error ? (
                            <div className="p-4 text-center">
                              <p className="text-sm text-red-500">Error loading notifications</p>
                              <button 
                                onClick={() => refresh()}
                                className="mt-2 text-sm text-primary-600 hover:text-primary-800"
                              >
                                Retry
                              </button>
                            </div>
                          ) : notifications.length === 0 ? (
                            <div className="p-8 text-center">
                              <Bell className="w-12 h-12 mx-auto text-gray-300" />
                              <p className="mt-2 text-sm text-gray-500">No notifications yet</p>
                            </div>
                          ) : (
                            <div>
                              {notifications.map((notification) => (
                                <div 
                                  key={notification.id}
                                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                  {renderNotificationContent(notification)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {notifications.length > 0 && (
                          <div className="p-3 border-t bg-gray-50 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              Showing {notifications.length} of {total}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={prevPage}
                                disabled={page <= 1}
                                className="text-sm text-primary-600 hover:text-primary-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                              >
                                Previous
                              </button>
                              <span className="text-sm text-gray-500">|</span>
                              <button
                                onClick={nextPage}
                                disabled={notifications.length < 10}
                                className="text-sm text-primary-600 hover:text-primary-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Dropdown */}
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
                      <Button className=" text-black font-semibold bg-transparent">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                     <ButtonUI size="md" variant="primary" withShadow>
                        Sign Up
                      </ButtonUI>
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

                {/* Mobile Notifications Section */}
                {isAuthenticated && notifications.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-white/30">
                    <h4 className="px-4 py-2 text-white font-semibold mb-2">Notifications</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => {
                        const isProcessing = processingNotifications.has(notification.id);
                        const isTeamInvite = notification.type === 'TEAM_INVITE';
                        const teamId = notification.payload?.teamId;
                        const hackathonId = notification.payload?.hackathonId;
                        
                        return (
                          <div
                            key={notification.id}
                            className="px-4 py-3 bg-white/10 rounded-lg"
                          >
                            <div className="flex items-start gap-2">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">
                                  {getNotificationTitle(notification.type)}
                                </p>
                                <p className="text-xs text-gray-200">{notification.content}</p>
                                {isTeamInvite && teamId && hackathonId && (
                                  <div className="mt-2 flex gap-2">
                                    <Button
                                      size="sm"
                                      className="bg-green-500 hover:bg-green-600 text-white text-xs"
                                      onClick={() => handleAcceptInvite(notification.id, teamId, hackathonId)}
                                      disabled={isProcessing}
                                    >
                                      {isProcessing ? (
                                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                      ) : (
                                        <Check className="w-3 h-3 mr-1" />
                                      )}
                                      Accept
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-500 border-red-200 hover:bg-red-50 text-xs"
                                      onClick={() => handleDeclineInvite(notification.id, teamId, hackathonId)}
                                      disabled={isProcessing}
                                    >
                                      {isProcessing ? (
                                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                      ) : (
                                        <X className="w-3 h-3 mr-1" />
                                      )}
                                      Decline
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Link
                      href="/notifications"
                      onClick={closeMobileMenu}
                      className="block mt-3 px-4 py-2 text-center text-sm text-yellow-400 hover:text-yellow-300"
                    >
                      View all notifications
                    </Link>
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="pt-4 mt-4 border-t border-white/30 space-y-3">
                    <Link href="/auth/signin" onClick={closeMobileMenu}>
                      <Button className=" text-black font-semibold bg-transparent">
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