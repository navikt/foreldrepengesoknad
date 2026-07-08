import { ReactNode } from 'react';

import { cx } from './cardTone';

interface Props {
    /** Berre medium og xl har romm til ein eigen metadata-chip, jf. innhaldsprioriteringa. */
    size: 'medium' | 'xl';
    children: ReactNode;
    className?: string;
}

/**
 * Generisk metadata-chip (kvote, gradering, dag-teljar o.l.), lagt oppå kortets tone som ei
 * halvgjennomsiktig flate – fungerer difor uavhengig av kva tone kortet har.
 */
export const CardChip = ({ size, children, className }: Props) => (
    <span
        className={cx(
            'inline-flex w-fit items-center gap-1 self-start rounded px-2 py-0.5 font-medium',
            size === 'xl' ? 'bg-white/60 text-[12px]' : 'bg-black/[0.06] text-[11px]',
            className,
        )}
    >
        {children}
    </span>
);
