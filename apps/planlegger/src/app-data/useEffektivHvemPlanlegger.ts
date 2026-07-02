import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { getEffektivHvemPlanlegger } from 'utils/HvemPlanleggerUtils';

import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from './PlanleggerDataContext';

/**
 * Returnerer hvemPlanlegger der navnefeltene til søker1/søker2 er byttet om dersom brukeren
 * (for likekjønnede par ved adopsjon) har valgt at søker2 skal starte permisjonen. Bruk denne
 * fremfor å lese HVEM_PLANLEGGER direkte fra konteksten i alle steg etter "Fordeling".
 */
export const useEffektivHvemPlanlegger = (): HvemPlanlegger => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const barnet = useContextGetData(ContextDataType.OM_BARNET);

    return getEffektivHvemPlanlegger(hvemPlanlegger, fordeling, barnet);
};
