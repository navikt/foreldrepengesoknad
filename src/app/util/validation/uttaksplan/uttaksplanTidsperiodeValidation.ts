import { DatoValidatorer } from '../../../components/skjema/tidsperiodeBolk/TidsperiodeBolk';
import moment from 'moment';
import { Tidsperiode, TidsperiodeString } from 'common/types';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { isForeldrepengerFørFødselUttaksperiode, Periode } from '../../../types/uttaksplan/periodetyper';
import { Validator } from 'common/lib/validation/types';
import { allValidatorsPass } from 'common/lib/validation/utils/runValidFormValidation';
import { DateValue } from '../../../types/common';
import { uttaksdatoer, getUttaksdatoer } from '../../uttaksplan/uttaksdatoer';
import { isValidTidsperiode } from '../../uttaksplan/Tidsperioden';
import { periodeErFørDato } from './uttakFarValidation';
import { UtsettelseFormPeriodeType } from '../../../components/uttaksplanlegger/components/utsettelseForm/UtsettelseForm';
import { erGyldigDato } from '../common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { mapTidsperiodeToTidsperiodeString } from 'app/util/tidsperiodeUtils';

const erUtfyltTest = (dato: DateValue): Validator => ({
    test: () => dato !== undefined,
    failText: { intlKey: `uttaksplan.validering.feil.påkrevd` },
});

const erUttaksdagTest = (dato: DateValue) => ({
    test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
    failText: { intlKey: `uttaksplan.validering.feil.datoErIkkeUttaksdag` },
});

const starterInnenfor12UkerFørTermin = (dato: DateValue, familiehendelsesdato: Date) => ({
    test: () =>
        dato !== undefined &&
        moment(dato).isSameOrAfter(uttaksdatoer(familiehendelsesdato).førsteMuligeUttaksdagFørTermin),
    failText: { intlKey: 'uttaksplan.validering.før12UkerFørTermin' },
});

const slutterInnenforGyldigPermisjonsperiode = (dato: DateValue, familiehendelsesdato: Date) => ({
    test: () =>
        dato !== undefined &&
        moment(dato).isSameOrBefore(uttaksdatoer(familiehendelsesdato).sisteMuligeUttaksdagEtterTermin),
    failText: { intlKey: 'uttaksplan.validering.etterSistePermisjonsdag' },
});

export const getUttakTidsperiodeValidatorer = (
    skalIkkeHaUttak: boolean,
    tidsperiode: Partial<TidsperiodeString>,
    familiehendelsesdato: Date
): DatoValidatorer | undefined => {
    if (skalIkkeHaUttak) {
        return undefined;
    }

    const fomDate = ISOStringToDate(tidsperiode.fom);
    const tomDate = ISOStringToDate(tidsperiode.tom);

    return {
        fra: [
            erGyldigDato(tidsperiode.fom, 'Fra dato er på ugyldig format'),
            erUtfyltTest(fomDate),
            erUttaksdagTest(fomDate),
            starterInnenfor12UkerFørTermin(fomDate, familiehendelsesdato),
        ],
        til: [
            erGyldigDato(tidsperiode.tom, 'Til dato er på ugyldig format'),
            erUtfyltTest(tomDate),
            erUttaksdagTest(tomDate),
            slutterInnenforGyldigPermisjonsperiode(tomDate, familiehendelsesdato),
        ],
    };
};

export const uttakTidsperiodeErGyldig = (uttaksperiode: Periode, familiehendelsesdato: Date): boolean => {
    const { tidsperiode } = uttaksperiode;
    if (!tidsperiode) {
        return false;
    }
    const skalIkkeHaUttak = isForeldrepengerFørFødselUttaksperiode(uttaksperiode)
        ? uttaksperiode.skalIkkeHaUttakFørTermin
        : false;

    if (isValidTidsperiode(tidsperiode) === false && !skalIkkeHaUttak) {
        return false;
    }
    const validators = getUttakTidsperiodeValidatorer(
        skalIkkeHaUttak,
        mapTidsperiodeToTidsperiodeString(tidsperiode),
        familiehendelsesdato
    );
    if (validators === undefined) {
        return true;
    }
    const fraDatoErGyldig = allValidatorsPass(validators.fra);
    const tilDatoErGyldig = allValidatorsPass(validators.til);

    return fraDatoErGyldig && tilDatoErGyldig;
};

export const periodeErInnenDeFørsteSeksUkene = (periode: Periode, familiehendelsesdato: Date) => {
    const førsteUttaksdagEtterSeksUker = getUttaksdatoer(familiehendelsesdato).etterFødsel.førsteUttaksdagEtterSeksUker;
    return periodeErFørDato(periode, førsteUttaksdagEtterSeksUker);
};

export const getUtsettelseTidsperiodeValidatorer = (
    tidsperiode: Partial<Tidsperiode>,
    familiehendelsesdato: Date
): DatoValidatorer | undefined => {
    return {
        fra: [erUtfyltTest(tidsperiode.fom), erUttaksdagTest(tidsperiode.fom)],
        til: [
            erUtfyltTest(tidsperiode.tom),
            erUttaksdagTest(tidsperiode.tom),
            slutterInnenforGyldigPermisjonsperiode(tidsperiode.tom, familiehendelsesdato),
        ],
    };
};

export const utsettelseTidsperiodeErGyldig = (
    utsettelesperiode: UtsettelseFormPeriodeType,
    familiehendelsesdato: Date
): boolean => {
    const { tidsperiode } = utsettelesperiode;
    const validators = getUtsettelseTidsperiodeValidatorer(tidsperiode as Tidsperiode, familiehendelsesdato);
    if (validators === undefined) {
        return true;
    }
    const fraDatoErGyldig = allValidatorsPass(validators.fra);
    const tilDatoErGyldig = allValidatorsPass(validators.til);

    return fraDatoErGyldig && tilDatoErGyldig;
};
