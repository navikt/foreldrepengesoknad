import { Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { Søknadsperioden } from '../søknadsperioden/Søknadsperioden';

const overføringsårsakSkalBesvares = (periode: Periode, søknadsinfo: Søknadsinfo) => {
    const perioden = Søknadsperioden(søknadsinfo, periode);
    return perioden.erOverføringsperiode() && perioden.erUttakAnnenForeldersKvote();
};

export default overføringsårsakSkalBesvares;
