import {
    SakForEndring,
    SaksgrunnlagFamiliehendelsesType,
    Saksperiode,
    PeriodeResultatType
} from '../../types/søknad/SakForEndring';
import { UttaksplanDTO } from '../types/uttaksplanDTO';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';

export const getSakForEndringFromDTO = (dto: UttaksplanDTO): SakForEndring | undefined => {
    const {
        grunnlag: { dekningsgrad, familieHendelseDato, familieHendelseType, ...restGrunnlag },
        perioder
    } = dto;

    try {
        const sak: SakForEndring = {
            grunnlag: {
                ...restGrunnlag,
                dekningsgrad: dekningsgrad === '100' ? '100' : '80',
                familieHendelseDato: new Date(familieHendelseDato),
                familieHendelseType: familieHendelseType as SaksgrunnlagFamiliehendelsesType
            },
            perioder: perioder.map((p): Saksperiode => {
                const { periodeResultatType, periode, stønadskontotype, ...periodeRest } = p;
                return {
                    ...periodeRest,
                    periodeResultatType: periodeResultatType as PeriodeResultatType,
                    stønadskontotype: stønadskontotype as StønadskontoType,
                    tidsperiode: {
                        fom: new Date(periode.fom),
                        tom: new Date(periode.tom)
                    }
                };
            })
        };
        return sak;
    } catch (e) {
        return undefined;
    }
};
