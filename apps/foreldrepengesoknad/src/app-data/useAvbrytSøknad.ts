import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';

import { useContextReset } from './FpDataContext';

export const useAvbrytSøknad = (
    fødselsnr: string,
    setErEndringssøknad: (erEndringssøknad: boolean) => void,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn?: boolean) => void,
) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`),
    });

    const avbrytSøknadHandler = useCallback(async () => {
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
    }, [fødselsnr, navigate, reset, setErEndringssøknad, setHarGodkjentVilkår, setSøknadGjelderNyttBarn]);

    return avbrytSøknadHandler;
};
