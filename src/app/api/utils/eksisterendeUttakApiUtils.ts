import {
    EksisterendeUttak,
    FamiliehendelsesType,
    EksisterendePeriode,
    PeriodeResultatType,
    Uttaksgrunnlag
} from '../../types/EksisterendeUttak';
import { UttaksplanDTO } from '../types/uttaksplanDTO';
import { StønadskontoType, SaksperiodeUtsettelseÅrsakType } from '../../types/uttaksplan/periodetyper';
// import mapSaksperioderTilUttaksperioder from '../../util/eksisterendeSak/mapSaksperioderTilUttaksperioder';
// import { kanUttaksplanGjennskapesFraSak } from '../../util/eksisterendeSak/eksisterendeSakUtils';

export const getEksisterendeUttakFromDTO = (dto: UttaksplanDTO): EksisterendeUttak | undefined => {
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
        const grunnlag: Uttaksgrunnlag = {
            ...restGrunnlag,
            erBarnetFødt: familieHendelseType !== FamiliehendelsesType.TERM,
            dekningsgrad: dekningsgrad === 100 ? '100' : '80',
            familieHendelseDato: new Date(familieHendelseDato),
            familieHendelseType: familieHendelseType as FamiliehendelsesType
        };

        const uttak = perioder.map((p): EksisterendePeriode => {
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

        const sak: EksisterendeUttak = {
            grunnlag,
            uttak
        };

        return sak;
    } catch (e) {
        return undefined;
    }
};
