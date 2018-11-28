import { Periode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { erUttakFørFødsel } from '../perioder/erUttakF\u00F8rF\u00F8dsel';

const kvoteSkalBesvares = (
    familiehendelsesdato: Date,
    periode: Periode,
    kanEndreStønadskonto: boolean,
    velgbareStønadskontotyper: StønadskontoType[]
) =>
    erUttakFørFødsel(periode, familiehendelsesdato) === false &&
    kanEndreStønadskonto === true &&
    velgbareStønadskontotyper.length > 0;

export default kvoteSkalBesvares;
