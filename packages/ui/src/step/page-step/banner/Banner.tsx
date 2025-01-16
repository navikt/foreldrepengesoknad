import React from 'react';

import styles from './banner.module.css';

export type BannerSize = 'small' | 'large' | 'xlarge';

export interface BannerProps {
    children: React.ReactNode;
}

export const Banner = ({ children }: BannerProps) => <div className={styles.banner}>{children}</div>;
