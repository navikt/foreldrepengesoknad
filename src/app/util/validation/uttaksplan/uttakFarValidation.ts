import {
    Periode,
    OverføringÅrsakType,
    StønadskontoType,
    Periodetype,
    Uttaksperiode,
    MorsAktivitet,
    UtsettelseÅrsakType
} from '../../../types/uttaksplan/periodetyper';
import { Periodene } from '../../uttaksplan/Periodene';
import { isValidTidsperiode, Tidsperioden } from '../../uttaksplan/Tidsperioden';
import { Forelder } from 'common/types';
import { uttaksdatoer } from '../../uttaksplan/uttaksdatoer';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

export const periodeErFørDato = ({ tidsperiode }: Periode, dato: Date): boolean => {
    return isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(dato);
};

export const unntakFarFørsteSeksUker = (periode: Uttaksperiode) => ({
    erMorForSykDeFørsteSeksUker: (): boolean => {
        if (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger) {
            return (
                periode.morsAktivitetIPerioden === MorsAktivitet.Innlagt ||
                periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp
            );
        }

        if (periode.konto === StønadskontoType.Fedrekvote || periode.konto === StønadskontoType.AktivitetsfriKvote) {
            return periode.erMorForSyk === true;
        }

        return false;
    },
    erFlerbarnsukerOgUttakAvFlerbarnsdagerEllerFedrekvote: (antallBarn: number): boolean => {
        return antallBarn > 1 && periode.ønskerFlerbarnsdager === true;
    }
});

const erFarsUttakFørsteSeksUkerGyldig = (periode: Uttaksperiode, antallBarn: number): boolean => {
    const unntak = unntakFarFørsteSeksUker(periode);
    return (
        unntak.erMorForSykDeFørsteSeksUker() || unntak.erFlerbarnsukerOgUttakAvFlerbarnsdagerEllerFedrekvote(antallBarn)
    );
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

    const farsPerioderInnenforSeksFørsteUker = Periodene(perioder)
        .getPerioderEtterFamiliehendelsesdato(familiehendelsesdato)
        .filter((p) => periodeErFørDato(p, førsteUttaksdagEtterSeksUker))
        .filter((p) => p.type !== Periodetype.Hull && p.forelder === Forelder.FARMEDMOR);

    const ugyldigeUttak = Periodene(farsPerioderInnenforSeksFørsteUker)
        .getUttak()
        .filter((p) => erFarsUttakFørsteSeksUkerGyldig(p, antallBarn) === false);

    const ugyldigeOverføringer = Periodene(farsPerioderInnenforSeksFørsteUker)
        .getOverføringer()
        .filter(
            (p) =>
                p.årsak !== OverføringÅrsakType.insititusjonsoppholdAnnenForelder &&
                p.årsak !== OverføringÅrsakType.sykdomAnnenForelder
        );

    const ugyldigeUtsettelser = Periodene(farsPerioderInnenforSeksFørsteUker)
        .getUtsettelser()
        .filter((utsettelse) => utsettelse.årsak !== UtsettelseÅrsakType.InstitusjonBarnet);

    return ugyldigeUttak.length + ugyldigeOverføringer.length + ugyldigeUtsettelser.length > 0;
};
