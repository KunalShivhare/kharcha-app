import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  speed?: number; // Speed of typing in milliseconds
}

const useTypewriter = (text: string, { speed = 100 }: UseTypewriterOptions = {}) => {
  const [displayedText, setDisplayedText] = useState('');

  const typeText = useCallback(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    setDisplayedText(''); // Reset displayedText when text changes
    const cleanup = typeText();
    return cleanup; // Clear interval on unmount or when text changes
  }, [text, typeText]);

  return displayedText;
};

export default useTypewriter;
