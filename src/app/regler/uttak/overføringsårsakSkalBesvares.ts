import { Periode } from '../../types/uttaksplan/periodetyper';
import { getSøknadsperiode } from '../søknadsperioden/Søknadsperioden';
import { Søknadsinfo } from '../../selectors/types';

const overføringsårsakSkalBesvares = (periode: Periode, søknadsinfo: Søknadsinfo) => {
    const søknadsperiode = getSøknadsperiode(søknadsinfo, periode);
    return søknadsperiode.erOverføringsperiode() && søknadsperiode.erUttakAnnenForeldersKvote();
};

export default overføringsårsakSkalBesvares;
