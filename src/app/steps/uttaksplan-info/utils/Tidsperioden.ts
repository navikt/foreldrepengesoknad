import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { Holiday } from 'date-holidays';
import { getOffentligeFridager } from 'app/utils/fridagerUtils';
import { formaterDatoUtenDag, dateIsSameOrBefore, dateIsSameOrAfter } from 'app/utils/dateUtils';
import { Tidsperiode } from 'app/types/Tidsperiode';
import { Uttaksdagen } from './Uttaksdagen';

export interface TidsperiodeString {
    fom: string;
    tom: string;
}

export const Tidsperioden = (tidsperiode: Partial<Tidsperiode>) => ({
    erLik: (tidsperiode2: Tidsperiode) => erTidsperioderLike(tidsperiode, tidsperiode2),
    erOmsluttetAv: (tidsperiode2: Tidsperiode) => erTidsperiodeOmsluttetAvTidsperiode(tidsperiode, tidsperiode2),
    erUtenfor: (tidsperiode2: Tidsperiode) => erTidsperiodeUtenforTidsperiode(tidsperiode, tidsperiode2),
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
});

function inneholderTidsperiodeDato(tidsperiode: Partial<Tidsperiode>, dato: Date) {
    return dayjs(dato).isBetween(tidsperiode.fom, tidsperiode.tom, 'days', '[]');
}

export function isValidTidsperiode(tidsperiode: any): tidsperiode is Tidsperiode {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
}

export const isValidTidsperiodeString = (tidsperiodeString: any): tidsperiodeString is TidsperiodeString => {
    return (
        tidsperiodeString !== undefined &&
        tidsperiodeString.fom !== undefined &&
        tidsperiodeString.tom !== undefined &&
        dayjs(tidsperiodeString.fom).isSameOrBefore(tidsperiodeString.tom, 'day')
    );
};

export function resetTidsperiodeTomIfBeforeFom(tidsperiode: Partial<Tidsperiode>): Partial<Tidsperiode> {
    return {
        fom: tidsperiode.fom,
        tom:
            tidsperiode.fom && tidsperiode.tom && dayjs(tidsperiode.fom).isAfter(tidsperiode.tom, 'day')
                ? tidsperiode.fom
                : tidsperiode.tom,
    };
}

export function getValidTidsperiode(tidsperiode: Partial<Tidsperiode> | undefined): Tidsperiode | undefined {
    if (tidsperiode === undefined) {
        return undefined;
    }
    if (isValidTidsperiode(tidsperiode)) {
        return tidsperiode;
    }
    return undefined;
}

export function getTidsperiode(fom: Date, uttaksdager: number): Tidsperiode {
    if (!Uttaksdagen(fom).erUttaksdag()) {
        throw new Error('FOM er ikke en uttaksdag');
    }
    return {
        fom,
        tom: Uttaksdagen(fom).leggTil(uttaksdager - 1),
    };
}

export function datoErInnenforTidsperiode(dato: Date, tidsperiode: Tidsperiode): boolean {
    const { fom, tom } = tidsperiode;
    if (!fom || !tom) {
        return false;
    }
    return dayjs(dato).isBetween(fom, tom, 'days', '[]');
}

function getAntallUttaksdagerITidsperiode(tidsperiode: Partial<Tidsperiode>): number {
    if (!isValidTidsperiode(tidsperiode)) {
        return 0;
    }
    const fom = dayjs(tidsperiode.fom);
    const tom = dayjs(tidsperiode.tom);
    let antall = 0;
    while (fom.isSameOrBefore(tom, 'day')) {
        if (Uttaksdagen(fom.toDate()).erUttaksdag()) {
            antall++;
        }
        fom.add(24, 'hours');
    }
    return antall;
}

function getUttaksdagerSomErFridager(tidsperiode: Partial<Tidsperiode>): Holiday[] {
    return isValidTidsperiode(tidsperiode)
        ? getOffentligeFridager(tidsperiode).filter((dag) => Uttaksdagen(dag.date).erUttaksdag())
        : [];
}

function flyttTidsperiode(tidsperiode: Tidsperiode, fom: Date): Tidsperiode {
    const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
    return getTidsperiode(fom, uttaksdager);
}

export function erTidsperioderLike(t1: Partial<Tidsperiode>, t2: Partial<Tidsperiode>) {
    if (isValidTidsperiode(t1) && isValidTidsperiode(t2)) {
        return dayjs(t1.fom).isSame(t2.fom, 'day') && dayjs(t1.tom).isSame(t2.tom, 'day');
    }
    return JSON.stringify(t1) === JSON.stringify(t2);
}

function erTidsperiodeOmsluttetAvTidsperiode(
    tidsperiode1: Partial<Tidsperiode>,
    tidsperiode2: Partial<Tidsperiode>
): boolean {
    if (isValidTidsperiode(tidsperiode1) && isValidTidsperiode(tidsperiode2)) {
        return (
            dateIsSameOrAfter(tidsperiode1.fom, tidsperiode2.fom) &&
            dateIsSameOrBefore(tidsperiode1.tom, tidsperiode2.tom)
        );
    }
    return false;
}

function erTidsperiodeUtenforTidsperiode(
    tidsperiode1: Partial<Tidsperiode>,
    tidsperiode2: Partial<Tidsperiode>
): boolean {
    if (isValidTidsperiode(tidsperiode1) && isValidTidsperiode(tidsperiode2)) {
        return (
            dayjs(tidsperiode1.fom).isAfter(tidsperiode2.tom, 'day') ||
            dayjs(tidsperiode1.tom).isBefore(tidsperiode2.fom, 'day')
        );
    }
    return false;
}

function tidsperiodeToString(tidsperiode: Partial<Tidsperiode>, intl: IntlShape) {
    const { fom, tom } = tidsperiode;
    if (fom && tom && dayjs(fom).isSame(tom, 'day')) {
        return formaterDatoUtenDag(fom ? fom : tom);
    }
    return intl.formatMessage(
        { id: 'tidsperiode' },
        {
            fom: fom ? formaterDatoUtenDag(fom) : '',
            tom: tom ? formaterDatoUtenDag(tom) : '',
        }
    );
}

function tidsperiodeToStringKort(tidsperiode: Partial<Tidsperiode>, intl: IntlShape) {
    const { fom, tom } = tidsperiode;
    if (fom && tom && dayjs(fom).isSame(tom, 'day')) {
        return formaterDatoUtenDag(fom ? fom : tom);
    }
    return intl.formatMessage(
        { id: 'tidsperiode.kort' },
        {
            fom: fom ? formaterDatoUtenDag(fom) : '',
            tom: tom ? formaterDatoUtenDag(tom) : '',
        }
    );
}

const erTidsperiodeFomEllerEtterDato = (tidsperiode: Partial<Tidsperiode>, dato: Date): boolean => {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrAfter(dato, 'day') &&
        dayjs(tidsperiode.tom).isSameOrAfter(dato, 'day')
    );
};
