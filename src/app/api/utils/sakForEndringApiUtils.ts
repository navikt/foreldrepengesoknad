import {
    SakForEndring,
    FamiliehendelsesType,
    Saksperiode,
    PeriodeResultatType,
    Saksgrunnlag
} from '../../types/søknad/SakForEndring';
import { UttaksplanDTO } from '../types/uttaksplanDTO';
import { StønadskontoType, SaksperiodeUtsettelseÅrsakType } from '../../types/uttaksplan/periodetyper';
import { Kjønn } from '../../types/common';
import mapSaksperioderTilUttaksperioder from '../../util/sakForEndring/mapSaksperioderTilUttaksperioder';
import { kanUttaksplanGjennskapesFraSak } from '../../util/sakForEndring/sakForEndringUtils';

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
        const grunnlag: Saksgrunnlag = {
            ...restGrunnlag,
            erBarnetFødt: familieHendelseType !== FamiliehendelsesType.TERM,
            dekningsgrad: dekningsgrad === 100 ? '100' : '80',
            familieHendelseDato: new Date(familieHendelseDato),
            familieHendelseType: familieHendelseType as FamiliehendelsesType,
            søkerKjønn: getKjønn(søkerKjønn),
            annenForelderKjønn: annenForelderKjønn !== undefined ? getKjønn(annenForelderKjønn) : undefined
        };

        const saksperioder = perioder.map((p): Saksperiode => {
            const { periodeResultatType, periode, stønadskontotype, utsettelsePeriodeType, ...periodeRest } = p;
            return {
                ...periodeRest,
                periodeResultatType: periodeResultatType as PeriodeResultatType,
                stønadskontotype: stønadskontotype as StønadskontoType,
                utsettelsePeriodeType: utsettelsePeriodeType as SaksperiodeUtsettelseÅrsakType,
                tidsperiode: {
                    fom: new Date(periode.fom),
                    tom: new Date(periode.tom)
                }
            };
        });

        const uttaksplan = kanUttaksplanGjennskapesFraSak(saksperioder)
            ? mapSaksperioderTilUttaksperioder(saksperioder, grunnlag)
            : undefined;

        const sak: SakForEndring = {
            grunnlag,
            saksperioder,
            uttaksplan
        };

        return sak;
    } catch (e) {
        return undefined;
    }
};
