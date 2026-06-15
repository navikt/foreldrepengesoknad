import { useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import { erTerminDokumentasjon } from 'types/Dokumentasjon';

import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './EsDataContext';
import { PATH_ORDER, Path, REQUIRED_APP_STEPS } from './paths';

type GetData = <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE];

const getPathToLabelMap = (intl: IntlShape) => ({
    [Path.SØKERSITUASJON]: intl.formatMessage({ id: 'useStepConfig.Søkersituasjon' }),
    [Path.OM_BARNET]: intl.formatMessage({ id: 'useStepConfig.OmBarnet' }),
    [Path.TERMINBEKREFTELSE]: intl.formatMessage({ id: 'useStepConfig.Termin' }),
    [Path.ADOPSJONSBEKREFTELSE]: intl.formatMessage({ id: 'useStepConfig.Adopsjon' }),
    [Path.UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'useStepConfig.Utenlandsopphold' }),
    [Path.TIDLIGERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'useStepConfig.TidligereUtenlandsopphold' }),
    [Path.SENERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'useStepConfig.FremtidigUtenlandsopphold' }),
    [Path.OPPSUMMERING]: intl.formatMessage({ id: 'useStepConfig.Oppsummering' }),
    [Path.VELKOMMEN]: '',
    [Path.KVITTERING]: '',
});

const skalViseUtenlandsoppholdSteg = (path: Path, getData: GetData): boolean => {
    const utenlandsopphold = getData(ContextDataType.UTENLANDSOPPHOLD);
    if (path === Path.TIDLIGERE_UTENLANDSOPPHOLD) {
        const erValgt = utenlandsopphold?.harBoddUtenforNorgeSiste12Mnd === true;
        return erValgt || !!getData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    }
    if (path === Path.SENERE_UTENLANDSOPPHOLD) {
        const erValgt = utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd === true;
        return erValgt || !!getData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    }
    return false;
};

const skalViseDokumentasjonSteg = (path: Path, getData: GetData): boolean => {
    const barn = getData(ContextDataType.OM_BARNET);
    const dokumentasjon = getData(ContextDataType.DOKUMENTASJON);
    if (path === Path.TERMINBEKREFTELSE) {
        return (
            barn?.type === 'termin' ||
            (!!dokumentasjon && dokumentasjon.vedlegg.length > 0 && erTerminDokumentasjon(dokumentasjon))
        );
    }
    if (path === Path.ADOPSJONSBEKREFTELSE) {
        return (
            barn?.type === 'adopsjon' ||
            (!!dokumentasjon && dokumentasjon.vedlegg.length > 0 && !erTerminDokumentasjon(dokumentasjon))
        );
    }
    return false;
};

/**
 * Rein utleiing av den synlege stegrekkja ut frå søknadsdata åleine.
 * Same kjelde brukast både til progress-baren (useStepConfig) og til
 * neste/forrige-navigasjon (useEsNavigator), slik at dei aldri kan sprike.
 *
 * Eit betinga steg er synleg dersom svaret er valt ELLER det finst lagra data
 * for steget. Det held stegsettet monotont (steget du står på finst alltid i
 * lista, så Step ikkje kastar «Ingen valgte steg funnet»), og sikrar at data
 * som faktisk blir sendt i useEsSendSøknad alltid kan sjåast/redigerast.
 */
export const lagAppStegliste = (getData: GetData): Path[] =>
    PATH_ORDER.flatMap((path) =>
        REQUIRED_APP_STEPS.includes(path) ||
        skalViseUtenlandsoppholdSteg(path, getData) ||
        skalViseDokumentasjonSteg(path, getData)
            ? [path]
            : [],
    );

export const useCurrentPath = (): Path => {
    const location = useLocation();
    return useMemo(
        () => notEmpty(Object.values(Path).find((v: string) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );
};

export const useStepConfig = () => {
    const intl = useIntl();
    const pathToLabelMap = getPathToLabelMap(intl);

    const currentPath = useCurrentPath();
    const getStateData = useContextGetAnyData();

    const appPathList = useMemo(() => lagAppStegliste(getStateData), [getStateData]);

    return useMemo(
        () =>
            appPathList.map((p) => ({
                id: p,
                label: pathToLabelMap[p],
                isSelected: p === currentPath,
            })),
        [appPathList, currentPath, pathToLabelMap],
    );
};
