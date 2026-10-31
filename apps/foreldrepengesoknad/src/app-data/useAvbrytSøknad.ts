import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { loggUmamiEvent } from '@navikt/fp-observability';

import { useContextReset } from './FpDataContext';

export const useAvbrytSøknad = (
    setErEndringssøknad: (erEndringssøknad: boolean) => void,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn?: boolean) => void,
    slettMellomlagring: () => Promise<void>,
) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const avbrytSøknadHandler = useCallback(() => {
        loggUmamiEvent({
            origin: 'foreldrepengesoknad',
            eventName: 'skjema avbrutt',
        });

        reset();

        setErEndringssøknad(false);
        setHarGodkjentVilkår(false);
        setSøknadGjelderNyttBarn(undefined);

        void slettMellomlagring();

        void navigate('/');
    }, [slettMellomlagring, navigate, reset, setErEndringssøknad, setHarGodkjentVilkår, setSøknadGjelderNyttBarn]);

    return avbrytSøknadHandler;
};
