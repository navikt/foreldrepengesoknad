import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { decodeBase64, erLokaltEllerDev } from '@navikt/fp-utils';

/**
 * Form på planlegger-data slik den serialiseres i planlegger-appen.
 * Felt-nøklene matcher `ContextDataType` i planlegger og er strenger her for å unngå
 * en hard avhengighet mellom appene.
 */
export type PlanleggerDataFromUrl = {
    HVEM_PLANLEGGER?: unknown;
    OM_BARNET?: unknown;
    HVOR_LANG_PERIODE?: unknown;
    FORDELING?: unknown;
    UTTAKSPLAN?: unknown;
};

/**
 * Leser eventuell planlegger-data som er sendt med via query-parameter ved oppstart av søknaden.
 *
 * Dataen blir lagt på URL-en av planlegger-appen når brukeren trykker "Søk om foreldrepenger"
 * på oppsummeringssteget. Wonderwall-sidecar bevarer query-strengen gjennom ID-porten-login
 * slik at parameteret er tilgjengelig her etter innlogging.
 *
 * Returnerer `null` dersom parameteret mangler, er ugyldig, eller appen kjører i prod.
 */
export const usePlanleggerDataFromUrl = (): PlanleggerDataFromUrl | null => {
    const [searchParams] = useSearchParams();
    const encoded = searchParams.get('planleggerData');

    return useMemo(() => {
        if (!erLokaltEllerDev() || !encoded) {
            return null;
        }
        try {
            return JSON.parse(decodeBase64(encoded)) as PlanleggerDataFromUrl;
        } catch {
            return null;
        }
    }, [encoded]);
};
