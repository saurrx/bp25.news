import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { FullArticle } from '@/lib/data';

export default function ArticleContent({ data }: { data: FullArticle }) {
    return (
        <article>
            {/* Key Takeaways - The "Executive Summary" Box */}
            {data.editorial.key_takeaways.length > 0 && (
                <div className="bg-white border border-neutral-200 p-8 rounded-sm mb-12 shadow-sm">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6">
                        /// Executive Intelligence
                    </h3>
                    <ul className="space-y-4">
                        {data.editorial.key_takeaways.map((point: string, i: number) => (
                            <li key={i} className="flex gap-4 items-start">
                                <span className="font-mono text-green-600 text-sm mt-1">0{i + 1}</span>
                                <div className="font-serif text-lg leading-snug text-neutral-800 [&>p]:m-0">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{point}</ReactMarkdown>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Main Analysis - Beautiful Typography */}
            {data.editorial.article_body_markdown && (
                <div className="prose prose-lg prose-neutral max-w-none 
                    prose-headings:font-serif prose-headings:font-normal 
                    prose-p:font-serif prose-p:text-neutral-700 prose-p:leading-loose
                    prose-strong:font-sans prose-strong:font-bold prose-strong:text-black
                    prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline
                    prose-ul:font-serif prose-li:text-neutral-700">

                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.editorial.article_body_markdown}</ReactMarkdown>
                </div>
            )}

            {/* Impact Analysis */}
            {data.tags.impact_reason && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
                        Why This Matters
                    </h4>
                    <p className="font-sans text-lg text-neutral-900 italic">
                        {data.tags.impact_reason}
                    </p>
                </div>
            )}
        </article>
    );
}
