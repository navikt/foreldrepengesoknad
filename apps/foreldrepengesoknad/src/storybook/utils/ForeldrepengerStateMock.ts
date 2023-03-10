import { FunctionComponent, useEffect, useState } from 'react';

import actionCreator from '../../app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from '../../app/context/hooks/useForeldrepengesøknadContext';
import { ForeldrepengesøknadContextState } from '../../app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from '../../app/types/SøkerinfoDTO';
import mapSøkerinfoDTOToSøkerinfo from '../../app/utils/mapSøkerinfoDTO';

interface Props {
    children: any;
    søknad: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const ForeldrepengerStateMock: FunctionComponent<Props> = ({ children, søknad, søkerinfo }) => {
    const [erFerdig, setFerdig] = useState(false);
    const { dispatch } = useForeldrepengesøknadContext();

    useEffect(() => {
        if (!erFerdig) {
            Promise.all([
                dispatch(actionCreator.applyStoredState(søknad)),
                dispatch(actionCreator.setSøkerinfo(mapSøkerinfoDTOToSøkerinfo(søkerinfo))),
            ]).then(() => setFerdig(true));
        }
    }, [dispatch, søknad, søkerinfo, erFerdig]);

    return erFerdig ? children : null;
};

export default ForeldrepengerStateMock;
