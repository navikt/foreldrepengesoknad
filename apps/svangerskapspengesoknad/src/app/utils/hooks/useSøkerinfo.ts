import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { Søkerinfo } from 'app/types/Søkerinfo';

const useSøkerinfo = (): Søkerinfo => {
    const { state } = useSvangerskapspengerContext();
    console.log('i use søkerinfo state; ', state);
    return state.søkerinfo;
};

export default useSøkerinfo;
