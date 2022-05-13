import * as React from 'react';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { Attachment } from 'app/types/Attachment';
import { IntlShape, useIntl } from 'react-intl';
import OppsummeringAvDokumentasjon from '../oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import { intlUtils } from '@navikt/fp-common';
import { assertUnreachable } from 'app/utils/globalUtil';

interface MorsAktivitetDetaljerProps {
    morsAktivitet: MorsAktivitet;
    dokumentasjonAvMorsAktivitet: Attachment[];
    visOppsummeringAvDokumentasjon: boolean;
}

type Props = MorsAktivitetDetaljerProps;

const getMorsAktivitetTekst = (intl: IntlShape, aktivitet: MorsAktivitet): string => {
    switch (aktivitet) {
        case MorsAktivitet.Arbeid:
            return intlUtils(intl, 'oppsummering.morsAktivitet.Arbeid');
        case MorsAktivitet.ArbeidOgUtdanning:
            return intlUtils(intl, 'oppsummering.morsAktivitet.ArbeidOgUtdanning');
        case MorsAktivitet.Innlagt:
            return intlUtils(intl, 'oppsummering.morsAktivitet.Innlagt');
        case MorsAktivitet.Introduksjonsprogrammet:
            return intlUtils(intl, 'oppsummering.morsAktivitet.Introduksjonsprogrammet');
        case MorsAktivitet.Kvalifiseringsprogrammet:
            return intlUtils(intl, 'oppsummering.morsAktivitet.Kvalifiseringsprogrammet');
        case MorsAktivitet.TrengerHjelp:
            return intlUtils(intl, 'oppsummering.morsAktivitet.TrengerHjelp');
        case MorsAktivitet.Uføre:
            return intlUtils(intl, 'oppsummering.morsAktivitet.Uføre');
        case MorsAktivitet.Utdanning:
            return intlUtils(intl, 'oppsummering.morsAktivitet.Utdanning');
        case MorsAktivitet.UtenAktivitetsKrav:
            return intlUtils(intl, 'oppsummering.morsAktivitet.UtenAktivitetsKrav');
        default:
            return assertUnreachable(aktivitet, 'Mor har ingen aktivitet');
    }
};

const MorsAktivitetDetaljer: React.FunctionComponent<Props> = ({
    morsAktivitet,
    dokumentasjonAvMorsAktivitet,
    visOppsummeringAvDokumentasjon,
}) => {
    const intl = useIntl();

    return (
        <>
            <Feltoppsummering
                feltnavn={intlUtils(intl, 'oppsummering.morsAktivitet')}
                verdi={getMorsAktivitetTekst(intl, morsAktivitet)}
            />
            {visOppsummeringAvDokumentasjon && (
                <OppsummeringAvDokumentasjon
                    ledetekst={intlUtils(intl, 'oppsummering.morsAktivitet.dokumentasjon')}
                    vedlegg={dokumentasjonAvMorsAktivitet}
                />
            )}
        </>
    );
};

export default MorsAktivitetDetaljer;
