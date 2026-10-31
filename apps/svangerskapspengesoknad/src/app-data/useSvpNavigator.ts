import { loggUmamiEvent } from '@navikt/fp-observability';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './SvpDataContext';
import { SøknadRoute } from './routes';
import { MellomlagreSøknadFn } from './useMellomlagreSøknad';
import { useStepConfig } from './useStepConfig';

interface UseSvpNavigatorParams {
    mellomlagreOgNaviger: MellomlagreSøknadFn;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    harRegistrertNæring: boolean;
}

export const useSvpNavigator = ({
    mellomlagreOgNaviger,
    arbeidsforhold,
    harRegistrertNæring,
}: UseSvpNavigatorParams) => {
    const stepConfig = useStepConfig({ arbeidsforhold, harRegistrertNæring });
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

    const fortsettSøknadSenere = () => {
        loggUmamiEvent({ origin: 'svangerskapspengesoknad', eventName: 'skjema fortsett senere' });
        // Bare lagre (ingen navigering – vi forlater appen rett etterpå), med retry siden brukeren
        // ikke får et nytt forsøk på å lagre endringene sine. Brukeren sendes ut av appen først når
        // lagringen gikk bra; ellers blir brukeren værende i søknaden og får en feilmelding.
        void mellomlagreOgNaviger({
            naviger: false,
            medRetry: true,
            visFeilTilBruker: true,
            onFerdig: (resultat) => {
                if (resultat === 'OK') {
                    location.assign('https://nav.no');
                }
            },
        });
    };

    return {
        goToPreviousDefaultStep,
        goToStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};
