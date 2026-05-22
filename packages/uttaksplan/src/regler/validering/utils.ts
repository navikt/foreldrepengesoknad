import { LeggTilEllerEndrePeriodeFormFormValues } from '../../felles/LeggTilEllerEndrePeriodeFellesForm';

/**
 * Sjekker om alle felter som kreves for å vurdere samtidig-uttak-regler er fylt ut.
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
