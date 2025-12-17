import { getNewsroom, getArticleById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleNav from '@/components/article/ArticleNav';
import ArticleHeader from '@/components/article/ArticleHeader';
import VideoSidebar from '@/components/article/VideoSidebar';
import ArticleContent from '@/components/article/ArticleContent';

// Generate Static Params for SSG
export function generateStaticParams() {
    const { all } = getNewsroom();
    return all.map((article) => ({ id: article.id }));
}

interface ArticlePageProps {
    params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { id } = await params;
    const data = getArticleById(id);

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#111]">

            {/* Navbar */}
            <ArticleNav />

            <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">

                {/* Header Section (Full Width) */}
                <ArticleHeader data={data} />

                {/* Two-Column Layout */}
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 mt-12">

                    {/* Mobile: Video First */}
                    <div className="lg:hidden">
                        <VideoSidebar data={data} />
                    </div>

                    {/* LEFT: The Narrative (Scrolls) */}
                    <div className="lg:col-span-7 space-y-16">
                        <ArticleContent data={data} />
                    </div>

                    {/* RIGHT: The Source (Sticky Sidebar - Desktop Only) */}
                    <aside className="hidden lg:block lg:col-span-5 relative">
                        <div className="sticky top-24 space-y-8">
                            <VideoSidebar data={data} />
                        </div>
                    </aside>

                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-200 mt-24 py-8 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <span className="font-mono text-xs text-neutral-400 max-w-md">
                            An experiment to turn 199 Breakpoint videos into one readable page.
                        </span>
                        <a
                            href="https://x.com/0xsaurrabh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span className="font-mono text-xs uppercase tracking-wider">Follow @0xsaurrabh</span>
                        </a>
                    </div>
                    <Link
                        href="/"
                        className="font-mono text-xs text-neutral-400 hover:text-black transition-colors"
                    >
                        More Intel →
                    </Link>
                </div>
            </footer>
        </div>
    );
}

// Generate Metadata
export async function generateMetadata({ params }: ArticlePageProps) {
    const { id } = await params;
    const data = getArticleById(id);

    if (!data) {
        return { title: 'Article Not Found' };
    }

    const articleUrl = `https://bp25.news/article/${id}`;

    return {
        title: `${data.editorial.headline} | BP25`,
        description: data.editorial.standfirst,
        openGraph: {
            title: data.editorial.headline,
            description: data.editorial.standfirst,
            url: articleUrl,
            siteName: 'BP25 News',
            images: [
                {
                    url: data.homeImage,
                    width: 1200,
                    height: 630,
                    alt: data.editorial.headline,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.editorial.headline,
            description: data.editorial.standfirst,
            images: [data.homeImage],
        },
    };
}
