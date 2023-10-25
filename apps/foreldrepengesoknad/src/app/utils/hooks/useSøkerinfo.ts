import { Søkerinfo } from '@navikt/fp-common';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';

const useSøkerinfo = (): Søkerinfo => {
    const { state } = useForeldrepengesøknadContext();
    return state.søkerinfo;
};

export default useSøkerinfo;
