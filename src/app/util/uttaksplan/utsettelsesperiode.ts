import {
    Overføringsperiode,
    OverføringÅrsakType,
    Utsettelsesperiode,
    UtsettelseÅrsakType
} from '../../types/uttaksplan/periodetyper';

export const dokumentasjonBehøvesForUtsettelsesperiode = ({ årsak }: Utsettelsesperiode) =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker;

export const dokumentasjonBehøvedForOverføringsperiode = (erFarEllerMedmor: boolean, periode: Overføringsperiode) =>
    erFarEllerMedmor || periode.årsak !== OverføringÅrsakType.aleneomsorg;
