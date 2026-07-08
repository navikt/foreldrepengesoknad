import { ReactNode } from 'react';

import { Tag } from '@navikt/ds-react';

import { cx } from './cardTone';
import { CardTone } from './types';

const STORLEIK_KLASSE = {
    medium: 'text-[11px]',
    xl: 'text-[12px]',
} as const;

interface Props {
    /** Berre medium og xl har romm til ein eigen metadata-chip, jf. innhaldsprioriteringa. */
    size: 'medium' | 'xl';
    /** Same tone som sjølve kortet, viss chippen skal fargast etter kva kortet «er». Utelate gjev ein nøytral chip. */
    tone?: CardTone;
    children: ReactNode;
    className?: string;
}

/**
 * Generisk metadata-chip (kvote, gradering, dag-teljar o.l.). Bruker Aksel sin `Tag` med
 * `variant="outline"` for å få ei tynn ramme rundt – i staden for ei eiga, handlaga
 * halvgjennomsiktig flate – slik at chippen ser konsistent ut med resten av designsystemet.
 */
export const CardChip = ({ size, tone, children, className }: Props) => (
    <Tag
        variant="outline"
        size={size === 'xl' ? 'small' : 'xsmall'}
        data-color={tone}
        className={cx('w-fit self-start font-medium', STORLEIK_KLASSE[size], className)}
    >
        {children}
    </Tag>
);
