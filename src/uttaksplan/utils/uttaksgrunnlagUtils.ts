import {
    Uttaksgrunnlag,
    SøkerGrunnlag,
    AnnenForelderGrunnlag
} from 'uttaksplan/types/uttaksgrunnlag';
import { Dekningsgrad } from 'common/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import { getTilgjengeligeStønadskontoer } from 'uttaksplan/utils/st\u00F8nadskontoUtils';

export function getUttaksgrunnlag(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    søker: SøkerGrunnlag,
    annenForelder: AnnenForelderGrunnlag,
    antallBarn: number
): Uttaksgrunnlag {
    const permisjonsregler = getPermisjonsregler(termindato);

    return {
        søker,
        annenForelder,
        antallBarn,
        permisjonsregler,
        tilgjengeligeStønadskontoer: getTilgjengeligeStønadskontoer(søker)
    };
}
