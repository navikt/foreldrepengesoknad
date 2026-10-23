import { useQuery } from '@tanstack/react-query';
import {
    getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter,
    getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter,
} from 'api/getStønadskvoteParams';
import { useUttaksplanOptions } from 'api/queries';
import { useEffect } from 'react';
import { finnAnnenPartsPlan } from 'utils/annenForelderUtils';
import { getTermindato } from 'utils/barnUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import { isFødtBarn } from '@navikt/fp-types';

import { ContextDataType, useContextGetData, useContextSaveData } from './FpDataContext';
import { useResetUttaksplanData } from './useResetUttaksplanData';

export const useSamordneBarnMedAnnenPart = (enabled: boolean) => {
    const barn = useContextGetData(ContextDataType.OM_BARNET);
    const søkersituasjon = useContextGetData(ContextDataType.SØKERSITUASJON);
    const kommerFraPlanlegger = useContextGetData(ContextDataType.KOMMER_FRA_PLANLEGGER);
    const oppdaterBarn = useContextSaveData(ContextDataType.OM_BARNET);
    const resetUttaksplanData = useResetUttaksplanData();
    const skalSamordne = enabled && !kommerFraPlanlegger && !!søkersituasjon && isFarEllerMedmor(søkersituasjon.rolle);
    const uttaksplanQuery = useQuery(useUttaksplanOptions());
    const annenPartsPlan = finnAnnenPartsPlan(uttaksplanQuery.data);
    const antallBarn = barn
        ? getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(skalSamordne, barn.antallBarn, annenPartsPlan?.antallBarn)
        : undefined;
    const termindato = barn
        ? getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter(skalSamordne, getTermindato(barn), annenPartsPlan?.termindato)
        : undefined;
    const skalOppdatereBarn =
        skalSamordne &&
        !!barn &&
        (barn.antallBarn !== antallBarn || (isFødtBarn(barn) && !!termindato && barn.termindato !== termindato));

    useEffect(() => {
        if (!skalOppdatereBarn || !barn || antallBarn === undefined) {
            return;
        }
        oppdaterBarn({
            ...barn,
            antallBarn,
            ...(termindato && isFødtBarn(barn) && { termindato }),
        });
        resetUttaksplanData();
    }, [skalOppdatereBarn, barn, antallBarn, termindato, oppdaterBarn, resetUttaksplanData]);

    return skalOppdatereBarn || (skalSamordne && uttaksplanQuery.isLoading);
};
