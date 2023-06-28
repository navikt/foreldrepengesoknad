import { detect } from 'detect-browser';

export const shouldChangeBrowser = () => {
    const browserInfo = detect();
    return browserInfo ? browserInfo.name === 'ie' : false;
};
