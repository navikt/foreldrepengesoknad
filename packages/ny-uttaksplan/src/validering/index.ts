import { Regel, RegelAlvorlighet } from './../types/regelTypes';
import { inneholderUttaksplanPerioderTest } from './regler/inneholderUttaksplanPerioderTest';
import { slutterUttaksplanMedOppholdTest } from './regler/slutterUttaksplanMedOppholdTest';
import { starterUttaksplanMedOppholdTest } from './regler/starterUttaksplanMedOppholdTest';

export enum UttaksplanRegelKey {
    'planenInneholderIngenPerioder' = 'planenInneholderIngenPerioder',
    'uttaksplanStarterMedOpphold' = 'uttaksplanStarterMedOpphold',
    'uttaksplanSlutterMedOpphold' = 'uttaksplanSlutterMedOpphold',
}

export type RegelKey = UttaksplanRegelKey;

const uttaksplanValideringRegler = (): Regel[] => [
    {
        key: UttaksplanRegelKey.planenInneholderIngenPerioder,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksplanPerioderTest,
    },
    {
        key: UttaksplanRegelKey.uttaksplanStarterMedOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: starterUttaksplanMedOppholdTest,
    },
    {
        key: UttaksplanRegelKey.uttaksplanStarterMedOpphold,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: slutterUttaksplanMedOppholdTest,
    },
];

export const uttaksplanRegler = () => [...uttaksplanValideringRegler()];
