import { UttaksplanRequiredProps, UttaksplanSøker, Permisjonsregler, StønadskontoType } from 'uttaksplan/types';
import { Dekningsgrad } from 'common/types';

import { getPermisjonsregler } from '../regler/permisjonsregler';
import { Uttaksdagen } from 'uttaksplan/utils';
import { Kjønn } from 'app/types/common';
import { erFarEllerMedmor } from 'app/util/domain/personUtil';
import { addYears } from 'date-fns';
import { getAntallUkerTotalt } from 'uttaksplan/utils/permisjonUtils';

export interface Uttaksgrunnlag extends UttaksplanRequiredProps {
    dekningsgrad: Dekningsgrad;
    permisjonsregler: Permisjonsregler;
    tilgjengeligeStønadskontoer: StønadskontoType[];
    antallUttaksdagerTotalt: number;
    antallUkerTotalt: number;
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

export function getUttaksgrunnlag(props: UttaksplanRequiredProps, dekningsgrad: Dekningsgrad): Uttaksgrunnlag {
    const permisjonsregler = getPermisjonsregler();
    return {
        ...props,
        dekningsgrad,
        permisjonsregler,
        erDeltPermisjon: props.annenForelder !== undefined,
        tilgjengeligeStønadskontoer: getTilgjengeligeStønadskontoer(props.søker, props.erDeltPermisjon),
        antallUttaksdagerTotalt: getAntallUkerTotalt(permisjonsregler, dekningsgrad) * 5,
        antallUkerTotalt: getAntallUkerTotalt(permisjonsregler, dekningsgrad),
        datoer: {
            førsteMuligeUttaksdag: getFørsteMuligePermisjonsdag(props.familiehendelsedato, permisjonsregler),
            sisteMuligeUttaksdag: getSisteMuligePermisjonsdag(props.familiehendelsedato, permisjonsregler),
            sisteUttaksdagFørFødsel: Uttaksdagen(props.familiehendelsedato).forrige(),
            førsteUttaksdagEtterFødsel: Uttaksdagen(props.familiehendelsedato).denneEllerNeste()
        }
    };
}

const getTilgjengeligeStønadskontoer = (søker: UttaksplanSøker, erDeltPermisjon: boolean): StønadskontoType[] => {
    if (søker.kjønn === Kjønn.KVINNE && søker.erAleneOmOmsorg && !erDeltPermisjon) {
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

/**
 * Finner absolutt siste permisjonsdag
 * @param familiehendelsedato
 * @param permisjonsregler
 */
function getSisteMuligePermisjonsdag(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Date {
    return Uttaksdagen(addYears(familiehendelsedato, permisjonsregler.maksPermisjonslengdeIÅr)).denneEllerNeste();
}

/**
 * Finner default startdato før termin (antallUkerForeldrepengerFørFødsel)
 * @param familiehendelsedato
 * @param permisjonsregler
 */
function getFørsteMuligePermisjonsdag(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Date {
    return Uttaksdagen(
        familiehendelsedato // Siste uttaksdag i denne perioden er dagen før termin
    ).trekkFra(permisjonsregler.maksAntallUkerForeldrepengerFørFødsel * 5);
}
