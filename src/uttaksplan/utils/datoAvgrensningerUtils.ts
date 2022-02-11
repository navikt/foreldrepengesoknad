import { Tidsperiode, TidsperiodeDate } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/fp-common/node_modules/@navikt/sif-common-formik/lib';
import { isValidTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { DatepickerLimitations } from 'nav-datovelger';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getFørsteUttaksdagPåEllerEtterFødsel, getSisteMuligeUttaksdag } from './uttaksdatoerUtils';

export interface DatoAvgrensninger {
    fra: Avgrensninger;
    til: Avgrensninger;
}

export interface Avgrensninger {
    minDato: Date;
    maksDato: Date;
    ugyldigeTidsperioder?: Tidsperiode[] | undefined;
    helgedagerIkkeTillatt: boolean;
}

export const getDatoavgrensningerForStønadskonto = (
    konto: StønadskontoType | undefined,
    familiehendelsesdato: Date,
    tidsperiode: Partial<TidsperiodeDate> | undefined,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger => {
    if (konto === undefined) {
        return getDatoavgrensningerForPeriodeUtenKonto(familiehendelsesdato, ugyldigeTidsperioder);
    }
    if (konto === StønadskontoType.ForeldrepengerFørFødsel) {
        return getDatoavgrensningerForForeldrepengerFørFødsel(familiehendelsesdato);
    }
    if (isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(familiehendelsesdato)) {
        return getDatoavgrensningerForEkstrauttakFørTermin(familiehendelsesdato);
    }

    const standardAvgrensninger = standardAvgrensningerForUttakEtterFødsel(familiehendelsesdato);

    return {
        fra: {
            ...standardAvgrensninger,
            ugyldigeTidsperioder,
        },
        til: {
            ...standardAvgrensninger,
            minDato: tidsperiode && tidsperiode.fom ? tidsperiode.fom : standardAvgrensninger.minDato,
            ugyldigeTidsperioder,
        },
    };
};

const getDatoavgrensningerForPeriodeUtenKonto = (familiehendelsesdato: Date, ugyldigeTidsperioder: Tidsperiode[]) => {
    const minDato = getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato);

    return {
        fra: {
            minDato,
            maksDato: getSisteMuligeUttaksdag(familiehendelsesdato),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato: minDato,
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
            dateToISOString(familiehendelsesdato)
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

const getDatoavgrensningerForEkstrauttakFørTermin = (familiehendelsesdato: Date): DatoAvgrensninger => {
    const avgrensninger: DatepickerLimitations = {
        ...standardAvgrensningerForUttakEtterFødsel,
        ...uttaksplanDatoavgrensninger.ekstrauttakFørFødsel(dateToISOString(familiehendelsesdato)),
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
