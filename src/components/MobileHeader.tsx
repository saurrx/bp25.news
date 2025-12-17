"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import TweetButton from "@/components/TweetButton";

const categories = [
    "AI",
    "Consumer",
    "DeFi",
    "DePIN",
    "Devtool",
    "Gaming",
    "Infrastructure",
    "Institutional",
    "RWA",
];

export default function MobileHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="lg:hidden">
            {/* Mobile Header Bar */}
            <header className="sticky top-0 z-50 bg-[#FDFBF7] border-b border-gray-200 px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="block">
                        <h1 className="font-serif text-2xl font-bold tracking-tight">
                            bp25.news
                        </h1>
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-gray-500 mt-0.5 leading-normal">
                            Everything from Solana Breakpoint 2025
                        </p>
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 -mr-2"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={cn(
                                "h-0.5 w-6 bg-black transition-all duration-300",
                                isOpen && "rotate-45 translate-y-2"
                            )} />
                            <span className={cn(
                                "h-0.5 w-6 bg-black transition-all duration-300",
                                isOpen && "opacity-0"
                            )} />
                            <span className={cn(
                                "h-0.5 w-6 bg-black transition-all duration-300",
                                isOpen && "-rotate-45 -translate-y-2"
                            )} />
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div className={cn(
                "fixed inset-0 z-40 transition-all duration-300",
                isOpen ? "visible" : "invisible"
            )}>
                {/* Backdrop */}
                <div
                    className={cn(
                        "absolute inset-0 bg-black/30 transition-opacity duration-300",
                        isOpen ? "opacity-100" : "opacity-0"
                    )}
                    onClick={() => setIsOpen(false)}
                />

                {/* Drawer */}
                <nav className={cn(
                    "absolute top-[73px] left-0 right-0 bg-[#FDFBF7] border-b border-gray-200 shadow-lg transition-all duration-300 max-h-[calc(100vh-73px)] overflow-y-auto",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                )}>
                    <div className="p-4">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3 px-2">
                            Categories
                        </p>
                        <ul className="space-y-1">
                            {categories.map((category) => {
                                const href = `/${category.toLowerCase()}`;
                                const isActive = pathname === href;

                                return (
                                    <li key={category}>
                                        <Link
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "block px-3 py-3 rounded-md font-mono text-sm transition-colors",
                                                isActive
                                                    ? "bg-black text-white"
                                                    : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                                            )}
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Footer in Mobile Menu */}
                    <div className="p-4 border-t border-gray-200">
                        <p className="font-mono text-[10px] text-gray-400 text-center leading-relaxed mb-3">
                            An experiment to turn 199 Breakpoint videos into one readable page by{" "}
                            <a
                                href="https://x.com/0xsaurrabh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black transition-colors"
                            >
                                @0xSaurrabh
                            </a>
                        </p>
                        <TweetButton
                            text={`199 @solana Breakpoint videos.\nOne finished front page.\n\n`}
                            url="bp25.news"
                            label="Share with friends"
                            className="w-full justify-center bg-black text-white rounded-md py-2.5 hover:bg-neutral-800 hover:text-white"
                            hashtags={[]}
                        />
                    </div>
                </nav>
            </div>
        </div>
    );
}
