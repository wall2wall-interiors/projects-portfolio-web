import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Wall 2 Wall Interiors`;
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
