import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/data';
import clsx from 'clsx';

interface MarketMoversProps {
    items: Article[];
}

export default function MarketMovers({ items }: MarketMoversProps) {
    if (items.length === 0) return null;

    return (
        <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    Market Movers
                </h3>
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="font-mono text-xs text-neutral-400">
                    {items.length} Stories
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((article, idx) => (
                    <article
                        key={article.id}
                        className="group"
                    >
                        <Link href={`/article/${article.id}`} className="block cursor-pointer">
                            <div className="bg-white border border-neutral-200 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                                    <Image
                                        src={article.catImage || article.homeImage || '/placeholder.png'}
                                        alt={article.headline}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    {/* Rank Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className={clsx(
                                            "font-mono text-[10px] px-2 py-1 rounded uppercase tracking-widest",
                                            article.score >= 8
                                                ? "bg-green-500 text-white"
                                                : "bg-black/70 text-white"
                                        )}>
                                            #{idx + 2}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    {/* Score indicator */}


                                    <h4 className="font-serif text-lg leading-snug font-medium text-neutral-900 group-hover:underline decoration-1 underline-offset-4">
                                        {article.headline}
                                    </h4>

                                    <p className="font-sans text-sm text-gray-500 mt-2 line-clamp-2">
                                        {article.standfirst}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

