import axios from 'axios';
import { Transcript, VideoInfo } from '../types';

// This is a mock implementation since we can't directly access YouTube's API without a key
// In a real application, you would use the YouTube Data API and YouTube Transcript API

export async function getVideoInfo(videoId: string): Promise<VideoInfo> {
  try {
    // In a real implementation, you would call the YouTube API
    // For now, we'll simulate a response with mock data
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      title: `Video ${videoId}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      channelTitle: 'Channel Name',
      publishedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    throw new Error('Failed to fetch video information');
  }
}

export async function getVideoTranscript(videoId: string): Promise<Transcript[]> {
  try {
    // In a real implementation, you would call a transcript API
    // For now, we'll simulate a response with mock data
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock transcript data
    const mockTranscript: Transcript[] = [
      {
        text: "Hello and welcome to this video about language learning.",
        duration: 5000,
        offset: 0
      },
      {
        text: "Today we're going to discuss effective listening strategies.",
        duration: 4500,
        offset: 5000
      },
      {
        text: "Listening comprehension is one of the most challenging aspects of learning a new language.",
        duration: 6000,
        offset: 9500
      },
      {
        text: "But with regular practice and the right techniques, you can improve quickly.",
        duration: 5500,
        offset: 15500
      },
      {
        text: "Let's start by talking about active listening.",
        duration: 3500,
        offset: 21000
      }
    ];
    
    return mockTranscript;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw new Error('Failed to fetch video transcript');
  }
}

export function extractVideoId(url: string): string | null {
  // Regular expressions to extract video ID from different YouTube URL formats
  const regexps = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/user\/[^&\n?#]+\/\?v=([^&\n?#]+)/
  ];

  for (const regex of regexps) {
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}