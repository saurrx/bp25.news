import { FullArticle } from '@/lib/data';
import Transcript from './Transcript';
import TweetButton from '@/components/TweetButton';

export default function VideoSidebar({ data }: { data: FullArticle }) {
    return (
        <div className="space-y-8">

            {/* 1. Video Player */}
            <div className="aspect-video w-full bg-black rounded-sm overflow-hidden shadow-lg border border-neutral-200">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${data.id}?rel=0&modestbranding=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>

            {/* Share Button & Transcript */}
            <div className="space-y-4">
                <div className="flex justify-end">
                    <TweetButton
                        text={data.editorial.headline}
                        url={`https://bp25.news/article/${data.id}`}
                        label="Share article"
                        hashtags={[]}
                        className="bg-neutral-100 hover:bg-neutral-200 px-3 py-2 rounded-md transition-colors w-full justify-center"
                    />
                </div>
                <Transcript text={data.raw_transcript} />
            </div>

            {/* 2. Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-neutral-200 py-6">
                <div>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase block mb-1">Speakers</span>
                    {data.meta.speakers.length > 0 ? (
                        data.meta.speakers.map((s: string) => (
                            <div key={s} className="font-sans text-sm font-medium">{s}</div>
                        ))
                    ) : (
                        <div className="font-sans text-sm text-neutral-400">—</div>
                    )}
                </div>
                <div>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase block mb-1">Product</span>
                    <div className="font-sans text-sm font-medium">{data.meta.product || '—'}</div>
                </div>
            </div>

            {/* 3. Enrichment / Sources */}
            {data.enrichment?.sources?.length > 0 && (
                <div className="bg-neutral-100 p-6 rounded-sm">
                    <h4 className="font-mono text-[10px] uppercase text-neutral-500 mb-4 tracking-widest">
                        External Context
                    </h4>
                    <div className="space-y-4">
                        {data.enrichment.sources.slice(0, 5).map((source, i: number) => (
                            <a
                                key={i}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <p className="font-serif text-sm text-neutral-800 leading-tight group-hover:underline decoration-1 underline-offset-2 mb-1">
                                    {source.title}
                                </p>
                                <span className="font-mono text-[9px] text-neutral-400 truncate block">
                                    {(() => {
                                        try {
                                            return new URL(source.url).hostname + ' ↗';
                                        } catch {
                                            return 'Source ↗';
                                        }
                                    })()}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* 4. Tags */}
            {data.tags.secondary.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {data.tags.secondary.map((tag: string) => (
                        <span key={tag} className="px-2 py-1 bg-neutral-100 font-mono text-[10px] text-neutral-500 rounded uppercase">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
