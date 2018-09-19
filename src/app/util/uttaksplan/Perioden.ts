import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { getTidsperiode, Tidsperioden } from './Tidsperioden';

export const Perioden = (periode: Periode) => ({
    erUttak: () => erUttak(periode),
    erUtsettelse: () => erUtsettelse(periode),
    erOpphold: () => erOpphold(periode),
    setUttaksdager: (uttaksdager: number) =>
        (periode.tidsperiode = getTidsperiode(periode.tidsperiode.fom, uttaksdager)),
    getAntallUttaksdager: () => Tidsperioden(periode.tidsperiode).getAntallUttaksdager()
});

function erOpphold(periode: Periode): boolean {
    return periode.type === Periodetype.Opphold;
}

function erUtsettelse(periode: Periode): boolean {
    return periode.type === Periodetype.Utsettelse;
}

function erUttak(periode: Periode): boolean {
    return periode.type === Periodetype.Uttak;
}
