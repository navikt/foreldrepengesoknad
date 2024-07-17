import { Link } from 'react-router-dom';

import { Heading, LinkPanel, VStack } from '@navikt/ds-react';

import { bemUtils, formatDate } from '@navikt/fp-utils';

import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';

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
    console.log(sak);
    return (
        <LinkPanel as={Link} to={`/sak/${sak.saksnummer}`} className={bem.block}>
            <VStack gap="1">
                <Heading level="3" size="medium">
                    {getHeading(sak.ytelse)}
                </Heading>
                <span>Sist oppdatert {formatDate(sak.oppdatertTidspunkt)}</span>
            </VStack>
            <StatusTag sak={sak} />
        </LinkPanel>
    );
};

export default SakLink;
