import actionCreator from 'app/context/action/actionCreator';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { FunctionComponent, useEffect, useState } from 'react';

interface Props {
    children: any;
    // søknad: SvangerskapspengerContextState;
    søkerinfo: SøkerinfoDTO;
}

const SvangerskapspengerStateMock: FunctionComponent<Props> = ({ children, søkerinfo }) => {
    const [erFerdig, setFerdig] = useState(false);
    const { dispatch } = useSvangerskapspengerContext();

    useEffect(() => {
        if (!erFerdig) {
            Promise.all([
                // dispatch(actionCreator.applyStoredState(søknad)),
                dispatch(actionCreator.setSøkerinfo(mapSøkerinfoDTOToSøkerinfo(søkerinfo))),
            ]).then(() => setFerdig(true));
        }
    }, [dispatch, søkerinfo, erFerdig]);

    return erFerdig ? children : null;
};

export default SvangerskapspengerStateMock;
