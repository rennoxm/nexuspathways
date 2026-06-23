import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Nexus Pathways | Trusted Opportunities for African Youth",
  description:
    "Nexus Pathways matches skilled and unskilled African youth with trusted opportunities in scholarships, jobs, fellowships, grants, internships, and volunteering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme init runs before paint — prevents flash without going through React render */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function(){
              try {
                var t = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.add(t);
              } catch(e){}
            })()
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
