import {
    Overføringsperiode,
    OverføringÅrsakType,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';

export const dokumentasjonBehøvesForUtsettelsesperiode = ({ årsak, erArbeidstaker }: Utsettelsesperiode): boolean =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker ||
    (erArbeidstaker && årsak !== UtsettelseÅrsakType.Ferie);

export const dokumentasjonBehøvesForOverføringsperiode = (
    erFarEllerMedmor: boolean,
    periode: Overføringsperiode
): boolean => erFarEllerMedmor || periode.årsak !== OverføringÅrsakType.aleneomsorg;

export const dokumentasjonBehøvesForUttaksperiode = (periode: Uttaksperiode): boolean => {
    return (
        periode.morsAktivitetIPerioden !== undefined || (periode.gradert === true && periode.erArbeidstaker === true)
    );
};
