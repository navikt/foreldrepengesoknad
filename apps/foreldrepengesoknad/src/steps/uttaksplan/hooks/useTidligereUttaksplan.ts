import { useQuery } from '@tanstack/react-query';
import { useUttaksplanOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useValgtSak } from 'appData/useValgtSak';
import { useEffect, useMemo } from 'react';
import { finnAnnenPartsPlanSomPasserSøknaden } from 'utils/annenForelderUtils';
import { erFødtForMerEnnTreMånederSiden, getFamiliehendelsedato } from 'utils/barnUtils';

import { FpSak_fpoversikt, UttakPeriodeDto } from '@navikt/fp-types';

import { OppstartValg } from '../../../types/Fordeling';
import { tilpassFødselspermisjon } from './tilpassFødselspermisjon';

export const useTidligereUttaksplan = ({
    erEndringssøknad = false,
    eksisterendeSak,
}: { erEndringssøknad?: boolean; eksisterendeSak?: FpSak_fpoversikt } = {}): {
    perioder: UttakPeriodeDto[] | undefined;
    erAnnenPartRedigerbar: boolean;
    kreverManuellTilpasning: boolean;
    isLoading: boolean;
} => {
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const opprinneligUttaksplan = useContextGetData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);
    const gjeldendePlan = useContextGetData(ContextDataType.UTTAKSPLAN);
    const dekningsgrad = useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);
    const barn = useContextGetData(ContextDataType.OM_BARNET);
    const søkersituasjon = useContextGetData(ContextDataType.SØKERSITUASJON);
    const fordeling = useContextGetData(ContextDataType.FORDELING);
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
        const annenPartsPlan =
            annenForelder && barn
                ? finnAnnenPartsPlanSomPasserSøknaden(uttaksplan, { dekningsgrad, annenForelder, barn })
                : undefined;
        if (!annenPartsPlan) {
            return;
        }
        const medSøkersPerioder = valgtEksisterendeSaksnr === undefined;
        return annenPartsPlan.perioder.flatMap(({ fom, tom, søker, annenPart }) => {
            const søkersUttak = medSøkersPerioder ? søker : undefined;
            if (!søkersUttak && !annenPart) {
                return [];
            }
            return { fom, tom, ...(søkersUttak && { søker: søkersUttak }), ...(annenPart && { annenPart }) };
        });
    }, [
        uttaksplan,
        valgtEksisterendeSaksnr,
        lasterSak,
        erEndringssøknad,
        skalBevareGjenbruktPlan,
        opprinneligUttaksplan,
        gjeldendePlan,
        dekningsgrad,
        annenForelder,
        barn,
    ]);
    const tilpasning = useMemo(() => {
        if (
            !perioder ||
            !barn ||
            !fordeling ||
            valgtEksisterendeSaksnr !== undefined ||
            gjeldendePlan !== undefined ||
            søkersituasjon?.situasjon !== 'fødsel' ||
            (søkersituasjon.rolle !== 'far' && søkersituasjon.rolle !== 'medmor') ||
            erFødtForMerEnnTreMånederSiden(barn) ||
            (fordeling.oppstartAvForeldrepengerValg !== OppstartValg.FAMILIEHENDELSESDATO &&
                fordeling.oppstartAvForeldrepengerValg !== OppstartValg.IKKE_VED_FØDSEL)
        ) {
            return { perioder, kreverManuellTilpasning: false };
        }
        return tilpassFødselspermisjon(
            perioder,
            getFamiliehendelsedato(barn),
            fordeling.oppstartAvForeldrepengerValg === OppstartValg.FAMILIEHENDELSESDATO,
            uttaksplan?.annenPartRedigerbar === true,
        );
    }, [perioder, valgtEksisterendeSaksnr, gjeldendePlan, søkersituasjon, barn, fordeling, uttaksplan]);
    const tidligerePerioder = tilpasning.perioder && tilpasning.perioder.length > 0 ? tilpasning.perioder : undefined;

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

    return {
        perioder: tidligerePerioder,
        kreverManuellTilpasning: tilpasning.kreverManuellTilpasning,
        // Backend avgjer om annen part sine periodar kan endrast (t.d. ikkje når annen part har søkt eller fått vedtak).
        erAnnenPartRedigerbar: uttaksplan?.annenPartRedigerbar ?? true,
        isLoading: uttaksplanQuery.isLoading || (!erEndringssøknad && lasterSak),
    };
};
