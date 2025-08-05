'use client';

import { useState } from 'react';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

export default function VoiceTranscriber() {
  const [transcription, setTranscription] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string>('');
  
  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  const handleStartRecording = async () => {
    try {
      setError('');
      setTranscription('');
      await startRecording();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
    }
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleTranscribe = async () => {
    if (!audioBlob) return;

    setIsTranscribing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setTranscription(data.text);
      } else {
        setError(data.error || 'Failed to transcribe audio');
      }
    } catch {
      setError('Network error: Failed to transcribe audio');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleClear = () => {
    clearRecording();
    setTranscription('');
    setError('');
  };

  return (
    <div className="relative max-w-5xl mx-auto p-8">
      {/* Main glass container */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 overflow-hidden">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none"></div>
        
        {/* Header */}
        <div className="relative z-10 text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6 animate-glow">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            AI Voice Transcriber
          </h1>
          <p className="text-white/80 text-lg font-light">
            Transform your voice into text with the power of AI
          </p>
        </div>
        
        {/* Main content area */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          {/* Recording Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow flex items-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-red-300 animate-pulse"></div>
                  </div>
                  <span className="text-lg">Start Recording</span>
                </div>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-sm animate-pulse"></div>
                  <span className="text-lg">Stop Recording</span>
                </div>
              </button>
            )}
            
            {audioBlob && !isRecording && (
              <button
                onClick={handleTranscribe}
                disabled={isTranscribing}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative flex items-center space-x-3">
                  {isTranscribing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className="text-lg">{isTranscribing ? 'Transcribing...' : 'Transcribe'}</span>
                </div>
              </button>
            )}
            
            {(audioBlob || transcription) && (
              <button
                onClick={handleClear}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Clear</span>
                </div>
              </button>
            )}
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="flex items-center space-x-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl px-6 py-4">
              <div className="flex space-x-1">
                <div className="w-2 h-6 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-6 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                <div className="w-2 h-10 bg-red-600 rounded-full animate-pulse" style={{animationDelay: '450ms'}}></div>
                <div className="w-2 h-6 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '600ms'}}></div>
              </div>
              <span className="text-white font-semibold text-lg">Recording in progress...</span>
            </div>
          )}

          {/* Audio Player */}
          {audioBlob && !isRecording && (
            <div className="w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Recording Ready</span>
              </div>
              <audio
                controls
                src={URL.createObjectURL(audioBlob)}
                className="w-full h-12 bg-transparent"
                style={{
                  filter: 'invert(1) sepia(1) saturate(5) hue-rotate(175deg)'
                }}
              />
            </div>
          )}

          {/* Loading State */}
          {isTranscribing && (
            <div className="flex flex-col items-center space-y-4 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl px-8 py-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-300/30 border-t-blue-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
              </div>
              <span className="text-white font-semibold text-lg">AI is processing your audio...</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="w-full max-w-2xl bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="text-red-400 font-semibold text-lg">Error</h3>
              </div>
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {/* Transcription Result */}
          {transcription && (
            <div className="w-full max-w-4xl">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  Transcription Complete! 🎉
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto"></div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 min-h-[150px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-sm font-medium uppercase tracking-wider">AI Generated Text</span>
                  </div>
                  <p className="text-white text-lg leading-relaxed whitespace-pre-wrap font-light">
                    {transcription}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-20">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!isRecording && !audioBlob && !transcription && (
            <div className="text-center max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ready to Start</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Click &quot;Start Recording&quot; to begin capturing your voice with crystal-clear quality.
              </p>
              <p className="text-white/60 text-sm">
                Once finished, hit &quot;Stop Recording&quot; → &quot;Transcribe&quot; to witness AI magic! ✨
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
