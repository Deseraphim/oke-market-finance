import { useState, useEffect, useCallback } from 'react';

interface VoiceRecognitionHook {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
}

export const useVoiceRecognition = (onResult: (result: string) => void): VoiceRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionInstance = recognition ? new recognition() : null;

  const startListening = useCallback(() => {
    if (recognitionInstance) {
      setIsListening(true);
      recognitionInstance.start();
    }
  }, [recognitionInstance]);

  const stopListening = useCallback(() => {
    if (recognitionInstance) {
      setIsListening(false);
      recognitionInstance.stop();
    }
  }, [recognitionInstance]);

  useEffect(() => {
    if (recognitionInstance) {
      recognitionInstance.onresult = (event) => {
        const currentTranscript = event.results[0][0].transcript;
        setTranscript(currentTranscript);
        onResult(currentTranscript.toLowerCase());
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognitionInstance, onResult]);

  return { isListening, transcript, startListening, stopListening };
};

interface TextToSpeechHook {
  isSpeaking: boolean;
  speak: (text: string) => void;
}

export const useTextToSpeech = (): TextToSpeechHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return { isSpeaking, speak };
};
