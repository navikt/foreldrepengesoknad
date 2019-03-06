import { Periode, UtsettelseÅrsakType, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { Periodene } from '../../uttaksplan/Periodene';
import { isValidTidsperiode, Tidsperioden } from '../../uttaksplan/Tidsperioden';
import { Forelder } from 'common/types';
import { uttaksdatoer } from '../../uttaksplan/uttaksdatoer';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

const periodeErFørDato = ({ tidsperiode }: Periode, dato: Date): boolean => {
    return isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(dato);
};

export const harMorHarSøktUgyldigUttakFørsteSeksUker = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    situasjon: Søkersituasjon
): boolean => {
    if (situasjon === Søkersituasjon.ADOPSJON) {
        return false;
    }
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
                p.årsak !== UtsettelseÅrsakType.InstitusjonBarnet &&
                p.årsak !== UtsettelseÅrsakType.Sykdom
        );

    const gradertePerioder = Periodene(perioderInnenforSeksFørsteUker)
        .getUttak()
        .filter((p) => p.forelder === Forelder.MOR && p.gradert === true);

    const flernbarnsPerioder = Periodene(perioderInnenforSeksFørsteUker)
        .getUttak()
        .filter((p) => p.forelder === Forelder.MOR && p.ønskerFlerbarnsdager === true);

    const fellesPerioder = Periodene(perioderInnenforSeksFørsteUker)
        .getUttak()
        .filter((p) => p.forelder === Forelder.MOR && p.konto === StønadskontoType.Fellesperiode);

    return flernbarnsPerioder.length + gradertePerioder.length + ugyldigeUtsettelser.length + fellesPerioder.length > 0;
};
