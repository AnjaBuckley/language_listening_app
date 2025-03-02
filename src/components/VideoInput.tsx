import React, { useState } from 'react';
import { extractVideoId } from '../api/youtube';
import { YoutubeIcon, AlertCircleIcon } from 'lucide-react';

interface VideoInputProps {
  onSubmit: (videoId: string) => void;
  isLoading: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
      return;
    }

    onSubmit(videoId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter YouTube Video URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <YoutubeIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            <span>{error}</span>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
            isLoading || !url.trim() 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Processing...' : 'Generate Quiz'}
        </button>
      </form>
    </div>
  );
};

export default VideoInput;