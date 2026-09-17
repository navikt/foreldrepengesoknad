import { type ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { OversiktRoutes } from '../routes/routes';

type OversiktState = {
    backgroundColor: 'white' | 'blue';
    setBackgroundColor: (color: 'white' | 'blue') => void;
    selectedRoute: OversiktRoutes;
    setSelectedRoute: (route: OversiktRoutes) => void;
};

const OversiktStateContext = createContext<OversiktState | undefined>(undefined);

export const OversiktStateProvider = ({ children }: { children: ReactNode }) => {
    const [backgroundColor, setBackgroundColor] = useState<'white' | 'blue'>('blue');
    const [selectedRoute, setSelectedRoute] = useState(OversiktRoutes.HOVEDSIDE);

    const value = useMemo(
        () => ({ backgroundColor, setBackgroundColor, selectedRoute, setSelectedRoute }),
        [backgroundColor, selectedRoute],
    );

    return <OversiktStateContext.Provider value={value}>{children}</OversiktStateContext.Provider>;
};

export const useOversiktState = () => {
    const context = useContext(OversiktStateContext);
    if (!context) {
        throw new Error('useOversiktState må brukes innenfor OversiktStateProvider');
    }
    return context;
};
