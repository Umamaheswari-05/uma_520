import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  fallbackImage: string;
  className?: string;
}

export default function VideoPlayer({ videoId, title, fallbackImage, className = '' }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-blue-500/15 bg-navy-900 ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="relative w-full aspect-video group focus:outline-none"
          aria-label={`Play ${title}`}
        >
          {/* Try YouTube thumbnail, fall back to provided image */}
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-navy-950/40 group-hover:bg-navy-950/30 transition-colors" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform group-hover:bg-red-500">
              <Play size={26} className="text-white fill-white ml-1" />
            </div>
          </div>
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-950 to-transparent">
            <p className="text-white text-sm font-medium line-clamp-1">{title}</p>
          </div>
        </button>
      )}
    </div>
  );
}
