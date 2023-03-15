import { Heading, LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import React from 'react';
import { Link } from 'react-router-dom';
import StatusTag from '../status-tag/StatusTag';

import './sak-link.css';

interface Props {
    sak: Sak;
}

const getHeading = (ytelse: Ytelse) => {
    switch (ytelse) {
        case Ytelse.ENGANGSSTØNAD:
            return 'Engangsstønad';
        case Ytelse.FORELDREPENGER:
            return 'Foreldrepenger';
        case Ytelse.SVANGERSKAPSPENGER:
            return 'Svangerskapspenger';
    }
};

const SakLink: React.FunctionComponent<Props> = ({ sak }) => {
    const bem = bemUtils('sak-link');

    return (
        <LinkPanel as={Link} to={`/sak/${sak.saksnummer}`} className={bem.block}>
            <div className={bem.element('content')}>
                <Heading level="3" size="medium">
                    {getHeading(sak.ytelse)}
                </Heading>
                <StatusTag sak={sak} />
            </div>
        </LinkPanel>
    );
};

export default SakLink;
