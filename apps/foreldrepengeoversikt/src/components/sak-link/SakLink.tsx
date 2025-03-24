import { Ytelse } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

import { Sak } from '../../types/Sak';
import { LenkePanel } from '../lenke-panel/LenkePanel';
import { StatusTag } from '../status-tag/StatusTag';

interface Props {
    sak: Sak;
    harMinstEttArbeidsforhold: boolean;
}

const getHeading = (ytelse: Ytelse) => {
    switch (ytelse) {
        case 'ENGANGSSTØNAD':
            return 'Engangsstønad';
        case 'FORELDREPENGER':
            return 'Foreldrepenger';
        case 'SVANGERSKAPSPENGER':
            return 'Svangerskapspenger';
    }
};

export const SakLink = ({ sak, harMinstEttArbeidsforhold }: Props) => {
    return (
        <LenkePanel
            tag={<StatusTag sak={sak} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />}
            undertittel={`Sist oppdatert ${formatDate(sak.oppdatertTidspunkt)}`}
            tittel={getHeading(sak.ytelse)}
            to={`/sak/${sak.saksnummer}`}
        />
    );
};
