import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useEffect } from 'react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { prosesserPerioderForVisning } from '@navikt/fp-uttaksplan';

import { useLoggOverlappIVedtak } from './useLoggOverlappIVedtak';

export const useUttaksplanForEksisterendeSak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
    erAnnenPartVedtakAvklart = true,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const opprinneligUttaksplan = useContextGetData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);
    const oppdaterOpprinneligUttaksplan = useContextSaveData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);

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

    useEffect(() => {
        const hentingAvGrunnlagPågår = sakerQuery.isFetching || !erAnnenPartVedtakAvklart;
        const manglerGrunnlag = uttaksplan === undefined || valgtEksisterendeSaksnr === undefined;
        const harSnapshotForValgtSak = opprinneligUttaksplan?.saksnummer === valgtEksisterendeSaksnr;

        if (hentingAvGrunnlagPågår || manglerGrunnlag || harSnapshotForValgtSak) {
            return;
        }

        oppdaterOpprinneligUttaksplan({
            saksnummer: valgtEksisterendeSaksnr,
            perioder: uttaksplan,
        });
    }, [
        erAnnenPartVedtakAvklart,
        sakerQuery.isFetching,
        valgtEksisterendeSaksnr,
        uttaksplan,
        opprinneligUttaksplan,
        oppdaterOpprinneligUttaksplan,
    ]);

    if (!valgtEksisterendeSaksnr || !gjeldendeVedtak || !sakerQuery?.data) {
        return undefined;
    }

    // uttaksplan er alltid definert når gjeldendeVedtak er definert
    return uttaksplan!;
};
