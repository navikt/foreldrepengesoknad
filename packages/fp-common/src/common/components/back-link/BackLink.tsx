import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Link } from '@navikt/ds-react';
import { Back } from '@navikt/ds-icons';

interface BackLinkProps {
    className?: string;
    href: string;
    ariaLabel?: string;
    onClick?: (href: string, event: React.SyntheticEvent) => void;
}

const BackLink: React.FunctionComponent<BackLinkProps> = ({ className, href, onClick, ariaLabel }) => {
    const navigate = useNavigate();

    const handleOnClick = (event: React.SyntheticEvent) => {
        if (onClick) {
            onClick(href, event);
        } else {
            event.preventDefault();
            navigate(href);
        }
    };

    return (
        <Link href={href} aria-label={ariaLabel} onClick={handleOnClick}>
            <Back />
            <FormattedMessage id="backlink.label" />
        </Link>
    );
};

export default BackLink;
