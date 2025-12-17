import { Article } from '@/lib/data';

/**
 * Rotates the Top N items randomly, keeping the rest of the list fixed.
 * This creates a "Fresh on Refresh" experience where top-tier articles
 * get equal exposure probability in the Hero slot.
 * 
 * @param articles - Sorted array of articles (High score to Low score)
 * @param topPoolSize - How many top items are eligible to be Hero (e.g., 5)
 * @returns Reordered array with a random top-tier article at position 0
 */
export function rotateTopTier(articles: Article[], topPoolSize: number = 5): Article[] {
    // 1. Safety check: If we have fewer articles than the pool, just return as is
    if (articles.length <= 1) return articles;

    // 2. Define the actual pool size (don't exceed array length)
    const poolSize = Math.min(articles.length, topPoolSize);

    // 3. Slice the Top Tier
    const topTier = articles.slice(0, poolSize);
    const theRest = articles.slice(poolSize);

    // 4. Pick a random Hero from the Top Tier
    const heroIndex = Math.floor(Math.random() * topTier.length);
    const hero = topTier[heroIndex];

    // 5. Remove the Hero from the Top Tier array
    const remainingTopTier = topTier.filter((_, idx) => idx !== heroIndex);

    // 6. Reassemble: [Hero, ...RemainingTopTier, ...TheRest]
    return [hero, ...remainingTopTier, ...theRest];
}
