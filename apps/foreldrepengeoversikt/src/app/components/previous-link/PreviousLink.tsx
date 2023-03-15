import { Back } from '@navikt/ds-icons';
import { BodyShort, Link as DSLink } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './previous-link.css';

interface Props {
    ariaLabel?: string;
    className?: string;
    externalURL?: boolean;
    linkLabel: string;
    onClick?: (route: string, event: React.SyntheticEvent) => void;
    route: string;
}

const Breadcrumb: React.FunctionComponent<Props> = ({ route, externalURL = false, linkLabel, ariaLabel, onClick }) => {
    const navigate = useNavigate();
    const bem = bemUtils('previous-link');

    const handleOnClick = (event: React.SyntheticEvent) => {
        if (onClick) {
            onClick(route, event);
        } else {
            event.preventDefault();
            navigate(route);
        }
    };

    if (externalURL) {
        return (
            <DSLink className={bem.block} href={route} aria-label={ariaLabel}>
                <Back />
                <BodyShort>{linkLabel}</BodyShort>
            </DSLink>
        );
    }

    return (
        <Link className={bem.block} to={route} aria-label={ariaLabel} onClick={handleOnClick}>
            <Back />
            <BodyShort>{linkLabel}</BodyShort>
        </Link>
    );
};

export default Breadcrumb;
