import { ReactNode } from 'react';

import { cx } from './cardTone';

interface Props {
    children: ReactNode;
    className?: string;
}

/** Rad for handlingsknappar (Endre/Slett o.l.), berre i xl-kortet. Legg Aksel-`Button` i han. */
export const CardActions = ({ children, className }: Props) => (
    <div className={cx('mt-1 flex gap-2.5', className)}>{children}</div>
);
