import React from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import VideoInfo from '../components/VideoInfo';
import QuizList from '../components/QuizList';
import { ProcessedVideo, SavedQuiz } from '../types';
import { saveQuiz } from '../utils/storage';

const QuizPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get video data from location state
  const video = location.state?.video as ProcessedVideo;
  
  // If no video data, redirect to home
  if (!video || video.videoId !== videoId) {
    navigate('/');
    return null;
  }
  
  const handleSaveQuiz = () => {
    const savedQuiz: SavedQuiz = {
      id: uuidv4(),
      videoId: video.videoId,
      videoTitle: video.videoInfo.title,
      thumbnailUrl: video.videoInfo.thumbnailUrl,
      quizzes: video.quizzes,
      createdAt: new Date().toISOString()
    };
    
    saveQuiz(savedQuiz);
    toast.success('Quiz saved successfully!');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/history" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Back to History</span>
        </Link>
        
        <button
          onClick={handleSaveQuiz}
          className="flex items-center py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <SaveIcon className="h-4 w-4 mr-1" />
          <span>Save Quiz</span>
        </button>
      </div>
      
      <VideoInfo videoId={video.videoId} videoInfo={video.videoInfo} />
      
      <QuizList quizzes={video.quizzes} />
    </div>
  );
};

export default QuizPage;