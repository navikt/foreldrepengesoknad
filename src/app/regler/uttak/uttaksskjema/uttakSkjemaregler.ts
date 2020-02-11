import { Søknadsinfo } from 'app/selectors/types';
import { UttakFormPeriodeType } from 'app/components/uttaksplanlegger/components/uttakForm/UttakForm';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';
import erMorForForSykSkalBesvares from './erMorForSykSkalBesvares';
import samtidigUttakSkalBesvares from './samtidigUttakSkalBesvares';
import overføringsårsakSkalBesvares from './overføringsårsakSkalBesvares';
import getSøknadsperiode from 'app/regler/søknadsperioden/Søknadsperioden';
import { ønskerFlerbarnsdagerSkalBesvares } from './ønskerFlerbarnsdagerSkalBesvares';
import { graderingSkalBesvares } from './graderingSkalBesvares';

export interface UttakSkjemaregler {
    aktivitetskravMorSkalBesvares: () => boolean;
    erMorForSykSkalBesvares: () => boolean;
    samtidigUttakSkalBesvares: () => boolean;
    overføringsårsakSkalBesvares: () => boolean;
    ønskerFlerbarnsdagerSkalBesvares: () => boolean;
    graderingSkalBesvares: () => boolean;
}

export const getUttakSkjemaregler = (søknadsinfo: Søknadsinfo, periode: UttakFormPeriodeType): UttakSkjemaregler => {
    const { saksgrunnlag } = søknadsinfo;
    const morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg =
        !søknadsinfo.søker.erAleneOmOmsorg && saksgrunnlag !== undefined && saksgrunnlag.morErAleneOmOmsorg;

    return {
        aktivitetskravMorSkalBesvares: () =>
            aktivitetskravMorSkalBesvares(
                periode as Periode,
                søknadsinfo.søker.erMor,
                søknadsinfo.søker.erAleneOmOmsorg,
                søknadsinfo.annenForelder.kanIkkeOppgis,
                morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg
            ),

        erMorForSykSkalBesvares: (): boolean =>
            erMorForForSykSkalBesvares(
                periode,
                søknadsinfo.søknaden.situasjon,
                søknadsinfo.søker.erFarEllerMedmor,
                søknadsinfo.uttaksdatoer,
                søknadsinfo.søknaden.erFlerbarnssøknad,
                søknadsinfo.søker.erAleneOmOmsorg,
                søknadsinfo.annenForelder.kanIkkeOppgis,
                morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg
            ),

        samtidigUttakSkalBesvares: (): boolean => {
            const søknadsperiode = getSøknadsperiode(søknadsinfo, periode as Periode);

            return samtidigUttakSkalBesvares(
                periode,
                søknadsperiode.erInnenFørsteSeksUkerFødselFarMedmor(),
                søknadsperiode.erUttakFørFødsel(),
                søknadsinfo.søker.erAleneOmOmsorg,
                søknadsinfo.søknaden.erDeltUttak,
                morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg
            );
        },
        ønskerFlerbarnsdagerSkalBesvares: (): boolean => {
            return ønskerFlerbarnsdagerSkalBesvares(
                periode,
                søknadsinfo.søknaden.erFlerbarnssøknad,
                søknadsinfo.søker.erFarEllerMedmor,
                morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg
            );
        },
        graderingSkalBesvares: (): boolean => {
            const søknadsperiode = getSøknadsperiode(søknadsinfo, periode as Periode);

            return graderingSkalBesvares(søknadsperiode.erUttakFørFødsel(), søknadsperiode.harSamtidigUttak());
        },
        overføringsårsakSkalBesvares: () => overføringsårsakSkalBesvares(periode as Periode, søknadsinfo)
    };
};

export default getUttakSkjemaregler;
