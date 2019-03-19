import { Regel } from './types';
import { inneholderUttaksplanPerioderRegel } from './ulovlig/inneholderUttaksplanPerioderRegel';
import { harMorSøktUgyldigUttakFørsteSeksUkerRegel } from './ulovlig/harMorHarSøktUgyldigUttakFørsteSeksUkerRegel';
import { inneholderStønadskontoForMyeUttakRegel } from './ulovlig/inneholderStønadskontoForMyeUttak';

const uttaksplanRegler: Regel[] = [
    inneholderUttaksplanPerioderRegel,
    harMorSøktUgyldigUttakFørsteSeksUkerRegel,
    inneholderStønadskontoForMyeUttakRegel
];

export default uttaksplanRegler;
