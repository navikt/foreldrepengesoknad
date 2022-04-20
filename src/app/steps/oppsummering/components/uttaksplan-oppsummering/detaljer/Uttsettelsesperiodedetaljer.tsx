import { intlUtils } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { AttachmentType } from 'app/types/AttachmentType';
import { shouldPeriodeHaveAttachment } from 'app/utils/manglendeVedleggUtils';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUtenUttakUtsettelse, Utsettelsesperiode } from 'uttaksplan/types/Periode';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from '../oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import { getArbeidsformTekst, getÅrsakTekst } from '../OppsummeringUtils';
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
    registrerteArbeidsforhold,
    søkerErFarEllerMedmor,
    annenForelder,
    periodeErNyEllerEndret,
}) => {
    const { årsak, morsAktivitetIPerioden, orgnumre, arbeidsformer, vedlegg } = periode;
    const intl = useIntl();

    let arbeidsformTekst: string[] = [];
    if (arbeidsformer) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsformer, orgnumre, registrerteArbeidsforhold);
    }

    return (
        <>
            <Feltoppsummering
                feltnavn={intlUtils(intl, 'oppsummering.uttak.årsak')}
                verdi={getÅrsakTekst(intl, periode)}
            />
            {shouldPeriodeHaveAttachment(periode, søkerErFarEllerMedmor, annenForelder) && periodeErNyEllerEndret && (
                <OppsummeringAvDokumentasjon
                    vedlegg={(vedlegg || []).filter(
                        (currentVedlegg) => currentVedlegg.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON
                    )}
                />
            )}
            {årsak === UtsettelseÅrsakType.Arbeid && (
                <Feltoppsummering
                    feltnavn={intlUtils(intl, 'oppsummering.uttak.arbeidstaker.label')}
                    verdi={arbeidsformTekst}
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
