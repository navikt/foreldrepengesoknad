import { Dispatch, ReactNode, SetStateAction, createContext, use, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

type SidetittelContextValue = {
    setSidenavn: Dispatch<SetStateAction<string | undefined>>;
};

const SidetittelContext = createContext<SidetittelContextValue | undefined>(undefined);

export const SidetittelProvider = ({ appTittel, children }: { appTittel: string; children: ReactNode }) => {
    const [sidenavn, setSidenavn] = useState<string>();
    const tittel = sidenavn ? `${sidenavn} – ${appTittel}` : appTittel;

    useEffect(() => {
        const opprinneligTittel = document.title;
        return () => {
            document.title = opprinneligTittel;
        };
    }, []);

    useEffect(() => {
        document.title = tittel;
    }, [tittel]);

    const value = useMemo(() => ({ setSidenavn }), []);

    return <SidetittelContext value={value}>{children}</SidetittelContext>;
};

export const useSidetittel = (sidenavn: string) => {
    const context = use(SidetittelContext);

    useEffect(() => {
        if (!context) {
            return;
        }
        context.setSidenavn(sidenavn);
        return () => context.setSidenavn((forrige) => (forrige === sidenavn ? undefined : forrige));
    }, [context, sidenavn]);
};

export const useStegSidetittel = (stegnavn: string, stegnummer: number, antallSteg: number) => {
    const intl = useIntl();
    useSidetittel(intl.formatMessage({ id: 'Step.Sidetittel' }, { stegnavn, stegnummer, antallSteg }));
};
