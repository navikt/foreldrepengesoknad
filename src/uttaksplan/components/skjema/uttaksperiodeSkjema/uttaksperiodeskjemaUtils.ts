import { Periode, Tidsperiode } from 'uttaksplan/types';
import { Periodene } from 'uttaksplan/utils';

export function getUgyldigeTidsperioderForUttaksperiode(perioder: Periode[]): Tidsperiode[] {
    return Periodene(perioder)
        .getUtsettelser()
        .map((p) => p.tidsperiode);
}
