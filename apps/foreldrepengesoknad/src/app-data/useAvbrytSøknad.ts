import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'api/queries';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';

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

    const avbrytSøknadHandler = async () => {
        loggAmplitudeEvent({
            origin: 'foreldrepengesoknad',
            eventName: 'skjema avbrutt',
        });

        reset();

        setErEndringssøknad(false);
        setHarGodkjentVilkår(false);
        setSøknadGjelderNyttBarn(undefined);

        slettMellomlagring();

        navigate('/');
    };

    return avbrytSøknadHandler;
};
