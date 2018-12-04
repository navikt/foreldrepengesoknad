import { Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsperioden } from '../søknadsperioden/Søknadsperioden';
import { Søknadsinfo } from '../../selectors/types';

const overføringsårsakSkalBesvares = (periode: Periode, søknadsinfo: Søknadsinfo) => {
    const perioden = Søknadsperioden(søknadsinfo, periode);
    return perioden.erOverføringsperiode() && perioden.erUttakAnnenForeldersKvote();
};

export default overføringsårsakSkalBesvares;
