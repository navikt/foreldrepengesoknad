import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils/src/uttak/Uttaksdagen';
import { sorterUttakPerioder } from '@navikt/fp-uttaksplan';

import { useLoggOverlappIVedtak } from './useLoggOverlappIVedtak';

dayjs.extend(isSameOrBefore);

export const useUttaksplanForEksisterendeSak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    const valgtSak = sakerQuery.data?.foreldrepenger.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);
    const gjeldendeVedtak = valgtSak?.gjeldendeVedtak;
    const perioderFraBackend = gjeldendeVedtak?.perioder;

    // Deler opp begge partar ved kvarandre sine grenser slik at kvart segment anten
    // heilt overlappar eller ikkje overlappar i det heile. Algoritmane vert då enkle
    // filter/map-operasjonar. Tilstøytande like segment vert slått saman att til slutt.
    const splitSøker =
        perioderFraBackend && perioderAnnenPart
            ? splitPerioder(perioderFraBackend, perioderAnnenPart)
            : perioderFraBackend;
    const splitAnnenPart =
        perioderFraBackend && perioderAnnenPart
            ? splitPerioder(perioderAnnenPart, perioderFraBackend)
            : perioderAnnenPart;

    // Periodar med utsettelseÅrsak som overlappar motparten skal fjernast, uansett kven som eig perioden
    const trimmedSøker =
        splitSøker && splitAnnenPart ? fjernUtsettelseOverlapp(splitSøker, splitAnnenPart) : splitSøker;
    const trimmedAnnenPart =
        splitSøker && splitAnnenPart ? fjernUtsettelseOverlapp(splitAnnenPart, splitSøker) : splitAnnenPart;

    const søkerRef = trimmedSøker ?? [];
    const justeringSøkerPerioder =
        trimmedSøker && trimmedAnnenPart
            ? midlertidigJusteringAvSamtidigUttak(trimmedSøker, trimmedAnnenPart)
            : undefined;

    // Slår saman kvar part for seg før kombinering, slik at tilstøytande segment
    // med identiske eigenskapar vert gjenoppretta til enkeltperiodar i output.
    const mergedSøker = slåSammenTilstøtande(
        fjernFrieUtsettelser(justeringSøkerPerioder ?? trimmedSøker ?? gjeldendeVedtak?.perioder ?? []),
    );
    const processedAnnenPart = trimmedAnnenPart
        ? slåSammenTilstøtande(
              fjernOverlappUtenSamtidigUttak(midlertidigJusteringAvSamtidigUttak(trimmedAnnenPart, søkerRef), søkerRef),
          )
        : [];

    const uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined = gjeldendeVedtak
        ? [...mergedSøker, ...(gjeldendeVedtak.perioderAnnenpartEøs ?? []), ...processedAnnenPart].sort(
              sorterUttakPerioder,
          )
        : undefined;

    useLoggOverlappIVedtak(uttaksplan, perioderFraBackend, perioderAnnenPart);

    if (!sakerQuery?.data || !valgtEksisterendeSaksnr || !gjeldendeVedtak) {
        return undefined;
    }

    // uttaksplan er alltid definert når gjeldendeVedtak er definert
    return uttaksplan!;
};

// Deler opp periodar ved grensene til motparten slik at kvart segment
// anten heilt overlappar eller ikkje overlappar med motparten sine periodar.
const splitPerioder = (
    perioderToSplit: UttakPeriode_fpoversikt[],
    splittBasertPå: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    const splitDatoar = [...new Set(splittBasertPå.flatMap((p) => [p.fom, Uttaksdagen.neste(p.tom).getDato()]))].sort(
        (a, b) => a.localeCompare(b),
    );

    return perioderToSplit.flatMap((periode) => {
        const relevante = splitDatoar.filter(
            (dato) => dayjs(dato).isAfter(periode.fom, 'day') && dayjs(dato).isSameOrBefore(periode.tom, 'day'),
        );

        if (relevante.length === 0) {
            return [periode];
        }

        const resultat: UttakPeriode_fpoversikt[] = [];
        let gjeldandeFom = periode.fom;

        for (const dato of relevante) {
            resultat.push({ ...periode, fom: gjeldandeFom, tom: Uttaksdagen.forrige(dato).getDato() });
            gjeldandeFom = dato;
        }

        resultat.push({ ...periode, fom: gjeldandeFom });
        return resultat;
    });
};

// Slår saman tilstøytande periodar med identiske eigenskapar.
// Vert kalla separat for søkar og annenPart for å gjenopprette periodar
// som vart delt av splitPerioder.
const slåSammenTilstøtande = (perioder: UttakPeriode_fpoversikt[]): UttakPeriode_fpoversikt[] => {
    return perioder.reduce<UttakPeriode_fpoversikt[]>((acc, periode) => {
        if (acc.length === 0) {
            return [periode];
        }
        const forrige = acc.at(-1)!;
        const erTilstøtande = Uttaksdagen.neste(forrige.tom).getDato() === periode.fom;
        if (erTilstøtande && erLikeUtenDatoar(forrige, periode)) {
            return [...acc.slice(0, -1), { ...forrige, tom: periode.tom }];
        }
        return [...acc, periode];
    }, []);
};

const erLikeUtenDatoar = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt): boolean =>
    a.forelder === b.forelder &&
    a.kontoType === b.kontoType &&
    a.flerbarnsdager === b.flerbarnsdager &&
    a.gradering?.arbeidstidprosent === b.gradering?.arbeidstidprosent &&
    a.gradering?.aktivitet === b.gradering?.aktivitet &&
    a.morsAktivitet === b.morsAktivitet &&
    a.oppholdÅrsak === b.oppholdÅrsak &&
    a.utsettelseÅrsak === b.utsettelseÅrsak &&
    a.overføringÅrsak === b.overføringÅrsak &&
    a.resultat?.innvilget === b.resultat?.innvilget &&
    a.resultat?.trekkerDager === b.resultat?.trekkerDager &&
    a.resultat?.trekkerMinsterett === b.resultat?.trekkerMinsterett &&
    a.resultat?.årsak === b.resultat?.årsak &&
    a.samtidigUttak === b.samtidigUttak;

const fjernFrieUtsettelser = (perioder: UttakPeriode_fpoversikt[]): UttakPeriode_fpoversikt[] => {
    // Dersom perioden har eit aktivitetskrav er det ein periode lagt inn for kun far har rett,
    // og den skal difor ikkje fjernast sjølv om det er ei utsettelse med årsak fri.
    return perioder.filter(
        (periode) =>
            (periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet !== undefined) ||
            periode.utsettelseÅrsak !== 'FRI',
    );
};

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Om annen part har søkt først og har lagt til ein periode som overlappar med søkar sin samtidig uttaksperiode (er muligens kun
// synleg om søkar har har lagt til samtidig uttak og så seinare ser på ein endringssøknad), så må en endra
// annen part sin periode til samtidig uttak for å få rett visning i kalender.
// Periodane er pre-splitta, så overlapp er alltid fullstendig.
const midlertidigJusteringAvSamtidigUttak = (
    perioderSøker1: UttakPeriode_fpoversikt[],
    perioderSøker2: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioderSøker1.map((p) => {
        const overlappande = perioderSøker2.find((s) => harOverlapp(p, s));
        if (!overlappande) {
            return p;
        }
        return overlappande.samtidigUttak !== undefined && p.samtidigUttak === undefined
            ? { ...p, samtidigUttak: 100 }
            : p;
    });
};

const harOverlapp = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt) =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Periodar med utsettelseÅrsak skal ikkje overlappe med den andre søkaren sine periodar.
// Den overlappande delen vert kasta. Denne algoritmen har prioritet over dei to andre og skal køyrast først.
// Periodane er pre-splitta, så overlappande segment kan kastast direkte.
const fjernUtsettelseOverlapp = (
    perioder: UttakPeriode_fpoversikt[],
    motpartPerioder: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioder.filter(
        (periode) => periode.utsettelseÅrsak === undefined || !motpartPerioder.some((m) => harOverlapp(periode, m)),
    );
};

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Om søkar har ein periode som overlappar med annen part sin periode, og ingen av dei har samtidigattak,
// er dette eit duplikat. Den overlappande delen av annen part sin periode skal fjernast.
// Periodar med utsettelseÅrsak hjå søkar tel ikkje som overlapp her.
// Periodane er pre-splitta, så overlappande segment kan kastast direkte.
const fjernOverlappUtenSamtidigUttak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[],
    perioderSøker: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioderAnnenPart.filter(
        (periodeAnnenPart) =>
            periodeAnnenPart.samtidigUttak !== undefined ||
            !perioderSøker.some(
                (søker) =>
                    søker.samtidigUttak === undefined &&
                    søker.utsettelseÅrsak === undefined &&
                    harOverlapp(periodeAnnenPart, søker),
            ),
    );
};
