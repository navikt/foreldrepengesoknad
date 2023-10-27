import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { Søknad } from 'app/types/Søknad';

const useSøknad = (): Søknad => {
    const { state } = useSvangerskapspengerContext();
    console.log('i useSøknad state: ', state);
    return state.søknad;
};

export default useSøknad;
