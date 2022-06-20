import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';
import { beregnGjenståendeUttaksdager } from 'uttaksplan/utils/uttaksPlanStatus';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const farMedmorHarRettPåForeldrepengerUtenAktivitetskravTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    const tattUtForMangeDagerIPlanen = erUttaksmengdeForFarMedmorForHøyTest(grunnlag).passerer === false;
    if (!grunnlag.søkerErFarEllerMedmor || grunnlag.morHarRett || tattUtForMangeDagerIPlanen) {
        return {
            passerer: true,
        };
    }

    const kontoUttak = beregnGjenståendeUttaksdager(grunnlag.stønadskontoer, grunnlag.perioder, true);
    const kontoUtenAktivitetsrav = kontoUttak.filter(
        (stønadskonto) => stønadskonto.konto === StønadskontoType.AktivitetsfriKvote
    );
    const dagerIgjenUtenAktivitetskrav = kontoUtenAktivitetsrav.length > 0 ? kontoUtenAktivitetsrav[0].dager : 0;
    return {
        passerer: dagerIgjenUtenAktivitetskrav === 0,
        info: {
            intlKey: 'uttaksplan.validering.info.rettTilAktivitetsfriUttak',
        },
    };
};
