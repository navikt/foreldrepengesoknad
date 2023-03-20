import React from 'react';
import './banner.less';
export type BannerSize = 'small' | 'large' | 'xlarge';
export interface BannerProps {
    size: BannerSize;
    className?: string;
    children: React.ReactNode;
}
declare const Banner: React.FunctionComponent<BannerProps>;
export default Banner;
