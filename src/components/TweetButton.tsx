"use client";

interface TweetButtonProps {
    text: string;
    url?: string;
    hashtags?: string[];
    className?: string;
    label?: string;
}

export default function TweetButton({ text, url, hashtags = [], className = "", label = "Share" }: TweetButtonProps) {
    const handleClick = () => {
        // Use current page URL if not provided
        const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

        const params = new URLSearchParams({
            text: text,
            url: shareUrl,
        });

        if (hashtags.length > 0) {
            params.set('hashtags', hashtags.join(','));
        }

        const tweetUrl = `https://twitter.com/intent/tweet?${params.toString()}`;

        // Open centered popup
        const width = 550;
        const height = 420;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            tweetUrl,
            'twitter-share',
            `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no`
        );
    };

    return (
        <button
            onClick={handleClick}
            className={`group flex items-center gap-2 font-mono text-xs uppercase tracking-wider 
                text-neutral-500 hover:text-black transition-colors ${className}`}
            aria-label="Share on X/Twitter"
        >
            {/* X/Twitter Icon */}
            <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                aria-hidden="true"
            >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>{label}</span>
        </button>
    );
}
