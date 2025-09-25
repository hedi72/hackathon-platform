"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/src/components/layout/Navbar'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';
import { Github, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

const images = [
  '/images/signin-art.png',
];

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  const router = useRouter();

  // Désactiver le carousel avec une seule image
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || "Erreur lors de la création du compte.");
      } else {
        toast.success("Compte créé avec succès ! Connexion...");
        
        // Connexion automatique après inscription
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          toast.error("Erreur lors de la connexion automatique. Veuillez vous connecter manuellement.");
          router.replace('/auth/signin');
        } else {
          toast.success("Bienvenue !");
          router.replace('/dashboard');
        }
      }
    } catch (err) {
      toast.error("Erreur réseau ou serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignUp = async () => {
    setGithubLoading(true);
    try {
      await signIn('github', { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
    } catch (error) {
      toast.error('Failed to sign up with GitHub');
      setGithubLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center bg-gray-50">
        {/* Colonne carousel d'images */}
        <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">
          <AnimatePresence>
            <motion.img
              key={images[currentImage]}
              src={images[currentImage]}
              alt="Art"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>
        </div>
        
        {/* Colonne formulaire */}
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription>
                Join us to start building amazing projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGithubSignUp}
                disabled={githubLoading}
              >
                {githubLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                Continue with GitHub
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
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Mail className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/auth/signin"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
