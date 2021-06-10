import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { Søknad } from 'app/context/types/Søknad';

const useSoknad = (): Søknad => {
  const { state } = useForeldrepengesøknadContext();
  return state.søknad;
}

export default useSoknad;