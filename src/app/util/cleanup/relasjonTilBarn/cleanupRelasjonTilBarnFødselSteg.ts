import { Barn, isUfødtBarn } from '../../../types/søknad/Barn';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { getUfødtBarnProps, getFødtBarnProps } from '../../barnUtils';

const cleanupRelasjonTilBarnFødselSteg = (barn: Partial<Barn>): Partial<Barn> => {
    if (isUfødtBarn(barn, Søkersituasjon.FØDSEL)) {
        return getUfødtBarnProps(barn);
    }
    return getFødtBarnProps(barn);
};
export default cleanupRelasjonTilBarnFødselSteg;
