import { Link } from '@navikt/ds-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
}

const stopClickEvent = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
};

const ValidationErrorLink: React.FunctionComponent<Props> = ({ onClick, children, className }) => {
    return (
        <Link
            className={className}
            href="#"
            onClick={(evt) => {
                stopClickEvent(evt);
                onClick();
            }}
        >
            {children}
        </Link>
    );
};

export default ValidationErrorLink;
