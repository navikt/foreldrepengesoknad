import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { MorsAktivitet, assertUnreachable } from '@navikt/fp-common';

import Feltoppsummering from '../feltoppsummering/Feltoppsummering';

interface MorsAktivitetDetaljerProps {
    morsAktivitet: MorsAktivitet;
}

type Props = MorsAktivitetDetaljerProps;

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
            return assertUnreachable(aktivitet, 'Mor har ingen aktivitet');
    }
};

const MorsAktivitetDetaljer: React.FunctionComponent<Props> = ({ morsAktivitet }) => {
    const intl = useIntl();

    return (
        <Feltoppsummering
            feltnavn={intl.formatMessage({ id: 'oppsummering.morsAktivitet' })}
            verdi={getMorsAktivitetTekst(intl, morsAktivitet)}
        />
    );
};

export default MorsAktivitetDetaljer;
