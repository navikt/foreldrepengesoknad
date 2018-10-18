import { Utsettelsesperiode, UtsettelseÅrsakType } from '../../types/uttaksplan/periodetyper';

export const dokumentasjonBehøvesForUtsettelsesperiode = ({ årsak }: Utsettelsesperiode) =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker;
