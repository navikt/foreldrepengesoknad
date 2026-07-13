import { HTMLAttributes, ReactNode } from 'react';

import { STATE_BADGE_KLASSE, cx } from './cardTone';
import { CardStateTone } from './types';

interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'className'> {
    tone: CardStateTone;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

/**
 * Badge for kortets state-kanal (aldri for tone-kanalen). Farga etter kva slags state det er
 * (warning/danger), aldri etter kven kortet tilhøyrer. Send same `tone` som `Card`s `state`-prop.
 */
export const CardBadge = ({ tone, icon, children, className, ...rest }: Props) => (
    <span
        className={cx(
            'inline-flex w-fit items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold [&>svg]:h-[11px] [&>svg]:w-[11px]',
            STATE_BADGE_KLASSE[tone],
            className,
        )}
        {...rest}
    >
        {icon}
        {children}
    </span>
);
