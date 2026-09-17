import { useEffect } from 'react';

import { useOversiktState } from '../context/OversiktStateContext';

export const useGetBackgroundColor = () => {
    const { backgroundColor } = useOversiktState();
    return backgroundColor;
};

export const useSetBackgroundColor = (color: 'blue' | 'white') => {
    const { setBackgroundColor } = useOversiktState();

    useEffect(() => {
        setBackgroundColor(color);
    }, [setBackgroundColor, color]);
};
