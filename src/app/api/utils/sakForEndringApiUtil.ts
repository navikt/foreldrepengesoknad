import {
    SakForEndring,
    FamiliehendelsesType,
    Saksperiode,
    PeriodeResultatType
} from '../../types/søknad/SakForEndring';
import { UttaksplanDTO } from '../types/uttaksplanDTO';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { Kjønn } from '../../types/common';

const getKjønn = (kjønn: string): Kjønn => {
    return kjønn === 'M' ? Kjønn.MANN : Kjønn.KVINNE;
};

export const getSakForEndringFromDTO = (dto: UttaksplanDTO): SakForEndring | undefined => {
    const {
        grunnlag: {
            dekningsgrad,
            familieHendelseDato,
            familieHendelseType,
            søkerKjønn,
            annenForelderKjønn,
            ...restGrunnlag
        },
        perioder
    } = dto;

    try {
        const sak: SakForEndring = {
            grunnlag: {
                ...restGrunnlag,
                erBarnetFødt: familieHendelseType !== FamiliehendelsesType.TERM,
                dekningsgrad: dekningsgrad === '100' ? '100' : '80',
                familieHendelseDato: new Date(familieHendelseDato),
                familieHendelseType: familieHendelseType as FamiliehendelsesType,
                søkerKjønn: getKjønn(søkerKjønn),
                annenForelderKjønn: annenForelderKjønn !== undefined ? getKjønn(annenForelderKjønn) : undefined
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
