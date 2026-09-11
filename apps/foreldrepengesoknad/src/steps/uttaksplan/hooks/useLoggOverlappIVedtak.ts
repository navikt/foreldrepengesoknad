import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useEffect, useRef } from 'react';

import { captureException } from '@navikt/fp-observability';
import { PeriodeDto_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

dayjs.extend(isSameOrBefore);

/**
 * I den nye, intervall-baserte periodemodellen skal to ULIKE PeriodeDto_fpoversikt-element i
 * uttaksplanen aldri overlappa i tid – samtidig uttak/opphald blir no uttrykt som éin periode med
 * både søker og annenPart (og evt. annenPartEøs) sett, ikkje som to overlappande periodar slik
 * som i den gamle, flate modellen. Denne hooken loggar til Sentry dersom det likevel oppstår
 * overlapp, t.d. som følgje av den forenkla samanslåinga i useUttaksplanForEksisterendeSak.
 */
export const useLoggOverlappIVedtak = (
    uttaksplan: PeriodeDto_fpoversikt[] | undefined,
    perioderFraBackend: UttakPeriode_fpoversikt[] | undefined,
    perioderAnnenPartFraBackend: UttakPeriode_fpoversikt[] | undefined,
): void => {
    const lastCheckedFingerprintRef = useRef<string | null>(null);

    useEffect(() => {
        if (!uttaksplan || uttaksplan.length === 0) {
            return;
        }

        const fingerprint = uttaksplan.map((p) => `${p.fom}:${p.tom}`).join(',');
        if (lastCheckedFingerprintRef.current === fingerprint) {
            return;
        }
        lastCheckedFingerprintRef.current = fingerprint;

        const ugyldigeOverlapp = finnUgyldigeOverlapp(uttaksplan);
        if (ugyldigeOverlapp.length > 0) {
            captureException(new Error('Uttaksplan har ugyldig overlappande periodar etter transformasjon'), {
                context: {
                    feiltype: 'uttaksplan-overlapp-etter-transformasjon',
                    antallUgyldigeOverlapp: ugyldigeOverlapp.length,
                    ugyldigeOverlappPar: ugyldigeOverlapp.slice(0, 20).map(([a, b]) => ({
                        a: periodeTilLoggObjekt(a),
                        b: periodeTilLoggObjekt(b),
                    })),
                    uttaksplan: uttaksplan.map(periodeTilLoggObjekt),
                    perioderFraBackend: perioderFraBackend?.map(gammalPeriodeTilLoggObjekt),
                    perioderAnnenPartFraBackend: perioderAnnenPartFraBackend?.map(gammalPeriodeTilLoggObjekt),
                },
            });
        }
    }, [uttaksplan, perioderFraBackend, perioderAnnenPartFraBackend]);
};

export const finnUgyldigeOverlapp = (
    perioder: PeriodeDto_fpoversikt[],
): Array<[PeriodeDto_fpoversikt, PeriodeDto_fpoversikt]> => {
    const ugyldigeOverlapp: Array<[PeriodeDto_fpoversikt, PeriodeDto_fpoversikt]> = [];
    for (let i = 0; i < perioder.length; i++) {
        for (let j = i + 1; j < perioder.length; j++) {
            const a = perioder[i]!;
            const b = perioder[j]!;
            if (erOverlappande(a, b)) {
                ugyldigeOverlapp.push([a, b]);
            }
        }
    }
    return ugyldigeOverlapp;
};

const erOverlappande = (a: { fom: string; tom: string }, b: { fom: string; tom: string }): boolean =>
    dayjs(a.fom).isSameOrBefore(b.tom, 'day') && dayjs(b.fom).isSameOrBefore(a.tom, 'day');

const periodeTilLoggObjekt = (p: PeriodeDto_fpoversikt) => ({
    fom: p.fom,
    tom: p.tom,
    søker: p.søker && {
        forelder: p.søker.forelder,
        kontoType: p.søker.kontoType,
        utsettelseÅrsak: p.søker.utsettelseÅrsak,
        overføringÅrsak: p.søker.overføringÅrsak,
        samtidigUttak: p.søker.samtidigUttak,
    },
    annenPart: p.annenPart && {
        forelder: p.annenPart.forelder,
        kontoType: p.annenPart.kontoType,
        utsettelseÅrsak: p.annenPart.utsettelseÅrsak,
        overføringÅrsak: p.annenPart.overføringÅrsak,
        samtidigUttak: p.annenPart.samtidigUttak,
    },
    annenPartEøs: p.annenPartEøs && { kontoType: p.annenPartEøs.kontoType },
});

const gammalPeriodeTilLoggObjekt = (p: UttakPeriode_fpoversikt) => ({
    fom: p.fom,
    tom: p.tom,
    forelder: p.forelder,
    kontoType: p.kontoType,
    utsettelseÅrsak: p.utsettelseÅrsak,
    oppholdÅrsak: p.oppholdÅrsak,
    overføringÅrsak: p.overføringÅrsak,
    samtidigUttak: p.samtidigUttak,
});
