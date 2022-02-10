import { getTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Forelder } from 'app/types/Forelder';
import { Situasjon } from 'app/types/Situasjon';
import { Periode, Utsettelsesperiode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { uttaksdatoer } from 'uttaksplan/utils/uttaksdatoerUtils';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
// import AnnenForelder from 'app/context/types/AnnenForelder';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
// import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { erPeriodeFørDato } from 'uttaksplan/utils/periodeUtils';

const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;

export interface InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor {
    antallUttaksdagerTapt: number;
    førsteRegistrerteUttaksdag: Date;
    sisteUttaksdagInnenforSeksUker: Date;
}

export const getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor = (
    uttaksplan: Periode[],
    familiehendelsesdato: Date,
    søkerErFarEllerMedmor: boolean,
    bareFarMedmorHarRett: boolean,
    morErUfør: boolean,
    søkerErFarEllerMedmorOgAnnenForelderKanIkkeOppgis: boolean,
    søkerErFarEllerMedmorOgErAleneOmOmsorgen: boolean
): InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor | undefined => {
    if (søkerErFarEllerMedmor === false || bareFarMedmorHarRett === false || morErUfør === true) {
        return undefined;
    }

    if (søkerErFarEllerMedmorOgAnnenForelderKanIkkeOppgis || søkerErFarEllerMedmorOgErAleneOmOmsorgen) {
        return undefined;
    }

    const førstePeriode = Periodene(uttaksplan).getFørstePerioderEtterFamiliehendelsesdato(familiehendelsesdato);
    if (førstePeriode === undefined) {
        return undefined;
    }

    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const førsteRegistrerteUttaksdag = førstePeriode.tidsperiode.fom;
    const sisteUttaksdagInnenforSeksUker = getTidsperiode(førsteUttaksdag, 30).tom;
    const antallUttaksdager =
        Tidsperioden({
            fom: førsteUttaksdag,
            tom: førsteRegistrerteUttaksdag,
        }).getAntallUttaksdager() - 1;

    if (antallUttaksdager === undefined || antallUttaksdager <= ANTALL_UTTAKSDAGER_SEKS_UKER) {
        return undefined;
    }

    return {
        antallUttaksdagerTapt: antallUttaksdager - ANTALL_UTTAKSDAGER_SEKS_UKER,
        førsteRegistrerteUttaksdag,
        sisteUttaksdagInnenforSeksUker,
    };
};

export const getUgyldigUttakMor = (
    perioder: Periode[],
    familiehendelsesdato: Date,
    situasjon: Situasjon,
    flerbarnsFødsel?: boolean,
    value?: string
): Periode[] => {
    if (situasjon == 'adopsjon') {
        return [];
    }

    const førsteUttaksdag = uttaksdatoer(familiehendelsesdato).førsteUttaksdagPåEllerEtterFødsel;
    const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdag).leggTil(30);
    const førsteUttaksdagEtterÅtteUker = Uttaksdagen(førsteUttaksdag).leggTil(40);

    let ugyldigUttakRegelFørsteDato: Date;
    let ugyldigUttakRegelSisteDato: Date;

    if (value === 'førsteSeksUkerForMor') {
        ugyldigUttakRegelFørsteDato = førsteUttaksdag;
        ugyldigUttakRegelSisteDato = førsteUttaksdagEtterSeksUker;
    } else if (value === 'mellomSyvOgÅtteUkerForMor') {
        ugyldigUttakRegelFørsteDato! = førsteUttaksdagEtterSeksUker;
        ugyldigUttakRegelSisteDato! = førsteUttaksdagEtterÅtteUker;
    }

    const ugyldigPeriode = Periodene(perioder)
        .getPerioderEtterFamiliehendelsesdato(ugyldigUttakRegelFørsteDato!)
        .filter((p) => erPeriodeFørDato(p, ugyldigUttakRegelSisteDato));

    let ugyldigeUtsettelser: Utsettelsesperiode[] = [];

    if (value === 'mellomSyvOgÅtteUkerForMor') {
        ugyldigeUtsettelser = Periodene(ugyldigPeriode)
            .getUtsettelser()
            .filter(
                (p) =>
                    p.forelder === Forelder.mor &&
                    (p.årsak === UtsettelseÅrsakType.Ferie || p.årsak === UtsettelseÅrsakType.Arbeid)
            );
    } else if (value === 'førsteSeksUkerForMor') {
        ugyldigeUtsettelser = Periodene(ugyldigPeriode)
            .getUtsettelser()
            .filter(
                (p) =>
                    p.forelder === Forelder.mor &&
                    p.årsak !== UtsettelseÅrsakType.InstitusjonSøker &&
                    p.årsak !== UtsettelseÅrsakType.InstitusjonBarnet &&
                    p.årsak !== UtsettelseÅrsakType.Sykdom
            );
    }
    const gradertePerioder = Periodene(ugyldigPeriode)
        .getUttak()
        .filter((p) => p.forelder === Forelder.mor && p.gradert === true);

    const flernbarnsPerioder = Periodene(ugyldigPeriode)
        .getUttak()
        .filter((p) => p.forelder === Forelder.mor && p.ønskerFlerbarnsdager === true);

    const fellesPerioder = Periodene(ugyldigPeriode)
        .getUttak()
        .filter((p) => p.forelder === Forelder.mor && p.konto === StønadskontoType.Fellesperiode);

    let samtidigUttaksperioder: Uttaksperiode[] = [];

    if (!flerbarnsFødsel && flerbarnsFødsel !== undefined) {
        samtidigUttaksperioder = Periodene(ugyldigPeriode)
            .getUttak()
            .filter((p) => p.forelder === Forelder.mor && p.ønskerSamtidigUttak);
    }

    return [
        ...flernbarnsPerioder,
        ...gradertePerioder,
        ...ugyldigeUtsettelser,
        ...fellesPerioder,
        ...samtidigUttaksperioder,
    ];
};

export const unntakFarFørsteSeksUker = (periode: Uttaksperiode, harMidlertidigOmsorg: boolean) => ({
    erMorForSykDeFørsteSeksUker: (): boolean => {
        if (harMidlertidigOmsorg) {
            return true;
        }

        if (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger) {
            return (
                periode.morsAktivitetIPerioden === MorsAktivitet.Innlagt ||
                periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp ||
                periode.erMorForSyk === true
            );
        }

        if (periode.konto === StønadskontoType.Fedrekvote || periode.konto === StønadskontoType.AktivitetsfriKvote) {
            return periode.erMorForSyk === true;
        }

        return false;
    },
    erFlerbarnsukerOgUttakAvFlerbarnsdagerEllerFedrekvote: (antallBarn: number): boolean => {
        return antallBarn > 1 && periode.ønskerFlerbarnsdager === true;
    },
});

// const erFarsUttakFørsteSeksUkerGyldig = (
//     periode: Uttaksperiode,
//     antallBarn: number,
//     harMidlertidigOmsorg: boolean
// ): boolean => {
//     const unntak = unntakFarFørsteSeksUker(periode, harMidlertidigOmsorg);
//     return (
//         unntak.erMorForSykDeFørsteSeksUker() || unntak.erFlerbarnsukerOgUttakAvFlerbarnsdagerEllerFedrekvote(antallBarn)
//     );
// };

// export const getUgyldigUttakFørsteSeksUkerForFarMedmor = (
//     perioder: Periode[],
//     familiehendelsesdato: Date,
//     antallBarn: number,
//     situasjon: Situasjon,
//     annenForelder: AnnenForelder,
//     erAleneOmOmsorg: boolean,
//     harMidlertidigOmsorg: boolean
// ): Periode[] => {
//     if (situasjon === 'adopsjon' || annenForelder.kanIkkeOppgis || erAleneOmOmsorg) {
//         return [];
//     }

//     const førsteUttaksdag = uttaksdatoer(familiehendelsesdato).førsteUttaksdagPåEllerEtterFødsel;
//     const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdag).leggTil(30);

//     const farsPerioderInnenforSeksFørsteUker = Periodene(perioder)
//         .getPerioderEtterFamiliehendelsesdato(familiehendelsesdato)
//         .filter((p) => erPeriodeFørDato(p, førsteUttaksdagEtterSeksUker))
//         .filter((p) => p.type !== Periodetype.Hull && !isPeriodeUtenUttak(p) && p.forelder === Forelder.farMedmor);

//     const ugyldigeUttak = Periodene(farsPerioderInnenforSeksFørsteUker)
//         .getUttak()
//         .filter((p) => erFarsUttakFørsteSeksUkerGyldig(p, antallBarn, harMidlertidigOmsorg) === false);

//     const ugyldigeOverføringer = Periodene(farsPerioderInnenforSeksFørsteUker)
//         .getOverføringer()
//         .filter(
//             (p) =>
//                 p.årsak !== OverføringÅrsakType.institusjonsoppholdAnnenForelder &&
//                 p.årsak !== OverføringÅrsakType.sykdomAnnenForelder
//         );

//     const ugyldigeUtsettelser = Periodene(farsPerioderInnenforSeksFørsteUker)
//         .getUtsettelser()
//         .filter((utsettelse) => utsettelse.årsak !== UtsettelseÅrsakType.InstitusjonBarnet);

//     return [...ugyldigeUttak, ...ugyldigeOverføringer, ...ugyldigeUtsettelser];
// };
