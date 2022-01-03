import * as React from 'react';

export const useEscapeKey = (onEscape: () => void): void => {
    React.useEffect(() => {
        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key.toLowerCase() === 'esc' || event.key.toLowerCase() === 'escape') {
                onEscape();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);
};