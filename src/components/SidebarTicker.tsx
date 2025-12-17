'use client';
import { Article } from '@/lib/data';

export default function SidebarTicker({ items }: { items: Article[] }) {
    // Duplicate items to create seamless loop
    const loopItems = [...items, ...items];

    return (
        <div className="h-[50vh] overflow-hidden relative w-full">
            <div className="animate-ticker space-y-8">
                {loopItems.map((item, i) => (
                    <div key={`${item.id}-${i}`} className="group cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-mono text-[9px] uppercase text-neutral-400">{item.category}</span>
                        </div>
                        <p className="font-serif text-sm text-neutral-600 leading-snug group-hover:text-black transition-colors">
                            {item.headline}
                        </p>
                    </div>
                ))}
            </div>

            {/* Fade overlay at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#FDFBF7] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FDFBF7] to-transparent pointer-events-none" />
        </div>
    );
}
