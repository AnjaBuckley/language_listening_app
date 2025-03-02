import React, { useState } from 'react';
import { Transcript } from '../types';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface TranscriptViewerProps {
  transcript: Transcript[];
}

const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ transcript }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const displayedTranscript = isExpanded 
    ? transcript 
    : transcript.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Transcript</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUpIcon className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              <span>Show Full Transcript</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </>
          )}
        </button>
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {displayedTranscript.map((segment, index) => (
          <div key={index} className="flex">
            <span className="text-gray-500 w-12 flex-shrink-0">
              {formatTime(segment.offset)}
            </span>
            <p className="text-gray-700">{segment.text}</p>
          </div>
        ))}
        
        {!isExpanded && transcript.length > 3 && (
          <div className="text-center pt-2 text-gray-500 italic">
            {transcript.length - 3} more segments...
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptViewer;