import { useQuery } from '@tanstack/react-query';
import { useUttaksplanOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useValgtSak } from 'appData/useValgtSak';
import { useEffect, useMemo } from 'react';
import { annenPartHarVedtak } from 'utils/annenForelderUtils';

import { FpSak_fpoversikt, UttakPeriodeDto_fpoversikt } from '@navikt/fp-types';

export const useTidligereUttaksplan = (
    erEndringssøknad = false,
    eksisterendeSak?: FpSak_fpoversikt,
): {
    perioder: UttakPeriodeDto_fpoversikt[] | undefined;
    isLoading: boolean;
} => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const opprinneligUttaksplan = useContextGetData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);
    const gjeldendePlan = useContextGetData(ContextDataType.UTTAKSPLAN);
    const oppdaterOpprinneligUttaksplan = useContextSaveData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);

    const { erNySøknadPåEksisterendeSak, isLoading: lasterSak } = useValgtSak(eksisterendeSak);
    const skalBevareGjenbruktPlan = erNySøknadPåEksisterendeSak && !erEndringssøknad;
    const uttaksplanQuery = useQuery(useUttaksplanOptions());

    const uttaksplan = uttaksplanQuery.data;
    const perioder = useMemo(() => {
        if (valgtEksisterendeSaksnr !== undefined) {
            if (lasterSak && !erEndringssøknad) {
                return;
            }
            if (!skalBevareGjenbruktPlan) {
                return uttaksplan?.perioder;
            }
        }
        if (
            gjeldendePlan !== undefined &&
            valgtEksisterendeSaksnr !== undefined &&
            opprinneligUttaksplan?.saksnummer === valgtEksisterendeSaksnr &&
            opprinneligUttaksplan.perioder.length > 0
        ) {
            return opprinneligUttaksplan.perioder;
        }
        if (!annenPartHarVedtak(uttaksplan)) {
            return;
        }
        return uttaksplan.perioder.flatMap(({ fom, tom, annenPart }) => (annenPart ? [{ fom, tom, annenPart }] : []));
    }, [
        uttaksplan,
        valgtEksisterendeSaksnr,
        lasterSak,
        erEndringssøknad,
        skalBevareGjenbruktPlan,
        opprinneligUttaksplan,
        gjeldendePlan,
    ]);
    const tidligerePerioder = perioder && perioder.length > 0 ? perioder : undefined;

    useEffect(() => {
        if (skalBevareGjenbruktPlan && gjeldendePlan === undefined && opprinneligUttaksplan) {
            oppdaterOpprinneligUttaksplan(undefined);
            return;
        }

        const harSnapshotForValgtSak = opprinneligUttaksplan?.saksnummer === valgtEksisterendeSaksnr;

        if (
            skalBevareGjenbruktPlan ||
            valgtEksisterendeSaksnr === undefined ||
            perioder === undefined ||
            harSnapshotForValgtSak ||
            uttaksplanQuery.isFetching
        ) {
            return;
        }

        oppdaterOpprinneligUttaksplan({
            saksnummer: valgtEksisterendeSaksnr,
            perioder,
        });
    }, [
        uttaksplanQuery.isFetching,
        valgtEksisterendeSaksnr,
        perioder,
        opprinneligUttaksplan,
        oppdaterOpprinneligUttaksplan,
        skalBevareGjenbruktPlan,
        gjeldendePlan,
    ]);

    return { perioder: tidligerePerioder, isLoading: uttaksplanQuery.isLoading || (!erEndringssøknad && lasterSak) };
};
