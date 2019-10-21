import {
    Overføringsperiode,
    OverføringÅrsakType,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode,
    StønadskontoType,
    MorsAktivitet
} from '../../types/uttaksplan/periodetyper';
import aktivitetskravMorUtil from '../domain/aktivitetskravMor';
import { Søknadsinfo } from 'app/selectors/types';

export const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UtsettelseÅrsakType | OverføringÅrsakType) =>
    årsak === UtsettelseÅrsakType.Sykdom ||
    årsak === UtsettelseÅrsakType.InstitusjonBarnet ||
    årsak === UtsettelseÅrsakType.InstitusjonSøker ||
    årsak === OverføringÅrsakType.insititusjonsoppholdAnnenForelder ||
    årsak === OverføringÅrsakType.sykdomAnnenForelder;

export const dokumentasjonBehøvesForUtsettelsesperiode = (
    { årsak }: Utsettelsesperiode,
    søknadsinfo: Søknadsinfo
): boolean => {
    return (
        aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.annenForelder
        ) || erÅrsakSykdomEllerInstitusjonsopphold(årsak)
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
