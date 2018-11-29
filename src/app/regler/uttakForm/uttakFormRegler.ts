import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { PeriodeRegler, getPeriodeRegler } from '../perioder/periodeRegler';
import kvoteSkalBesvares from './kvoteSkalBesvares';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import samtidigUttakSkalBesvares from './samtidigUttakSkalBesvares';

export interface UttakFormRegler extends PeriodeRegler {
    kvoteSkalBesvares: (
        periode: Periode,
        kanEndreStønadskonto: boolean,
        velgbareStønadskontotyper: StønadskontoType[]
    ) => boolean;
    aktivitetskravMorSkalBesvares: (periode: UttakFormPeriodeType) => boolean;
    samtidigUttakSkalBesvares: (
        periode: UttakFormPeriodeType,
        velgbareStønadskontotyper: StønadskontoType[]
    ) => boolean;
}

export const getUttakFormRegler = (info: Søknadsinfo): UttakFormRegler => ({
    ...getPeriodeRegler(info),
    kvoteSkalBesvares: (
        periode: Periode,
        kanEndreStønadskonto: boolean,
        velgbareStønadskontotyper: StønadskontoType[]
    ) =>
        kvoteSkalBesvares(info.søknaden.familiehendelsesdato, periode, kanEndreStønadskonto, velgbareStønadskontotyper),
    aktivitetskravMorSkalBesvares: (periode: UttakFormPeriodeType) => aktivitetskravMorSkalBesvares(periode, info),

    samtidigUttakSkalBesvares: (periode: UttakFormPeriodeType, velgbareStønadskontotyper: StønadskontoType[]) =>
        samtidigUttakSkalBesvares(periode, velgbareStønadskontotyper, info)
});

export default getUttakFormRegler;
