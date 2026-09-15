import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useEffect } from 'react';

import { PeriodeDto_fpoversikt, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { mapAnnenPartsPeriodeTilPeriodeDto, mapSøkersPeriodeTilPeriodeDto, slåSammenPeriodeDtoerPåIntervall } from './gammelPeriodeMapping';
import { useLoggOverlappIVedtak } from './useLoggOverlappIVedtak';

const mapEøsTilPeriodeDto = (periode: UttakPeriodeAnnenpartEøs_fpoversikt): PeriodeDto_fpoversikt => ({
    fom: periode.fom,
    tom: periode.tom,
    annenPartEøs: {
        kontoType: periode.kontoType,
        trekkdager: periode.trekkdager,
    },
});

export const useUttaksplanForEksisterendeSak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
    erAnnenPartVedtakAvklart = true,
): PeriodeDto_fpoversikt[] | undefined => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const opprinneligUttaksplan = useContextGetData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);
    const oppdaterOpprinneligUttaksplan = useContextSaveData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    const valgtSak = sakerQuery.data?.foreldrepenger.find((sak) => sak.saksnummer === valgtEksisterendeSaksnr);
    const gjeldendeVedtak = valgtSak?.gjeldendeVedtak;
    const perioderFraBackend = gjeldendeVedtak?.perioder;

    const uttaksplan: PeriodeDto_fpoversikt[] | undefined = gjeldendeVedtak
        ? slåSammenPeriodeDtoerPåIntervall([
              ...(perioderFraBackend ?? []).map(mapSøkersPeriodeTilPeriodeDto),
              ...(perioderAnnenPart ?? []).map(mapAnnenPartsPeriodeTilPeriodeDto),
              ...(gjeldendeVedtak.perioderAnnenpartEøs ?? []).map(mapEøsTilPeriodeDto),
          ]).sort((a, b) => a.fom.localeCompare(b.fom))
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
