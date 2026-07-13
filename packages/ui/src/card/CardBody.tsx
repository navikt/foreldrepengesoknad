import { ReactNode } from 'react';

import { cx } from './cardTone';

interface Props {
    children: ReactNode;
    className?: string;
}

/** Situasjonstilpassa brødtekst, berre i xl-kortet. */
export const CardBody = ({ children, className }: Props) => (
    <p className={cx('text-sm leading-[1.55]', className)}>{children}</p>
);
