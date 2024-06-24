import { HolidaysTypes } from 'date-holidays';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { TidsperiodeDate } from '@navikt/fp-types';

import { dateIsSameOrAfter, dateIsSameOrBefore, formaterDatoUtenDag } from '../dateUtils';
import { getOffentligeFridager } from '../fridagerUtils';
import { Uttaksdagen } from './Uttaksdagen';

export const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;

export const Tidsperioden = (tidsperiode: TidsperiodeDate) => ({
    erLik: (tidsperiode2: TidsperiodeDate) => erTidsperioderLike(tidsperiode, tidsperiode2),
    overlapper: (tidsperiode2: TidsperiodeDate) => overlapperTidsperioder(tidsperiode, tidsperiode2),
    erOmsluttetAv: (tidsperiode2: TidsperiodeDate) => erTidsperiodeOmsluttetAvTidsperiode(tidsperiode, tidsperiode2),
    erUtenfor: (tidsperiode2: TidsperiodeDate) => erTidsperiodeUtenforTidsperiode(tidsperiode, tidsperiode2),
    getAntallUttaksdager: () => getAntallUttaksdagerITidsperiode(tidsperiode),
    getAntallFridager: () => getUttaksdagerSomErFridager(tidsperiode).length,
    setStartdato: (fom: Date) => (isValidTidsperiode(tidsperiode) ? flyttTidsperiode(tidsperiode, fom) : tidsperiode),
    setUttaksdager: (uttaksdager: number) =>
        tidsperiode.fom ? getTidsperiode(tidsperiode.fom, uttaksdager) : tidsperiode,
    formaterString: (intl: IntlShape) => tidsperiodeToString(tidsperiode, intl),
    formaterStringKort: (intl: IntlShape) => tidsperiodeToStringKort(tidsperiode, intl),
    erFomEllerEtterDato: (dato: Date) => erTidsperiodeFomEllerEtterDato(tidsperiode, dato),
    erFørDato: (dato: Date) => erTidsperiodeFomEllerEtterDato(tidsperiode, dato) === false,
    inneholderDato: (dato: Date) => inneholderTidsperiodeDato(tidsperiode, dato),
    erInnenforFørsteSeksUker: (familiehendelsesdato: Date) =>
        erTidsperiodeInnenforFørsteSeksUker(tidsperiode, familiehendelsesdato),
});

const overlapperTidsperioder = (t1: TidsperiodeDate, t2: TidsperiodeDate) => {
    return (
        dayjs(t1.fom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t1.tom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t2.fom).isBetween(t1.fom, t1.tom, 'day', '[]') ||
        dayjs(t2.tom).isBetween(t1.fom, t1.tom, 'day', '[]')
    );
};

const erTidsperiodeInnenforFørsteSeksUker = (tidsperiode: any, familiehendelsesdato: Date) => {
    const førsteUttaksdagFamiliehendelsesdato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdagFamiliehendelsesdato).leggTil(
        ANTALL_UTTAKSDAGER_SEKS_UKER,
    );
    return erTidsperiodeFomEllerEtterDato(tidsperiode, førsteUttaksdagEtterSeksUker) === false;
};

function inneholderTidsperiodeDato(tidsperiode: TidsperiodeDate, dato: Date): boolean {
    if (!tidsperiode.fom || !tidsperiode.tom) {
        return false;
    }

    return dayjs(dato).isBetween(tidsperiode.fom, tidsperiode.tom, 'days', '[]');
}

export function isValidTidsperiode(tidsperiode: any): tidsperiode is TidsperiodeDate {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
}

export function resetTidsperiodeTomIfBeforeFom(tidsperiode: TidsperiodeDate): TidsperiodeDate {
    return {
        fom: tidsperiode.fom,
        tom:
            tidsperiode.fom && tidsperiode.tom && dayjs(tidsperiode.fom).isAfter(tidsperiode.tom, 'day')
                ? tidsperiode.fom
                : tidsperiode.tom,
    };
}

export function getValidTidsperiode(tidsperiode: TidsperiodeDate | undefined): TidsperiodeDate | undefined {
    if (tidsperiode === undefined) {
        return undefined;
    }
    if (isValidTidsperiode(tidsperiode)) {
        return tidsperiode;
    }
    return undefined;
}

export function getTidsperiode(fom: Date, uttaksdager: number): TidsperiodeDate {
    if (!Uttaksdagen(fom).erUttaksdag()) {
        throw new Error('FOM er ikke en uttaksdag');
    }
    return {
        fom,
        tom: Uttaksdagen(fom).leggTil(uttaksdager - 1),
    };
}

export function datoErInnenforTidsperiode(dato: Date, tidsperiode: TidsperiodeDate): boolean {
    const { fom, tom } = tidsperiode;
    if (!fom || !tom) {
        return false;
    }
    return dayjs(dato).isBetween(fom, tom, 'days', '[]');
}

function getAntallUttaksdagerITidsperiode(tidsperiode: TidsperiodeDate): number {
    if (!isValidTidsperiode(tidsperiode)) {
        return 0;
    }
    let fom = dayjs(tidsperiode.fom);
    const tom = dayjs(tidsperiode.tom);
    let antall = 0;
    while (fom.isSameOrBefore(tom, 'day')) {
        if (Uttaksdagen(fom.toDate()).erUttaksdag()) {
            antall++;
        }
        fom = fom.add(24, 'hours');
    }
    return antall;
}

function getUttaksdagerSomErFridager(tidsperiode: TidsperiodeDate): HolidaysTypes.Holiday[] {
    return isValidTidsperiode(tidsperiode)
        ? getOffentligeFridager(tidsperiode).filter((dag) => Uttaksdagen(new Date(dag.date)).erUttaksdag())
        : [];
}

function flyttTidsperiode(tidsperiode: TidsperiodeDate, fom: Date): TidsperiodeDate {
    const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
    return getTidsperiode(fom, uttaksdager);
}

export function erTidsperioderLike(t1: TidsperiodeDate, t2: TidsperiodeDate) {
    if (isValidTidsperiode(t1) && isValidTidsperiode(t2)) {
        return dayjs(t1.fom).isSame(t2.fom, 'day') && dayjs(t1.tom).isSame(t2.tom, 'day');
    }
    return JSON.stringify(t1) === JSON.stringify(t2);
}

function erTidsperiodeOmsluttetAvTidsperiode(tidsperiode1: TidsperiodeDate, tidsperiode2: TidsperiodeDate): boolean {
    if (isValidTidsperiode(tidsperiode1) && isValidTidsperiode(tidsperiode2)) {
        return (
            dateIsSameOrAfter(tidsperiode1.fom, tidsperiode2.fom) &&
            dateIsSameOrBefore(tidsperiode1.tom, tidsperiode2.tom)
        );
    }
    return false;
}

function erTidsperiodeUtenforTidsperiode(tidsperiode1: TidsperiodeDate, tidsperiode2: TidsperiodeDate): boolean {
    if (isValidTidsperiode(tidsperiode1) && isValidTidsperiode(tidsperiode2)) {
        return (
            dayjs(tidsperiode1.fom).isAfter(tidsperiode2.tom, 'day') ||
            dayjs(tidsperiode1.tom).isBefore(tidsperiode2.fom, 'day')
        );
    }
    return false;
}

function tidsperiodeToString(tidsperiode: TidsperiodeDate, intl: IntlShape) {
    const { fom, tom } = tidsperiode;
    if (fom && tom && dayjs(fom).isSame(tom, 'day')) {
        return formaterDatoUtenDag(fom ?? tom);
    }
    return intl.formatMessage(
        { id: 'tidsperiode' },
        {
            fom: fom ? formaterDatoUtenDag(fom) : '',
            tom: tom ? formaterDatoUtenDag(tom) : '',
        },
    );
}

function tidsperiodeToStringKort(tidsperiode: TidsperiodeDate, intl: IntlShape) {
    const { fom, tom } = tidsperiode;
    if (fom && tom && dayjs(fom).isSame(tom, 'day')) {
        return formaterDatoUtenDag(fom ?? tom);
    }
    return intl.formatMessage(
        { id: 'tidsperiode.kort' },
        {
            fom: fom ? formaterDatoUtenDag(fom) : '',
            tom: tom ? formaterDatoUtenDag(tom) : '',
        },
    );
}

const erTidsperiodeFomEllerEtterDato = (tidsperiode: TidsperiodeDate, dato: Date): boolean => {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrAfter(dato, 'day') &&
        dayjs(tidsperiode.tom).isSameOrAfter(dato, 'day')
    );
};
