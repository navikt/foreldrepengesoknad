import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import samtidigUttakSkalBesvares from './samtidigUttakSkalBesvares';
import erMorForForSykSkalBesvares from './erMorForSykSkalBesvares';
import { PeriodeRegler } from '../perioder/periodeRegler';

export interface UttakRegler {
    aktivitetskravMorSkalBesvares: () => boolean;
    erMorForSykSkalBesvares: () => boolean;
    samtidigUttakSkalBesvares: (velgbareStønadskontotyper: StønadskontoType[]) => boolean;
}

export const getUttakRegler = (info: Søknadsinfo, periode: UttakFormPeriodeType): UttakRegler => ({
    aktivitetskravMorSkalBesvares: () =>
        aktivitetskravMorSkalBesvares(
            periode as Periode,
            info.søker.erMor,
            info.annenForelder.harRett,
            info.søknaden.erDeltUttak
        ),

    erMorForSykSkalBesvares: (): boolean =>
        erMorForForSykSkalBesvares(
            periode,
            info.søknaden.situasjon,
            info.søker.erFarEllerMedmor,
            info.uttaksdatoer,
            info.søknaden.erFlerbarnssøknad
        ),

    samtidigUttakSkalBesvares: (velgbareStønadskontotyper: StønadskontoType[]): boolean =>
        samtidigUttakSkalBesvares(
            periode,
            velgbareStønadskontotyper,
            info.søknaden.erDeltUttak,
            PeriodeRegler(info).erUttakInnenFørsteSeksUkerFødselFarMedmor(periode as Periode),
            PeriodeRegler(info).erUttakFørFødsel(periode as Periode)
        )
});

export default getUttakRegler;
