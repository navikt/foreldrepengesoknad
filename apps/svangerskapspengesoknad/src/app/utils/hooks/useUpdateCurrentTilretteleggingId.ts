import actionCreator from '../../context/action/actionCreator';
import { useEffect } from 'react';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';

const useUpdateCurrentTilretteleggingId = (currentTilretteleggingId: string | undefined) => {
    const { dispatch, state } = useSvangerskapspengerContext();

    useEffect(() => {
        if (state.currentTilretteleggingId !== currentTilretteleggingId) {
            dispatch(actionCreator.setCurrentTilretteleggingId(currentTilretteleggingId));
        }
    }, [currentTilretteleggingId, dispatch, state]);
};

export default useUpdateCurrentTilretteleggingId;
