import {
    ISOStringToDate,
    StønadskontoType,
    Tidsperiode,
    TidsperiodeDate,
    Tidsperioden,
    Uttaksdagen,
    getFørsteUttaksdag2UkerFørFødsel,
    getSisteUttaksdag6UkerEtterFødsel,
    isValidTidsperiode,
    uttaksplanDatoavgrensninger,
} from '@navikt/fp-common';
import { getFørsteMuligeUttaksdag, getSisteMuligeUttaksdag } from './uttaksdatoerUtils';
import { DatepickerLimitations } from '@navikt/ds-datepicker';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

export interface DatoAvgrensninger {
    fra: Avgrensninger;
    til: Avgrensninger;
}

export interface Avgrensninger {
    minDato: Date;
    maksDato: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt: boolean;
}

export const getDatoavgrensningerForFarMedmorPeriodeRundtFødselWLB = (
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    ugyldigeTidsperioder: Tidsperiode[] | undefined,
): DatoAvgrensninger => {
    const minDato = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    const maksDato = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);
    return {
        fra: {
            minDato,
            maksDato,
            helgedagerIkkeTillatt: true,
            ugyldigeTidsperioder,
        },
        til: {
            minDato,
            maksDato,
            helgedagerIkkeTillatt: true,
            ugyldigeTidsperioder,
        },
    };
};

export const getDatoavgrensningerForStønadskonto = (
    konto: StønadskontoType | undefined,
    familiehendelsesdato: Date,
    tidsperiode: Partial<TidsperiodeDate> | undefined,
    ugyldigeTidsperioder: Tidsperiode[] | undefined,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
): DatoAvgrensninger => {
    if (konto === undefined) {
        return getDatoavgrensningerForPeriodeUtenKonto(
            familiehendelsesdato,
            ugyldigeTidsperioder,
            erFarEllerMedmor,
            termindato,
        );
    }
    if (konto === StønadskontoType.ForeldrepengerFørFødsel) {
        return getDatoavgrensningerForForeldrepengerFørFødsel(familiehendelsesdato);
    }
    if (isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(familiehendelsesdato)) {
        return getDatoavgrensningerForEkstrauttakFørTermin(familiehendelsesdato, termindato);
    }

    const standardAvgrensninger = standardAvgrensningerForUttakEtterFødsel(familiehendelsesdato);

    return {
        fra: {
            ...standardAvgrensninger,
            ugyldigeTidsperioder,
        },
        til: {
            ...standardAvgrensninger,
            ugyldigeTidsperioder,
        },
    };
};

const getDatoavgrensningerForPeriodeUtenKonto = (
    familiehendelsesdato: Date,
    ugyldigeTidsperioder: Tidsperiode[] | undefined,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
) => {
    const minDato = getFørsteMuligeUttaksdag(familiehendelsesdato, erFarEllerMedmor, termindato);

    return {
        fra: {
            minDato,
            maksDato: getSisteMuligeUttaksdag(familiehendelsesdato),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato,
            maksDato: getSisteMuligeUttaksdag(familiehendelsesdato),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
    };
};

const standardAvgrensningerForUttakEtterFødsel = (familiehendelsesdato: Date): Avgrensninger => {
    return {
        helgedagerIkkeTillatt: true,
        minDato: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
        maksDato: getSisteMuligeUttaksdag(familiehendelsesdato),
    };
};

const getDatoavgrensningerForForeldrepengerFørFødsel = (familiehendelsesdato: Date): DatoAvgrensninger => {
    const avgrensninger: DatepickerLimitations = {
        ...standardAvgrensningerForUttakEtterFødsel,
        ...uttaksplanDatoavgrensninger.startdatoFørTerminForeldrepengerFørFødselKonto(
            dateToISOString(familiehendelsesdato),
        ),
    };

    return {
        fra: {
            helgedagerIkkeTillatt: !!avgrensninger.weekendsNotSelectable,
            minDato: ISOStringToDate(avgrensninger.minDate)!,
            maksDato: ISOStringToDate(avgrensninger.maxDate)!,
        },
        til: {
            helgedagerIkkeTillatt: !!avgrensninger.weekendsNotSelectable,
            minDato: ISOStringToDate(avgrensninger.minDate)!,
            maksDato: ISOStringToDate(avgrensninger.maxDate)!,
        },
    };
};

const getDatoavgrensningerForEkstrauttakFørTermin = (
    familiehendelsesdato: Date,
    termindato: Date | undefined,
): DatoAvgrensninger => {
    const datoÅRegneFra = termindato !== undefined ? termindato : familiehendelsesdato;
    const avgrensninger: DatepickerLimitations = {
        ...standardAvgrensningerForUttakEtterFødsel,
        ...uttaksplanDatoavgrensninger.ekstrauttakFørFødsel(dateToISOString(datoÅRegneFra)),
    };

    return {
        fra: {
            helgedagerIkkeTillatt: !!avgrensninger.weekendsNotSelectable,
            minDato: ISOStringToDate(avgrensninger.minDate)!,
            maksDato: ISOStringToDate(avgrensninger.maxDate)!,
        },
        til: {
            helgedagerIkkeTillatt: !!avgrensninger.weekendsNotSelectable,
            minDato: ISOStringToDate(avgrensninger.minDate)!,
            maksDato: ISOStringToDate(avgrensninger.maxDate)!,
        },
    };
};

export const getDatoavgrensningerForBareFarMedmorHarRettWLB = (
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    ugyldigeTidsperioder: Tidsperiode[] | undefined,
): DatoAvgrensninger => {
    const minDato = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    const maksDato = getSisteMuligeUttaksdag(familiehendelsesdato);
    return {
        fra: {
            minDato,
            maksDato,
            helgedagerIkkeTillatt: true,
            ugyldigeTidsperioder,
        },
        til: {
            minDato,
            maksDato,
            helgedagerIkkeTillatt: true,
            ugyldigeTidsperioder,
        },
    };
};
