'use client';
import { Article } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';

// Configuration for lazy loading
const INITIAL_LOAD = 12; // Show 12 articles initially
const LOAD_MORE = 8;     // Load 8 more each time

// Map ratio strings to Tailwind Aspect Ratio classes
const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
        case '3:4': return 'aspect-[3/4]';
        case '16:9': return 'aspect-video';
        case '1:1':
        default: return 'aspect-square';
    }
};

// Single article card component for reuse
function ArticleCard({ item, idx }: { item: Article; idx: number }) {
    // Every 7th card is a "Dark Mode" card for visual rhythm
    const isDarkCard = idx % 7 === 0 && idx !== 0;

    return (
        <div className="break-inside-avoid mb-6 group">
            <Link href={`/article/${item.id}`}>
                <div className={clsx(
                    "rounded-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer border",
                    isDarkCard
                        ? "bg-[#111] border-[#333]"
                        : "bg-white border-neutral-200"
                )}>
                    {/* Image Container */}
                    <div className={clsx(
                        "relative w-full overflow-hidden border-b",
                        isDarkCard ? "bg-neutral-900 border-[#333]" : "bg-neutral-100 border-neutral-100",
                        getAspectRatioClass(item.catRatio)
                    )}>
                        <Image
                            src={item.catImage || item.homeImage}
                            alt={item.headline}
                            fill
                            loading="lazy"
                            className={clsx(
                                "object-cover transition-all duration-700 group-hover:scale-105",
                                isDarkCard ? "opacity-80 group-hover:opacity-100" : ""
                            )}
                            sizes="(max-width: 768px) 100vw, 25vw"
                        />
                    </div>

                    {/* Content - Paper Card with padding */}
                    <div className="p-5 flex flex-col gap-3">
                        {/* Category Badge */}
                        <div className="flex justify-between items-start">
                            <span className={clsx(
                                "font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-widest border",
                                isDarkCard
                                    ? "border-neutral-600 text-neutral-400"
                                    : "border-neutral-300 text-neutral-500"
                            )}>
                                {item.category}
                            </span>
                            {item.score >= 7 && (
                                <span className={clsx(
                                    "font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-widest",
                                    isDarkCard
                                        ? "bg-green-900/50 text-green-400 border border-green-700"
                                        : "bg-green-50 text-green-700 border border-green-200"
                                )}>
                                    ★ Feature
                                </span>
                            )}
                        </div>

                        {/* Headline - Heavier weight for contrast */}
                        <h3 className={clsx(
                            "font-serif text-lg leading-[1.35] font-medium group-hover:underline decoration-1 underline-offset-4",
                            isDarkCard ? "text-white" : "text-neutral-900"
                        )}>
                            {item.headline}
                        </h3>

                        {/* Tags - Metadata footer */}
                        {item.tags.length > 0 && (
                            <div className={clsx(
                                "pt-3 mt-auto border-t flex flex-wrap gap-2",
                                isDarkCard ? "border-[#333]" : "border-neutral-100"
                            )}>
                                {item.tags.slice(0, 2).map(tag => (
                                    <span
                                        key={tag}
                                        className={clsx(
                                            "text-[10px] font-mono tracking-wider",
                                            isDarkCard ? "text-neutral-500" : "text-neutral-400"
                                        )}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

// Loading skeleton for smooth UX
function LoadingSkeleton() {
    return (
        <div className="w-full flex justify-center py-8">
            <div className="flex items-center gap-3 text-neutral-400">
                <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                <span className="font-mono text-xs uppercase tracking-widest">Loading more...</span>
            </div>
        </div>
    );
}

export default function MasonryFeed({ items }: { items: Article[] }) {
    const [displayCount, setDisplayCount] = useState(INITIAL_LOAD);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    const hasMore = displayCount < items.length;
    const visibleItems = items.slice(0, displayCount);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const currentRef = loaderRef.current;
        if (!currentRef || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setIsLoading(true);
                    setTimeout(() => {
                        setDisplayCount(prev => Math.min(prev + LOAD_MORE, items.length));
                        setIsLoading(false);
                    }, 300);
                }
            },
            {
                rootMargin: '200px', // Start loading before user reaches the end
                threshold: 0.1
            }
        );

        observer.observe(currentRef);

        return () => observer.disconnect();
    }, [hasMore, isLoading, items.length]);

    return (
        <div className="w-full">
            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
                {visibleItems.map((item, idx) => (
                    <ArticleCard key={item.id} item={item} idx={idx} />
                ))}
            </div>

            {/* Scroll sentinel & loading indicator */}
            <div ref={loaderRef} className="w-full min-h-[1px]">
                {isLoading && <LoadingSkeleton />}
            </div>

            {/* End of feed indicator */}
            {!hasMore && items.length > INITIAL_LOAD && (
                <div className="w-full flex justify-center py-12">
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                        — End of Feed —
                    </span>
                </div>
            )}
        </div>
    );
}
