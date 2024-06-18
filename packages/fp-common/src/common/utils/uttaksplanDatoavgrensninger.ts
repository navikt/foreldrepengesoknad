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

const getSisteDatoForOppstartMor = (familiehendelsesdato: Date): Date => {
    return Uttaksdagen(familiehendelsesdato).denneEllerNeste();
};

const startDatoMorUfødtBarn = (termindato: Date) => {
    const sisteOppstartsdato = getSisteDatoForOppstartMor(termindato);
    const førsteOppstartsdato = dayjs(sisteOppstartsdato)
        .subtract(uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL, 'week')
        .toDate();
    return {
        ...konverterMinOgMaxDatoerTilString(førsteOppstartsdato, sisteOppstartsdato),
        weekendsNotSelectable: true,
    };
};

const startDatoMorFødtBarn = (termindato: Date | undefined, fødselsdato: Date) => {
    const sisteOppstartsdato = getSisteDatoForOppstartMor(fødselsdato);
    const termindatoMinus12Uker =
        termindato !== undefined
            ? dayjs(Uttaksdagen(termindato).denneEllerNeste())
                  .subtract(uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL, 'weeks')
                  .toDate()
            : undefined;
    const erFødselsdatoFørTermindatoMinus12Uker =
        termindato !== undefined ? dayjs(fødselsdato).isBefore(dayjs(termindatoMinus12Uker), 'd') : false;

    if (erFødselsdatoFørTermindatoMinus12Uker) {
        return {
            ...konverterMinOgMaxDatoerTilString(sisteOppstartsdato, sisteOppstartsdato),
            weekendsNotSelectable: true,
        };
    } else {
        const tidligstOppstartsdato =
            termindatoMinus12Uker ||
            dayjs(Uttaksdagen(fødselsdato).denneEllerNeste())
                .subtract(uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL, 'weeks')
                .toDate();
        return {
            ...konverterMinOgMaxDatoerTilString(tidligstOppstartsdato, sisteOppstartsdato),
            weekendsNotSelectable: true,
        };
    }
};

export const startdatoPermisjonMor = (
    fødselsdato: Date | undefined,
    termindato: Date | undefined,
): DatepickerLimitationsString => {
    if (!fødselsdato && termindato) {
        return startDatoMorUfødtBarn(termindato);
    } else if (fødselsdato) {
        return startDatoMorFødtBarn(termindato, fødselsdato);
    } else {
        throw new Error('Mangler fødselsdato eller termindato på barnet.');
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
    startdatoPermisjonMor,
    morsSisteUttaksdag,
    startdatoPermisjonFarMedmor,
    startdatoPermisjonAdopsjon,
    startdatoPermisjonAleneomsorgFarMedmor,
    startdatoFørTerminForeldrepengerFørFødselKonto,
    ekstrauttakFørFødsel,
};
