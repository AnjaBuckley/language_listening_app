import React, { useState } from 'react';
import { Quiz as QuizType } from '../types';
import Quiz from './Quiz';
import { CheckCircleIcon, RotateCwIcon } from 'lucide-react';

interface QuizListProps {
  quizzes: QuizType[];
  onSave?: () => void;
  showSaveButton?: boolean;
}

const QuizList: React.FC<QuizListProps> = ({ 
  quizzes, 
  onSave, 
  showSaveButton = false 
}) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(new Array(quizzes.length).fill(false));
  
  const handleQuizComplete = (isCorrect: boolean) => {
    if (!completed[currentQuizIndex]) {
      const newCompleted = [...completed];
      newCompleted[currentQuizIndex] = true;
      setCompleted(newCompleted);
      
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };
  
  const handleNext = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentQuizIndex(0);
    setScore(0);
    setCompleted(new Array(quizzes.length).fill(false));
  };
  
  const allCompleted = completed.every(Boolean);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Quiz</h2>
        <div className="flex items-center space-x-2 text-sm">
          <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
            Question {currentQuizIndex + 1} of {quizzes.length}
          </span>
          <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full">
            Score: {score}/{quizzes.length}
          </span>
        </div>
      </div>
      
      <Quiz 
        quiz={quizzes[currentQuizIndex]} 
        onComplete={handleQuizComplete}
      />
      
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuizIndex === 0}
          className={`py-2 px-4 rounded-lg font-medium transition-colors ${
            currentQuizIndex === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        <div className="flex space-x-2">
          {allCompleted && (
            <button
              onClick={handleReset}
              className="flex items-center py-2 px-4 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium transition-colors"
            >
              <RotateCwIcon className="h-4 w-4 mr-1" />
              <span>Restart Quiz</span>
            </button>
          )}
          
          {showSaveButton && allCompleted && onSave && (
            <button
              onClick={onSave}
              className="flex items-center py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-colors"
            >
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              <span>Save Quiz</span>
            </button>
          )}
        </div>
        
        <button
          onClick={handleNext}
          disabled={currentQuizIndex === quizzes.length - 1}
          className={`py-2 px-4 rounded-lg font-medium transition-colors ${
            currentQuizIndex === quizzes.length - 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizList;