// app/layout.tsx
import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import { TokenProvider } from "@/app/context/TokenContext";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
