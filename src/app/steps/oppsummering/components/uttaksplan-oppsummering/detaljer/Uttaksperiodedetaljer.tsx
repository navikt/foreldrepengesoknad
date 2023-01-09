import { intlUtils } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { shouldPeriodeHaveAttachment } from 'app/utils/manglendeVedleggUtils';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { UttaksperiodeBase } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import MorsAktivitetDetaljer from './MorsaktiviteterDetaljer';
import { getArbeidsformTekst } from '../OppsummeringUtils';

interface UttaksperiodedetaljerProps {
    periode: UttaksperiodeBase;
    registrerteArbeidsforhold: Arbeidsforhold[] | undefined;
    periodeErNyEllerEndret: boolean;
    søkerErFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
}

type Props = UttaksperiodedetaljerProps;

const Uttaksperiodedetaljer: React.FunctionComponent<Props> = ({
    periode,
    registrerteArbeidsforhold,
    periodeErNyEllerEndret,
    søkerErFarEllerMedmor,
    annenForelder,
}) => {
    const {
        konto,
        morsAktivitetIPerioden,
        ønskerSamtidigUttak,
        gradert,
        stillingsprosent,
        orgnumre,
        arbeidsformer,
        vedlegg,
        ønskerFlerbarnsdager,
    } = periode;
    const intl = useIntl();

    let arbeidsformTekst = '';
    if (arbeidsformer) {
        arbeidsformTekst = getArbeidsformTekst(intl, arbeidsformer, orgnumre, registrerteArbeidsforhold).join('\r\n');
    }

    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;

    return (
        <>
            {ønskerFlerbarnsdager !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intlUtils(intl, 'oppsummering.uttak.ønskerFlerbarnsdager')}
                    verdi={ønskerFlerbarnsdager ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}
                />
            )}
            {ønskerSamtidigUttak !== undefined && erDeltUttakINorge && (
                <Feltoppsummering
                    feltnavn={intlUtils(intl, 'oppsummering.uttak.samtidigUttak')}
                    verdi={ønskerSamtidigUttak ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}
                />
            )}
            {konto !== StønadskontoType.ForeldrepengerFørFødsel && ønskerSamtidigUttak !== true && (
                <Feltoppsummering
                    feltnavn={intlUtils(intl, 'oppsummering.uttak.kombineresMedarbeid')}
                    verdi={gradert ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}
                />
            )}

            {gradert === true && stillingsprosent && (
                <Feltoppsummering
                    feltnavn={intlUtils(intl, 'oppsummering.uttak.stillingsprosent')}
                    verdi={stillingsprosent}
                />
            )}

            {arbeidsformer && (
                <Feltoppsummering
                    feltnavn={intlUtils(intl, 'oppsummering.uttak.arbeidstaker.label')}
                    verdi={arbeidsformTekst}
                />
            )}
            {shouldPeriodeHaveAttachment(periode, søkerErFarEllerMedmor, annenForelder) && morsAktivitetIPerioden && (
                <MorsAktivitetDetaljer
                    morsAktivitet={morsAktivitetIPerioden}
                    dokumentasjonAvMorsAktivitet={vedlegg || []}
                    visOppsummeringAvDokumentasjon={periodeErNyEllerEndret}
                />
            )}
        </>
    );
};

export default Uttaksperiodedetaljer;
