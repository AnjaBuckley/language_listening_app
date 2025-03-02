import { Quiz, Transcript } from '../types';
import OpenAI from 'openai';

// OpenAI API key - in production, this would come from environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Initialize OpenAI client if API key is available
let openai: OpenAI | null = null;
if (OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Note: In production, API calls should be made server-side
  });
}

console.log('OpenAI API Key available:', !!OPENAI_API_KEY);
console.log('OpenAI client initialized:', !!openai);

export async function generateSummary(transcript: Transcript[]): Promise<string> {
  try {
    // Combine all transcript segments into a single text
    const fullText = transcript.map(segment => segment.text).join(' ');
    
    // Check if OpenAI client is available
    if (!openai) {
      console.warn('OpenAI API key not found, using mock data');
      return getMockSummary();
    }
    
    console.log('Making OpenAI API call for summary...');
    
    // Make real API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes video transcripts concisely."
        },
        {
          role: "user",
          content: `Please summarize the following transcript in a short paragraph:\n\n${fullText}`
        }
      ],
      max_tokens: 150
    });
    
    console.log('OpenAI summary response:', response.choices[0].message.content);
    
    const summaryText = response.choices[0].message.content;
    if (!summaryText) {
      console.warn('Empty response from OpenAI, using mock data');
      return getMockSummary();
    }
    
    return summaryText;
  } catch (error) {
    console.error('Error generating summary:', error);
    // Fallback to mock data if API call fails
    return getMockSummary();
  }
}

export async function generateQuizzes(transcript: Transcript[]): Promise<Quiz[]> {
  try {
    // Combine all transcript segments into a single text
    const fullText = transcript.map(segment => segment.text).join(' ');
    
    // Check if OpenAI client is available
    if (!openai) {
      console.warn('OpenAI API key not found, using mock data');
      return getMockQuizzes();
    }
    
    console.log('Making OpenAI API call for quizzes...');
    
    // Make real API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates multiple-choice quiz questions based on video transcripts. Return the response as a JSON array with each quiz having id, question, options (array), correctAnswer, and explanation fields."
        },
        {
          role: "user",
          content: `Create 3 multiple-choice quiz questions based on this transcript:\n\n${fullText}`
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 500
    });
    
    console.log('OpenAI quiz response:', response.choices[0].message.content);
    
    try {
      // Parse the JSON response
      const content = response.choices[0].message.content || '';
      const parsedResponse = JSON.parse(content);
      
      console.log('Parsed quiz response:', parsedResponse);
      
      if (Array.isArray(parsedResponse.quizzes)) {
        return parsedResponse.quizzes;
      } else {
        console.warn('Invalid quiz format returned, using mock data');
        return getMockQuizzes();
      }
    } catch (parseError) {
      console.error('Error parsing quiz response:', parseError);
      return getMockQuizzes();
    }
  } catch (error) {
    console.error('Error generating quizzes:', error);
    // Fallback to mock data if API call fails
    return getMockQuizzes();
  }
}

// Mock implementations for fallback
function getMockSummary(): string {
  return `This video discusses effective strategies for improving listening comprehension when learning a new language. The speaker emphasizes the importance of active listening and regular practice, suggesting that with the right techniques, learners can make rapid progress. The content is aimed at language learners who want to enhance their listening skills through practical methods.`;
}

function getMockQuizzes(): Quiz[] {
  return [
    {
      id: '1',
      question: 'What is the main topic of this video?',
      options: [
        'Grammar rules in language learning',
        'Vocabulary acquisition techniques',
        'Effective listening strategies',
        'Speaking practice methods'
      ],
      correctAnswer: 'Effective listening strategies',
      explanation: 'The speaker explicitly mentions that they will discuss effective listening strategies for language learning.'
    },
    {
      id: '2',
      question: 'According to the speaker, what is one of the most challenging aspects of learning a new language?',
      options: [
        'Reading comprehension',
        'Listening comprehension',
        'Writing skills',
        'Pronunciation'
      ],
      correctAnswer: 'Listening comprehension',
      explanation: 'The speaker states that "Listening comprehension is one of the most challenging aspects of learning a new language."'
    },
    {
      id: '3',
      question: 'What does the speaker suggest can help improve listening skills?',
      options: [
        'Watching movies with subtitles',
        'Regular practice and the right techniques',
        'Reading books aloud',
        'Memorizing vocabulary lists'
      ],
      correctAnswer: 'Regular practice and the right techniques',
      explanation: 'The speaker mentions that "with regular practice and the right techniques, you can improve quickly."'
    }
  ];
}