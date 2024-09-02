import { Link } from '@navikt/ds-react';

interface Props {
    className?: string;
    onClick: () => void;
    ariaLabel?: string;
    children: React.ReactNode;
}

const stopClickEvent = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
};

const ActionLink: React.FunctionComponent<Props> = ({ onClick, children, className, ariaLabel }) => {
    return (
        <Link
            className={className}
            href="#"
            aria-label={ariaLabel}
            onClick={(evt) => {
                stopClickEvent(evt);
                onClick();
            }}
        >
            {children}
        </Link>
    );
};

export default ActionLink;
