import { Periode } from '../../../types/uttaksplan/periodetyper';
import { Søknadsinfo } from '../../../selectors/types';
import getSøknadsperiode from 'app/regler/søknadsperioden/Søknadsperioden';

const overføringsårsakSkalBesvares = (periode: Periode, søknadsinfo: Søknadsinfo) => {
    const søknadsperiode = getSøknadsperiode(søknadsinfo, periode);

    return søknadsperiode.erOverføringsperiode() && søknadsperiode.erUttakAnnenForeldersKvote();
};

export default overføringsårsakSkalBesvares;
