import { Regel } from './types';
import { inneholderUttaksplanPerioderRegel } from './ulovlig/inneholderUttaksplanPerioderRegel';
import { harMorSøktUgyldigUttakFørsteSeksUkerRegel } from './ulovlig/harMorHarSøktUgyldigUttakFørsteSeksUkerRegel';
import { inneholderStønadskontoForMyeUttakRegel } from './ulovlig/inneholderStønadskontoForMyeUttak';
import { harFarMedmorSøktUgyldigUttakFørsteSeksUkerRegel } from './ulovlig/harFarMedmorHarS\u00F8ktUgyldigUttakF\u00F8rsteSeksUkerRegel';

const uttaksplanRegler: Regel[] = [
    inneholderUttaksplanPerioderRegel,
    harMorSøktUgyldigUttakFørsteSeksUkerRegel,
    harFarMedmorSøktUgyldigUttakFørsteSeksUkerRegel,
    inneholderStønadskontoForMyeUttakRegel
];

export default uttaksplanRegler;
