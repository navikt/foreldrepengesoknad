import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { Søkerinfo } from 'app/types/Søkerinfo';

const useSøkerinfo = (): Søkerinfo => {
    const { state } = useSvangerskapspengerContext();
    return state.søkerinfo;
};

export default useSøkerinfo;
