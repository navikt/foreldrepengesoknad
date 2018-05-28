import { createSelector } from 'reselect';
import {
    Tidslinjeinnslag,
    TidslinjeinnslagType
} from '../components/tidslinje/types';
import {
    getStonadsperioderOgUtsettelser,
    getTaptePerioder
} from './periodeSelector';
import { isSameDay } from 'date-fns';
import { Periode, Periodetype } from '../types';
import {
    getSammenhengendePerioder,
    sorterPerioder
} from '../utils/periodeUtils';
import { UttaksplanAppState } from 'uttaksplan/redux/types';

const formSelector = (state: UttaksplanAppState) => state.uttaksplan.form;

const FILTRER_PERIODER = false;

export const tidslinjeFraPerioder = createSelector(
    getStonadsperioderOgUtsettelser,
    getTaptePerioder,
    formSelector,
    (stønadsperioder, taptePerioder, form): Tidslinjeinnslag[] => {
        const perioder = stønadsperioder
            .concat(taptePerioder)
            .sort(sorterPerioder);
        if (!perioder || perioder.length === 0) {
            return [];
        }
        const { dekningsgrad, termindato } = form;
        if (!termindato || !dekningsgrad) {
            return [];
        }
        const antallPerioder = perioder.length;
        const sluttperiode = perioder[antallPerioder - 1];
        const alleInnslag: Tidslinjeinnslag[] = [
            ...perioder.map((periode: Periode, index: number) =>
                mapPeriodeTilTidslinjeinnslag(
                    periode,
                    index,
                    perioder,
                    antallPerioder
                )
            ),
            {
                type: TidslinjeinnslagType.hendelse,
                hendelse: 'termin',
                dato: termindato
            },
            {
                type: TidslinjeinnslagType.hendelse,
                hendelse: 'permisjonsslutt',
                dato: sluttperiode.tidsperiode.sluttdato
            }
        ];

        return FILTRER_PERIODER
            ? alleInnslag
                  .sort(sorterTidslinjeinnslagEtterStartdato)
                  .filter(filtrerOmInnslagSkalVises)
            : alleInnslag.sort(sorterTidslinjeinnslagEtterStartdato);
    }
);

const mapPeriodeTilTidslinjeinnslag = (
    periode: Periode,
    index: number,
    perioder: Periode[],
    antallPerioder: number
): Tidslinjeinnslag => {
    return {
        type: TidslinjeinnslagType.periode,
        periode,
        perioderekke: getSammenhengendePerioder(periode, perioder)
    };
};

export const filtrerOmInnslagSkalVises = (
    innslag: Tidslinjeinnslag,
    index: number,
    alleInnslag: Tidslinjeinnslag[]
) => {
    if (
        index === 0 ||
        innslag.type === TidslinjeinnslagType.hendelse ||
        innslag.periode.type === Periodetype.Utsettelse
    ) {
        return true;
    }
    const forrigeInnslag = alleInnslag[index - 1];

    if (forrigeInnslag.type !== innslag.type) {
        return true;
    }
    if (
        forrigeInnslag.type === TidslinjeinnslagType.periode &&
        forrigeInnslag.type === innslag.type &&
        (forrigeInnslag.periode.forelder !== innslag.periode.forelder ||
            forrigeInnslag.periode.type !== innslag.periode.type)
    ) {
        return true;
    }
    return false;
};

export const skjulForstePeriodeEtterTermin = (
    innslag: Tidslinjeinnslag,
    index: number,
    alleInnslag: Tidslinjeinnslag[]
) => {
    const { forrige, neste } = getForrigeNeste<Tidslinjeinnslag>(
        index,
        alleInnslag
    );
    // Se om forrige var termin
    if (
        forrige &&
        forrige.type === TidslinjeinnslagType.hendelse &&
        forrige.hendelse === 'termin'
    ) {
        // Se om neste er ikke utsettelse
        if (
            neste &&
            neste.type === TidslinjeinnslagType.periode &&
            neste.periode.type === Periodetype.Utsettelse
        ) {
            return false;
        }
    }
    return true;
};

const sorterTidslinjeinnslagEtterStartdato = (
    innslag1: Tidslinjeinnslag,
    innslag2: Tidslinjeinnslag
) => {
    const startdato1 = getStartdato(innslag1);
    const startdato2 = getStartdato(innslag2);

    if (isSameDay(startdato1, startdato2)) {
        return erTerminHendelse(innslag1) ? -1 : 1;
    }
    return startdato1 >= startdato2 ? 1 : -1;
};

export const getStartdato = (innslag: Tidslinjeinnslag): Date =>
    innslag.type === TidslinjeinnslagType.hendelse
        ? innslag.dato
        : innslag.periode.tidsperiode.startdato;

export const erTerminHendelse = (innslag: Tidslinjeinnslag): boolean =>
    innslag.type === TidslinjeinnslagType.hendelse &&
    innslag.hendelse === 'termin';

export const getForrigeNeste = <T>(
    index: number,
    elementer: T[]
): { forrige: T | undefined; neste: T | undefined } => {
    const antall = elementer.length;
    const forrige = index > 0 && antall > 0 ? elementer[index - 1] : undefined;
    const neste = index < antall - 1 ? elementer[index + 1] : undefined;
    return {
        forrige,
        neste
    };
};
