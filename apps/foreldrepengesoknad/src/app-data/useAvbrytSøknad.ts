import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'api/queries';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { kyWithSentry as ky } from '@navikt/fp-observability';
import { loggUmamiEvent } from '@navikt/fp-observability';

import { useContextReset } from './FpDataContext';

export const useAvbrytSøknad = (
    setErEndringssøknad: (erEndringssøknad: boolean) => void,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn?: boolean) => void,
) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    const avbrytSøknadHandler = useCallback(() => {
        loggUmamiEvent({
            origin: 'foreldrepengesoknad',
            eventName: 'skjema avbrutt',
        });

        reset();

        setErEndringssøknad(false);
        setHarGodkjentVilkår(false);
        setSøknadGjelderNyttBarn(undefined);

        slettMellomlagring();

        void navigate('/');
    }, [slettMellomlagring, navigate, reset, setErEndringssøknad, setHarGodkjentVilkår, setSøknadGjelderNyttBarn]);

    return avbrytSøknadHandler;
};
