'use client';
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/data";
import clsx from "clsx";
import { motion } from "framer-motion";

// Map ratio strings to Tailwind Aspect Ratio classes
const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
        case '3:4': return 'aspect-[3/4]';
        case '16:9': return 'aspect-video';
        case '1:1':
        default: return 'aspect-square';
    }
};

interface CategoryFeedProps {
    articles: Article[];
    categoryName: string;
}

export default function CategoryFeed({ articles, categoryName }: CategoryFeedProps) {
    return (
        <div className="max-w-[1600px] mx-auto p-6 md:p-12">
            {/* Header */}
            <header className="mb-16 border-b border-gray-200 pb-8">
                <h1 className="font-serif text-5xl md:text-6xl">{categoryName}</h1>
                <p className="font-mono text-gray-500 mt-4">
                    {articles.length} {articles.length === 1 ? "Story" : "Stories"}
                </p>
            </header>

            {/* Masonry Grid with Visual Rhythm */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {articles.map((article, idx) => {
                    // Every 7th card is dark for visual rhythm
                    const isDarkCard = idx % 7 === 0 && idx !== 0;

                    return (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                            className="break-inside-avoid mb-6 group"
                        >
                            <Link href={`/article/${article.id}`}>
                                <div className={clsx(
                                    "rounded-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer border",
                                    isDarkCard
                                        ? "bg-[#111] border-[#333]"
                                        : "bg-white border-neutral-200"
                                )}>
                                    {/* Image */}
                                    <div className={clsx(
                                        "relative w-full overflow-hidden border-b",
                                        isDarkCard ? "bg-neutral-900 border-[#333]" : "bg-neutral-100 border-neutral-100",
                                        getAspectRatioClass(article.catRatio)
                                    )}>
                                        <Image
                                            src={article.catImage || article.homeImage || '/placeholder.png'}
                                            alt={article.headline}
                                            fill
                                            className={clsx(
                                                "object-cover transition-all duration-700 group-hover:scale-105",
                                                isDarkCard ? "opacity-80 group-hover:opacity-100" : ""
                                            )}
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex flex-col gap-2">
                                        {/* Score badge */}
                                        {article.score >= 7 && (
                                            <span className={clsx(
                                                "inline-block w-fit font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-widest",
                                                isDarkCard
                                                    ? "bg-green-900/50 text-green-400 border border-green-700"
                                                    : "bg-green-50 text-green-700 border border-green-200"
                                            )}>
                                                ★ Feature
                                            </span>
                                        )}

                                        <h2 className={clsx(
                                            "font-serif text-lg leading-snug font-medium group-hover:underline decoration-1 underline-offset-4",
                                            isDarkCard ? "text-white" : "text-neutral-900"
                                        )}>
                                            {article.headline}
                                        </h2>

                                        <p className={clsx(
                                            "font-sans text-sm mt-1 line-clamp-2",
                                            isDarkCard ? "text-neutral-400" : "text-gray-500"
                                        )}>
                                            {article.standfirst}
                                        </p>

                                        {/* Tags */}
                                        {article.tags.length > 0 && (
                                            <div className={clsx(
                                                "flex flex-wrap gap-2 mt-2 pt-2 border-t",
                                                isDarkCard ? "border-[#333]" : "border-neutral-100"
                                            )}>
                                                {article.tags.slice(0, 2).map(tag => (
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
                        </motion.article>
                    );
                })}
            </div>
        </div>
    );
}
