import { Regel, RegelAlvorlighet } from './types';
import { RegelKey } from './regelKeys';
import { inneholderUttaksplanPerioderTest } from './tester/inneholderUttaksplanPerioderTest';
import { harMorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harMorHarSøktUgyldigUttakFørsteSeksUkerTest';
import { inneholderStønadskontoForMyeUttakTest } from './tester/inneholderStønadskontoForMyeUttakTest';
import { harFarMedmorSøktUgyldigUttakFørsteSeksUkerTest } from './tester/harFarMedmorHarSøktUgyldigUttakFørsteSeksUkerTest';

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
