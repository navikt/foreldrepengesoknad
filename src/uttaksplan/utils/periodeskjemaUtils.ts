import { Periode, Tidsperiode } from 'uttaksplan/types';
import { periodene } from 'uttaksplan/utils/dataUtils';

export function getUgyldigeTidsperioderForUttaksperiode(
    perioder: Periode[]
): Tidsperiode[] {
    return periodene(perioder)
        .getUtsettelser()
        .map((p) => p.tidsperiode);
}
