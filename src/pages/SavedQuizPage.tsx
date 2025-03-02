import React from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

import QuizList from '../components/QuizList';
import { SavedQuiz } from '../types';

const SavedQuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get quiz data from location state
  const quiz = location.state?.quiz as SavedQuiz;
  
  // If no quiz data, redirect to saved quizzes
  if (!quiz || quiz.id !== quizId) {
    navigate('/saved');
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/saved" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Back to Saved Quizzes</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative pb-[56.25%]">
          <img 
            src={quiz.thumbnailUrl} 
            alt={quiz.videoTitle}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{quiz.videoTitle}</h2>
          <a 
            href={`https://www.youtube.com/watch?v=${quiz.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
      
      <QuizList quizzes={quiz.quizzes} />
    </div>
  );
};

export default SavedQuizPage;