import { useQuery } from '@tanstack/react-query';
import { useUttaksplanOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useEffect } from 'react';

import { PeriodeDto_fpoversikt } from '@navikt/fp-types';

/**
 * Hentar den felles uttaksplanen (søkjar og annan part) frå fp-oversikt. Ved endringssøknad blir
 * planen i tillegg lagra som opprinneleg plan, slik at ein kan sjå kva søkjar har endra.
 */
export const useTidligereUttaksplan = (): { perioder: PeriodeDto_fpoversikt[] | undefined; isLoading: boolean } => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const opprinneligUttaksplan = useContextGetData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);
    const oppdaterOpprinneligUttaksplan = useContextSaveData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);

    const uttaksplanQuery = useQuery(useUttaksplanOptions());

    const perioder = uttaksplanQuery.data?.perioder;
    const tidligerePerioder = perioder && perioder.length > 0 ? perioder : undefined;

    useEffect(() => {
        const harSnapshotForValgtSak = opprinneligUttaksplan?.saksnummer === valgtEksisterendeSaksnr;

        if (
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
    ]);

    return { perioder: tidligerePerioder, isLoading: uttaksplanQuery.isLoading };
};
