import { useMediaQuery } from './useMediaQuery';

export const useBreakpoints = () => {
    const isAtLeast480px = useMediaQuery('screen and (min-width: 480px)');
    const isAtLeast768px = useMediaQuery('screen and (min-width: 768px)');

    return { isAtLeast480px, isAtLeast768px };
};
