import { Periode, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { Periodene } from '../../uttaksplan/Periodene';
import { isValidTidsperiode, Tidsperioden } from '../../uttaksplan/Tidsperioden';
import { Forelder } from 'common/types';
import { uttaksdatoer } from '../../uttaksplan/uttaksdatoer';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';

const periodeErFørDato = ({ tidsperiode }: Periode, dato: Date): boolean => {
    return isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(dato);
};

export const harMorHarSøktUgyldigUttakFørsteSeksUker = (perioder: Periode[], familiehendelsesdato: Date): boolean => {
    const førsteUttaksdag = uttaksdatoer(familiehendelsesdato).førsteUttaksdagPåEllerEtterFødsel;
    const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdag).leggTil(30);

    const perioderInnenforSeksFørsteUker = Periodene(perioder)
        .getPerioderEtterFamiliehendelsesdato(familiehendelsesdato)
        .filter((p) => periodeErFørDato(p, førsteUttaksdagEtterSeksUker));

    const ugyldigeUtsettelser = Periodene(perioderInnenforSeksFørsteUker)
        .getUtsettelser()
        .filter(
            (p) =>
                p.forelder === Forelder.MOR &&
                p.årsak !== UtsettelseÅrsakType.InstitusjonSøker &&
                p.årsak !== UtsettelseÅrsakType.Sykdom
        );

    const gradertePerioder = Periodene(perioderInnenforSeksFørsteUker)
        .getUttak()
        .filter((p) => p.forelder === Forelder.MOR && p.gradert === true);

    return gradertePerioder.length + ugyldigeUtsettelser.length > 0;
};
