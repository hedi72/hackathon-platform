// app/layout.tsx
import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import { TokenProvider } from "@/app/context/TokenContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TokenProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
