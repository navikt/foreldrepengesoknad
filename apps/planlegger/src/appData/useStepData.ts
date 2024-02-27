import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { notEmpty } from '@navikt/fp-validation';
import { PlanleggerRoutes, REQUIRED_APP_STEPS, PATH_ORDER } from 'appData/routes';
import { ProgressStep } from 'components/progressStepper/ProgressStepper';
import { IntlShape, useIntl } from 'react-intl';

const getPathToLabelMap = (intl: IntlShape) =>
    ({
        [PlanleggerRoutes.OM_PLANLEGGEREN]: intl.formatMessage({ id: 'om.ingress' }),
        [PlanleggerRoutes.ARBEIDSSITUASJON]: intl.formatMessage({ id: 'arbeid.tittel' }),
        [PlanleggerRoutes.BARNEHAGEPLASS]: intl.formatMessage({ id: 'barnehageplass.tittel' }),
        [PlanleggerRoutes.HVEM_PLANLEGGER]: intl.formatMessage({ id: 'hvem.tittel' }),
        [PlanleggerRoutes.OM_BARNET]: intl.formatMessage({ id: 'barnet.tittel' }),
        [PlanleggerRoutes.OPPSUMMERING]: intl.formatMessage({ id: 'oppsummering.tittel' }),
    }) as Record<string, string>;

const useStepData = (): Array<ProgressStep<PlanleggerRoutes>> => {
    const intl = useIntl();
    const location = useLocation();

    const currentPath = useMemo(
        () => notEmpty(Object.values(PlanleggerRoutes).find((v) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );

    const appPathList = useMemo(
        () => PATH_ORDER.flatMap((path) => (REQUIRED_APP_STEPS.includes(path) ? [path] : [])),
        [],
    );

    const labelMap = getPathToLabelMap(intl);

    return appPathList.map((p) => ({
        id: p,
        isSelected: p === currentPath,
        label: labelMap[p],
    }));
};

export default useStepData;
