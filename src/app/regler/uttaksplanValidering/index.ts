import { Regel, RegelAlvorlighet } from './types';
import { inneholderUttaksplanPerioderTest } from './tester/inneholderUttaksplanPerioderTest';
import { harMorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harMorSøktUgyldigUttakFørsteSeksUkerTest';
import { inneholderStønadskontoForMyeUttakTest } from './tester/inneholderStønadskontoForMyeUttakTest';
import { harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest';

export enum RegelKey {
    'inneholderUttaksplanPerioder' = 'inneholderUttaksplanPerioder',
    'harMorSøktUgyldigUttakFørsteSeksUker' = 'harMorSøktUgyldigUttakFørsteSeksUker',
    'harFarMedmorSøktUgyldigUttakFørsteSeksUker' = 'harFarMedmorSøktUgyldigUttakFørsteSeksUker',
    'inneholderStønadskontoForMyeUttak' = 'inneholderStønadskontoForMyeUttak'
}

const uttaksplanRegler: Regel[] = [
    {
        key: RegelKey.inneholderUttaksplanPerioder,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: inneholderUttaksplanPerioderTest
    },
    {
        key: RegelKey.inneholderStønadskontoForMyeUttak,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: inneholderStønadskontoForMyeUttakTest
    },
    {
        key: RegelKey.harMorSøktUgyldigUttakFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: harMorSøktUgyldigUttakFørsteSeksUkerTest
    },
    {
        key: RegelKey.harFarMedmorSøktUgyldigUttakFørsteSeksUker,
        alvorlighet: RegelAlvorlighet.ULOVLIG,
        test: harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest
    }
];

export default uttaksplanRegler;
