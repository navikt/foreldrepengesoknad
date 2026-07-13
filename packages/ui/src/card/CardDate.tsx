import { ReactNode } from 'react';

import { cx } from './cardTone';

const STORLEIK_KLASSE = {
    small: 'text-xs font-medium opacity-85',
    medium: 'text-[13px] font-medium opacity-85',
    xl: 'text-sm opacity-85',
} as const;

interface Props {
    size: 'small' | 'medium' | 'xl';
    children: ReactNode;
    className?: string;
}

/** Datotekst/-intervall, t.d. «15. mai» eller «15. mai 2026 · Mødrekvote». */
export const CardDate = ({ size, children, className }: Props) => (
    <span className={cx(STORLEIK_KLASSE[size], className)}>{children}</span>
);
