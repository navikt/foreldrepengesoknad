import {
    getFørsteUttaksdagAnkomstdatoNorge,
    getFørsteUttaksdagForeldrepengerFørFødsel,
    getFørsteUttaksdagOmsorgsovertakelse,
} from '@navikt/uttaksplan/src/utils/uttaksdatoerUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { ISOStringToDate, Uttaksdagen, formatDate, intlUtils } from '@navikt/fp-common';
import { getNumberFromNumberInputValue } from '@navikt/fp-formik';

import Fordeling, { FellesperiodeFordelingValg, OppstartValg } from 'app/context/types/Fordeling';

export const getAntallUkerFellesperiodeTilSøker = (
    antallUkerFellesperiode: number,
    fordeling: Fordeling,
): number | undefined => {
    if (fordeling.fordelingValg === FellesperiodeFordelingValg.LIKT) {
        return antallUkerFellesperiode / 2;
    }
    if (fordeling.fordelingValg === FellesperiodeFordelingValg.VIL_VELGE) {
        return getNumberFromNumberInputValue(fordeling.antallUkerFellesperiodeTilSøker);
    }
    return undefined;
};

export const validateAntallUkerFellesperiode = (intl: IntlShape, dagerMedFellesperiode: number) => (value: string) => {
    const valueNumber = getNumberFromNumberInputValue(value)!;
    const maxValueUker = dagerMedFellesperiode / 5;

    if (valueNumber === undefined || Math.round(valueNumber) !== valueNumber) {
        return intlUtils(intl, 'fordeling.antallUker.ugyldigFormat');
    }

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
            return intlUtils(intl, 'fordeling.oppstartsdato.forTidlig', { minDato: formatDate(minDato) });
        }

        if (maxDato && dayjs(value).isAfter(maxDato, 'd')) {
            return intlUtils(intl, 'fordeling.oppstartsdato.forSent', { maxDato: formatDate(maxDato) });
        }

        return undefined;
    };

const getNesteUttaksdagEtterAnnenForelder = (sisteDagAnnenForelder: Date | undefined) => {
    if (!sisteDagAnnenForelder) {
        throw new Error('Mangler informasjon om annen forelders siste dag.');
    }
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
            return getFørsteUttaksdagForeldrepengerFørFødsel(termindato);
        case OppstartValg.TRE_UKER_FØR_FØDSEL:
            return getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
        case OppstartValg.FAMILIEHENDELSESDATO:
            return familiehendelsesdato;
        case OppstartValg.ANKOMSTDATO_NORGE:
            return getFørsteUttaksdagAnkomstdatoNorge(ankomstDatoNorge);
        case OppstartValg.DAGEN_ETTER_ANNEN_FORELDER:
            return getNesteUttaksdagEtterAnnenForelder(sisteDagAnnenForelder);
        case OppstartValg.OMSORGSOVERTAKELSE:
            return getFørsteUttaksdagOmsorgsovertakelse(datoForAleneomsorg);
        default:
            throw new Error('Ukjent verdi på oppstartValg.');
    }
};
