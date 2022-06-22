import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';

export const farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    const tattUtForMangeDagerIPlanen = erUttaksmengdeForFarMedmorForHøyTest(grunnlag).passerer === false;
    if (!grunnlag.søkerErFarEllerMedmor || grunnlag.morHarRett || tattUtForMangeDagerIPlanen) {
        return {
            passerer: true,
        };
    }

    let kontoUtenAktivitetskravUker = 0;
    if (grunnlag.morErUfør) {
        kontoUtenAktivitetskravUker = 15;
    } else if (andreAugust2022ReglerGjelder(grunnlag.familiehendelsesdato)) {
        kontoUtenAktivitetskravUker = 8;
    }

    console.log('kontoUtenAktivitetskravUker', kontoUtenAktivitetskravUker);
    return {
        passerer: kontoUtenAktivitetskravUker === 0,
        info: {
            intlKey: 'uttaksplan.validering.info.rettTilAktivitetsfriUttak',
            values: {
                antallUker: kontoUtenAktivitetskravUker,
            },
        },
    };
};
