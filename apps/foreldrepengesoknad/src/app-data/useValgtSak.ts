import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';

import { FpSak_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, useContextGetData } from './FpDataContext';

export const useValgtSak = (eksisterendeSak?: FpSak_fpoversikt) => {
    const saksnummer = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const oppgittSak = eksisterendeSak?.saksnummer === saksnummer ? eksisterendeSak : undefined;
    const query = useQuery({ ...sakerOptions(), enabled: saksnummer !== undefined && !oppgittSak });
    const valgtSak = oppgittSak ?? query.data?.foreldrepenger.find((sak) => sak.saksnummer === saksnummer);

    return {
        valgtSak,
        erNySøknadPåEksisterendeSak: valgtSak !== undefined && !valgtSak.gjeldendeVedtak,
        isLoading: saksnummer !== undefined && !oppgittSak && query.isLoading,
    };
};
