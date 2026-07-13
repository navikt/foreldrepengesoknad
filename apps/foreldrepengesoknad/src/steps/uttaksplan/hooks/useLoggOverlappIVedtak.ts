import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useEffect, useRef } from 'react';

import { captureMessage, withScope } from '@navikt/fp-observability';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

dayjs.extend(isSameOrBefore);

export const useLoggOverlappIVedtak = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined,
    perioderFraBackend: UttakPeriode_fpoversikt[] | undefined,
    perioderAnnenPartFraBackend: UttakPeriode_fpoversikt[] | undefined,
): void => {
    const lastCheckedFingerprint = useRef<string | null>(null);

    useEffect(() => {
        if (!uttaksplan || uttaksplan.length === 0) {
            return;
        }

        const fingerprint = uttaksplan.map((p) => `${p.fom}:${p.tom}`).join(',');
        if (lastCheckedFingerprint.current === fingerprint) {
            return;
        }
        lastCheckedFingerprint.current = fingerprint;

        const { perioderUttaksplan, ugyldigeOverlapp } = finnUgyldigeOverlappIUttaksplan(uttaksplan);
        if (ugyldigeOverlapp.length > 0) {
            withScope((scope) => {
                scope.setLevel('warning');
                scope.setTag('feiltype', 'uttaksplan-overlapp-etter-transformasjon');
                scope.setExtra('antallUgyldigeOverlapp', ugyldigeOverlapp.length);
                scope.setExtra(
                    'ugyldigeOverlappPar',
                    ugyldigeOverlapp.slice(0, 20).map(([a, b]) => ({
                        a: periodeTilLoggObjekt(a),
                        b: periodeTilLoggObjekt(b),
                    })),
                );
                scope.setExtra('uttaksplan', perioderUttaksplan.map(periodeTilLoggObjekt));
                scope.setExtra('perioderFraBackend', perioderFraBackend?.map(periodeTilLoggObjekt));
                scope.setExtra('perioderAnnenPartFraBackend', perioderAnnenPartFraBackend?.map(periodeTilLoggObjekt));
                captureMessage('Uttaksplan har ugyldig overlappande periodar etter transformasjon', 'warning');
            });
        }
    }, [uttaksplan, perioderFraBackend, perioderAnnenPartFraBackend]);
};

export const finnUgyldigeOverlappIUttaksplan = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined,
): {
    perioderUttaksplan: UttakPeriode_fpoversikt[];
    ugyldigeOverlapp: Array<[UttakPeriode_fpoversikt, UttakPeriode_fpoversikt]>;
} => {
    const perioderUttaksplan = (uttaksplan ?? [])
        .filter((p): p is UttakPeriode_fpoversikt => 'forelder' in p)
        .filter(okkupererTid);
    return { perioderUttaksplan, ugyldigeOverlapp: finnUgyldigeOverlapp(perioderUttaksplan) };
};

const erOverlappande = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt): boolean =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');

// Avslåtte periodar utan trekkdagar okkuperer ikkje tid i planen og blir filtrert vekk før visning
// (sjå filtrerBortPerioderUtenTrekkdager i UttaksplanDataContext). Dei skal difor ikkje reknast som
// ugyldige overlapp her, sjølv om dei overlappar annen part sin reelle periode i mellomresultatet.
const okkupererTid = (periode: UttakPeriode_fpoversikt): boolean =>
    !(periode.resultat?.innvilget === false && periode.resultat?.trekkerDager === false);

const finnUgyldigeOverlapp = (
    perioder: UttakPeriode_fpoversikt[],
): Array<[UttakPeriode_fpoversikt, UttakPeriode_fpoversikt]> => {
    const ugyldigeOverlapp: Array<[UttakPeriode_fpoversikt, UttakPeriode_fpoversikt]> = [];
    for (let i = 0; i < perioder.length; i++) {
        for (let j = i + 1; j < perioder.length; j++) {
            const a = perioder[i]!;
            const b = perioder[j]!;
            if (
                erOverlappande(a, b) &&
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
