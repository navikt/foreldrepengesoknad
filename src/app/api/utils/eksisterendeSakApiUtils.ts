import {
    EksisterendeSak,
    FamiliehendelsesType,
    Saksperiode,
    PeriodeResultatType,
    Saksgrunnlag
} from '../../types/EksisterendeSak';
import { UttaksplanDTO } from '../types/uttaksplanDTO';
import { StønadskontoType, SaksperiodeUtsettelseÅrsakType } from '../../types/uttaksplan/periodetyper';
import mapSaksperioderTilUttaksperioder from '../../util/eksisterendeSak/mapSaksperioderTilUttaksperioder';
import { kanUttaksplanGjennskapesFraSak } from '../../util/eksisterendeSak/eksisterendeSakUtils';

export const getEksisterendeSakFromDTO = (dto: UttaksplanDTO): EksisterendeSak | undefined => {
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
            familieHendelseType: familieHendelseType as FamiliehendelsesType
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

        const sak: EksisterendeSak = {
            grunnlag,
            saksperioder,
            uttaksplan
        };

        return sak;
    } catch (e) {
        return undefined;
    }
};
