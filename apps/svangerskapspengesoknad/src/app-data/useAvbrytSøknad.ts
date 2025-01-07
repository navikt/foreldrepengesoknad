import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';

import { useContextReset } from './SvpDataContext';

export const useAvbrytSøknad = (setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`),
    });

    const avbrytSøknadHandler = async () => {
        loggAmplitudeEvent({ origin: 'svangerskapspengesoknad', eventName: 'skjema avbrutt' });

        reset();

        setHarGodkjentVilkår(false);

        slettMellomlagring();

        navigate('/');
    };

    return avbrytSøknadHandler;
};
