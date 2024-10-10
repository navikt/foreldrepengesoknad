import { formatDate } from '@navikt/fp-utils';

import StatusTag from '../status-tag/StatusTag';
import { Sak } from './../../types/Sak';
import { Ytelse } from './../../types/Ytelse';
import { LenkePanel } from './../lenke-panel/LenkePanel';

interface Props {
    sak: Sak;
    harMinstEttArbeidsforhold: boolean;
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

export const SakLink: React.FunctionComponent<Props> = ({ sak, harMinstEttArbeidsforhold }) => {
    return (
        <LenkePanel
            tag={<StatusTag sak={sak} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />}
            undertittel={`Sist oppdatert ${formatDate(sak.oppdatertTidspunkt)}`}
            tittel={getHeading(sak.ytelse)}
            to={`/sak/${sak.saksnummer}`}
        />
    );
};
