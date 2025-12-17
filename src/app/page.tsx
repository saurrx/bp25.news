import { getNewsroom } from '@/lib/data';
import { rotateTopTier } from '@/lib/rotation';
import HeroGrid from '@/components/HeroGrid';
import MasonryFeed from '@/components/MasonryFeed';

export const dynamic = 'force-dynamic';

export default function Home() {
    const { zoneA, zoneC } = getNewsroom();

    // Rotate top 3 items for fresh homepage feel
    const rotatedZoneA = rotateTopTier(zoneA, 3);

    return (
        <div className="w-full bg-[#FDFBF7]"> {/* 'Cosmic Latte' Background */}

            {/* ZONE A: The Kinetic Hero */}
            <section className="px-4 md:px-8 py-8 mb-8">
                <HeroGrid items={rotatedZoneA} />
            </section>

            {/* Divider */}
            <section className="px-6 md:px-12 py-12 flex items-center justify-center">
                <div className="h-px bg-neutral-200 w-full max-w-xs" />
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest mx-4">The Feed</span>
                <div className="h-px bg-neutral-200 w-full max-w-xs" />
            </section>

            {/* ZONE C: The Organic Masonry */}
            <section className="px-4 md:px-8 pb-32">
                <MasonryFeed items={zoneC} />
            </section>
        </div>
    );
}
