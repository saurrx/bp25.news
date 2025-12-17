import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/data';

interface SectorHeroProps {
    article: Article;
}

export default function SectorHero({ article }: SectorHeroProps) {
    return (
        <section className="border-b border-neutral-200 pb-16 mb-16">
            <Link href={`/article/${article.id}`} className="group block cursor-pointer">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Side */}
                    <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100">
                        <Image
                            src={article.catImage || article.homeImage || '/placeholder.png'}
                            alt={article.headline}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col justify-center">
                        {/* Dynamic Badge */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-black text-white font-mono text-xs px-2 py-1 uppercase tracking-widest">
                                {article.score >= 9 ? "Sector Alpha" : "Trending Story"}
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-medium text-[#1a1a1a] mb-6 group-hover:underline decoration-2 underline-offset-4">
                            {article.headline}
                        </h2>
                        {/* Standfirst */}
                        <p className="font-sans text-lg md:text-xl text-neutral-600 leading-relaxed mb-6">
                            {article.standfirst}
                        </p>

                        {/* Tags */}
                        {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-100">
                                {article.tags.slice(0, 4).map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs font-mono tracking-wider text-neutral-400 bg-neutral-50 px-2 py-1 rounded"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </section >
    );
}

