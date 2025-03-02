import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import VideoInput from '../components/VideoInput';
import VideoInfo from '../components/VideoInfo';
import TranscriptViewer from '../components/TranscriptViewer';
import Summary from '../components/Summary';
import QuizList from '../components/QuizList';
import LoadingState from '../components/LoadingState';

import { getVideoInfo, getVideoTranscript } from '../api/youtube';
import { generateSummary, generateQuizzes } from '../api/openai';
import { addToHistory, saveQuiz } from '../utils/storage';
import { ProcessedVideo, SavedQuiz } from '../types';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [processedVideo, setProcessedVideo] = useState<ProcessedVideo | null>(null);
  
  const handleVideoSubmit = async (videoId: string) => {
    setIsLoading(true);
    setCurrentStep('Fetching video information...');
    
    try {
      // Step 1: Get video info
      const videoInfo = await getVideoInfo(videoId);
      setCurrentStep('Fetching video transcript...');
      
      // Step 2: Get transcript
      const transcript = await getVideoTranscript(videoId);
      setCurrentStep('Generating summary...');
      
      // Step 3: Generate summary
      const summary = await generateSummary(transcript);
      setCurrentStep('Creating quiz questions...');
      
      // Step 4: Generate quizzes
      const quizzes = await generateQuizzes(transcript);
      
      // Step 5: Save to processed video
      const processed: ProcessedVideo = {
        videoId,
        videoInfo,
        transcript,
        summary,
        quizzes
      };
      
      setProcessedVideo(processed);
      addToHistory(processed);
      
      toast.success('Quiz generated successfully!');
    } catch (error) {
      console.error('Error processing video:', error);
      toast.error('Failed to process video. Please try again.');
    } finally {
      setIsLoading(false);
      setCurrentStep(null);
    }
  };
  
  const handleSaveQuiz = () => {
    if (!processedVideo) return;
    
    const savedQuiz: SavedQuiz = {
      id: uuidv4(),
      videoId: processedVideo.videoId,
      videoTitle: processedVideo.videoInfo.title,
      thumbnailUrl: processedVideo.videoInfo.thumbnailUrl,
      quizzes: processedVideo.quizzes,
      createdAt: new Date().toISOString()
    };
    
    saveQuiz(savedQuiz);
    toast.success('Quiz saved successfully!');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        YouTube Transcript Quiz Generator
      </h1>
      
      <VideoInput onSubmit={handleVideoSubmit} isLoading={isLoading} />
      
      {isLoading && <LoadingState message={currentStep || 'Processing...'} />}
      
      {!isLoading && processedVideo && (
        <div>
          <VideoInfo 
            videoId={processedVideo.videoId} 
            videoInfo={processedVideo.videoInfo} 
          />
          
          <Summary summary={processedVideo.summary} />
          
          <TranscriptViewer transcript={processedVideo.transcript} />
          
          <QuizList 
            quizzes={processedVideo.quizzes} 
            onSave={handleSaveQuiz}
            showSaveButton={true}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;