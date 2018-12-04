import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import samtidigUttakSkalBesvares from './samtidigUttakSkalBesvares';
import erMorForForSykSkalBesvares from './erMorForSykSkalBesvares';
import overføringsårsakSkalBesvares from './overføringsårsakSkalBesvares';
import { Søknadsperioden } from '../søknadsperioden/Søknadsperioden';

export interface UttakRegler {
    aktivitetskravMorSkalBesvares: () => boolean;
    erMorForSykSkalBesvares: () => boolean;
    samtidigUttakSkalBesvares: (velgbareStønadskontotyper: StønadskontoType[]) => boolean;
    overføringsårsakSkalBesvares: () => boolean;
}

export const getUttakRegler = (søknadsinfo: Søknadsinfo, periode: UttakFormPeriodeType): UttakRegler => ({
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

    samtidigUttakSkalBesvares: (velgbareStønadskontotyper: StønadskontoType[]): boolean => {
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

export default getUttakRegler;
