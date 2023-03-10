import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import UttaksplanInfo from 'app/context/types/UttaksplanInfo';

const useUttaksplanInfo = <T extends UttaksplanInfo>(): T | undefined => {
    const { state } = useForeldrepengesøknadContext();
    //TODO (TOR) Fiks casting
    return <T>state.uttaksplanInfo;
};

export default useUttaksplanInfo;
