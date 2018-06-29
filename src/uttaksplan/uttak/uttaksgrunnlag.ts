import { UttaksplanRequiredProps } from 'uttaksplan/uttak/types';
import { Dekningsgrad } from 'common/types';
import {
    Permisjonsregler,
    StønadskontoType,
    StønadskontoUttak
} from 'uttaksplan/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import { getErDeltPermisjon } from 'uttaksplan/utils/uttaksgrunnlagUtils';
import {
    getTilgjengeligeStønadskontoer,
    getTilgjengeligUttakEnkel
} from 'uttaksplan/utils/st\u00F8nadskontoUtils';
import {
    getAntallUkerTotalt,
    getFørsteMuligePermisjonsdag,
    getSisteMuligePermisjonsdag
} from 'uttaksplan/utils/permisjonUtils';
import { Uttaksdagen } from 'uttaksplan/utils/dataUtils';

export interface Uttaksgrunnlag extends UttaksplanRequiredProps {
    dekningsgrad: Dekningsgrad;
    permisjonsregler: Permisjonsregler;
    tilgjengeligeStønadskontoer: StønadskontoType[];
    tilgjengeligeUttak: StønadskontoUttak[];
    antallUttaksdagerTilgjengelig: number;
    datoer: {
        /** Siste mulige uttaksdag gitt fødsel/termin */
        førsteMuligeUttaksdag: Date;
        /** Siste mulige uttaksdag gitt fødsel/termin */
        sisteMuligeUttaksdag: Date;
        /** Siste uttaksdag som er før fødsel/termin */
        sisteUttaksdagFørFødsel: Date;
        /** Første uttaksdag på/etter fødsel/termin */
        førsteUttaksdagEtterFødsel: Date;
    };
}

export function getUttaksgrunnlag(
    props: UttaksplanRequiredProps,
    dekningsgrad: Dekningsgrad
): Uttaksgrunnlag {
    const permisjonsregler = getPermisjonsregler(props.termindato);
    return {
        ...props,
        dekningsgrad,
        permisjonsregler,
        erDeltPermisjon: getErDeltPermisjon(props),
        tilgjengeligeStønadskontoer: getTilgjengeligeStønadskontoer(
            props.søker,
            props.erDeltPermisjon
        ),
        tilgjengeligeUttak: getTilgjengeligUttakEnkel(
            permisjonsregler,
            dekningsgrad
        ),
        antallUttaksdagerTilgjengelig:
            getAntallUkerTotalt(permisjonsregler, dekningsgrad) * 5,
        datoer: {
            førsteMuligeUttaksdag: getFørsteMuligePermisjonsdag(
                props.termindato,
                permisjonsregler
            ),
            sisteMuligeUttaksdag: getSisteMuligePermisjonsdag(
                props.termindato,
                permisjonsregler
            ),
            sisteUttaksdagFørFødsel: Uttaksdagen(props.termindato).forrige(),
            førsteUttaksdagEtterFødsel: Uttaksdagen(
                props.termindato
            ).denneEllerNeste()
        }
    };
}
