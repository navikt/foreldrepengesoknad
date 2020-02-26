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
    const { søker, søknaden, annenForelder, uttaksdatoer } = søknadsinfo;

    return {
        aktivitetskravMorSkalBesvares: () =>
            aktivitetskravMorSkalBesvares(
                periode as Periode,
                søker.erMor,
                søker.erAleneOmOmsorg,
                annenForelder.kanIkkeOppgis,
                søker.harMidlertidigOmsorg
            ),

        erMorForSykSkalBesvares: (): boolean =>
            erMorForForSykSkalBesvares(
                periode,
                søknaden.situasjon,
                søker.erFarEllerMedmor,
                uttaksdatoer,
                søknaden.erFlerbarnssøknad,
                søker.erAleneOmOmsorg,
                annenForelder.kanIkkeOppgis,
                søker.harMidlertidigOmsorg
            ),

        samtidigUttakSkalBesvares: (): boolean => {
            const søknadsperiode = getSøknadsperiode(søknadsinfo, periode as Periode);

            return samtidigUttakSkalBesvares(
                periode,
                søknadsperiode.erInnenFørsteSeksUkerFødselFarMedmor(),
                søknadsperiode.erUttakFørFødsel(),
                søker.erAleneOmOmsorg,
                søknaden.erDeltUttak,
                søker.harMidlertidigOmsorg
            );
        },
        ønskerFlerbarnsdagerSkalBesvares: (): boolean => {
            return ønskerFlerbarnsdagerSkalBesvares(periode, søknaden.erFlerbarnssøknad, søker.erFarEllerMedmor);
        },
        graderingSkalBesvares: (): boolean => {
            const søknadsperiode = getSøknadsperiode(søknadsinfo, periode as Periode);

            return graderingSkalBesvares(søknadsperiode.erUttakFørFødsel(), søknadsperiode.harSamtidigUttak());
        },
        overføringsårsakSkalBesvares: () => overføringsårsakSkalBesvares(periode as Periode, søknadsinfo)
    };
};

export default getUttakSkjemaregler;
