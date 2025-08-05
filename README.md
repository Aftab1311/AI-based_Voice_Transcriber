# AI Voice Transcriber

A real-time voice transcription web application built with Next.js and powered by OpenAI's Whisper API. Record your voice and get instant, accurate text transcriptions.

## Features

- 🎤 Real-time voice recording
- 🤖 AI-powered transcription using OpenAI Whisper
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔊 Audio playback of recordings
- 📱 Mobile-friendly design
- ⚡ Fast and accurate transcription

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your OpenAI API key:
   - Update the `.env.local` file in the root directory
   - Replace `your_openai_api_key_here` with your actual OpenAI API key:
     ```
     OPENAI_API_KEY=sk-your-actual-api-key-here
     ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Getting an OpenAI API Key

1. Visit [OpenAI's website](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

## How to Use

1. **Start Recording**: Click the "Start Recording" button to begin capturing audio
2. **Stop Recording**: Click "Stop Recording" when you're done speaking
3. **Transcribe**: Click the "Transcribe" button to send your audio to OpenAI for transcription
4. **View Results**: The transcribed text will appear below
5. **Clear**: Use the "Clear" button to start over

## Browser Permissions

The app requires microphone access to record audio. Your browser will prompt for permission when you first try to record.

## Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Audio Recording**: Web APIs (MediaRecorder)
- **Transcription**: OpenAI Whisper API
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── api/transcribe/route.ts    # API endpoint for transcription
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page
├── components/
│   └── VoiceTranscriber.tsx       # Main transcriber component
└── hooks/
    └── useAudioRecorder.ts        # Audio recording hook
```

## Troubleshooting

- **Microphone not working**: Check browser permissions and ensure microphone access is allowed
- **Transcription fails**: Verify your OpenAI API key is correct and you have credits in your account
- **Audio quality issues**: Try recording in a quiet environment and speak clearly

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Make sure to add your `OPENAI_API_KEY` environment variable in your Vercel project settings.
