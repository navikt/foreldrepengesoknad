import dayjs from 'dayjs';
import advanced from 'dayjs/plugin/advancedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';
import { AnnenForelder } from 'types/AnnenForelder';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { Barn, FpBarnDto_fpoversikt, UttakDto, UttakPeriodeDto, isAdoptertBarn, isFødtBarn } from '@navikt/fp-types';
import { Uttaksdagen, isISODateString } from '@navikt/fp-utils';
import { hasValue } from '@navikt/fp-validation';

import { FeatureToggle } from '../FeatureToggle';
import { getIsDeltUttak } from './annenForelderUtils';
import { getFamiliehendelsedato } from './barnUtils';
import { toggleUtils } from './toggleUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(timezone);
dayjs.extend(advanced);

export const getEldsteRegistrerteBarn = (registrerteBarn: FpBarnDto_fpoversikt[]): FpBarnDto_fpoversikt => {
    return [...registrerteBarn].toSorted((a, b) => (isDateABeforeDateB(a.fødselsdato, b.fødselsdato) ? 1 : -1)).at(-1)!;
};

export const sorterDatoEtterEldst = (dato: string[]): string[] => {
    return [...dato].toSorted((a, b) => (isDateABeforeDateB(a, b) ? -1 : 1));
};

const isDateABeforeDateB = (a: string, b: string): boolean => {
    if (!hasValue(a) || !hasValue(b) || !isISODateString(a) || !isISODateString(b)) {
        return false;
    }

    return dayjs(a).isBefore(b, 'day');
};

export const getRelevantFamiliehendelseDato = (
    termindato: string | undefined,
    fødselsdato: string | undefined,
    omsorgsovertakelsesdato: string | undefined,
): string => {
    if (omsorgsovertakelsesdato !== undefined) {
        return omsorgsovertakelsesdato;
    }
    if (fødselsdato !== undefined) {
        return fødselsdato;
    }
    if (termindato === undefined) {
        throw new Error('Mangler fødselsdato/termindato/adopsjonsdato for barnet.');
    }
    return termindato;
};

export const førsteOktober2021ReglerGjelder = (familiehendelsesdato: string): boolean => {
    const førsteOktober2021 = dayjs('2021-10-01');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(førsteOktober2021, 'day') &&
        dayjs().isSameOrAfter(førsteOktober2021, 'day')
    );
};

export const andreAugust2022ReglerGjelder = (familiehendelsesdato: string): boolean => {
    const andreAugust2022 = dayjs('2022-08-02');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(andreAugust2022, 'day') &&
        dayjs().isSameOrAfter(andreAugust2022, 'day')
    );
};

export const førsteJuli2024ReglerGjelder = (barn: Barn): boolean => {
    const førsteJuli2024 = toggleUtils.isFeatureEnabled(FeatureToggle.test1Juli2024Regler)
        ? '2024-06-18'
        : '2024-07-01';

    if (dayjs().isBefore(dayjs(førsteJuli2024), 'day')) {
        return false;
    }
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    return !((isFødtBarn(barn) || isAdoptertBarn(barn)) && dayjs(familiehendelsesdato).isBefore(førsteJuli2024, 'day'));
};

// Endringstidspunktet er første virkedag der søkerens aktive uttak (periode.søker, uten avslåtte perioder)
// er ulikt i opprinnelig og ny plan. Planene sammenlignes intervall for intervall mellom bruddpunktene
// (fom og dagen etter tom) til søkerens perioder, så en periode som bare er delt opp eller kortet inn, gir
// ingen falsk endring. Vedtaksmetadata (resultat og arbeidsgiver.type) sammenlignes ikke, fordi redigering
// i skjema fjerner dem på uendrede deler av en periode. Annen parts perioder og rene helgeintervaller telles ikke.
export const getEndringstidspunktNy = (
    opprinneligPlan: UttakPeriodeDto[],
    nyPlan: UttakPeriodeDto[],
): string | undefined => {
    const opprinnelig = filtrerSøkersAktivePerioder(opprinneligPlan);
    const ny = filtrerSøkersAktivePerioder(nyPlan);

    // ISO-datoer sorteres riktig som tekst.
    const bruddpunkter = [
        ...new Set(
            [...opprinnelig, ...ny].flatMap((periode) => [
                periode.fom,
                dayjs(periode.tom).add(1, 'day').format(ISO_DATE_FORMAT),
            ]),
        ),
    ].toSorted((a, b) => a.localeCompare(b));

    // Etter siste bruddpunkt har ingen av planene søkerperioder, så det siste intervallet trengs ikke.
    const intervallStarter = bruddpunkter.slice(0, -1);
    for (const [index, intervallFom] of intervallStarter.entries()) {
        const førsteVirkedag = Uttaksdagen.denneEllerNeste(intervallFom).getDato();
        if (førsteVirkedag >= bruddpunkter[index + 1]!) {
            continue;
        }
        // Ingen periode krysser et bruddpunkt, så søkerens uttak er det samme hele intervallet.
        if (!erLikSøkersUttak(finnSøkersUttak(opprinnelig, intervallFom), finnSøkersUttak(ny, intervallFom))) {
            return førsteVirkedag;
        }
    }
    return undefined;
};

const filtrerSøkersAktivePerioder = (perioder: UttakPeriodeDto[]): UttakPeriodeDto[] =>
    perioder.filter((periode) => periode.søker !== undefined && periode.søker.resultat?.innvilget !== false);

const finnSøkersUttak = (perioder: UttakPeriodeDto[], dato: string): UttakDto | undefined =>
    perioder.find((periode) => periode.fom <= dato && dato <= periode.tom)?.søker;

const erLikSøkersUttak = (a: UttakDto | undefined, b: UttakDto | undefined): boolean => {
    if (!a || !b) {
        return a === b;
    }
    return (
        a.forelder === b.forelder &&
        a.kontoType === b.kontoType &&
        a.flerbarnsdager === b.flerbarnsdager &&
        erLikGradering(a.gradering, b.gradering) &&
        a.utsettelseÅrsak === b.utsettelseÅrsak &&
        a.samtidigUttak === b.samtidigUttak &&
        a.overføringÅrsak === b.overføringÅrsak &&
        a.morsAktivitet === b.morsAktivitet
    );
};

const erLikGradering = (a: UttakDto['gradering'], b: UttakDto['gradering']): boolean => {
    if (!a || !b) {
        return a === b;
    }
    return (
        a.arbeidstidprosent === b.arbeidstidprosent &&
        a.aktivitet?.type === b.aktivitet?.type &&
        a.aktivitet?.arbeidsgiver?.id === b.aktivitet?.arbeidsgiver?.id
    );
};

export const getVis1Juli2024Info = (barn: Barn, annenForelder: AnnenForelder) => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erDeltUttak = getIsDeltUttak(annenForelder);
    return (
        dayjs(familiehendelsesdato).isSameOrAfter(dayjs('2024-07-01'), 'd') &&
        dayjs().isBefore(dayjs('2024-07-01'), 'd') &&
        erDeltUttak &&
        barn.antallBarn === 1
    );
};

export const getErDatoInnenEnDagFraAnnenDato = (dato1: DateType, dato2: DateType): boolean => {
    if (dato1 === undefined || dato2 === undefined) {
        return false;
    }
    return (
        dayjs(dato1).isSameOrAfter(dayjs(dato2).subtract(1, 'day'), 'day') &&
        dayjs(dato1).isSameOrBefore(dayjs(dato2).add(1, 'day'), 'day')
    );
};

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};

type VarighetFormat = 'full' | 'normal';
export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'varighet.dager' },
        {
            dager,
        },
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'varighet.uker' }, { uker });
    if (format === 'full' && dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--full`,
        })}${dagerStr}`;
    }
    if (format === 'normal' && dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--normal`,
        })}${dagerStr}`;
    }
    return ukerStr;
};

type DateType = string | undefined;
