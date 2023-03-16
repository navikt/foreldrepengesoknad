import React, { ReactNode } from 'react';
import classnames from 'classnames';
import './knappelenke.less';

interface Props {
    href: string;
    children: ReactNode;
    type?: string;
}

const Knappelenke = ({ href, type, children }: Props) => (
    <a href={href} className={classnames('knapp', `knapp--${type || 'standard'}`, 'knappelenke')}>
        <span>{children}</span>
    </a>
);

export default Knappelenke;