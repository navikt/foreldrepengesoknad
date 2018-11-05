import { Periode, OverføringÅrsakType, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { Periodene } from '../../uttaksplan/Periodene';
import { isValidTidsperiode, Tidsperioden } from '../../uttaksplan/Tidsperioden';
import { Forelder } from 'common/types';
import { uttaksdatoer } from '../../uttaksplan/uttaksdatoer';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

const periodeErFørDato = ({ tidsperiode }: Periode, dato: Date): boolean => {
    return isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(dato);
};

export const harFarHarSøktUgyldigUttakFørsteSeksUker = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    antallBarn: number,
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

    const ugyldigUttak = Periodene(perioderInnenforSeksFørsteUker)
        .getUttak()
        .filter(
            (p) =>
                p.forelder === Forelder.FARMEDMOR &&
                (antallBarn === 1 ||
                    (antallBarn > 1 &&
                        p.konto !== StønadskontoType.Flerbarnsdager &&
                        p.konto !== StønadskontoType.Fedrekvote))
        )
        .filter((p) => p.konto !== StønadskontoType.Fedrekvote && p.konto !== StønadskontoType.Foreldrepenger);

    const ugyldigeOverføringer = Periodene(perioderInnenforSeksFørsteUker)
        .getOverføringer()
        .filter(
            (p) =>
                p.forelder === Forelder.FARMEDMOR &&
                p.årsak !== OverføringÅrsakType.insititusjonsoppholdAnnenForelder &&
                p.årsak !== OverføringÅrsakType.sykdomAnnenForelder
        );

    const ugyldigeUtsettelser = Periodene(perioderInnenforSeksFørsteUker)
        .getUtsettelser()
        .filter((p) => p.forelder === Forelder.FARMEDMOR);

    const gradertePerioder = Periodene(perioderInnenforSeksFørsteUker)
        .getUttak()
        .filter((p) => p.forelder === Forelder.FARMEDMOR && p.gradert === true);

    return ugyldigUttak.length + gradertePerioder.length + ugyldigeOverføringer.length + ugyldigeUtsettelser.length > 0;
};
