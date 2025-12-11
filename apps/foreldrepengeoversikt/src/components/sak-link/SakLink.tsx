import { useIntl } from 'react-intl';

import { Ytelse } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

import { Sak } from '../../types/Sak';
import { LenkePanel } from '../lenke-panel/LenkePanel';
import { StatusTag } from '../status-tag/StatusTag';

interface Props {
    sak: Sak;
    harMinstEttArbeidsforhold: boolean;
}

const getHeading = (ytelse: Ytelse, intl: ReturnType<typeof useIntl>) => {
    switch (ytelse) {
        case 'ENGANGSSTØNAD':
            return intl.formatMessage({ id: 'ytelse.engangsstønad' });
        case 'FORELDREPENGER':
            return intl.formatMessage({ id: 'ytelse.foreldrepenger' });
        case 'SVANGERSKAPSPENGER':
            return intl.formatMessage({ id: 'ytelse.svangerskapspenger' });
    }
};

export const SakLink = ({ sak, harMinstEttArbeidsforhold }: Props) => {
    const intl = useIntl();
    return (
        <LenkePanel
            tag={<StatusTag sak={sak} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />}
            undertittel={`Sist oppdatert ${formatDate(sak.oppdatertTidspunkt)}`}
            tittel={getHeading(sak.ytelse, intl)}
            to={`/sak/${sak.saksnummer}`}
        />
    );
};
