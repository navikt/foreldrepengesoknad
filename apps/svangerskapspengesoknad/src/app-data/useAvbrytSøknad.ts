import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

import Environment from './Environment';
import { useContextReset } from './SvpDataContext';

const useAvbrytSøknad = (setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void) => {
    const navigate = useNavigate();
    const reset = useContextReset();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`),
    });

    const avbrytSøknadHandler = async () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'svangerskapspengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        reset();

        setHarGodkjentVilkår(false);

        slettMellomlagring();

        navigate('/');
    };

    return avbrytSøknadHandler;
};

export default useAvbrytSøknad;
