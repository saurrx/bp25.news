import { FullArticle } from '@/lib/data';

export default function ArticleHeader({ data }: { data: FullArticle }) {
    return (
        <header className="max-w-4xl">
            {/* Category & Type */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-2 py-1 bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest">
                    {data.tags.primary}
                </span>
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                    {data.meta.type}
                </span>
                <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-neutral-900 mb-8 tracking-tight text-balance">
                {data.editorial.headline}
            </h1>

            {/* Standfirst */}
            <p className="font-sans text-xl md:text-2xl text-neutral-500 leading-relaxed border-l-2 border-green-500 pl-6">
                {data.editorial.standfirst}
            </p>
        </header>
    );
}
