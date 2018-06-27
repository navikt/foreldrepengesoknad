import {
    Uttaksgrunnlag,
    SøkerGrunnlag,
    AnnenForelderGrunnlag,
    Uttaksdatoer
} from 'uttaksplan/types/uttaksgrunnlag';
import { Dekningsgrad } from 'common/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import {
    getTilgjengeligeStønadskontoer,
    getTilgjengeligUttak
} from 'uttaksplan/utils/st\u00F8nadskontoUtils';
import {
    getAntallUkerTotalt,
    getSisteMuligePermisjonsdag,
    getFørsteMuligePermisjonsdag
} from 'uttaksplan/utils/permisjonUtils';
import { Uttaksdagen } from 'uttaksplan/utils/dataUtils';

export function getUttaksgrunnlag(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    søker: SøkerGrunnlag,
    antallBarn: number,
    annenForelder?: AnnenForelderGrunnlag
): Uttaksgrunnlag {
    const permisjonsregler = getPermisjonsregler(termindato);

    return {
        søker,
        annenForelder,
        antallBarn,
        permisjonsregler,
        tilgjengeligeStønadskontoer: getTilgjengeligeStønadskontoer(søker),
        tilgjengeligeUttak: getTilgjengeligUttak(
            permisjonsregler,
            dekningsgrad
        ),
        tilgjengeligeUttaksdager:
            getAntallUkerTotalt(permisjonsregler, dekningsgrad) * 5
    };
}

export function getUttaksdatoer(termindato: Date): Uttaksdatoer {
    const permisjonsregler = getPermisjonsregler(termindato);
    return {
        termindato,
        førsteMuligeUttaksdag: getFørsteMuligePermisjonsdag(
            termindato,
            permisjonsregler
        ),
        sisteMuligeUttaksdag: getSisteMuligePermisjonsdag(
            termindato,
            permisjonsregler
        ),
        sisteUttaksdagFørFødsel: Uttaksdagen(termindato).forrige(),
        førsteUttaksdagEtterFødsel: Uttaksdagen(termindato).denneEllerNeste()
    };
}
