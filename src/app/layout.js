
import "./globals.css";
import Header from "@/components/header/Header";
import ConditionalFooter from "@/components/ConditionalFooter";
import { GuardadosProvider } from "@/context/GuardadosContext";
import { ConditionalLenis } from "@/components/ConditionalLenis";



export const metadata = {
  title: "line",
  description: "line models",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ConditionalLenis>
      <body
        className={`font-times antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning>
        <GuardadosProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <ConditionalFooter />
        </GuardadosProvider>
      </body>
      </ConditionalLenis>
    </html>
  );
}
