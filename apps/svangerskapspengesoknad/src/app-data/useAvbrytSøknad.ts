import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'appData/queries';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

import { loggUmamiEvent } from '@navikt/fp-metrics';

import { useContextReset } from './SvpDataContext';

export const useAvbrytSøknad = (setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    const avbrytSøknadHandler = async () => {
        loggUmamiEvent({ origin: 'svangerskapspengesoknad', eventName: 'skjema avbrutt' });

        reset();

        setHarGodkjentVilkår(false);

        slettMellomlagring();

        navigate('/');
    };

    return avbrytSøknadHandler;
};
