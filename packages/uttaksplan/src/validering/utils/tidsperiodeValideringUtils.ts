import dayjs from 'dayjs';

import {
    Periode,
    TidsperiodeDate,
    UtsettelseFormPeriodeType,
    isForeldrepengerFørFødselUttaksperiode,
} from '@navikt/fp-common';
import { Uttaksdagen, isValidTidsperiodeString } from '@navikt/fp-utils';

import { uttaksdatoer } from '../../utils/uttaksdatoerUtils';
import { DatoValidatorer, Validator } from './types/validatorTypes';
import { allValidatorsPass } from './validatorUtils';

type DateValue = Date | undefined;

const erUtfyltTest = (dato: DateValue): Validator => ({
    test: () => dato !== undefined,
    failText: { intlKey: `uttaksplan.validering.feil.påkrevd` },
});

const erUttaksdagTest = (dato: DateValue) => ({
    test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
    failText: { intlKey: `uttaksplan.validering.feil.datoErIkkeUttaksdag` },
});

const slutterInnenforGyldigPermisjonsperiode = (
    dato: DateValue,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
) => ({
    test: () =>
        dato !== undefined &&
        dayjs(dato).isSameOrBefore(
            uttaksdatoer(familiehendelsesdato, erFarEllerMedmor, termindato).sisteMuligeUttaksdagEtterTermin,
            'day',
        ),
    failText: { intlKey: 'uttaksplan.validering.feil.etterSistePermisjonsdag' },
});

const starterInnenforGyldigAntallUkerFørTermin = (
    dato: DateValue,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
) => ({
    test: () =>
        dato !== undefined &&
        dayjs(dato).isSameOrAfter(
            uttaksdatoer(familiehendelsesdato, erFarEllerMedmor, termindato).førsteMuligeUttaksdagFørTermin,
            'day',
        ),
    failText: { intlKey: 'uttaksplan.validering.feil.før12UkerFørTermin' },
});

export const getUttakTidsperiodeValidatorer = (
    skalIkkeHaUttak: boolean,
    tidsperiode: Partial<TidsperiodeDate>,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
): DatoValidatorer | undefined => {
    if (skalIkkeHaUttak) {
        return undefined;
    }

    const { fom, tom } = tidsperiode;

    return {
        fra: [
            erUtfyltTest(fom),
            erUttaksdagTest(fom),
            starterInnenforGyldigAntallUkerFørTermin(fom, familiehendelsesdato, erFarEllerMedmor, termindato),
        ],
        til: [
            erUtfyltTest(tom),
            erUttaksdagTest(tom),
            slutterInnenforGyldigPermisjonsperiode(tom, familiehendelsesdato, erFarEllerMedmor, termindato),
        ],
    };
};

export const uttakTidsperiodeErGyldig = (
    uttaksperiode: Periode,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
): boolean => {
    const { tidsperiode } = uttaksperiode;
    if (!tidsperiode) {
        return false;
    }
    const skalIkkeHaUttak = isForeldrepengerFørFødselUttaksperiode(uttaksperiode)
        ? uttaksperiode.skalIkkeHaUttakFørTermin
        : false;

    if (isValidTidsperiodeString(tidsperiode) === false && !skalIkkeHaUttak) {
        return false;
    }
    const validators = getUttakTidsperiodeValidatorer(
        skalIkkeHaUttak,
        tidsperiode,
        familiehendelsesdato,
        erFarEllerMedmor,
        termindato,
    );
    if (validators === undefined) {
        return true;
    }
    const fraDatoErGyldig = allValidatorsPass(validators.fra);
    const tilDatoErGyldig = allValidatorsPass(validators.til);

    return fraDatoErGyldig && tilDatoErGyldig;
};

const getUtsettelseTidsperiodeValidatorer = (
    tidsperiode: Partial<TidsperiodeDate>,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
): DatoValidatorer | undefined => {
    return {
        fra: [erUtfyltTest(tidsperiode.fom), erUttaksdagTest(tidsperiode.fom)],
        til: [
            erUtfyltTest(tidsperiode.tom),
            erUttaksdagTest(tidsperiode.tom),
            slutterInnenforGyldigPermisjonsperiode(tidsperiode.tom, familiehendelsesdato, erFarEllerMedmor, termindato),
        ],
    };
};

export const utsettelseTidsperiodeErGyldig = (
    utsettelesperiode: UtsettelseFormPeriodeType,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
): boolean => {
    const { tidsperiode } = utsettelesperiode;

    if (isValidTidsperiodeString(tidsperiode) === false) {
        return false;
    }
    const validators = getUtsettelseTidsperiodeValidatorer(
        tidsperiode,
        familiehendelsesdato,
        erFarEllerMedmor,
        termindato,
    );
    if (validators === undefined) {
        return true;
    }
    const fraDatoErGyldig = allValidatorsPass(validators.fra);
    const tilDatoErGyldig = allValidatorsPass(validators.til);

    return fraDatoErGyldig && tilDatoErGyldig;
};
