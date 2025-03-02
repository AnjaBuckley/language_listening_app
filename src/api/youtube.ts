import axios from 'axios';
import { Transcript, VideoInfo } from '../types';

// YouTube API key - in production, this would come from environment variables
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Add this at the top of your file
console.log('YouTube API Key available:', !!import.meta.env.VITE_YOUTUBE_API_KEY);
console.log('YouTube API Key prefix:', import.meta.env.VITE_YOUTUBE_API_KEY ? import.meta.env.VITE_YOUTUBE_API_KEY.substring(0, 5) : 'none');

// This is a mock implementation since we can't directly access YouTube's API without a key
// In a real application, you would use the YouTube Data API and YouTube Transcript API

export async function getVideoInfo(videoId: string): Promise<VideoInfo> {
  try {
    // Check if API key is available
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API key not found, using mock data');
      return getMockVideoInfo(videoId);
    }

    console.log('Making YouTube API call with key:', YOUTUBE_API_KEY.substring(0, 5) + '...');
    
    // Make real API call to YouTube Data API
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`
    );

    console.log('YouTube API response:', response.data);

    // Check if video exists
    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('Video not found');
    }

    const videoData = response.data.items[0].snippet;
    
    return {
      title: videoData.title,
      thumbnailUrl: videoData.thumbnails.high.url,
      channelTitle: videoData.channelTitle,
      publishedAt: videoData.publishedAt
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    // Fallback to mock data if API call fails
    return getMockVideoInfo(videoId);
  }
}

// Add this function to your youtube.ts file
async function fetchWithCorsProxy(url: string) {
  // Use a CORS proxy to fetch the YouTube page
  const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  return axios.get(corsProxyUrl);
}

export async function getVideoTranscript(videoId: string): Promise<Transcript[]> {
  try {
    console.log('Fetching video info for enhanced mock transcript...');
    
    // Make direct API call to get video info
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`
    );
    
    if (response.data.items && response.data.items.length > 0) {
      const videoTitle = response.data.items[0].snippet.title;
      console.log('Creating enhanced mock transcript for:', videoTitle);
      
      return [
        {
          text: `Welcome to this video about ${videoTitle}.`,
          duration: 5000,
          offset: 0
        },
        {
          text: `In this video, we'll explore the key concepts related to ${videoTitle}.`,
          duration: 5500,
          offset: 5000
        },
        {
          text: `Understanding ${videoTitle} can be challenging, but with the right approach, it becomes much easier.`,
          duration: 6000,
          offset: 10500
        },
        {
          text: `Let's break down the main components of ${videoTitle} step by step.`,
          duration: 5500,
          offset: 16500
        },
        {
          text: `By the end of this video, you'll have a solid understanding of ${videoTitle}.`,
          duration: 5000,
          offset: 22000
        }
      ];
    }
    
    console.warn('Could not fetch video info, using generic mock transcript');
    return getMockTranscript();
  } catch (error) {
    console.error('Error creating enhanced mock transcript:', error);
    return getMockTranscript();
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

// Mock implementations for fallback
function getMockVideoInfo(videoId: string): VideoInfo {
  return {
    title: `Video ${videoId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    channelTitle: 'Channel Name',
    publishedAt: new Date().toISOString()
  };
}

function getMockTranscript(): Transcript[] {
  return [
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
}