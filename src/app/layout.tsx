import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
// import SmoothScroll from "@/components/SmoothScroll";

const newsreader = Newsreader({
    subsets: ["latin"],
    variable: "--font-newsreader",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "BP25 News | Breakpoint 2025 Coverage",
    description: "Comprehensive editorial coverage of Solana Breakpoint 2025 - DeFi, Infrastructure, AI, Gaming, and more.",
    metadataBase: new URL('https://bp25.news'),
    openGraph: {
        title: 'BP25 News | Breakpoint 2025 Coverage',
        description: 'Comprehensive editorial coverage of Solana Breakpoint 2025 - DeFi, Infrastructure, AI, Gaming, and more.',
        url: 'https://bp25.news',
        siteName: 'BP25 News',
        images: [
            {
                url: '/og-image.png', // You can add a custom OG image to public/ folder
                width: 1200,
                height: 630,
                alt: 'BP25 News - Solana Breakpoint 2025 Coverage',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BP25 News | Breakpoint 2025 Coverage',
        description: 'Comprehensive editorial coverage of Solana Breakpoint 2025',
        images: ['/og-image.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${newsreader.variable} ${jetbrainsMono.variable} bg-background text-foreground flex flex-col lg:flex-row min-h-screen antialiased`}
            >
                {/* SmoothScroll removed to fix navigation issues */}
                {/* <SmoothScroll> */}

                {/* Mobile Header - Visible only on mobile */}
                <MobileHeader />

                {/* Sidebar - Fixed on desktop */}
                <aside className="w-[280px] fixed h-screen border-r border-gray-200 bg-[#FDFBF7] z-50 hidden lg:flex flex-col">
                    <Sidebar />
                </aside>

                {/* Main Content - Scrollable */}
                <main className="flex-1 lg:ml-[280px] min-h-screen">
                    {children}
                </main>
                {/* </SmoothScroll> */}
                <Analytics />
            </body>
        </html>
    );
}


