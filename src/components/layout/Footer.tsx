'use client'

import Link from 'next/link'
import { Github, Twitter, Mail, Code, Heart, Linkedin, Instagram, Youtube, ArrowUp, Building2, Users, Trophy, Calendar } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
     <footer className="w-full bg-[#F4F1EE] border-t border-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand + Description */}
          <div>
            {/* Logo */}
            <div className="mb-4">
              <img src="/logo-hacks.svg" alt="Hacks Logo" className="h-8" />
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Empowering the next generation of Web3 builders through education,  
              hackathons, and community.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              <div className="p-2 rounded-lg border border-black/40 hover:bg-black hover:text-white transition cursor-pointer">
                🐦
              </div>
              <div className="p-2 rounded-lg border border-black/40 hover:bg-black hover:text-white transition cursor-pointer">
                🧑‍💻
              </div>
              <div className="p-2 rounded-lg border border-black/40 hover:bg-black hover:text-white transition cursor-pointer">
                💼
              </div>
              <div className="p-2 rounded-lg border border-black/40 hover:bg-black hover:text-white transition cursor-pointer">
                📷
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Hackathons</li>
              <li>Courses</li>
              <li>Certifications</li>
              <li>BUILDLs</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Documentation</li>
              <li>Blog</li>
              <li>Community</li>
              <li>Support</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>About</li>
              <li>Careers</li>
              <li>Partners</li>
              <li>Press</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Cookies</li>
              <li>Licenses</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-400 my-10"></div>

        {/* Bottom section */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2025 HederaHub. All rights reserved.
          </p>

          <div className="flex items-center text-sm text-gray-700">
            Built with <span className="mx-1">🍊</span> by the community
          </div>
        </div>
      </div>
    </footer>
  )
}