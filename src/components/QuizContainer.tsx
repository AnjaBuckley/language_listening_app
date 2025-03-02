import React, { useState } from 'react';
import { Quiz as QuizType } from '../types';
import Quiz from './Quiz';

interface QuizContainerProps {
  quizzes: QuizType[];
}

const QuizContainer: React.FC<QuizContainerProps> = ({ quizzes }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<{ correct: boolean }[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Calculate the total number of quizzes and correct answers
  const totalQuizzes = quizzes.length;
  const correctAnswers = quizResults.filter(result => result.correct).length;
  
  const handleQuizComplete = (isCorrect: boolean) => {
    console.log(`Quiz ${currentQuizIndex + 1} completed. Correct: ${isCorrect}`);
    
    // Add the result to our results array
    const newResults = [...quizResults, { correct: isCorrect }];
    setQuizResults(newResults);
    
    // If we have more quizzes, move to the next one
    if (currentQuizIndex < totalQuizzes - 1) {
      setTimeout(() => {
        setCurrentQuizIndex(currentQuizIndex + 1);
      }, 1500); // Short delay before showing the next question
    } else {
      // All quizzes completed
      setQuizCompleted(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setQuizResults([]);
    setQuizCompleted(false);
  };
  
  // If there are no quizzes, show a message
  if (quizzes.length === 0) {
    return <div className="text-center py-8">No quiz questions available.</div>;
  }
  
  return (
    <div className="quiz-container">
      {!quizCompleted ? (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Question {currentQuizIndex + 1} of {totalQuizzes}
          </div>
          
          <Quiz 
            quiz={quizzes[currentQuizIndex]} 
            onComplete={handleQuizComplete} 
          />
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quiz Completed!</h3>
          <p className="mb-4">
            You got {correctAnswers} out of {totalQuizzes} questions correct.
            ({Math.round((correctAnswers / totalQuizzes) * 100)}%)
          </p>
          
          <button
            onClick={resetQuiz}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizContainer; 