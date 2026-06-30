import { loggUmamiEvent } from '@navikt/fp-observability';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './SvpDataContext';
import { SøknadRoute } from './routes';
import { useStepConfig } from './useStepConfig';

export const useSvpNavigator = (
    mellomlagreOgNaviger: () => Promise<void>,
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id ?? SøknadRoute.FORSIDE;
        oppdaterPath(previousPath);
        void mellomlagreOgNaviger();
    };

    const goToStep = (path: SøknadRoute | string) => {
        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;
        oppdaterPath(nextPath);
        void mellomlagreOgNaviger();
    };

    const fortsettSøknadSenere = async () => {
        loggUmamiEvent({ origin: 'svangerskapspengesoknad', eventName: 'skjema fortsett senere' });
        await mellomlagreOgNaviger();
        globalThis.location.href = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};
