import fs from 'fs';
import path from 'path';

export type AspectRatio = '1:1' | '3:4' | '16:9';

export type Article = {
    id: string;
    headline: string;
    standfirst: string;
    category: string;
    score: number;
    homeImage: string;
    catImage: string;
    homeRatio: AspectRatio;
    catRatio: AspectRatio;
    tags: string[];
};

export type Newsroom = {
    zoneA: Article[];
    zoneC: Article[];
    all: Article[];
};

const DATA_DIR = path.join(process.cwd(), 'bp25_data');

/**
 * Normalize ratio string to valid AspectRatio
 */
function normalizeRatio(ratio: string | null): AspectRatio {
    if (ratio === '3:4') return '3:4';
    if (ratio === '16:9') return '16:9';
    return '1:1'; // Default
}

/**
 * Finds a fallback image from another article in the same category
 */
function findCategoryFallbackImage(
    articles: { id: string; category: string; homeImage: string; catImage: string }[],
    currentId: string,
    category: string,
    type: 'home' | 'cat'
): string {
    // Find another article in the same category with a VALID image
    const fallback = articles.find(a => {
        if (a.id === currentId || a.category !== category) return false;
        const img = type === 'home' ? a.catImage : a.homeImage;
        return !!img;
    });

    if (fallback) {
        return type === 'home' ? fallback.catImage : fallback.homeImage;
    }

    // Try any article in the same category
    const sameCatAny = articles.find(a => {
        if (a.id === currentId || a.category !== category) return false;
        const img = type === 'home' ? a.homeImage : a.catImage;
        return !!img;
    });

    if (sameCatAny) {
        return type === 'home' ? sameCatAny.homeImage : sameCatAny.catImage;
    }

    return '';
}

// Helper to optimize Cloudinary URLs
function optimizeCloudinaryUrl(url: string): string {
    if (!url || !url.includes('cloudinary.com') || url.includes('f_auto,q_auto')) return url;
    return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_1600,c_limit/');
}

export function getNewsroom(): Newsroom {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    // First pass: collect raw data
    const rawArticles = files.map(file => {
        const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));

        const homeRatio = normalizeRatio(data.layout_config?.homepage?.ratio);
        const catRatio = normalizeRatio(data.layout_config?.category_page?.ratio);

        // Images are now exclusively Cloudinary URLs with optimization
        const homeImage = optimizeCloudinaryUrl(data.layout_config?.homepage?.local_image_path || '');
        const catImage = optimizeCloudinaryUrl(data.layout_config?.category_page?.local_image_path || '');

        return {
            id: data.id,
            headline: data.editorial?.headline || data.meta?.title || 'Untitled',
            standfirst: data.editorial?.standfirst || '',
            category: data.tags?.primary || 'General',
            score: data.tags?.score || 5,
            homeImage,
            catImage,
            homeRatio,
            catRatio,
            tags: data.tags?.secondary || []
        };
    });

    // Second pass: apply fallback logic for missing images
    const articles: Article[] = rawArticles.map(article => {
        let { homeImage, catImage } = article;

        // Check if homeImage exists, if not find fallback
        if (!homeImage) {
            // First try own catImage
            if (catImage) {
                homeImage = catImage;
            } else {
                homeImage = findCategoryFallbackImage(rawArticles, article.id, article.category, 'home');
            }
        }

        // Check if catImage exists, if not find fallback
        if (!catImage) {
            // First try own homeImage
            if (homeImage) {
                catImage = homeImage;
            } else {
                catImage = findCategoryFallbackImage(rawArticles, article.id, article.category, 'cat');
            }
        }

        return { ...article, homeImage, catImage };
    });

    // Sort by Score descending
    const sorted = [...articles].sort((a, b) => b.score - a.score);

    return {
        zoneA: sorted.slice(0, 5),
        zoneC: sorted.slice(5),
        all: articles
    };
}

export function getCategories(): string[] {
    const { all } = getNewsroom();
    const categories = Array.from(new Set(all.map(a => a.category)));
    return categories.sort();
}

export function getArticlesByCategory(category: string): Article[] {
    const { all } = getNewsroom();
    return all.filter(a =>
        a.category.toLowerCase() === category.toLowerCase()
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// FULL ARTICLE TYPE - For Article Page with all editorial content
// ═══════════════════════════════════════════════════════════════════════════

export type FullArticle = {
    id: string;
    // Meta
    meta: {
        title: string;
        speakers: string[];
        product: string;
        type: string;
        thumbnail: string;
    };
    // Editorial
    editorial: {
        headline: string;
        standfirst: string;
        key_takeaways: string[];
        article_body_markdown: string;
    };
    // Tags
    tags: {
        primary: string;
        secondary: string[];
        score: number;
        impact_reason: string;
    };
    // Enrichment
    enrichment: {
        sources: { title: string; url: string; snippet?: string }[];
    };
    // Raw transcript
    raw_transcript: string;
    // Images
    homeImage: string;
    catImage: string;
};

/**
 * Get a single article by ID with full editorial content
 */
export function getArticleById(id: string): FullArticle | null {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));

        if (data.id === id) {
            const homeImage = optimizeCloudinaryUrl(data.layout_config?.homepage?.local_image_path || '');
            const catImage = optimizeCloudinaryUrl(data.layout_config?.category_page?.local_image_path || '');

            return {
                id: data.id,
                meta: {
                    title: data.meta?.title || 'Untitled',
                    speakers: data.meta?.speakers || [],
                    product: data.meta?.product || 'Unknown',
                    type: data.meta?.type || 'Article',
                    thumbnail: data.meta?.thumbnail || ''
                },
                editorial: {
                    headline: data.editorial?.headline || data.meta?.title || 'Untitled',
                    standfirst: data.editorial?.standfirst || '',
                    key_takeaways: data.editorial?.key_takeaways || [],
                    article_body_markdown: data.editorial?.article_body_markdown || ''
                },
                tags: {
                    primary: data.tags?.primary || 'General',
                    secondary: data.tags?.secondary || [],
                    score: data.tags?.score || 5,
                    impact_reason: data.tags?.impact_reason || ''
                },
                enrichment: {
                    sources: data.enrichment?.sources || []
                },
                raw_transcript: typeof data.transcript === 'string' ? data.transcript : (data.transcript?.raw || ''),
                homeImage: homeImage || catImage || '',
                catImage: catImage || homeImage || ''
            };
        }
    }

    return null;
}
