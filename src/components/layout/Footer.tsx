'use client'

import Link from 'next/link'
import { Github, Twitter, Mail, Code, Heart, Linkedin, Instagram, Youtube, ArrowUp, Building2, Users, Trophy, Calendar } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800 overflow-hidden border-t border-blue-100">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
        {/* Main Content */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent" style={{color: '#4661ed', fontWeight: '800'}}>
                HackPlatform
              </span>
            </div>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              🚀 Empowering developers to build the future through innovative hackathons, collaborative projects, and groundbreaking funding opportunities.
            </p>
            
            {/* Stats alignées 2 colonnes, centrées */}
            {/* <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-10 max-w-md mx-auto">
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-extrabold text-blue-700">50K+</div>
                <div className="text-sm text-gray-500">Developers</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-2">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-extrabold text-green-700">1,200+</div>
                <div className="text-sm text-gray-500">Events</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-2">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-extrabold text-purple-700">$2M+</div>
                <div className="text-sm text-gray-500">Prizes</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg mb-2">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-extrabold text-orange-600">500+</div>
                <div className="text-sm text-gray-500">Organizations</div>
              </div>
            </div> */}

            {/* Social Links */}
            <div className="flex space-x-3 mt-4">
              {[
                { icon: Github, href: "#", label: "GitHub", color: "hover:bg-gray-700" },
                { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-blue-600" },
                { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
                { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
                { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" }
              ].map(({ icon: Icon, href, label, color }) => (
                <a 
                  key={label}
                  href={href} 
                  className={`group p-3 bg-white/70 rounded-xl border border-gray-200 transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${color}`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900 tracking-wide">
              Platform
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/events", label: "Browse Events", emoji: "🎯" },
                { href: "/projects", label: "Explore Projects", emoji: "💡" },
                { href: "/organization", label: "Organizations", emoji: "🏢" },
                { href: "/dashboard", label: "Dashboard", emoji: "📊" },
                { href: "/organize", label: "Host an Event", emoji: "🚀" }
              ].map(({ href, label, emoji }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="group flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="text-lg">{emoji}</span>
                    <span className="group-hover:text-blue-700 transition-colors font-medium">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900 tracking-wide">
              Support
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/help", label: "Help Center", emoji: "❓" },
                { href: "/contact", label: "Contact Us", emoji: "📧" },
                { href: "/privacy", label: "Privacy Policy", emoji: "🔒" },
                { href: "/terms", label: "Terms of Service", emoji: "📋" },
                { href: "/api", label: "API Docs", emoji: "⚡" }
              ].map(({ href, label, emoji }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="group flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="text-lg">{emoji}</span>
                    <span className="group-hover:text-green-700 transition-colors font-medium">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
  <div className="bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-2xl border border-blue-100 p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Stay in the Loop! 🚀</h3>
            <p className="text-gray-600 mb-6">Get notified about new hackathons, features, and opportunities.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email..."
                className="flex-1 px-4 py-3 bg-white border border-blue-100 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Subscribe ✨
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
  <div className="border-t border-blue-100 pt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-gray-500 text-sm">
              © 2025 HackPlatform. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-blue-700 transition-colors">Privacy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-blue-700 transition-colors">Terms</Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-blue-700 transition-colors">Cookies</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Code className="w-4 h-4 text-blue-600" />
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for developers</span>
            </div>
            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              className="group p-3 bg-white hover:bg-blue-100 rounded-full border border-blue-100 transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-blue-600 group-hover:text-blue-800 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}