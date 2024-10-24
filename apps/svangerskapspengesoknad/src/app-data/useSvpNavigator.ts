import { useEffect } from 'react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './SvpDataContext';
import { SøknadRoute } from './routes';
import { useStepConfig } from './useStepConfig';

export const useSvpNavigator = (mellomlagreOgNaviger: () => Promise<void>, arbeidsforhold: Arbeidsforhold[]) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);

    const activeStepId = stepConfig.find((sc) => sc.isSelected);

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'svangerskapspenger',
            team: 'foreldrepenger',
            pageKey: activeStepId,
        });
    }, [activeStepId]);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id || SøknadRoute.FORSIDE;
        oppdaterPath(previousPath);
        return mellomlagreOgNaviger();
    };

    const goToStep = (path: SøknadRoute | string) => {
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
            app: 'svangerskapspenger',
            team: 'foreldrepenger',
            hendelse: 'fortsettSenere',
        });
        (window as any).location = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};
