import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from 'uttaksplan/validering/utils/types/regelTypes';
import { laTilPeriodeEtterFørsteStønadsdagPåfølgendeBarn } from './periodevalideringstester/forSenUttakVedPåfølgendeBarn';

export const harPerioderEtterFørsteStønadsdagNesteBarnDerToTette: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    if (grunnlag.minsterettUkerToTette === undefined || grunnlag.minsterettUkerToTette === 0) {
        return {
            passerer: true,
        };
    }
    const perioderEtterFørsteStønadsperiodeNyttBarn = grunnlag.perioder.filter((periode) =>
        laTilPeriodeEtterFørsteStønadsdagPåfølgendeBarn(periode, grunnlag.førsteUttaksdagNesteBarnsSak)
    );

    const tekstKey = grunnlag.søkerErFarEllerMedmor
        ? 'uttaksplan.validering.info.harPerioderEtterFørsteStønadsdagNesteBarnDerToTette.far'
        : 'uttaksplan.validering.info.harPerioderEtterFørsteStønadsdagNesteBarnDerToTette.mor';
    return {
        passerer: perioderEtterFørsteStønadsperiodeNyttBarn.length === 0,
        info: {
            intlKey: tekstKey,
        },
    };
};
