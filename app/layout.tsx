// app/layout.tsx
import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import { TokenProvider } from "@/app/context/TokenContext";
import { Toaster } from "@/components/ui/toaster";
import { Outfit } from "next/font/google";
import { AlertProvider } from "./context/AlertProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <TokenProvider>
          <UserProvider>
             <AlertProvider>
            {children}
            </AlertProvider>
            <Toaster/>
          </UserProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
