import { useNavigate } from 'react-router';

import { loggUmamiEvent } from '@navikt/fp-observability';

import { useContextReset } from './SvpDataContext';

export const useAvbrytSøknad = (
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
    slettMellomlagring: () => Promise<void>,
) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const avbrytSøknadHandler = () => {
        loggUmamiEvent({ origin: 'svangerskapspengesoknad', eventName: 'skjema avbrutt' });

        reset();

        setHarGodkjentVilkår(false);

        void slettMellomlagring();

        void navigate('/');
    };

    return avbrytSøknadHandler;
};
