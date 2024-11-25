import { IntlShape, useIntl } from 'react-intl';

import { MorsAktivitet } from '@navikt/fp-common';
import { assertUnreachable } from '@navikt/fp-validation';

import { Feltoppsummering } from './Feltoppsummering';

interface Props {
    morsAktivitet: MorsAktivitet;
}

const getMorsAktivitetTekst = (intl: IntlShape, aktivitet: MorsAktivitet): string => {
    switch (aktivitet) {
        case MorsAktivitet.Arbeid:
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Arbeid' });
        case MorsAktivitet.ArbeidOgUtdanning:
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.ArbeidOgUtdanning' });
        case MorsAktivitet.Innlagt:
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Innlagt' });
        case MorsAktivitet.Introduksjonsprogrammet:
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Introduksjonsprogrammet' });
        case MorsAktivitet.Kvalifiseringsprogrammet:
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Kvalifiseringsprogrammet' });
        case MorsAktivitet.TrengerHjelp:
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.TrengerHjelp' });
        case MorsAktivitet.Uføre:
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Uføre' });
        case MorsAktivitet.Utdanning:
            return intl.formatMessage({ id: 'oppsummering.morsAktivitet.Utdanning' });
        case MorsAktivitet.IkkeOppgitt:
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
