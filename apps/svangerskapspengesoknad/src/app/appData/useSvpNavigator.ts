import { useEffect } from 'react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './SvpDataContext';
import SøknadRoutes from './routes';
import useStepConfig from './useStepConfig';

const useSvpNavigator = (mellomlagreOgNaviger: () => Promise<void>, arbeidsforhold: Arbeidsforhold[]) => {
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

    const goToPreviousStep = (path: SøknadRoutes) => {
        oppdaterPath(path);
        return mellomlagreOgNaviger();
    };

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id || SøknadRoutes.FORSIDE;
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
            app: 'svangerskapspenger',
            team: 'foreldrepenger',
            hendelse: 'fortsettSenere',
        });
        (window as any).location = 'https://nav.no';
    };

    return {
        goToPreviousStep,
        goToPreviousDefaultStep,
        goToNextStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};

export default useSvpNavigator;
