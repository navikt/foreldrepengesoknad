import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils/src/uttak/Uttaksdagen';
import { sorterUttakPerioder } from '@navikt/fp-uttaksplan';

import { useLoggOverlappIVedtak } from './useLoggOverlappIVedtak';

dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

export const useUttaksplanForEksisterendeSak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    const valgtSak = sakerQuery.data?.foreldrepenger.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);
    const gjeldendeVedtak = valgtSak?.gjeldendeVedtak;
    const perioderFraBackend = gjeldendeVedtak?.perioder;

    const trimmedSøker =
        perioderFraBackend && perioderAnnenPart
            ? fjernUtsettelseOverlapp(perioderFraBackend, perioderAnnenPart)
            : perioderFraBackend;
    const trimmedAnnenPart =
        perioderFraBackend && perioderAnnenPart
            ? fjernUtsettelseOverlapp(perioderAnnenPart, perioderFraBackend)
            : perioderAnnenPart;

    const justeringSøkerPerioder =
        trimmedSøker && trimmedAnnenPart
            ? midlertidigJusteringAvSamtidigUttak(trimmedSøker, trimmedAnnenPart)
            : undefined;

    const søkerRef = trimmedSøker ?? perioderFraBackend ?? [];
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
// annen part sin periode til samtidig uttak for å få rett visning i kalender
const midlertidigJusteringAvSamtidigUttak = (
    perioderSøker1: UttakPeriode_fpoversikt[],
    perioderSøker2: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioderSøker1.flatMap((periodeSøker1) => {
        const overlappendeSøker2Periode = perioderSøker2.find((søker) => harOverlapp(periodeSøker1, søker));

        if (!overlappendeSøker2Periode) {
            return [periodeSøker1];
        }
        const skalEndreTilSamtidigUttak =
            overlappendeSøker2Periode.samtidigUttak !== undefined && periodeSøker1.samtidigUttak === undefined;

        if (!skalEndreTilSamtidigUttak) {
            return [periodeSøker1];
        }

        const annenFom = dayjs(periodeSøker1.fom);
        const annenTom = dayjs(periodeSøker1.tom);
        const søkerFom = dayjs(overlappendeSøker2Periode.fom);
        const søkerTom = dayjs(overlappendeSøker2Periode.tom);

        const overlappFom = dayjs.max(annenFom, søkerFom);
        const overlappTom = dayjs.min(annenTom, søkerTom);

        const resultat: UttakPeriode_fpoversikt[] = [];

        // Før overlapp
        if (annenFom.isBefore(overlappFom, 'day')) {
            resultat.push({
                ...periodeSøker1,
                tom: Uttaksdagen.forrige(overlappFom.format(ISO_DATE_FORMAT)).getDato(),
            });
        }

        // Overlapp-del
        resultat.push({
            ...periodeSøker1,
            fom: overlappFom.format(ISO_DATE_FORMAT),
            tom: overlappTom.format(ISO_DATE_FORMAT),
            samtidigUttak: 100,
        });

        // Etter overlapp
        if (annenTom.isAfter(overlappTom, 'day')) {
            resultat.push({
                ...periodeSøker1,
                fom: Uttaksdagen.neste(overlappTom.format(ISO_DATE_FORMAT)).getDato(),
            });
        }

        return resultat;
    });
};

const harOverlapp = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt) =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Periodar med utsettelseÅrsak skal ikkje overlappe med den andre søkaren sine periodar.
// Den overlappande delen vert kasta. Denne algoritmen har prioritet over dei to andre og skal køyrast først.
const fjernUtsettelseOverlapp = (
    perioder: UttakPeriode_fpoversikt[],
    motpartPerioder: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioder.flatMap((periode) => {
        if (periode.utsettelseÅrsak === undefined) {
            return [periode];
        }

        const overlappendePerioder = motpartPerioder
            .filter((motpart) => harOverlapp(periode, motpart))
            .sort((a, b) => dayjs(a.fom).valueOf() - dayjs(b.fom).valueOf());

        if (overlappendePerioder.length === 0) {
            return [periode];
        }

        let resterendeSegmenter: UttakPeriode_fpoversikt[] = [periode];

        overlappendePerioder.forEach((motpart) => {
            const motpartFom = dayjs(motpart.fom);
            const motpartTom = dayjs(motpart.tom);

            resterendeSegmenter = resterendeSegmenter.flatMap((segment) => {
                if (!harOverlapp(segment, motpart)) {
                    return [segment];
                }

                const segmentFom = dayjs(segment.fom);
                const segmentTom = dayjs(segment.tom);
                const resultat: UttakPeriode_fpoversikt[] = [];

                if (segmentFom.isBefore(motpartFom, 'day')) {
                    resultat.push({
                        ...segment,
                        tom: Uttaksdagen.forrige(motpartFom.format(ISO_DATE_FORMAT)).getDato(),
                    });
                }

                if (segmentTom.isAfter(motpartTom, 'day')) {
                    resultat.push({
                        ...segment,
                        fom: Uttaksdagen.neste(motpartTom.format(ISO_DATE_FORMAT)).getDato(),
                    });
                }

                return resultat;
            });
        });

        return resterendeSegmenter;
    });
};

// TODO (TOR) Fjern denne når ein byrjar å lagre annen parts periodar
// Om søkar har ein periode som overlappar med annen part sin periode, og ingen av dei har samtidigattak,
// er dette eit duplikat. Den overlappande delen av annen part sin periode skal fjernast.
const fjernOverlappUtenSamtidigUttak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[],
    perioderSøker: UttakPeriode_fpoversikt[],
): UttakPeriode_fpoversikt[] => {
    return perioderAnnenPart.flatMap((periodeAnnenPart) => {
        if (periodeAnnenPart.samtidigUttak !== undefined) {
            return [periodeAnnenPart];
        }

        const overlappendeSøkerPerioder = perioderSøker
            .filter((søker) => søker.samtidigUttak === undefined && harOverlapp(periodeAnnenPart, søker))
            .sort((a, b) => dayjs(a.fom).valueOf() - dayjs(b.fom).valueOf());

        if (overlappendeSøkerPerioder.length === 0) {
            return [periodeAnnenPart];
        }

        let segmenter: UttakPeriode_fpoversikt[] = [periodeAnnenPart];

        overlappendeSøkerPerioder.forEach((overlappendeSøkerPeriode) => {
            const søkerFom = dayjs(overlappendeSøkerPeriode.fom);
            const søkerTom = dayjs(overlappendeSøkerPeriode.tom);

            segmenter = segmenter.flatMap((segment) => {
                if (!harOverlapp(segment, overlappendeSøkerPeriode)) {
                    return [segment];
                }

                const segmentFom = dayjs(segment.fom);
                const segmentTom = dayjs(segment.tom);
                const resultat: UttakPeriode_fpoversikt[] = [];

                if (segmentFom.isBefore(søkerFom, 'day')) {
                    resultat.push({
                        ...segment,
                        tom: Uttaksdagen.forrige(søkerFom.format(ISO_DATE_FORMAT)).getDato(),
                    });
                }

                if (segmentTom.isAfter(søkerTom, 'day')) {
                    resultat.push({
                        ...segment,
                        fom: Uttaksdagen.neste(søkerTom.format(ISO_DATE_FORMAT)).getDato(),
                    });
                }

                return resultat;
            });
        });

        return segmenter;
    });
};
