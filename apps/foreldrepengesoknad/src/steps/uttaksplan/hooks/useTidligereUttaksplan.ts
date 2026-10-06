import { useQuery } from '@tanstack/react-query';
import { useUttaksplanOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useEffect, useMemo } from 'react';
import { annenPartHarVedtak } from 'utils/annenForelderUtils';

import { UttakPeriodeDto_fpoversikt } from '@navikt/fp-types';

/**
 * Hentar den felles uttaksplanen (søkjar og annan part) frå fp-oversikt. Ved endringssøknad blir
 * planen i tillegg lagra som opprinneleg plan, slik at ein kan sjå kva søkjar har endra.
 * Utan valt eksisterande sak blir berre annan part sitt vedtak brukt, som før med /annenPart.
 * Søkjaren sine eigne periodar, EØS-periodane frå søkjaren si sak og periodar utan resultat (lagra
 * plan for annan part eller annan part sin ubehandla søknad) skal ikkje styre ein ny søknad.
 */
export const useTidligereUttaksplan = (): {
    perioder: UttakPeriodeDto_fpoversikt[] | undefined;
    isLoading: boolean;
} => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const opprinneligUttaksplan = useContextGetData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);
    const oppdaterOpprinneligUttaksplan = useContextSaveData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);

    const uttaksplanQuery = useQuery(useUttaksplanOptions());

    const uttaksplan = uttaksplanQuery.data;
    const perioder = useMemo(() => {
        if (valgtEksisterendeSaksnr !== undefined) {
            return uttaksplan?.perioder;
        }
        if (!annenPartHarVedtak(uttaksplan)) {
            return;
        }
        return uttaksplan.perioder.flatMap(({ fom, tom, annenPart }) => (annenPart ? [{ fom, tom, annenPart }] : []));
    }, [uttaksplan, valgtEksisterendeSaksnr]);
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
