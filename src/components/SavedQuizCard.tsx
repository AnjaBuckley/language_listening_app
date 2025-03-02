import React from 'react';
import { SavedQuiz } from '../types';
import { TrashIcon, PlayIcon } from 'lucide-react';

interface SavedQuizCardProps {
  quiz: SavedQuiz;
  onDelete: (id: string) => void;
  onPlay: (quiz: SavedQuiz) => void;
}

const SavedQuizCard: React.FC<SavedQuizCardProps> = ({ quiz, onDelete, onPlay }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative pb-[56.25%]">
        <img 
          src={quiz.thumbnailUrl} 
          alt={quiz.videoTitle}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{quiz.videoTitle}</h3>
        <div className="text-sm text-gray-600 mb-2">
          <span>{quiz.quizzes.length} questions</span>
          <span className="mx-2">•</span>
          <span>{formatDate(quiz.createdAt)}</span>
        </div>
        <div className="mt-auto pt-4 flex justify-between">
          <button
            onClick={() => onDelete(quiz.id)}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            <span>Delete</span>
          </button>
          <button
            onClick={() => onPlay(quiz)}
            className="flex items-center py-1 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <PlayIcon className="h-4 w-4 mr-1" />
            <span>Start Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedQuizCard;