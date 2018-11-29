import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
// import { getPeriodeRegler } from '../perioder/periodeRegler';
import kvoteSkalBesvares from './kvoteSkalBesvares';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import samtidigUttakSkalBesvares from './samtidigUttakSkalBesvares';
import erMorForForSykSkalBesvares from './erMorForSykSkalBesvares';
import { PeriodeRegler } from '../perioder/periodeRegler';

export const UttakFormRegler = (info: Søknadsinfo, periode: UttakFormPeriodeType) => ({
    kvoteSkalBesvares: (kanEndreStønadskonto: boolean, velgbareStønadskontotyper: StønadskontoType[]): boolean =>
        kvoteSkalBesvares(
            info.søknaden.familiehendelsesdato,
            periode as Periode,
            kanEndreStønadskonto,
            velgbareStønadskontotyper
        ),

    aktivitetskravMorSkalBesvares: () => aktivitetskravMorSkalBesvares(periode, info),

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

export default UttakFormRegler;
