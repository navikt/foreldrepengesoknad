import { LeggTilEllerEndrePeriodeFormFormValues } from '../../felles/LeggTilEllerEndrePeriodeFellesForm';

/**
 * Sjekkar om alle felter som krevst for å vurdera samtidig-uttak-reglar er fylte ut.
 * Brukt av både `samtidigUttak`-gruppa og `farMedmorRundtFødsel`-gruppa.
 */
export const erUtfyltForSamtidigUttak = (values: LeggTilEllerEndrePeriodeFormFormValues): boolean =>
    values.forelder === 'BEGGE' &&
    values.samtidigUttaksprosentMor !== undefined &&
    values.samtidigUttaksprosentFarMedmor !== undefined &&
    values.skalDuKombinereArbeidOgUttakMor !== undefined &&
    values.skalDuKombinereArbeidOgUttakFarMedmor !== undefined &&
    values.kontoTypeFarMedmor !== undefined &&
    values.kontoTypeMor !== undefined &&
    (!values.skalDuKombinereArbeidOgUttakMor || values.stillingsprosentMor !== undefined) &&
    (!values.skalDuKombinereArbeidOgUttakFarMedmor || values.stillingsprosentFarMedmor !== undefined);
