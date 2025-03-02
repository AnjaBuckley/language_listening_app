import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SaveIcon, ArrowRightIcon } from 'lucide-react';
import { getSavedQuizzes, deleteSavedQuiz } from '../utils/storage';
import { SavedQuiz } from '../types';
import SavedQuizCard from '../components/SavedQuizCard';
import { toast } from 'react-toastify';

const SavedQuizzesPage: React.FC = () => {
  const [savedQuizzes, setSavedQuizzes] = useState<SavedQuiz[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setSavedQuizzes(getSavedQuizzes());
  }, []);
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteSavedQuiz(id);
      setSavedQuizzes(getSavedQuizzes());
      toast.success('Quiz deleted successfully');
    }
  };
  
  const handlePlay = (quiz: SavedQuiz) => {
    navigate(`/saved-quiz/${quiz.id}`, { state: { quiz } });
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <SaveIcon className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">Saved Quizzes</h1>
      </div>
      
      {savedQuizzes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-lg text-gray-600 mb-4">You don't have any saved quizzes yet.</p>
          <Link 
            to="/"
            className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Generate a Quiz</span>
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedQuizzes.map((quiz) => (
            <SavedQuizCard
              key={quiz.id}
              quiz={quiz}
              onDelete={handleDelete}
              onPlay={handlePlay}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedQuizzesPage;