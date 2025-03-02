import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HistoryIcon, ArrowRightIcon } from 'lucide-react';
import { getHistory } from '../utils/storage';
import { ProcessedVideo } from '../types';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<ProcessedVideo[]>([]);
  
  useEffect(() => {
    setHistory(getHistory());
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <HistoryIcon className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">Recent Videos</h1>
      </div>
      
      {history.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-lg text-gray-600 mb-4">You haven't processed any videos yet.</p>
          <Link 
            to="/"
            className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Generate Your First Quiz</span>
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.map((video) => (
            <div key={video.videoId} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative pb-[56.25%]">
                <img 
                  src={video.videoInfo.thumbnailUrl} 
                  alt={video.videoInfo.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {video.videoInfo.title}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span>{video.videoInfo.channelTitle}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(video.videoInfo.publishedAt)}</span>
                </div>
                <p className="text-gray-700 mb-4 line-clamp-3">{video.summary}</p>
                <div className="mt-auto pt-2">
                  <Link
                    to={`/quiz/${video.videoId}`}
                    state={{ video }}
                    className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span>View Quiz</span>
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;