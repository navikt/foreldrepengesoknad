import React from 'react';

import Lenke from 'nav-frontend-lenker';

interface Props {
    className?: string;
    onClick: () => void;
}

const stopClickEvent = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
};

const ActionLink: React.FunctionComponent<Props> = ({ onClick, children, className }) => {
    return (
        <Lenke
            className={className}
            href="#"
            onClick={(evt) => {
                stopClickEvent(evt);
                onClick();
            }}
        >
            {children}
        </Lenke>
    );
};

export default ActionLink;
