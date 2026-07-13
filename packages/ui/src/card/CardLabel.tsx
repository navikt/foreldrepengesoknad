import { ReactNode } from 'react';

import { cx } from './cardTone';

const STORLEIK_KLASSE = {
    small: 'text-[13px] font-semibold truncate',
    medium: 'flex-1 text-sm font-semibold',
    xl: 'text-[17px] font-semibold',
} as const;

interface Props {
    size: 'small' | 'medium' | 'xl';
    children: ReactNode;
    className?: string;
}

/** Typetekst/tittel, t.d. «Mors periode» eller «Fellesperiode». Storleiken styrer skriftstorleiken. */
export const CardLabel = ({ size, children, className }: Props) => (
    <span className={cx(STORLEIK_KLASSE[size], className)}>{children}</span>
);
