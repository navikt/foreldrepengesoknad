import {
    AnnenForelder,
    Arbeidsforhold,
    AttachmentType,
    PeriodeUtenUttakUtsettelse,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
} from '@navikt/fp-common';
import * as React from 'react';
import { useIntl } from 'react-intl';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from '../oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import { getÅrsakTekst } from '../OppsummeringUtils';
import MorsAktivitetDetaljer from './MorsaktiviteterDetaljer';
import { shouldPeriodeHaveAttachment } from '@navikt/uttaksplan';

interface UtsettelsesperiodedetaljerProps {
    periode: Utsettelsesperiode | PeriodeUtenUttakUtsettelse;
    registrerteArbeidsforhold: Arbeidsforhold[];
    søkerErFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
    periodeErNyEllerEndret: boolean;
}

const Utsettelsesperiodedetaljer: React.FunctionComponent<UtsettelsesperiodedetaljerProps> = ({
    periode,
    søkerErFarEllerMedmor,
    annenForelder,
    periodeErNyEllerEndret,
}) => {
    const { årsak, morsAktivitetIPerioden, vedlegg, bekrefterArbeidIPerioden } = periode;
    const intl = useIntl();
    const bekreftErIArbeidSvar =
        bekrefterArbeidIPerioden === true ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' });

    return (
        <>
            <Feltoppsummering
                feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {shouldPeriodeHaveAttachment(periode, søkerErFarEllerMedmor, annenForelder) &&
                periodeErNyEllerEndret &&
                periode.årsak !== UtsettelseÅrsakType.Fri && (
                    <OppsummeringAvDokumentasjon
                        vedlegg={(vedlegg || []).filter(
                            (currentVedlegg) => currentVedlegg.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                        )}
                    />
                )}
            {årsak === UtsettelseÅrsakType.Arbeid && (
                <Feltoppsummering
                    feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.bekreft100ProsentIArbeid.label' })}
                    verdi={bekreftErIArbeidSvar}
                />
            )}
            {shouldPeriodeHaveAttachment(periode, søkerErFarEllerMedmor, annenForelder) && morsAktivitetIPerioden && (
                <MorsAktivitetDetaljer
                    morsAktivitet={morsAktivitetIPerioden}
                    dokumentasjonAvMorsAktivitet={(vedlegg || []).filter(
                        (currentVedlegg) => currentVedlegg.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
                    )}
                    visOppsummeringAvDokumentasjon={periodeErNyEllerEndret}
                />
            )}
        </>
    );
};

export default Utsettelsesperiodedetaljer;
