import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { PeriodeRegler } from '../perioder/periodeRegler';

const overføringsårsakSkalBesvares = (periode: Periode, søknadsinfo: Søknadsinfo) => {
    return periode.type === Periodetype.Overføring && PeriodeRegler(søknadsinfo).erUttakEgenKvote(periode.konto);
};

export default overføringsårsakSkalBesvares;
