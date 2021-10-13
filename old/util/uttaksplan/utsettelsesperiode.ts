import {
    Overføringsperiode,
    OverføringÅrsakType,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode,
    StønadskontoType,
    MorsAktivitet,
    PeriodeUtenUttakUtsettelse,
} from '../../types/uttaksplan/periodetyper';

export const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UtsettelseÅrsakType | OverføringÅrsakType) =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker ||
    årsak === OverføringÅrsakType.institusjonsoppholdAnnenForelder ||
    årsak === OverføringÅrsakType.sykdomAnnenForelder;

export const dokumentasjonBehøvesForUtsettelsesperiode = (
    { årsak }: Utsettelsesperiode | PeriodeUtenUttakUtsettelse,
    harMorAktivitetskrav: boolean
): boolean => {
    return (
        harMorAktivitetskrav ||
        erÅrsakSykdomEllerInstitusjonsopphold(årsak) ||
        årsak === UtsettelseÅrsakType.HvØvelse ||
        årsak === UtsettelseÅrsakType.NavTiltak
    );
};

export const dokumentasjonBehøvesForOverføringsperiode = (
    erFarEllerMedmor: boolean,
    periode: Overføringsperiode
): boolean =>
    (erFarEllerMedmor || periode.årsak !== OverføringÅrsakType.aleneomsorg) &&
    periode.årsak !== OverføringÅrsakType.ikkeRettAnnenForelder;

export const dokumentasjonBehøvesForUttaksperiode = (periode: Uttaksperiode): boolean => {
    if (periode.harIkkeAktivitetskrav) {
        return false;
    }

    return (
        (periode.morsAktivitetIPerioden !== undefined && periode.morsAktivitetIPerioden !== MorsAktivitet.Uføre) ||
        (periode.konto === StønadskontoType.Fedrekvote && periode.erMorForSyk === true)
    );
};
