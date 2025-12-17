"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ArticleNav() {
    return (
        <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-neutral-200 px-6 md:px-12 h-16 flex items-center justify-between">
            <Link
                href="/"
                className="group flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-black transition-colors"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Intel</span>
            </Link>
        </nav>
    );
}
