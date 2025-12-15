// app/layout.tsx
import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import { TokenProvider } from "@/app/context/TokenContext";
import { Toaster } from "@/components/ui/toaster";
import { Outfit } from "next/font/google";

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
            {children}
            <Toaster/>
          </UserProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
