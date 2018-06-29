import {
    UttaksplanRequiredProps,
    UttaksplanSøker
} from 'uttaksplan/uttak/types';
import { Dekningsgrad } from 'common/types';
import { Permisjonsregler, StønadskontoType } from 'uttaksplan/types';
import { getPermisjonsregler } from './permisjonsregler';
import {
    getAntallUkerTotalt,
    getFørsteMuligePermisjonsdag,
    getSisteMuligePermisjonsdag
} from 'uttaksplan/utils/permisjonUtils';
import { Uttaksdagen } from 'uttaksplan/utils/dataUtils';
import { Kjønn } from 'app/types/common';
import { erFarEllerMedmor } from 'app/util/personUtil';

export interface Uttaksgrunnlag extends UttaksplanRequiredProps {
    dekningsgrad: Dekningsgrad;
    permisjonsregler: Permisjonsregler;
    tilgjengeligeStønadskontoer: StønadskontoType[];
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
        erDeltPermisjon: props.annenForelder !== undefined,
        tilgjengeligeStønadskontoer: getTilgjengeligeStønadskontoer(
            props.søker,
            props.erDeltPermisjon
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

const getTilgjengeligeStønadskontoer = (
    søker: UttaksplanSøker,
    erDeltPermisjon: boolean
): StønadskontoType[] => {
    if (
        søker.kjønn === Kjønn.KVINNE &&
        søker.erAleneOmOmsorg &&
        !erDeltPermisjon
    ) {
        return [StønadskontoType.Foreldrepenger];
    }
    if (erFarEllerMedmor(søker.kjønn, søker.rolle) && !erDeltPermisjon) {
        return [StønadskontoType.Foreldrepenger];
    }
    return [
        StønadskontoType.ForeldrepengerFørFødsel,
        StønadskontoType.Mødrekvote,
        StønadskontoType.Fedrekvote,
        StønadskontoType.Fellesperiode
    ];
};
