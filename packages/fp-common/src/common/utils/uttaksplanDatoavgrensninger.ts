import dayjs from 'dayjs';

import uttaksConstants from '../constants/constants';
import { Situasjon } from '../types';
import { Uttaksdagen } from './Uttaksdagen';
import { andreAugust2022ReglerGjelder } from './dateUtils';
import { getFørsteUttaksdag2UkerFørFødsel } from './wlbUtils';
import { DatepickerLimitationsString, dateToISOString } from '@navikt/fp-formik';

function sisteMuligePermisjonsdag(familiehendelsedato: Date): Date {
    const startDato = Uttaksdagen(familiehendelsedato).denneEllerNeste();
    return Uttaksdagen(
        dayjs(startDato).add(uttaksConstants.MAKS_PERMISJONSLENGDE_I_ÅR, 'years').toDate(),
    ).denneEllerNeste();
}

const konverterMinOgMaxDatoerTilString = (minDate: Date, maxDate: Date) => ({
    minDate: dateToISOString(minDate),
    maxDate: dateToISOString(maxDate),
});

const defaultPermisjonsperiodeAvgrensning = (familiehendelsesdato: Date): DatepickerLimitationsString => {
    const minDato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const maksDato = sisteMuligePermisjonsdag(familiehendelsesdato);
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const getSisteDatoForForeldrepengeOppstart = (termindato: Date | undefined, familiehendelsesdato: Date) => {
    if (!termindato || dayjs(familiehendelsesdato).isSameOrBefore(dayjs(termindato), 'd')) {
        return familiehendelsesdato;
    }
    return termindato;
};

const startdatoFørTermin = (familiehendelsesdato: Date, termindato: Date | undefined): DatepickerLimitationsString => {
    const datoÅRegneFra = getSisteDatoForForeldrepengeOppstart(termindato, familiehendelsesdato);
    const termindatoMinus12Uker =
        termindato !== undefined
            ? dayjs(termindato).subtract(uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1, 'days')
            : undefined;
    const erFødselsdatoFørTermindatoMinus12Uker =
        termindato !== undefined ? dayjs(familiehendelsesdato).isBefore(termindatoMinus12Uker, 'd') : false;

    if (erFødselsdatoFørTermindatoMinus12Uker) {
        const maksDato = Uttaksdagen(dayjs(datoÅRegneFra).toDate()).denneEllerNeste();
        const minDato = Uttaksdagen(familiehendelsesdato).denneEllerForrige();
        return {
            ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
            weekendsNotSelectable: true,
        };
    } else {
        const maksDato = Uttaksdagen(dayjs(datoÅRegneFra).toDate()).denneEllerNeste();
        const minDato = Uttaksdagen(maksDato).trekkFra(
            uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1,
        );
        return {
            ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
            weekendsNotSelectable: true,
        };
    }
};

const startdatoFørTerminForeldrepengerFørFødselKonto = (familiehendelsesdato: string): DatepickerLimitationsString => {
    const maksDato = Uttaksdagen(dayjs(familiehendelsesdato).toDate()).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1);
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const ekstrauttakFørFødsel = (familiehendelsesdato: string): DatepickerLimitationsString => {
    const sisteDagFørFødsel = Uttaksdagen(dayjs(familiehendelsesdato).toDate()).forrige();
    const minDato = Uttaksdagen(sisteDagFørFødsel).trekkFra(
        uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1,
    );
    const maksDato = Uttaksdagen(sisteDagFørFødsel).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1,
    );
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const startdatoPermisjonAleneomsorgFarMedmor = (
    datoForAleneomsorg: string,
    familiehendelsesdato: string,
): DatepickerLimitationsString => {
    const minDato = Uttaksdagen(dayjs(datoForAleneomsorg).toDate()).denneEllerNeste();
    const maksDato = sisteMuligePermisjonsdag(dayjs(familiehendelsesdato).toDate());
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const startdatoPermisjonAdopsjon = (familiehendelsesdato: string): DatepickerLimitationsString => {
    return defaultPermisjonsperiodeAvgrensning(dayjs(familiehendelsesdato).toDate());
};

const morsSisteUttaksdag = (familiehendelsesdato: string): DatepickerLimitationsString => {
    return defaultPermisjonsperiodeAvgrensning(dayjs(familiehendelsesdato).toDate());
};

const startdatoPermisjonFarMedmor = (
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
): DatepickerLimitationsString => {
    const defaultAvgrensning = defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
    if (situasjon === 'fødsel' && andreAugust2022ReglerGjelder(familiehendelsesdato)) {
        return {
            ...defaultAvgrensning,
            minDate: dateToISOString(getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato)),
        };
    }
    return defaultAvgrensning;
};

export const uttaksplanDatoavgrensninger = {
    startdatoFørTermin,
    morsSisteUttaksdag,
    startdatoPermisjonFarMedmor,
    startdatoPermisjonAdopsjon,
    startdatoPermisjonAleneomsorgFarMedmor,
    startdatoFørTerminForeldrepengerFørFødselKonto,
    ekstrauttakFørFødsel,
};
