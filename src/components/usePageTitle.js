import { useEffect } from 'react';

// Sets the document title for a page; restores the default on unmount.
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Backrooms` : 'Backrooms';
    return () => { document.title = 'Backrooms'; };
  }, [title]);
}
