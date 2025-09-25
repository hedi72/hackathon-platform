"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/src/components/layout/Navbar'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

const images = [
  '/images/signin-art.png',
];
const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la création du compte.");
      } else {
        setSuccess("Compte créé avec succès ! Connexion...");
        setEmail("");
        setPassword("");
        // Connexion automatique
        await signIn('credentials', {
          redirect: true,
          email,
          password,
          callbackUrl: "/"
        });
      }
    } catch (err) {
      setError("Erreur réseau ou serveur.");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center bg-gray-50">
        {/* Colonne carousel d'images */}
        <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">
          <AnimatePresence >
            <motion.img
              key={images[currentImage]}
              src={images[currentImage]}
              alt="Art"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover absolute left-0 top-0"
            />
          </AnimatePresence>
        </div>
        {/* Colonne formulaire */}
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md p-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Button type="submit" className="w-full bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700" disabled={loading}>
                  {loading ? "Création..." : "S'inscrire"}
                </Button>
              </form>
              {error && <div className="text-red-500 mt-2">{error}</div>}
              {success && <div className="text-green-500 mt-2">{success}</div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
