import { useEffect } from 'react';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';

const useUpdateCurrentTilretteleggingId = (newTilretteleggingId: string | undefined) => {
    const currentTilretteleggingId = useContextGetData(ContextDataType.TILRETTELEGGING_ID);
    const oppdaterTilretteleggingId = useContextSaveData(ContextDataType.TILRETTELEGGING_ID);

    useEffect(() => {
        if (currentTilretteleggingId !== newTilretteleggingId) {
            oppdaterTilretteleggingId(newTilretteleggingId);
        }
    }, [newTilretteleggingId, currentTilretteleggingId, oppdaterTilretteleggingId]);
};

export default useUpdateCurrentTilretteleggingId;
