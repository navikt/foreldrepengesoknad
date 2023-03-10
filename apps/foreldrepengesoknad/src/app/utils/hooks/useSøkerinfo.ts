import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { Søkerinfo } from 'app/types/Søkerinfo';

const useSøkerinfo = (): Søkerinfo => {
    const { state } = useForeldrepengesøknadContext();
    return state.søkerinfo;
};

export default useSøkerinfo;
