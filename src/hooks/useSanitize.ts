import { useCallback } from 'react';
import createDOMPurify from 'isomorphic-dompurify';

export const useSanitize = () => {
  const sanitize = useCallback((input: string) => {
    if (typeof window === 'undefined') {
      return input;
    }
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(input);
  }, []);

  return sanitize;
};
