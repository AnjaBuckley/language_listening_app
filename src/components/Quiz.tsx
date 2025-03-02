import React, { useState } from 'react';
import { Quiz as QuizType } from '../types';
import { CheckCircleIcon, XCircleIcon, HelpCircleIcon } from 'lucide-react';

interface QuizProps {
  quiz: QuizType;
  onComplete?: (isCorrect: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const isCorrect = selectedOption === quiz.correctAnswer;
  
  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setIsSubmitted(true);
    console.log('Quiz submitted with answer:', selectedOption);
    console.log('Correct answer is:', quiz.correctAnswer);
    
    if (onComplete) {
      console.log('Calling onComplete with result:', selectedOption === quiz.correctAnswer);
      onComplete(selectedOption === quiz.correctAnswer);
    }
  };
  
  console.log('Quiz component rendering with:', quiz);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{quiz.question}</h3>
      
      <div className="space-y-3 mb-4">
        {quiz.options.map((option, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              !isSubmitted
                ? selectedOption === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
                : selectedOption === option
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : option === quiz.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300'
            }`}
            onClick={() => !isSubmitted && setSelectedOption(option)}
          >
            <div className="flex items-center">
              <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
              <span className="flex-1">{option}</span>
              
              {isSubmitted && (
                <>
                  {option === quiz.correctAnswer && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 ml-2" />
                  )}
                  {option === selectedOption && !isCorrect && (
                    <XCircleIcon className="h-5 w-5 text-red-500 ml-2" />
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {isSubmitted ? (
        <div className="mt-4">
          <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} mb-3`}>
            <div className="flex items-center font-medium">
              {isCorrect ? (
                <>
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  <span>Incorrect. The correct answer is: {quiz.correctAnswer}</span>
                </>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <HelpCircleIcon className="h-4 w-4 mr-1" />
            <span>{showExplanation ? 'Hide' : 'Show'} Explanation</span>
          </button>
          
          {showExplanation && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-gray-700">
              {quiz.explanation}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={`mt-4 py-2 px-4 rounded-lg text-white font-medium transition-colors ${
            !selectedOption 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};

export default Quiz;