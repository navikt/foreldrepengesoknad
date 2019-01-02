import { Periode } from '../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../selectors/types';
import { getPeriodeegenskaper } from '../periodeegenskaper/periodeegenskaper';

const overføringsårsakSkalBesvares = (periode: Periode, søknadsinfo: Søknadsinfo) => {
    const periodeegenskaper = getPeriodeegenskaper(søknadsinfo, periode);
    return periodeegenskaper.erOverføringsperiode() && periodeegenskaper.erUttakAnnenForeldersKvote();
};

export default overføringsårsakSkalBesvares;
