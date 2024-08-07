import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { backgroundColorAtom } from 'app/atoms/backgroundColorAtom';

export const useGetBackgroundColor = () => {
    const backgroundColor = useAtomValue(backgroundColorAtom);
    return backgroundColor;
};

export const useSetBackgroundColor = (color: 'blue' | 'white') => {
    const setBackgroundColor = useSetAtom(backgroundColorAtom);

    useEffect(() => {
        setBackgroundColor(color);
    }, [setBackgroundColor, color]);
};
