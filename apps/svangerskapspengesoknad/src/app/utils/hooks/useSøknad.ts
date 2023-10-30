import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { Søknad } from 'app/types/Søknad';

const useSøknad = (): Søknad => {
    const { state } = useSvangerskapspengerContext();
    return state.søknad;
};

export default useSøknad;
