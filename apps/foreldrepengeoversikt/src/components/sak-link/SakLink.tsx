import { useIntl } from 'react-intl';

import { formatDate } from '@navikt/fp-utils';

import { Sak } from '../../types/Sak';
import { LenkePanel } from '../lenke-panel/LenkePanel';
import { StatusTag } from '../status-tag/StatusTag';

interface Props {
    sak: Sak;
    harMinstEttArbeidsforhold: boolean;
}

export const SakLink = ({ sak, harMinstEttArbeidsforhold }: Props) => {
    const intl = useIntl();
    return (
        <LenkePanel
            tag={<StatusTag sak={sak} harMinstEttArbeidsforhold={harMinstEttArbeidsforhold} />}
            undertittel={`Sist oppdatert ${formatDate(sak.oppdatertTidspunkt)}`}
            tittel={intl.formatMessage({ id: `ytelse.${sak.ytelse}` })}
            to={`/sak/${sak.saksnummer}`}
        />
    );
};
