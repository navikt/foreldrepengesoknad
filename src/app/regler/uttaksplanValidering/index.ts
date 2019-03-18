import { Regel } from './types';
import { uttaksplanInneholderPerioderRegel } from '../uttaksplan/inneholderUttaksplanPerioderRegel';
import { harMorSøktUgyldigUttakFørsteSeksUkerRegel } from '../uttaksplan/harMorHarSøktUgyldigUttakFørsteSeksUkerRegel';

const uttaksplanRegler: Regel[] = [uttaksplanInneholderPerioderRegel, harMorSøktUgyldigUttakFørsteSeksUkerRegel];

export default uttaksplanRegler;
