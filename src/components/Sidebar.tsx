"use client";

import Link from "next/link";
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

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <>
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <Link href="/" className="block">
                    <h1 className="font-serif text-3xl font-bold tracking-tight">
                        bp25.news
                    </h1>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1 leading-normal">
                        A single front page for everything that happened at Solana Breakpoint 2025.
                    </p>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4 px-2">
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
                                    className={cn(
                                        "block px-3 py-2 rounded-md font-mono text-sm transition-colors",
                                        isActive
                                            ? "bg-black text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                    )}
                                >
                                    {category}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex flex-col gap-4">
                    <p className="font-mono text-[10px] text-gray-400 text-center leading-relaxed">
                        An experiment to turn 199 Breakpoint videos into one readable page by <a href="https://x.com/0xsaurrabh" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">@0xSaurrabh</a> <span className="text-gray-300"></span>
                    </p>
                    <TweetButton
                        text={`199 @solana Breakpoint videos.\nOne finished front page.\n\n`}
                        url="bp25.news"
                        label="Share with friends"
                        className="w-full justify-center bg-black text-white rounded-md py-2 hover:bg-neutral-800 hover:text-white"
                        hashtags={[]}
                    />
                </div>
            </div>
        </>
    );
}
