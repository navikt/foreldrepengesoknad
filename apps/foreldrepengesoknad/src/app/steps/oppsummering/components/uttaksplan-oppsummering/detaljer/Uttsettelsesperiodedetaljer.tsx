import { intlUtils } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { AttachmentType } from 'app/types/AttachmentType';
import { shouldPeriodeHaveAttachment } from 'app/utils/manglendeVedleggUtils';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUtenUttakUtsettelse, Utsettelsesperiode } from 'uttaksplan/types/Periode';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from '../oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import { getÅrsakTekst } from '../OppsummeringUtils';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import MorsAktivitetDetaljer from './MorsaktiviteterDetaljer';
import AnnenForelder from 'app/context/types/AnnenForelder';

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
    const bekreftErIArbeidSvar = bekrefterArbeidIPerioden === true ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei');

    return (
        <>
            <Feltoppsummering
                feltnavn={intlUtils(intl, 'oppsummering.uttak.årsak')}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {shouldPeriodeHaveAttachment(periode, søkerErFarEllerMedmor, annenForelder) &&
                periodeErNyEllerEndret &&
                periode.årsak !== UtsettelseÅrsakType.Fri && (
                    <OppsummeringAvDokumentasjon
                        vedlegg={(vedlegg || []).filter(
                            (currentVedlegg) => currentVedlegg.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                        )}
                    />
                )}
            {årsak === UtsettelseÅrsakType.Arbeid && (
                <Feltoppsummering
                    feltnavn={intlUtils(intl, 'oppsummering.uttak.bekreft100ProsentIArbeid.label')}
                    verdi={bekreftErIArbeidSvar}
                />
            )}
            {shouldPeriodeHaveAttachment(periode, søkerErFarEllerMedmor, annenForelder) && morsAktivitetIPerioden && (
                <MorsAktivitetDetaljer
                    morsAktivitet={morsAktivitetIPerioden}
                    dokumentasjonAvMorsAktivitet={(vedlegg || []).filter(
                        (currentVedlegg) => currentVedlegg.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                    )}
                    visOppsummeringAvDokumentasjon={periodeErNyEllerEndret}
                />
            )}
        </>
    );
};

export default Utsettelsesperiodedetaljer;
