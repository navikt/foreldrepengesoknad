import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useEffect, useRef } from 'react';

import { captureMessage, withScope } from '@navikt/fp-observability';
import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

dayjs.extend(isSameOrBefore);

export const useLoggOverlappIVedtak = (
    perioderSøker: UttakPeriode_fpoversikt[] | undefined,
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
    justeringSøkerPerioder: UttakPeriode_fpoversikt[] | undefined,
): void => {
    const harLogget = useRef(false);
    useEffect(() => {
        if (harLogget.current || !perioderSøker) {
            return;
        }
        harLogget.current = true;

        const ugyldigeOverlappSøker = finnUgyldigeOverlapp(perioderSøker);
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
                scope.setExtra('perioderFraBackend', perioderSøker.map(periodeTilLoggObjekt));
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

            // Sjekk overlapp på tvers av søker og annen part med rådata direkte fra backend (ingen transformasjonar)
            const ugyldigeKrysspartOverlapp = finnUgyldigeOverlapp([...perioderSøker, ...perioderAnnenPart]).filter(
                ([a, b]) => a.forelder !== b.forelder,
            );
            if (ugyldigeKrysspartOverlapp.length > 0) {
                withScope((scope) => {
                    scope.setLevel('warning');
                    scope.setTag('feiltype', 'uttaksplan-krysspart-overlapp');
                    scope.setExtra('antallUgyldigeOverlapp', ugyldigeKrysspartOverlapp.length);
                    scope.setExtra(
                        'ugyldigeOverlappPar',
                        ugyldigeKrysspartOverlapp.slice(0, 20).map(([a, b]) => ({
                            a: periodeTilLoggObjekt(a),
                            b: periodeTilLoggObjekt(b),
                        })),
                    );
                    scope.setExtra('perioderSøker', perioderSøker.map(periodeTilLoggObjekt));
                    scope.setExtra('perioderAnnenPart', perioderAnnenPart.map(periodeTilLoggObjekt));
                    captureMessage(
                        'Eksisterande vedtak har ugyldig overlappande periodar på tvers av foreldre',
                        'warning',
                    );
                });
            }

            if (justeringSøkerPerioder) {
                const ugyldigeOverlappEtterJustering = finnUgyldigeOverlapp(justeringSøkerPerioder);
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
                        scope.setExtra('søkerPeriodeFørJustering', perioderSøker.map(periodeTilLoggObjekt));
                        scope.setExtra('søkerPeriodeEtterJustering', justeringSøkerPerioder.map(periodeTilLoggObjekt));
                        scope.setExtra('annenPartPerioder', perioderAnnenPart.map(periodeTilLoggObjekt));
                        captureMessage('midlertidigJusteringAvSamtidigUttak introduserte nye overlapp', 'warning');
                    });
                }
            }
        }
    }, [perioderSøker, perioderAnnenPart, justeringSøkerPerioder]);
};

const erOverlappande = (a: UttakPeriode_fpoversikt, b: UttakPeriode_fpoversikt): boolean =>
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
