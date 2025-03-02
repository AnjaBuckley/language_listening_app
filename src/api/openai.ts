import { Quiz, Transcript } from '../types';

// In a production app, you would use the OpenAI API with your API key
// For this demo, we'll simulate the API response

export async function generateSummary(transcript: Transcript[]): Promise<string> {
  try {
    // Combine all transcript segments into a single text
    const fullText = transcript.map(segment => segment.text).join(' ');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock summary generation
    const summary = `This video discusses effective strategies for improving listening comprehension when learning a new language. The speaker emphasizes the importance of active listening and regular practice, suggesting that with the right techniques, learners can make rapid progress. The content is aimed at language learners who want to enhance their listening skills through practical methods.`;
    
    return summary;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary');
  }
}

export async function generateQuizzes(transcript: Transcript[]): Promise<Quiz[]> {
  try {
    // Combine all transcript segments into a single text
    const fullText = transcript.map(segment => segment.text).join(' ');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock quiz generation
    const quizzes: Quiz[] = [
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
    
    return quizzes;
  } catch (error) {
    console.error('Error generating quizzes:', error);
    throw new Error('Failed to generate quizzes');
  }
}