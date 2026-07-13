import { ReactNode } from 'react';

import { TONE_BG_MODERATE, TONE_TEXT_CONTRAST, cx } from './cardTone';
import { CardTone } from './types';

const STORLEIK_KLASSE = {
    small: 'h-[22px] w-[22px] [&>svg]:h-3 [&>svg]:w-3',
    medium: 'h-[22px] w-[22px] [&>svg]:h-[13px] [&>svg]:w-[13px]',
    xl: 'h-9 w-9 [&>svg]:h-5 [&>svg]:w-5',
} as const;

interface Props {
    /**
     * Sirkelen finst i utgangspunktet berre i medium- og xl-storleik i card-anatomien, men
     * `small` er lagt til her sidan Ukevisning (veke-mikrokortet) allereie brukar same
     * ikonsirkel-storleik som medium for å få plass til ikon + tekst i ei smal vekekolonne.
     */
    size: 'small' | 'medium' | 'xl';
    tone: CardTone;
    children: ReactNode;
    className?: string;
}

/**
 * Fylt sirkel med ikon, brukt i toppen av medium- og xl-kort for å vise kven kortet
 * tilhøyrer (same tone som sjølve kortet, men i «moderate»-styrke for kontrast mot
 * «soft»-bakgrunnen).
 */
export const CardIconCircle = ({ size, tone, children, className }: Props) => (
    <div
        className={cx(
            'flex shrink-0 items-center justify-center rounded-full',
            STORLEIK_KLASSE[size],
            TONE_BG_MODERATE[tone],
            TONE_TEXT_CONTRAST[tone],
            className,
        )}
        aria-hidden
    >
        {children}
    </div>
);
