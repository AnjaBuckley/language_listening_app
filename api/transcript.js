import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
  try {
    const { videoId } = req.query;
    
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }
    
    console.log('Fetching transcript for video:', videoId);
    
    // Execute the Python script to get the transcript
    const { stdout, stderr } = await execPromise(`python -c "
from youtube_transcript_api import YouTubeTranscriptApi
import json

try:
    transcript = YouTubeTranscriptApi.get_transcript('${videoId}')
    print(json.dumps(transcript))
except Exception as e:
    print(json.dumps({'error': str(e)}))
"`);
    
    if (stderr) {
      console.error('Python script error:', stderr);
      return res.status(500).json({ error: 'Failed to fetch transcript', details: stderr });
    }
    
    // Parse the output from the Python script
    const transcriptData = JSON.parse(stdout);
    
    // Check if there was an error in the Python script
    if (transcriptData.error) {
      return res.status(500).json({ error: transcriptData.error });
    }
    
    // Convert the transcript to our format
    const transcript = transcriptData.map(item => ({
      text: item.text,
      duration: item.duration * 1000, // Convert to milliseconds
      offset: item.start * 1000 // Convert to milliseconds
    }));
    
    return res.status(200).json({ transcript });
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return res.status(500).json({ error: 'Failed to fetch transcript', details: error.message });
  }
} 