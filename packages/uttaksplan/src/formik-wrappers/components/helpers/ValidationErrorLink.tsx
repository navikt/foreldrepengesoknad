import React from 'react';

import { Link } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
}

const stopClickEvent = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
};
// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
// eslint-disable-next-line import/no-default-export
export default ValidationErrorLink;
