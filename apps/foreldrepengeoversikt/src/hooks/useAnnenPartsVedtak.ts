import { useQuery } from '@tanstack/react-query';

import { hentAnnenPartsVedtakOptions } from '../api/api';
import { Sak } from '../types/Sak';
import { getFamiliehendelseDato } from '../utils/sakerUtils';

export function useAnnenPartsVedtak(sak: Sak | undefined) {
    const familiehendelse = sak?.ytelse === 'FORELDREPENGER' ? getFamiliehendelseDato(sak.familiehendelse) : undefined;

    const annenPartFødselsnummer = sak?.ytelse === 'FORELDREPENGER' ? sak.annenPart?.fnr : undefined;

    const barnFødselsnummer =
        sak?.ytelse === 'FORELDREPENGER' ? sak.barn?.find((barn) => barn.fnr !== undefined)?.fnr : undefined;

    const enabled = sak?.ytelse === 'FORELDREPENGER';

    return useQuery({
        ...hentAnnenPartsVedtakOptions({
            annenPartFødselsnummer,
            barnFødselsnummer,
            familiehendelse,
        }),
        enabled,
    });
}
