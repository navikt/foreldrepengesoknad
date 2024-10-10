import { formatDate } from '@navikt/fp-utils';

import { LenkePanel } from 'app/components/lenke-panel/LenkePanel';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';

import StatusTag from '../status-tag/StatusTag';

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
