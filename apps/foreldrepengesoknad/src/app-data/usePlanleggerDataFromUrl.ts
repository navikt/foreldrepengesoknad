import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BarnType } from '@navikt/fp-constants';
import {
    Barn,
    BarnetErAdoptert,
    BarnetErFødt,
    FordelingPlanlegger,
    HvorLangPeriode,
    Kjønn_fpoversikt,
    OmBarnet,
    Søkerrolle,
    SøkersituasjonFp,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { decodeBase64, erLokaltEllerDev } from '@navikt/fp-utils';

import { ContextDataMap, ContextDataType } from './FpDataContext';

type PlanleggerDataFromUrl = {
    OM_BARNET?: OmBarnet;
    HVOR_LANG_PERIODE?: HvorLangPeriode;
    FORDELING?: FordelingPlanlegger;
    UTTAKSPLAN?: UttakPeriode_fpoversikt[];
};

const erBarnetAdoptert = (barnet: OmBarnet): barnet is BarnetErAdoptert =>
    (barnet as BarnetErAdoptert).overtakelsesdato !== undefined;

const erBarnetFødt = (barnet: OmBarnet): barnet is BarnetErFødt =>
    !erBarnetAdoptert(barnet) && (barnet as BarnetErFødt).erBarnetFødt === true;

const utledRolleForSøker = (kjønn: Kjønn_fpoversikt): Søkerrolle | undefined => (kjønn === 'M' ? 'far' : undefined);

const mapOmBarnetTilBarn = (barnet: OmBarnet): Barn => {
    const antallBarn = Number.parseInt(barnet.antallBarn, 10);

    if (erBarnetAdoptert(barnet)) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn,
            adopsjonsdato: barnet.overtakelsesdato,
            fødselsdatoer: [barnet.fødselsdato],
        };
    }

    if (erBarnetFødt(barnet)) {
        return {
            type: BarnType.FØDT,
            antallBarn,
            fødselsdatoer: [barnet.fødselsdato],
            termindato: barnet.termindato,
        };
    }

    return {
        type: BarnType.UFØDT,
        antallBarn,
        termindato: barnet.termindato,
    };
};

const mapPlanleggerDataToSøknadState = (
    data: PlanleggerDataFromUrl,
    kjønn: Kjønn_fpoversikt,
): Partial<ContextDataMap> => {
    const result: Partial<ContextDataMap> = {};
    const { OM_BARNET: barnet, HVOR_LANG_PERIODE: periode, UTTAKSPLAN: uttaksplan } = data;

    if (barnet) {
        const situasjon = erBarnetAdoptert(barnet) ? 'adopsjon' : 'fødsel';
        const rolle = utledRolleForSøker(kjønn);
        if (rolle) {
            result[ContextDataType.SØKERSITUASJON] = { situasjon, rolle } satisfies SøkersituasjonFp;
        }
        result[ContextDataType.OM_BARNET] = mapOmBarnetTilBarn(barnet);
    }

    if (periode) {
        result[ContextDataType.PERIODE_MED_FORELDREPENGER] = periode.dekningsgrad;
    }

    if (uttaksplan) {
        result[ContextDataType.UTTAKSPLAN] = uttaksplan as Array<
            UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt
        >;
    }

    return result;
};

/**
 * Leser eventuell planlegger-data som er sendt med via query-parameter ved oppstart av søknaden,
 * og returnerer den mappet til søknad-state.
 *
 * Dataen blir lagt på URL-en av planlegger-appen når brukeren trykker "Søk om foreldrepenger"
 * på oppsummeringssteget. Wonderwall-sidecar bevarer query-strengen gjennom ID-porten-login
 * slik at parameteret er tilgjengelig her etter innlogging.
 *
 * Returnerer `null` dersom parameteret mangler, er ugyldig, eller appen kjører i prod.
 */
export const usePlanleggerDataFromUrl = (kjønn: Kjønn_fpoversikt | undefined): Partial<ContextDataMap> | null => {
    const [searchParams] = useSearchParams();
    const encoded = searchParams.get('planleggerData');

    return useMemo(() => {
        if (!erLokaltEllerDev() || !encoded || !kjønn) {
            return null;
        }
        try {
            const data = JSON.parse(decodeBase64(encoded)) as PlanleggerDataFromUrl;
            return mapPlanleggerDataToSøknadState(data, kjønn);
        } catch {
            return null;
        }
    }, [encoded, kjønn]);
};
