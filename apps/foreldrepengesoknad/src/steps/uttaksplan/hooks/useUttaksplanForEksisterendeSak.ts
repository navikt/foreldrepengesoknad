import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { prosesserPerioderForVisning } from '@navikt/fp-uttaksplan';

import { useLoggOverlappIVedtak } from './useLoggOverlappIVedtak';

export const useUttaksplanForEksisterendeSak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    const valgtSak = sakerQuery.data?.foreldrepenger.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);
    const gjeldendeVedtak = valgtSak?.gjeldendeVedtak;
    const perioderFraBackend = gjeldendeVedtak?.perioder;

    const uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined = gjeldendeVedtak
        ? prosesserPerioderForVisning(
              perioderFraBackend ?? [],
              perioderAnnenPart ?? [],
              gjeldendeVedtak.perioderAnnenpartEøs,
          )
        : undefined;

    useLoggOverlappIVedtak(uttaksplan, perioderFraBackend, perioderAnnenPart);

    if (!sakerQuery?.data || !valgtEksisterendeSaksnr || !gjeldendeVedtak) {
        return undefined;
    }

    // uttaksplan er alltid definert når gjeldendeVedtak er definert
    return uttaksplan!;
};
