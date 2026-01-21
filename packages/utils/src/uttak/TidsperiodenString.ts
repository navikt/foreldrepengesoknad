import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { Tidsperiode } from '@navikt/fp-types';

import { dateStringIsSameOrAfter, dateStringIsSameOrBefore, formaterDatoUtenDag } from '../dateUtils';
import { Uttaksdagen, erUttaksdag } from './UttaksdagenString';

const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;
const isoStringFormat = 'YYYY-MM-DD';

export const TidsperiodenString = (tidsperiode: Tidsperiode) => ({
    erLik: (tidsperiode2: Tidsperiode) => erTidsperioderLikeString(tidsperiode, tidsperiode2),
    overlapper: (tidsperiode2: Tidsperiode) => overlapperTidsperioder(tidsperiode, tidsperiode2),
    erOmsluttetAv: (tidsperiode2: Tidsperiode) => erTidsperiodeOmsluttetAvTidsperiode(tidsperiode, tidsperiode2),
    erUtenfor: (tidsperiode2: Tidsperiode) => erTidsperiodeUtenforTidsperiode(tidsperiode, tidsperiode2),
    getAntallUttaksdager: () => getAntallUttaksdagerITidsperiode(tidsperiode),
    setStartdato: (fom: string) =>
        isValidTidsperiodeString(tidsperiode) ? flyttTidsperiode(tidsperiode, fom) : tidsperiode,
    setUttaksdager: (uttaksdager: number) =>
        tidsperiode.fom ? getTidsperiodeString(tidsperiode.fom, uttaksdager) : tidsperiode,
    formaterString: (intl: IntlShape) => tidsperiodeToString(tidsperiode, intl),
    formaterStringKort: (intl: IntlShape) => tidsperiodeToStringKort(tidsperiode, intl),
    erFomEllerEtterDato: (dato: string) => erTidsperiodeFomEllerEtterDato(tidsperiode, dato),
    erFørDato: (dato: string) => erTidsperiodeFomEllerEtterDato(tidsperiode, dato) === false,
    inneholderDato: (dato: string) => inneholderTidsperiodeDato(tidsperiode, dato),
    erInnenforFørsteSeksUker: (familiehendelsesdato: string) =>
        erTidsperiodeInnenforFørsteSeksUker(tidsperiode, familiehendelsesdato),
});

const overlapperTidsperioder = (t1: Tidsperiode, t2: Tidsperiode) => {
    return (
        dayjs(t1.fom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t1.tom).isBetween(t2.fom, t2.tom, 'day', '[]') ||
        dayjs(t2.fom).isBetween(t1.fom, t1.tom, 'day', '[]') ||
        dayjs(t2.tom).isBetween(t1.fom, t1.tom, 'day', '[]')
    );
};

const erTidsperiodeInnenforFørsteSeksUker = (tidsperiode: Tidsperiode, familiehendelsesdato: string) => {
    const førsteUttaksdagFamiliehendelsesdato = Uttaksdagen.forDenneEllerNeste(familiehendelsesdato).getDato();
    const førsteUttaksdagEtterSeksUker = Uttaksdagen.forArbeidsdagen(
        førsteUttaksdagFamiliehendelsesdato,
    ).getDatoAntallUttaksdagerSenere(ANTALL_UTTAKSDAGER_SEKS_UKER);
    return erTidsperiodeFomEllerEtterDato(tidsperiode, førsteUttaksdagEtterSeksUker) === false;
};

function inneholderTidsperiodeDato(tidsperiode: Tidsperiode, dato: string): boolean {
    if (!tidsperiode.fom || !tidsperiode.tom) {
        return false;
    }

    return dayjs(dato).isBetween(tidsperiode.fom, tidsperiode.tom, 'days', '[]');
}

export function isValidTidsperiodeString(tidsperiode: unknown): tidsperiode is Tidsperiode {
    return (
        // @ts-expect-error -- gidder ikke fikse gammel kode
        tidsperiode.fom !== undefined &&
        // @ts-expect-error -- gidder ikke fikse gammel kode
        tidsperiode.tom !== undefined &&
        // @ts-expect-error -- gidder ikke fikse gammel kode
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
}

export function resetTidsperiodeTomIfBeforeFomString(tidsperiode: Tidsperiode): Tidsperiode {
    return {
        fom: tidsperiode.fom,
        tom:
            tidsperiode.fom && tidsperiode.tom && dayjs(tidsperiode.fom).isAfter(tidsperiode.tom, 'day')
                ? tidsperiode.fom
                : tidsperiode.tom,
    };
}

export function getValidTidsperiodeString(tidsperiode: Tidsperiode | undefined): Tidsperiode | undefined {
    if (tidsperiode === undefined) {
        return undefined;
    }
    if (isValidTidsperiodeString(tidsperiode)) {
        return tidsperiode;
    }
    return undefined;
}

export function getTidsperiodeString(fom: string, uttaksdager: number): Tidsperiode {
    if (!erUttaksdag(fom)) {
        throw new Error('FOM er ikke en uttaksdag');
    }
    return {
        fom,
        tom: Uttaksdagen.forArbeidsdagen(fom).getDatoAntallUttaksdagerSenere(uttaksdager - 1),
    };
}

export function datoErInnenforTidsperiodeString(dato: string, tidsperiode: Tidsperiode): boolean {
    const { fom, tom } = tidsperiode;
    if (!fom || !tom) {
        return false;
    }
    return dayjs(dato).isBetween(fom, tom, 'days', '[]');
}

function getAntallUttaksdagerITidsperiode(tidsperiode: Tidsperiode): number {
    if (!isValidTidsperiodeString(tidsperiode)) {
        return 0;
    }
    let fom = dayjs(tidsperiode.fom);
    const tom = dayjs(tidsperiode.tom);
    let antall = 0;
    while (fom.isSameOrBefore(tom, 'day')) {
        if (erUttaksdag(fom.format(isoStringFormat))) {
            antall++;
        }
        fom = fom.add(24, 'hours');
    }
    return antall;
}

function flyttTidsperiode(tidsperiode: Tidsperiode, fom: string): Tidsperiode {
    const uttaksdager = getAntallUttaksdagerITidsperiode(tidsperiode);
    return getTidsperiodeString(fom, uttaksdager);
}

export function erTidsperioderLikeString(t1: Tidsperiode, t2: Tidsperiode) {
    if (isValidTidsperiodeString(t1) && isValidTidsperiodeString(t2)) {
        return dayjs(t1.fom).isSame(t2.fom, 'day') && dayjs(t1.tom).isSame(t2.tom, 'day');
    }
    return JSON.stringify(t1) === JSON.stringify(t2);
}

function erTidsperiodeOmsluttetAvTidsperiode(tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean {
    if (isValidTidsperiodeString(tidsperiode1) && isValidTidsperiodeString(tidsperiode2)) {
        return (
            dateStringIsSameOrAfter(tidsperiode1.fom, tidsperiode2.fom) &&
            dateStringIsSameOrBefore(tidsperiode1.tom, tidsperiode2.tom)
        );
    }
    return false;
}

function erTidsperiodeUtenforTidsperiode(tidsperiode1: Tidsperiode, tidsperiode2: Tidsperiode): boolean {
    if (isValidTidsperiodeString(tidsperiode1) && isValidTidsperiodeString(tidsperiode2)) {
        return (
            dayjs(tidsperiode1.fom).isAfter(tidsperiode2.tom, 'day') ||
            dayjs(tidsperiode1.tom).isBefore(tidsperiode2.fom, 'day')
        );
    }
    return false;
}

function tidsperiodeToString(tidsperiode: Tidsperiode, intl: IntlShape) {
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

function tidsperiodeToStringKort(tidsperiode: Tidsperiode, intl: IntlShape) {
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

const erTidsperiodeFomEllerEtterDato = (tidsperiode: Tidsperiode, dato: string): boolean => {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrAfter(dato, 'day') &&
        dayjs(tidsperiode.tom).isSameOrAfter(dato, 'day')
    );
};
