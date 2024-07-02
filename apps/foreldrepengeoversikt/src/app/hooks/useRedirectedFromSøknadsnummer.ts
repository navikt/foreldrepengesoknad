import { useAtomValue, useSetAtom } from 'jotai';
import { MutableRefObject, useEffect } from 'react';

import { redirectedFromSøknadsnummerAtom } from 'app/atoms/redirectedFromSøknadsnummerAtom';
import { RedirectSource, UKNOWN_SAKSNUMMER } from 'app/types/RedirectSource';

export const useGetRedirectedFromSøknadsnummer = () => {
    const søknadsnummer = useAtomValue(redirectedFromSøknadsnummerAtom);
    return søknadsnummer;
};

export const useSetRedirectedFromSøknadsnummer = (
    redirectParam: string | undefined,
    saksnummer: string | undefined,
    isFirstRender: MutableRefObject<boolean>,
) => {
    const saksnummerForRedirectedSøknad = saksnummer ?? UKNOWN_SAKSNUMMER;
    const setRedirectedFromSøknadsnummer = useSetAtom(redirectedFromSøknadsnummerAtom);
    const redirectedFromSøknadsnummer =
        redirectParam === RedirectSource.REDIRECT_FROM_SØKNAD ? saksnummerForRedirectedSøknad : undefined;
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setRedirectedFromSøknadsnummer(redirectedFromSøknadsnummer);
        }
    }, [setRedirectedFromSøknadsnummer, redirectedFromSøknadsnummer, isFirstRender]);
};
