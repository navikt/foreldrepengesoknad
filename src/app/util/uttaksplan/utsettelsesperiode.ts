import {
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode,
    StønadskontoType
} from '../../types/uttaksplan/periodetyper';

export const dokumentasjonBehøvesForUtsettelsesperiode = ({ årsak, erArbeidstaker }: Utsettelsesperiode): boolean =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker ||
    (erArbeidstaker && årsak !== UtsettelseÅrsakType.Ferie);

export const dokumentasjonBehøvesForUttaksperiode = (periode: Uttaksperiode): boolean => {
    return (
        periode.morsAktivitetIPerioden !== undefined ||
        (periode.gradert === true && periode.erArbeidstaker === true) ||
        periode.konto === StønadskontoType.Fedrekvote
    );
};
