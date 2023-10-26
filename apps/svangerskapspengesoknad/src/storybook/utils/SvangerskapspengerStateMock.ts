import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import actionCreator from 'app/context/action/actionCreator';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { FunctionComponent, useEffect, useState } from 'react';

interface Props {
    children: any;
    context: SvangerskapspengerContextState;
    søkerinfo: SøkerinfoDTO;
}

const SvangerskapspengerStateMock: FunctionComponent<Props> = ({ children, context, søkerinfo }) => {
    const [erFerdig, setFerdig] = useState(false);
    const { dispatch } = useSvangerskapspengerContext();

    useEffect(() => {
        if (!erFerdig) {
            Promise.all([
                dispatch(actionCreator.applyStoredState(context)),
                dispatch(actionCreator.setSøkerinfo(mapSøkerinfoDTOToSøkerinfo(søkerinfo))),
            ]).then(() => {
                setFerdig(true);
            });
        }
    }, [dispatch, søkerinfo, erFerdig, context]);

    return erFerdig ? children : null;
};

export default SvangerskapspengerStateMock;
