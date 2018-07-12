import _ from 'lodash';
import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';
import Barn, { FødtBarn, UfødtBarn } from '../../types/søknad/Barn';

export const barnBaseInterfaceKeys = ['antallBarn', 'erBarnetFødt'];

export const cleanupBarn = (
    barn: Barn,
    søkersituasjon: Søkersituasjon
): Barn => {
    switch (søkersituasjon) {
        case Søkersituasjon.FØDSEL:
            return barn.erBarnetFødt
                ? (_.pick(barn, [
                      ...barnBaseInterfaceKeys,
                      'fødeslsattest',
                      'fødeslsdato'
                  ]) as FødtBarn)
                : (_.pick(barn, [
                      ...barnBaseInterfaceKeys,
                      'termindato',
                      'terminbekreftelseDato',
                      'terminbekreftelse'
                  ]) as UfødtBarn);
        default:
            return barn as Barn;
    }
};

export const cleanupSøknad = (søknad: Søknad): Søknad => {
    const { barn } = søknad;
    søknad.barn = cleanupBarn(barn, søknad.situasjon);
    return søknad;
};
