import {
    Overføringsperiode,
    OverføringÅrsakType,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode,
    StønadskontoType
} from '../../types/uttaksplan/periodetyper';

export const dokumentasjonBehøvesForUtsettelsesperiode = ({ årsak }: Utsettelsesperiode): boolean =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker;

export const dokumentasjonBehøvesForOverføringsperiode = (
    erFarEllerMedmor: boolean,
    periode: Overføringsperiode
): boolean => erFarEllerMedmor || periode.årsak !== OverføringÅrsakType.aleneomsorg;

export const dokumentasjonBehøvesForUttaksperiode = (periode: Uttaksperiode): boolean => {
    return (
        periode.morsAktivitetIPerioden !== undefined ||
        (periode.konto === StønadskontoType.Fedrekvote && periode.erMorForSyk === true)
    );
};
