'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/data';

export default function HeroGrid({ items }: { items: Article[] }) {
    const hero = items[0];
    const subs = items.slice(1, 5);

    if (!hero) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[500px] lg:min-h-[600px]">

            {/* 1. MAIN HERO (Left Side) */}
            <Link
                href={`/article/${hero.id}`}
                className="lg:col-span-8 lg:row-span-2 relative group overflow-hidden rounded-xl bg-neutral-900 min-h-[400px] lg:min-h-0 block"
            >
                <Image
                    src={hero.homeImage}
                    alt={hero.headline}
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s]"
                    priority
                />
                {/* Stronger scrim for readability over complex images */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded text-white font-mono text-[10px] uppercase tracking-widest">
                            {hero.category}
                        </span>
                    </div>

                    {/* Typography Fix: max-w-4xl prevents eye strain on wide screens */}
                    <h1 className="text-white font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-4xl drop-shadow-lg" style={{ textWrap: 'balance' }}>
                        {hero.headline}
                    </h1>

                    <p className="text-gray-300 font-sans mt-4 text-lg line-clamp-2 max-w-2xl hidden md:block">
                        {hero.standfirst}
                    </p>
                </div>
            </Link>

            {/* 2. SUB GRID (Right Side - 2x2) */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 grid-rows-2 lg:grid-rows-2 gap-4">
                {subs.map((item) => (
                    <Link
                        key={item.id}
                        href={`/article/${item.id}`}
                        className="relative group overflow-hidden rounded-xl bg-neutral-900 min-h-[200px] block"
                    >
                        <Image
                            src={item.homeImage}
                            alt={item.headline}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-0 left-0 p-5 w-full bg-gradient-to-t from-black/90 to-transparent">
                            <span className="text-green-400 font-mono text-[9px] uppercase mb-1 block">{item.category}</span>
                            <h3 className="text-white font-serif text-lg leading-tight line-clamp-3 group-hover:underline decoration-1 underline-offset-4">
                                {item.headline}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

