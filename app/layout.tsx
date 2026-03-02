import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AOSProvider } from "@/components/AOSProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { DonationProvider } from "@/components/providers/DonationProvider";
import I18nProvider from "@/components/providers/I18nProvider";
import { ThemeProvider } from "@/components/theme-provider";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rare Foundation | Serving Humanity",
  description: "Dedicated to providing education, healthcare, and basic needs support to the underprivileged in Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${poppins.variable} antialiased font-poppins`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DonationProvider>
            <I18nProvider>
              <AOSProvider>
                <ScrollProgress />
                <BackToTop />
                <WhatsAppButton />

                <Navbar />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer />
              </AOSProvider>
            </I18nProvider>
          </DonationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
