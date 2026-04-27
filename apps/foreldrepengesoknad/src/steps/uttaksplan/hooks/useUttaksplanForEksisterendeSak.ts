import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import { useEffect, useRef } from 'react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { captureMessage, withScope } from '@navikt/fp-observability';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils/src/uttak/Uttaksdagen';
import { sorterUttakPerioder } from '@navikt/fp-uttaksplan';

dayjs.extend(isSameOrBefore);
dayjs.extend(minMax);

export const useUttaksplanForEksisterendeSak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    const harLoggetOverlapp = useRef(false);
    useEffect(() => {
        if (harLoggetOverlapp.current || !sakerQuery.data || !valgtEksisterendeSaksnr) {
            return;
        }
        harLoggetOverlapp.current = true;

        const valgtSak = sakerQuery.data.foreldrepenger.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);
        const perioderFraBackend = valgtSak?.gjeldendeVedtak?.perioder;

        if (!perioderFraBackend) {
            return;
        }

        const ugyldigeOverlappSøker = finnUgyldigeOverlapp(perioderFraBackend);
        if (ugyldigeOverlappSøker.length > 0) {
            withScope((scope) => {
                scope.setLevel('warning');
                scope.setTag('feiltype', 'uttaksplan-backend-overlapp');
                scope.setExtra('kilde', 'søker');
                scope.setExtra('antallUgyldigeOverlapp', ugyldigeOverlappSøker.length);
                scope.setExtra(
                    'ugyldigeOverlappPar',
                    ugyldigeOverlappSøker.slice(0, 20).map(([a, b]) => ({
                        a: periodeTilLoggObjekt(a),
                        b: periodeTilLoggObjekt(b),
                    })),
                );
                scope.setExtra('perioderFraBackend', perioderFraBackend.map(periodeTilLoggObjekt));
                captureMessage('Eksisterande vedtak (søker) har ugyldig overlappande periodar', 'warning');
            });
        }

        if (perioderAnnenPart && perioderAnnenPart.length > 0) {
            const ugyldigeOverlappAnnenPart = finnUgyldigeOverlapp(perioderAnnenPart);
            if (ugyldigeOverlappAnnenPart.length > 0) {
                withScope((scope) => {
                    scope.setLevel('warning');
                    scope.setTag('feiltype', 'uttaksplan-backend-overlapp');
                    scope.setExtra('kilde', 'annenPart');
                    scope.setExtra('antallUgyldigeOverlapp', ugyldigeOverlappAnnenPart.length);
                    scope.setExtra(
                        'ugyldigeOverlappPar',
                        ugyldigeOverlappAnnenPart.slice(0, 20).map(([a, b]) => ({
                            a: periodeTilLoggObjekt(a),
                            b: periodeTilLoggObjekt(b),
                        })),
                    );
                    scope.setExtra('perioderFraBackend', perioderAnnenPart.map(periodeTilLoggObjekt));
                    captureMessage('Eksisterande vedtak (annen part) har ugyldig overlappande periodar', 'warning');
                });
            }

            const justert = midlertidigJusteringAvSamtidigUttak(perioderFraBackend, perioderAnnenPart);
            const ugyldigeOverlappEtterJustering = finnUgyldigeOverlapp(justert);
            if (ugyldigeOverlappEtterJustering.length > ugyldigeOverlappSøker.length) {
                withScope((scope) => {
                    scope.setLevel('warning');
                    scope.setTag('feiltype', 'uttaksplan-midlertidig-justering-overlapp');
                    scope.setExtra('antallFørJustering', ugyldigeOverlappSøker.length);
                    scope.setExtra('antallEtterJustering', ugyldigeOverlappEtterJustering.length);
                    scope.setExtra(
                        'ugyldigeOverlappPar',
                        ugyldigeOverlappEtterJustering.slice(0, 20).map(([a, b]) => ({
                            a: periodeTilLoggObjekt(a),
                            b: periodeTilLoggObjekt(b),
                        })),
                    );
                    scope.setExtra('søkerPeriodeFørJustering', perioderFraBackend.map(periodeTilLoggObjekt));
                    scope.setExtra('søkerPeriodeEtterJustering', justert.map(periodeTilLoggObjekt));
                    scope.setExtra('annenPartPerioder', perioderAnnenPart.map(periodeTilLoggObjekt));
                    captureMessage('midlertidigJusteringAvSamtidigUttak introduserte nye overlapp', 'warning');
                });
            }
        }
    }, [sakerQuery.data, valgtEksisterendeSaksnr, perioderAnnenPart]);

    if (!sakerQuery?.data || !valgtEksisterendeSaksnr) {
        return undefined;
    }

    const valgtSak = sakerQuery.data.foreldrepenger.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);

    if (!valgtSak?.gjeldendeVedtak) {
        return undefined;
    }

    const søkerPerioder = perioderAnnenPart
        ? midlertidigJusteringAvSamtidigUttak(valgtSak.gjeldendeVedtak.perioder, perioderAnnenPart)
        : valgtSak.gjeldendeVedtak.perioder;

    const uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> =
        fjernFrieUtsettelser(søkerPerioder);

    if (valgtSak.gjeldendeVedtak?.perioderAnnenpartEøs) {
        uttaksplan.push(...valgtSak.gjeldendeVedtak.perioderAnnenpartEøs);
    }

    if (perioderAnnenPart) {
        uttaksplan.push(...midlertidigJusteringAvSamtidigUttak(perioderAnnenPart, valgtSak.gjeldendeVedtak.perioder));
    }

    return uttaksplan.sort(sorterUttakPerioder);
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

const finnUgyldigeOverlapp = (
    perioder: UttakPeriode_fpoversikt[],
): Array<[UttakPeriode_fpoversikt, UttakPeriode_fpoversikt]> => {
    const ugyldigeOverlapp: Array<[UttakPeriode_fpoversikt, UttakPeriode_fpoversikt]> = [];
    for (let i = 0; i < perioder.length; i++) {
        for (let j = i + 1; j < perioder.length; j++) {
            const a = perioder[i]!;
            const b = perioder[j]!;
            if (
                harOverlapp(a, b) &&
                !(
                    a.utsettelseÅrsak === undefined &&
                    b.utsettelseÅrsak === undefined &&
                    a.oppholdÅrsak === undefined &&
                    b.oppholdÅrsak === undefined &&
                    a.samtidigUttak !== undefined &&
                    b.samtidigUttak !== undefined &&
                    a.forelder !== b.forelder
                )
            ) {
                ugyldigeOverlapp.push([a, b]);
            }
        }
    }
    return ugyldigeOverlapp;
};

const periodeTilLoggObjekt = (p: UttakPeriode_fpoversikt) => ({
    fom: p.fom,
    tom: p.tom,
    forelder: p.forelder,
    kontoType: p.kontoType,
    utsettelseÅrsak: p.utsettelseÅrsak,
    oppholdÅrsak: p.oppholdÅrsak,
    overføringÅrsak: p.overføringÅrsak,
    samtidigUttak: p.samtidigUttak,
});
