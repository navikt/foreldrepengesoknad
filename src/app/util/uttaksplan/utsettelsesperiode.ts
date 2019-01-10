import {
    Overføringsperiode,
    OverføringÅrsakType,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode,
    StønadskontoType,
    MorsAktivitet
} from '../../types/uttaksplan/periodetyper';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import aktivitetskravMorUtil from '../domain/aktivitetskravMor';

export const dokumentasjonBehøvesForUtsettelsesperiode = (
    { årsak }: Utsettelsesperiode,
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder
): boolean => {
    return (
        aktivitetskravMorUtil.skalBesvaresVedUtsettelse(erFarEllerMedmor, annenForelder) ||
        årsak === UtsettelseÅrsakType.Sykdom ||
        årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
        årsak === UtsettelseÅrsakType.InstitusjonSøker
    );
};

export const dokumentasjonBehøvesForOverføringsperiode = (
    erFarEllerMedmor: boolean,
    periode: Overføringsperiode
): boolean => erFarEllerMedmor || periode.årsak !== OverføringÅrsakType.aleneomsorg;

export const dokumentasjonBehøvesForUttaksperiode = (periode: Uttaksperiode): boolean => {
    return (
        (periode.morsAktivitetIPerioden !== undefined && periode.morsAktivitetIPerioden !== MorsAktivitet.Uføre) ||
        (periode.konto === StønadskontoType.Fedrekvote && periode.erMorForSyk === true)
    );
};
