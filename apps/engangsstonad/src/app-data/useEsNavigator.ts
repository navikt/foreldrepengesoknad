import { loggUmamiEvent } from '@navikt/fp-observability';

import { ContextDataMap, ContextDataType, useContextGetAnyData, useContextSaveData } from './EsDataContext';
import { Path } from './paths';
import { lagAppStegliste, useCurrentPath } from './useStepConfig';

export const useEsNavigator = (mellomlagreOgNaviger: () => Promise<void>) => {
    const getStateData = useContextGetAnyData();
    const currentPath = useCurrentPath();
    const oppdaterPath = useContextSaveData(ContextDataType.CURRENT_PATH);

    // Bygg ein getter som let kallande steg overstyre data det nettopp har lagra.
    // Dette trengst fordi context-dispatch i same handler enno ikkje er reflektert
    // i `getStateData`, og vi vil rekne neste steg ut frå ferske verdiar.
    const medFerskeData =
        (oppdatert: Partial<ContextDataMap>) =>
        <TYPE extends ContextDataType>(key: TYPE): ContextDataMap[TYPE] =>
            key in oppdatert ? oppdatert[key] : getStateData(key);

    const naviger = (path: Path | undefined) => {
        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = (oppdatertData: Partial<ContextDataMap> = {}) => {
        const stegliste = lagAppStegliste(medFerskeData(oppdatertData));
        const index = stegliste.indexOf(currentPath) + 1;
        naviger(stegliste[index]);
    };

    const goToPreviousDefaultStep = () => {
        const stegliste = lagAppStegliste(getStateData);
        const index = stegliste.indexOf(currentPath) - 1;
        naviger(stegliste[index] ?? Path.VELKOMMEN);
    };

    const goToStep = (path: Path) => {
        naviger(path);
    };

    const avbrytSøknad = () => {
        naviger(undefined);
    };

    const fortsettSøknadSenere = () => {
        loggUmamiEvent({ origin: 'engangsstonad', eventName: 'skjema fortsett senere' });
        globalThis.location.href = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToNextDefaultStep,
        goToStep,
        avbrytSøknad,
        fortsettSøknadSenere,
    };
};
