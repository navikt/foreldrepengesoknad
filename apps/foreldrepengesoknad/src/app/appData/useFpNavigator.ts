import { useEffect } from 'react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from '../context/FpDataContext';
import SøknadRoutes from '../routes/routes';
import useStepConfig from './useStepConfig';

const useFpNavigator = (
    arbeidsforhold: Arbeidsforhold[],
    mellomlagreOgNaviger: () => Promise<void>,
    erEndringssøknad = false,
) => {
    const stepConfig = useStepConfig(arbeidsforhold, erEndringssøknad);
    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);

    const activeStepId = stepConfig.find((sc) => sc.isSelected);

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            pageKey: activeStepId,
        });
    }, [activeStepId]);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id || SøknadRoutes.VELKOMMEN;
        oppdaterPath(previousPath);
        return mellomlagreOgNaviger();
    };

    const goToNextStep = (path: SøknadRoutes) => {
        oppdaterPath(path);
        return mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;

        oppdaterPath(nextPath);
        return mellomlagreOgNaviger();
    };

    const fortsettSøknadSenere = () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'fortsettSenere',
        });
        (window as any).location = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToNextStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};

export default useFpNavigator;
