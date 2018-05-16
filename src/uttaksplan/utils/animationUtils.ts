import { scroller, animateScroll } from 'react-scroll';

const defaultOptions = {
    duration: 1000,
    delay: 50,
    smooth: true,
    offset: 0
};

interface ScrollOptions {
    duration?: number;
    delay?: number;
    offset?: number;
}

export function scrollToElement(id: string, options?: ScrollOptions) {
    scroller.scrollTo(id, {
        ...defaultOptions,
        ...options
    });
}

export function scrollToTop() {
    animateScroll.scrollToTop(defaultOptions);
}
