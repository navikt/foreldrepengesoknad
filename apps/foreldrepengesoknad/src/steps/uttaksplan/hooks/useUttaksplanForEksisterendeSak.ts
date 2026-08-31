import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useEffect, useRef } from 'react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { prosesserPerioderForVisning } from '@navikt/fp-uttaksplan';

import { useLoggOverlappIVedtak } from './useLoggOverlappIVedtak';

export const useUttaksplanForEksisterendeSak = (
    perioderAnnenPart: UttakPeriode_fpoversikt[] | undefined,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> | undefined => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
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

    // Innsendinga må utleie endringstidspunktet mot nøyaktig den planen brukaren fekk presentert, ikkje
    // mot dei rå vedtaksperiodane. prosesserPerioderForVisning gjer tilpassingar (m.a. samtidig uttak når
    // berre den eine parten har det), og utan dette snapshotet ville tilpassingane bli tolka som
    // brukarendringar og flytte endringstidspunktet heilt tilbake til fødselen.
    const sisteSnapshotRef = useRef<string | undefined>(undefined);
    useEffect(() => {
        if (uttaksplan === undefined) {
            return;
        }

        // Planen blir rekna ut på nytt kvar render, så innhaldet – ikkje referansen – avgjer om
        // snapshotet må oppdaterast (t.d. når annen part sine periodar kjem frå eit pending kall).
        const serialisertUttaksplan = JSON.stringify(uttaksplan);
        if (sisteSnapshotRef.current === serialisertUttaksplan) {
            return;
        }

        sisteSnapshotRef.current = serialisertUttaksplan;
        oppdaterOpprinneligUttaksplan(uttaksplan);
    }, [uttaksplan, oppdaterOpprinneligUttaksplan]);

    if (!valgtEksisterendeSaksnr || !gjeldendeVedtak || !sakerQuery?.data) {
        return undefined;
    }

    // uttaksplan er alltid definert når gjeldendeVedtak er definert
    return uttaksplan!;
};
