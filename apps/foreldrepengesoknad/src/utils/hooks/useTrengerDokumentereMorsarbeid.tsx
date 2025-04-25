// apps/foreldrepengesoknad/src/hooks/useTrengerDokumentereMorsArbeid.ts
import { useQuery } from '@tanstack/react-query';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { DokumentereMorsArbeidParams, trengerDokumentereMorsArbeidOptions } from 'appData/api';

import { Barn, Periode, isAnnenForelderOppgitt, isHarMorsAktivitet } from '@navikt/fp-common';
import { isFødtBarn } from '@navikt/fp-types';
import { getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

const getDokumentereMorsArbeidParams = (
    uttaksplan: Periode[],
    barn: Barn,
    annenPartFødselsnummer?: string,
): DokumentereMorsArbeidParams | undefined => {
    if (!annenPartFødselsnummer) {
        return undefined;
    }

    const perioderMedAktivitetskrav = uttaksplan.filter(isHarMorsAktivitet);

    const barnFødselsnummer =
        isFødtBarn(barn) && barn.fnr !== undefined && barn.fnr.length > 0 ? barn.fnr[0] : undefined;

    return {
        annenPartFødselsnummer,
        barnFødselsnummer,
        familiehendelse: getFamiliehendelsedato(barn),
        perioder: perioderMedAktivitetskrav.map((p) => ({
            fom: p.tidsperiode.fom.toISOString(),
            tom: p.tidsperiode.tom.toISOString(),
        })),
    };
};

export const useTrengerDokumentereMorsArbeid = () => {
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const annenPartFødselsnummer =
        annenForelder && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fnr : undefined;
    const dokumentereMorsArbeidParams = getDokumentereMorsArbeidParams(uttaksplan, barn, annenPartFødselsnummer);

    // fallback-konfigurasjon når params er undefined
    const queryOptions = dokumentereMorsArbeidParams
        ? trengerDokumentereMorsArbeidOptions(dokumentereMorsArbeidParams)
        : { queryKey: ['trengerDokumentereMorsArbeid'], enabled: false };

    const { data: trengerDokumentereMorsArbeid = true } = useQuery(queryOptions);

    return trengerDokumentereMorsArbeid;
};
