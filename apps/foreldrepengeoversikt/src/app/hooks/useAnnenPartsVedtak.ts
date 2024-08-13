import { useQuery } from '@tanstack/react-query';

import { hentAnnenPartsVedtakOptions } from 'app/api/api';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import { getFamiliehendelseDato } from 'app/utils/sakerUtils';

export function useAnnenPartsVedtak(sak: Sak | undefined) {
    const planErVedtatt = sak?.åpenBehandling === undefined;

    const familiehendelse =
        sak?.ytelse === Ytelse.FORELDREPENGER ? getFamiliehendelseDato(sak.familiehendelse) : undefined;

    const annenPartFødselsnummer = sak?.ytelse === Ytelse.FORELDREPENGER ? sak.annenPart?.fnr : undefined;

    const barnFødselsnummer =
        sak?.ytelse === Ytelse.FORELDREPENGER ? sak.barn?.find((barn) => barn.fnr !== undefined)?.fnr : undefined;

    const enabled = sak?.ytelse === Ytelse.FORELDREPENGER && [planErVedtatt, annenPartFødselsnummer].every(Boolean);

    return useQuery({
        ...hentAnnenPartsVedtakOptions({
            annenPartFødselsnummer,
            barnFødselsnummer,
            familiehendelse,
        }),
        enabled,
    });
}
