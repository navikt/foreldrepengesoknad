import { ContextDataMap, ContextDataType } from 'appData/PlanleggerDataContext';
import { HvemPlanleggerType } from 'types/HvemPlanlegger';

import { decompressFromUrl, konverterFlatePerioderTilIntervall } from '@navikt/fp-utils';

type Objekt = Record<string, unknown>;

const erObjekt = (verdi: unknown): verdi is Objekt =>
    typeof verdi === 'object' && verdi !== null && !Array.isArray(verdi);

const HVEM_PLANLEGGER_TYPER = new Set<unknown>(Object.values(HvemPlanleggerType));

const NAVNEFELT = ['navnPåMor', 'navnPåFar', 'navnPåMedmor', 'navnPåMedfar'] as const;

const erGyldigHvemPlanlegger = (verdi: unknown) =>
    erObjekt(verdi) &&
    HVEM_PLANLEGGER_TYPER.has(verdi.type) &&
    NAVNEFELT.every((felt) => verdi[felt] === undefined || typeof verdi[felt] === 'string');

const erGyldigPeriode = (periode: unknown) =>
    erObjekt(periode) && typeof periode.fom === 'string' && typeof periode.tom === 'string';

const erGyldigUttaksplan = (verdi: unknown) => Array.isArray(verdi) && verdi.every(erGyldigPeriode);

const VALIDERING_PER_NØKKEL: Record<ContextDataType, (verdi: unknown) => boolean> = {
    [ContextDataType.HVEM_PLANLEGGER]: erGyldigHvemPlanlegger,
    [ContextDataType.OM_BARNET]: erObjekt,
    [ContextDataType.ARBEIDSSITUASJON]: erObjekt,
    [ContextDataType.HVOR_LANG_PERIODE]: erObjekt,
    [ContextDataType.FORDELING]: erObjekt,
    [ContextDataType.HVOR_MYE]: erObjekt,
    [ContextDataType.UTTAKSPLAN]: erGyldigUttaksplan,
};

const harGyldigForm = (data: unknown): data is ContextDataMap =>
    erObjekt(data) &&
    Object.values(ContextDataType).every((nøkkel) => {
        const verdi = data[nøkkel];
        return verdi === undefined || VALIDERING_PER_NØKKEL[nøkkel](verdi);
    });

type Planleggerdata = {
    data?: ContextDataMap;
    lenkeErUgyldig: boolean;
};

// TODO: Fjern konverteringen fra gammelt flatt format når delte lenker i gammelt format ikke lenger er i bruk
// (vurder etter 1. juni 2027).
export const lesPlanleggerdataFraUrl = (dataParam: string | null): Planleggerdata => {
    if (!dataParam) {
        return { data: undefined, lenkeErUgyldig: false };
    }

    const json = decompressFromUrl(dataParam);
    const data: unknown = json === undefined ? undefined : JSON.parse(json);
    if (!harGyldigForm(data)) {
        return { data: undefined, lenkeErUgyldig: true };
    }

    const uttaksplan = data[ContextDataType.UTTAKSPLAN];
    return {
        data: uttaksplan
            ? { ...data, [ContextDataType.UTTAKSPLAN]: konverterFlatePerioderTilIntervall(uttaksplan) }
            : data,
        lenkeErUgyldig: false,
    };
};
