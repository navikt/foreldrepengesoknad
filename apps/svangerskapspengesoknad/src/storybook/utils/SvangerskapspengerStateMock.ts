import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import actionCreator from 'app/context/action/actionCreator';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { FunctionComponent, useEffect, useState } from 'react';

interface Props {
    children: any;
    context: SvangerskapspengerContextState;
}

const SvangerskapspengerStateMock: FunctionComponent<Props> = ({ children, context }) => {
    const [erFerdig, setFerdig] = useState(false);
    const { dispatch } = useSvangerskapspengerContext();
    useEffect(() => {
        if (!erFerdig) {
            Promise.all([dispatch(actionCreator.applyStoredState(context))]).then(() => {
                setFerdig(true);
            });
        }
    }, [dispatch, erFerdig, context]);

    return erFerdig ? children : null;
};

export default SvangerskapspengerStateMock;
