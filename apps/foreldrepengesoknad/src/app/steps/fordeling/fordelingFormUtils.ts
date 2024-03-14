import { getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/uttaksplan/src/utils/uttaksdatoerUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { ISOStringToDate, Uttaksdagen, formatDate, intlUtils } from '@navikt/fp-common';
import { getNumberFromNumberInputValue } from '@navikt/fp-formik';

import { OppstartValg } from 'app/context/types/Fordeling';

export const validateAntallUkerFellesperiode = (intl: IntlShape, dagerMedFellesperiode: number) => (value: string) => {
    const valueNumber = getNumberFromNumberInputValue(value)!;
    const maxValueUker = dagerMedFellesperiode / 5;
    if (valueNumber < 0) {
        return intlUtils(intl, 'fordeling.antallUker.forLiten');
    }

    if (valueNumber > maxValueUker) {
        return intlUtils(intl, 'fordeling.antallUker.forStor', { maxValue: maxValueUker });
    }

    return undefined;
};

export const validateOppstartsdato =
    (intl: IntlShape, minDato: Date | undefined, maxDato: Date | undefined) => (value: string) => {
        if (minDato && dayjs(value).isBefore(minDato, 'd')) {
            return intlUtils(intl, 'fordeling.oppstartsdato.forTidlig', { minDate: formatDate(minDato) });
        }

        if (maxDato && dayjs(value).isAfter(maxDato, 'd')) {
            return intlUtils(intl, 'fordeling.oppstartsdato.forSent', { maxDate: formatDate(maxDato) });
        }

        return undefined;
    };

const getNesteUttaksdagEtterAnnenForelder = (sisteDagAnnenForelder: Date) => {
    const sisteUttaksdagAnnenForelder = Uttaksdagen(sisteDagAnnenForelder).denneEllerForrige();
    return Uttaksdagen(sisteUttaksdagAnnenForelder).neste();
};

export const getOppstartsdatoFromInput = (
    oppstartValg: OppstartValg | undefined,
    oppstartDato: string | undefined,
    termindato: Date | undefined,
    familiehendelsesdato: Date,
    ankomstDatoNorge: Date | undefined,
    sisteDagAnnenForelder: Date | undefined,
    datoForAleneomsorg: Date | undefined,
): Date => {
    if ((!oppstartValg || oppstartValg === OppstartValg.ANNEN_DATO) && oppstartDato) {
        return ISOStringToDate(oppstartDato)!;
    }
    switch (oppstartValg) {
        case OppstartValg.TRE_UKER_FØR_TERMIN:
            if (termindato) {
                return getFørsteUttaksdagForeldrepengerFørFødsel(termindato);
            } else {
                throw new Error('Mangler informasjon om termindato.');
            }
        case OppstartValg.FAMILIEHENDELSESDATO:
            return familiehendelsesdato;
        case OppstartValg.ANKOMSTDATO_NORGE:
            if (ankomstDatoNorge) {
                return ankomstDatoNorge;
            } else {
                throw new Error('Mangler informasjon om ankomst til Norge.');
            }
        case OppstartValg.DAGEN_ETTER_ANNEN_FORELDER:
            if (sisteDagAnnenForelder) {
                return getNesteUttaksdagEtterAnnenForelder(sisteDagAnnenForelder);
            } else {
                throw new Error('Mangler informasjon om annen forelders siste dag.');
            }
        case OppstartValg.OMSORGSOVERTAKELSE:
            if (datoForAleneomsorg) {
                return Uttaksdagen(datoForAleneomsorg).denneEllerNeste();
            } else {
                throw new Error('Mangler informasjon om omsorgsovertakelsedato.');
            }
        default:
            throw new Error('Ukjent verdi på oppstartValg.');
    }
};
