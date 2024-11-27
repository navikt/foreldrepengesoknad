import React from 'react';

import { bemUtils } from '@navikt/fp-utils';

import './banner.css';

export type BannerSize = 'small' | 'large' | 'xlarge';

export interface BannerProps {
    size: BannerSize;
    className?: string;
    children: React.ReactNode;
}

const bem = bemUtils('banner');

export const Banner = ({ size, className, children }: BannerProps) => (
    <div className={`${bem.block} ${bem.block}--${size} ${className}`}>{children}</div>
);
