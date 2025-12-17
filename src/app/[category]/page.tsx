import { getArticlesByCategory } from "@/lib/data";
import { rotateTopTier } from "@/lib/rotation";
import { notFound } from "next/navigation";
import SectorHero from "@/components/category/SectorHero";
import MarketMovers from "@/components/category/MarketMovers";
import MasonryFeed from "@/components/MasonryFeed";

// FORCE DYNAMIC: Re-render on every request (Refresh) for rotation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Note: generateStaticParams removed - using dynamic rendering for all category pages

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;

    // Filter & Sort by Score (High to Low)
    const rawCategoryItems = getArticlesByCategory(category)
        .sort((a, b) => b.score - a.score);

    if (rawCategoryItems.length === 0) {
        notFound();
    }

    // APPLY THE ROTATION LOGIC - Top 5 items can rotate into Hero slot
    const categoryItems = rotateTopTier(rawCategoryItems, 5);

    const displayName = categoryItems[0]?.category || category;
    const isBigCategory = categoryItems.length > 8;

    // Slice Data (Now dynamically ordered)
    const leader = categoryItems[0];         // The dynamic Hero
    const movers = categoryItems.slice(1, 4); // The runners-up
    const rest = categoryItems.slice(4);      // The feed

    return (
        <div className="min-h-screen bg-[#FDFBF7] px-6 md:px-12 pt-20 pb-24">
            {/* Header */}
            <header className="mb-16 flex items-baseline justify-between border-b border-black pb-4">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.85] tracking-tighter text-[#1a1a1a]">
                    {displayName}
                </h1>

            </header>

            {isBigCategory ? (
                <>
                    {/* Tier 1: The Sector Lead (Rotates on Refresh) */}
                    <SectorHero article={leader} />

                    {/* Tier 2: Market Movers (Rotates on Refresh) */}
                    <MarketMovers items={movers} />

                    {/* Tier 3: The Rest (Masonry) */}
                    <div className="mt-24">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-8 border-t border-neutral-200 pt-8">
                            Full {displayName} Archive
                        </h3>
                        <MasonryFeed items={rest} />
                    </div>
                </>
            ) : (
                <MasonryFeed items={categoryItems} />
            )}
        </div>
    );
}

// Generate metadata for each category page
export async function generateMetadata({ params }: CategoryPageProps) {
    const { category } = await params;
    const articles = getArticlesByCategory(category);
    const displayName = articles[0]?.category || category;

    return {
        title: `${displayName} | BP25 News`,
        description: `${articles.length} stories covering ${displayName} at Breakpoint 2025`,
    };
}
