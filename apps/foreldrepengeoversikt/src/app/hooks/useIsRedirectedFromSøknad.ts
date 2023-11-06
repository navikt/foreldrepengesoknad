import { isRedirectedFromSøknadAtom } from 'app/atoms/isRedirectedFromSøknadAtom';
import { RedirectSource } from 'app/types/RedirectSource';
import { useAtomValue, useSetAtom } from 'jotai';
import { MutableRefObject, useEffect } from 'react';

export const useGetIsRedirectedFromSøknad = () => {
    const isRedirected = useAtomValue(isRedirectedFromSøknadAtom);
    return isRedirected;
};

export const useSetIsRedirectedFromSøknad = (
    redirectParam: string | undefined,
    isFirstRender: MutableRefObject<boolean>,
) => {
    const setIsRedirectedFromSøknad = useSetAtom(isRedirectedFromSøknadAtom);
    const isRedirected = redirectParam === RedirectSource.REDIRECT_FROM_SØKNAD;
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setIsRedirectedFromSøknad(isRedirected);
        }
    }, [setIsRedirectedFromSøknad, isRedirected, isFirstRender]);
};
