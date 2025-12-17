'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Transcript({ text }: { text: string }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!text) return null;

    return (
        <div className="border border-neutral-200 rounded-sm bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                    Read Full Transcript
                </span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
            </button>

            {isOpen && (
                <div className="p-8 border-t border-neutral-200">
                    <div className="font-mono text-xs text-neutral-600 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto pr-4">
                        {text}
                    </div>
                </div>
            )}
        </div>
    );
}
