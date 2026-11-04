import { useMediaQuery } from './useMediaQuery';

export const useBreakpoints = () => {
    const isMinWidth480 = useMediaQuery('screen and (min-width: 480px)');
    const isMinWidth768 = useMediaQuery('screen and (min-width: 768px)');

    return { isMinWidth480, isMinWidth768 };
};
