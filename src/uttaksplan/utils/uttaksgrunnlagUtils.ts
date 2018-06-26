import {
    Uttaksgrunnlag,
    SøkerGrunnlag,
    AnnenForelderGrunnlag,
    Uttaksdatoer,
    Uttaksinfo
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
    getPermisjonStartdato
} from 'uttaksplan/utils/permisjonUtils';
import { uttaksdagen, perioden, periodene } from 'uttaksplan/utils/dataUtils';
import { Periode } from 'uttaksplan/types';

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
        førsteMuligeUttaksdag: getPermisjonStartdato(
            termindato,
            permisjonsregler
        ),
        sisteMuligeUttaksdag: getSisteMuligePermisjonsdag(
            termindato,
            permisjonsregler
        ),
        sisteUttaksdagFørFødsel: uttaksdagen(termindato).forrige(),
        førsteUttaksdagEtterFødsel: uttaksdagen(termindato).denneEllerNeste()
    };
}

export function getUttaksinfo(perioder: Periode[]): Uttaksinfo {
    // const periodene = Periodene(perioder);
    return {
        førsteRegistrerteUttaksdag: undefined,
        antallDagerUtsettelser: undefined,
        antallDagerOpphold: periodene(perioder).getAntallDagerOpphold(),
        antallDagerUttak: periodene
    };
}
