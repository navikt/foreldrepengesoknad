import { IntlShape, useIntl } from 'react-intl';

import { MorsAktivitet } from '@navikt/fp-types';
import { assertUnreachable } from '@navikt/fp-validation';

import { Feltoppsummering } from './Feltoppsummering';

interface Props {
    morsAktivitet: MorsAktivitet;
}

const getMorsAktivitetTekst = (intl: IntlShape, aktivitet: MorsAktivitet): string => {
    switch (aktivitet) {
        case 'ARBEID':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Arbeid' });
        case 'ARBEID_OG_UTDANNING':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.ArbeidOgUtdanning' });
        case 'INNLAGT':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Innlagt' });
        case 'INTROPROG':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Introduksjonsprogrammet' });
        case 'KVALPROG':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Kvalifiseringsprogrammet' });
        case 'TRENGER_HJELP':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.TrengerHjelp' });
        case 'UFØRE':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Uføre' });
        case 'UTDANNING':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Utdanning' });
        case 'IKKE_OPPGITT':
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.UtenAktivitetsKrav' });
        default:
            return assertUnreachable('Mor har ingen aktivitet');
    }
};

export const MorsAktivitetDetaljer = ({ morsAktivitet }: Props) => {
    const intl = useIntl();

    return (
        <Feltoppsummering
            feltnavn={intl.formatMessage({ id: 'oppsummering.morsAktivitet' })}
            verdi={getMorsAktivitetTekst(intl, morsAktivitet)}
        />
    );
};
