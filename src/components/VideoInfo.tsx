import React from 'react';
import { VideoInfo as VideoInfoType } from '../types';

interface VideoInfoProps {
  videoId: string;
  videoInfo: VideoInfoType;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ videoId, videoInfo }) => {
  const { title, thumbnailUrl, channelTitle, publishedAt } = videoInfo;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="relative pb-[56.25%]">
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{channelTitle}</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
        <a 
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-blue-600 hover:text-blue-800 transition-colors"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default VideoInfo;