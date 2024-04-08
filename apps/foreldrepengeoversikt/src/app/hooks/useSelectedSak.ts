import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { selectedSakAtom } from 'app/atoms/selectedSakAtom';
import { Sak } from 'app/types/Sak';

export const useGetSelectedSak = () => {
    const selectedSak = useAtomValue(selectedSakAtom);
    return selectedSak;
};

export const useSetSelectedSak = (sak: Sak | undefined) => {
    const setSelectedSak = useSetAtom(selectedSakAtom);

    useEffect(() => {
        setSelectedSak(sak);
    }, [setSelectedSak, sak]);
};
