import { useQuery } from '@tanstack/react-query';
import { Sak } from 'types/Sak';
import { Ytelse } from 'types/Ytelse';
import { getFamiliehendelseDato } from 'utils/sakerUtils';

import { hentAnnenPartsVedtakOptions } from 'app/api/api';

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
