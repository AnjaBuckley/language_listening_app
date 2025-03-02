export interface Transcript {
  text: string;
  duration: number;
  offset: number;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface VideoInfo {
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

export interface ProcessedVideo {
  videoId: string;
  videoInfo: VideoInfo;
  transcript: Transcript[];
  summary: string;
  quizzes: Quiz[];
}

export interface SavedQuiz {
  id: string;
  videoId: string;
  videoTitle: string;
  thumbnailUrl: string;
  quizzes: Quiz[];
  createdAt: string;
}