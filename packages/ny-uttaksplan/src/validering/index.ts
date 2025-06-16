import { Regel, RegelAlvorlighet } from './../types/regelTypes';
import { inneholderUttaksplanPerioderTest } from './regler/inneholderUttaksplanPerioderTest';

export enum UttaksplanRegelKey {
    'planenInneholderIngenPerioder' = 'planenInneholderIngenPerioder',
}

export type RegelKey = UttaksplanRegelKey;

const uttaksplanValideringRegler = (): Regel[] => [
    {
        key: UttaksplanRegelKey.planenInneholderIngenPerioder,
        alvorlighet: RegelAlvorlighet.FEIL,
        test: inneholderUttaksplanPerioderTest,
    },
];

export const uttaksplanRegler = () => [...uttaksplanValideringRegler()];
