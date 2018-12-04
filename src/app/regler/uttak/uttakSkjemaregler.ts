import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import samtidigUttakSkalBesvares from './samtidigUttakSkalBesvares';
import erMorForForSykSkalBesvares from './erMorForSykSkalBesvares';
import overføringsårsakSkalBesvares from './overføringsårsakSkalBesvares';
import { Søknadsperioden } from '../søknadsperioden/Søknadsperioden';
import { Søknadsinfo } from '../../selectors/types';

export interface UttakSkjemaregler {
    aktivitetskravMorSkalBesvares: () => boolean;
    erMorForSykSkalBesvares: () => boolean;
    samtidigUttakSkalBesvares: () => boolean;
    overføringsårsakSkalBesvares: () => boolean;
}

export const getUttakSkjemaregler = (
    søknadsinfo: Søknadsinfo,
    periode: UttakFormPeriodeType,
    velgbareStønadskontotyper: StønadskontoType[]
): UttakSkjemaregler => ({
    aktivitetskravMorSkalBesvares: () =>
        aktivitetskravMorSkalBesvares(
            periode as Periode,
            søknadsinfo.søker.erMor,
            søknadsinfo.annenForelder.harRett,
            søknadsinfo.søknaden.erDeltUttak
        ),

    erMorForSykSkalBesvares: (): boolean =>
        erMorForForSykSkalBesvares(
            periode,
            søknadsinfo.søknaden.situasjon,
            søknadsinfo.søker.erFarEllerMedmor,
            søknadsinfo.uttaksdatoer,
            søknadsinfo.søknaden.erFlerbarnssøknad
        ),

    samtidigUttakSkalBesvares: (): boolean => {
        const perioden = Søknadsperioden(søknadsinfo, periode as Periode);
        return samtidigUttakSkalBesvares(
            periode,
            velgbareStønadskontotyper,
            søknadsinfo.søknaden.erDeltUttak,
            perioden.erInnenFørsteSeksUkerFødselFarMedmor(),
            perioden.erUttakFørFødsel()
        );
    },
    overføringsårsakSkalBesvares: () => overføringsårsakSkalBesvares(periode as Periode, søknadsinfo)
});

export default getUttakSkjemaregler;
