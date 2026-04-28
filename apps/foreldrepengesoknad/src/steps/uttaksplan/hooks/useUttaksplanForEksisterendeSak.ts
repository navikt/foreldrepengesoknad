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

    // Pre-split both parties' periods at each other's boundaries so each segment
    // either fully overlaps or does not overlap at all when comparing the two parties
    const splitSøker =
        perioderFraBackend && perioderAnnenPart
            ? splitPerioder(perioderFraBackend, perioderAnnenPart)
            : perioderFraBackend;
    const splitAnnenPart =
        perioderFraBackend && perioderAnnenPart
            ? splitPerioder(perioderAnnenPart, perioderFraBackend)
            : perioderAnnenPart;

    const trimmedAnnenPart =
        splitSøker && splitAnnenPart ? fjernUtsettelseOverlapp(splitAnnenPart, splitSøker) : splitAnnenPart;

    const søkerRef = splitSøker ?? [];
    const justeringSøkerPerioder =
        perioderFraBackend && trimmedAnnenPart
            ? midlertidigJusteringAvSamtidigUttak(søkerRef, trimmedAnnenPart)
            : undefined;

    const uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined = gjeldendeVedtak
        ? [
              ...fjernFrieUtsettelser(justeringSøkerPerioder ?? gjeldendeVedtak.perioder),
              ...(gjeldendeVedtak.perioderAnnenpartEøs ?? []),
              ...(trimmedAnnenPart
                  ? fjernOverlappUtenSamtidigUttak(
                        midlertidigJusteringAvSamtidigUttak(trimmedAnnenPart, søkerRef),
                        søkerRef,
                    )
                  : []),
          ].sort(sorterUttakPerioder)
        : undefined;

    useLoggOverlappIVedtak(uttaksplan);

    if (!sakerQuery?.data || !valgtEksisterendeSaksnr || !gjeldendeVedtak) {
        return undefined;
    }

    // uttaksplan er alltid definert når gjeldendeVedtak er definert
    return uttaksplan!;
};

// Split periods at the boundaries of another party's periods so each resulting segment
// can only fully overlap or not overlap at all with the other party's periods
const splitPerioder = (
    perioderToSplit: UttakPeriode_fpoversikt[],
    splittBasertPå: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    const splitDatoer = [...new Set(splittBasertPå.flatMap((p) => [p.fom, Uttaksdagen.neste(p.tom).getDato()]))].sort();

    return perioderToSplit.flatMap((periode) => {
        const relevanteDelDatoer = splitDatoer.filter(
            (dato) => dayjs(dato).isAfter(periode.fom, 'day') && dayjs(dato).isSameOrBefore(periode.tom, 'day'),
        );

        if (relevanteDelDatoer.length === 0) return [periode];

        const resultat: UttakPeriode_fpoversikt[] = [];
        let gjeldendeFom = periode.fom;

        for (const dato of relevanteDelDatoer) {
            resultat.push({ ...periode, fom: gjeldendeFom, tom: Uttaksdagen.forrige(dato).getDato() });
            gjeldendeFom = dato;
        }

        resultat.push({ ...periode, fom: gjeldendeFom });
        return resultat;
    });
};

const fjernFrieUtsettelser = (perioder: UttakPeriode_fpoversikt[]): UttakPeriode_fpoversikt[] => {
    // Dersom perioden har et aktivitetskrav så er det en periode lagt inn for kun far har rett
    // og det skal derfor ikke fjernes selv om det er en utsettelse med årsak fri
    const erEnPeriodeMedFriUtsettelseSomSkalBeholdes = (periode: UttakPeriode_fpoversikt) => {
        if (periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet !== undefined) {
            return true;
        }

        return false;
    };

    return perioder.filter(
        (periode) => erEnPeriodeMedFriUtsettelseSomSkalBeholdes(periode) || periode.utsettelseÅrsak !== 'FRI',
    );
};

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Om annen part har søkt først og har lagt til ein periode som overlappar med søkar sin samtidig uttaksperiode (er muligens kun
// synleg om søkar har har lagt til samtidig uttak og så seinare ser på ein endringssøknad), så må en endra
// annen part sin periode til samtidig uttak for å få rett visning i kalender.
// Periodane er pre-splitta, så overlapp er alltid fullstendig (aldri delvis).
const midlertidigJusteringAvSamtidigUttak = (
    perioderSøker1: UttakPeriode_fpoversikt[],
    perioderSøker2: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioderSøker1.map((periodeSøker1) => {
        const overlappendeSøker2Periode = perioderSøker2.find((søker) => harOverlapp(periodeSøker1, søker));

        if (!overlappendeSøker2Periode) return periodeSøker1;

        const skalEndreTilSamtidigUttak =
            overlappendeSøker2Periode.samtidigUttak !== undefined && periodeSøker1.samtidigUttak === undefined;

        return skalEndreTilSamtidigUttak ? { ...periodeSøker1, samtidigUttak: 100 } : periodeSøker1;
    });
};

const harOverlapp = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt) =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Periodar med utsettelseÅrsak skal ikkje overlappe med den andre søkaren sine periodar.
// Den overlappande delen vert kasta. Denne algoritmen har prioritet over dei to andre og skal køyrast først.
// Periodane er pre-splitta, så overlappande segment kan berre kastast direkte (aldri delvis).
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
// Periodane er pre-splitta, så overlappande segment kan berre kastast direkte (aldri delvis).
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
