import React from 'react';
import './stepBanner.less';
interface StepBannerProps {
    text: string;
    level?: '1' | '2' | '3';
}
declare const StepBanner: React.FunctionComponent<StepBannerProps>;
export default StepBanner;
