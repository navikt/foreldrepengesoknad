import {
    Uttaksgrunnlag,
    Uttaksdatoer,
    UttaksplanAppProps
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
    props: UttaksplanAppProps,
    dekningsgrad: Dekningsgrad
): Uttaksgrunnlag {
    const permisjonsregler = getPermisjonsregler(props.termindato);
    return {
        ...props,
        dekningsgrad,
        permisjonsregler,
        tilgjengeligeStønadskontoer: getTilgjengeligeStønadskontoer(
            props.søker
        ),
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
