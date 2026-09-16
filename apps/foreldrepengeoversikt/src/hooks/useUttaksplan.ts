import { useQuery } from '@tanstack/react-query';

import { hentUttaksplanOptions } from '../api/queries.ts';
import { Sak } from '../types/Sak';
import { getFamiliehendelseDato } from '../utils/sakerUtils';

/**
 * Hentar felles uttaksplan frå det nye /uttaksplan-endepunktet i fp-oversikt.
 *
 * Prototype: endepunktet finst enno berre på feature/uttaksplan-branchen i fp-oversikt og
 * er ikkje deploya. `enabled` er difor hardkoda til false, slik at me ikkje gjer reelle,
 * feilande kall mot eit endepunkt som ikkje finst i prod. Fjern denne sperra når endepunktet
 * er i produksjon.
 */
export function useUttaksplan(sak: Sak | undefined) {
    const familiehendelse = sak?.ytelse === 'FORELDREPENGER' ? getFamiliehendelseDato(sak.familiehendelse) : undefined;

    const annenPartFødselsnummer = sak?.ytelse === 'FORELDREPENGER' ? sak.annenPart?.fnr : undefined;

    const barnFødselsnummer =
        sak?.ytelse === 'FORELDREPENGER' ? sak.barn?.find((barn) => barn.fnr !== undefined)?.fnr : undefined;

    // Reell verdi ville vore: sak?.ytelse === 'FORELDREPENGER' && (!!barnFødselsnummer || !!familiehendelse).
    const enabled = false;

    return useQuery({
        ...hentUttaksplanOptions({
            barnIdentifikator: {
                fødselsnummer: barnFødselsnummer,
                familiehendelse,
            },
            annenPartFødselsnummer,
        }),
        enabled,
    });
}
