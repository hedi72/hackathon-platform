'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Github, Mail, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Navbar } from '@/src/components/layout/Navbar'

const images = [
  "/images/signin-art.png",
]

export default function SignInPage() {
  const [githubLoading, setGithubLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [index, setIndex] = useState(0)
  
  const isGithubEnabled = process.env.NEXT_PUBLIC_GITHUB_ENABLED === 'true'

  const router = useRouter()

  // rotation auto toutes les 4s - désactivée avec une seule image
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid credentials. Please try again.')
      } else {
        toast.success('Welcome back!')
        // Use replace for faster redirection without history entry
        router.replace('/dashboard')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    // Vérifier si GitHub est configuré
    if (!isGithubEnabled) {
      toast.error('GitHub authentication is not configured. Please contact the administrator or use email/password.')
      return
    }
    
    setGithubLoading(true)
    try {
      const result = await signIn('github', { 
        callbackUrl: '/dashboard',
        redirect: false // Change to false to handle errors properly
      })
      
      if (result?.error) {
        console.error('GitHub signin error:', result.error)
        if (result.error === 'OAuthCallback') {
          toast.error('GitHub authentication failed. Please check your configuration or try again.')
        } else if (result.error === 'AccessDenied') {
          toast.error('Access denied. Please make sure your email is public on GitHub.')
        } else {
          toast.error('Failed to sign in with GitHub. Please try again or use email/password.')
        }
      } else if (result?.ok) {
        toast.success('Welcome! Redirecting to dashboard...')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('GitHub signin error:', error)
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setGithubLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center bg-gray-50">
        {/* Colonne avec carrousel */}
        <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden ">
          <AnimatePresence>
            <motion.img
              key={index}
              src={images[index]}
              alt={`Carousel ${index}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
          {/* Overlay dégradé */}
          {/* <div className="absolute inset-0 "  /> */}
        </div>

        {/* Colonne formulaire */}
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account to continue building amazing projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className={`w-full ${!isGithubEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleGithubSignIn}
                disabled={githubLoading || !isGithubEnabled}
                title={!isGithubEnabled ? 'GitHub authentication not configured' : 'Sign in with GitHub'}
              >
                {githubLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                {!isGithubEnabled ? 'GitHub (Not Configured)' : 'Continue with GitHub'}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Mail className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
