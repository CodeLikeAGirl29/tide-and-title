import "./globals.css";
import Link from "next/link";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";

const displaySerif = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-serif",
  weight: ["400", "500", "600"],
});

const bodySans = Inter({
  subsets: ["latin"],
  variable: "--font-body-sans",
});

const monoPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-plex",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Tide & Title — Field Notes",
  description: "Hyperlocal real estate insights for Okaloosa County.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${bodySans.variable} ${monoPlex.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <header className="bg-ink text-parchment">
          <div className="container mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <Link href="/" className="font-display text-xl tracking-tight">
              Tide &amp; Title
            </Link>
            <nav className="flex items-center gap-8 text-sm">
              <Link
                href="/studio"
                className="nav-link pb-1 transition-colors hover:text-buoy"
              >
                Studio Access
              </Link>
              <span className="hidden font-mono text-xs uppercase tracking-widest text-parchment/50 md:inline-block">
                30.3935&deg;N&nbsp;&nbsp;86.4958&deg;W
              </span>
            </nav>
          </div>
        </header>

        <div className="flex-grow">{children}</div>

        <footer className="mt-auto border-t border-parchment-line bg-parchment">
          <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Okaloosa County, FL
            </p>
            <p className="text-sm text-ink-soft">
              &copy; {new Date().getFullYear()} Tide &amp; Title. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
