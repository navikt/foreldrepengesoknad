import Api from 'api/api';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

import { useContextReset } from './FpDataContext';

export const useAvbrytSøknad = (
    fødselsnr: string,
    setErEndringssøknad: (erEndringssøknad: boolean) => void,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn?: boolean) => void,
) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const avbrytSøknadHandler = useCallback(async () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        reset();

        setErEndringssøknad(false);
        setHarGodkjentVilkår(false);
        setSøknadGjelderNyttBarn(undefined);

        try {
            await Api.deleteMellomlagretSøknad(fødselsnr);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // Vi bryr oss ikke om feil her. Logges bare i backend
        }

        navigate('/');
    }, [fødselsnr, navigate, reset, setErEndringssøknad, setHarGodkjentVilkår, setSøknadGjelderNyttBarn]);

    return avbrytSøknadHandler;
};
