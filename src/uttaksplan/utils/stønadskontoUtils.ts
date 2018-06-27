import {
    StønadskontoUttak,
    Dekningsgrad,
    StønadskontoType,
    Permisjonsregler
} from 'uttaksplan/types';
import { getAntallUkerFellesperiode } from 'uttaksplan/utils/permisjonUtils';
import { Kjønn } from 'app/types/common';
import { erFarEllerMedmor } from 'app/util/personUtil';
import { SøkerGrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

/** Forutsetter nå kun default som fødsel, ett barn og to foreldre */
export const getTilgjengeligUttakEnkel = (
    permisjonsregler: Permisjonsregler,
    dekningsgrad: Dekningsgrad
): StønadskontoUttak[] => {
    return [
        {
            konto: StønadskontoType.MorsDelFørTermin,
            dager: permisjonsregler.antallUkerForeldrepengerFørFødsel * 5
        },
        {
            konto: StønadskontoType.MorsDel,
            dager: permisjonsregler.antallUkerMødrekvote * 5
        },
        {
            konto: StønadskontoType.FarsDel,
            dager: permisjonsregler.antallUkerFedrekvote * 5
        },
        {
            konto: StønadskontoType.Fellesperiode,
            dager:
                getAntallUkerFellesperiode(permisjonsregler, dekningsgrad) * 5
        }
    ];
};

export const getTilgjengeligeStønadskontoer = (
    søker: SøkerGrunnlag
): StønadskontoType[] => {
    if (søker.kjønn === Kjønn.KVINNE && søker.erAleneOmOmsorg) {
        return [StønadskontoType.Foreldrepenger];
    }
    if (erFarEllerMedmor(søker.kjønn, søker.rolle)) {
        return [StønadskontoType.Foreldrepenger];
    }
    return [
        StønadskontoType.ForeldrepengerFørFødsel,
        StønadskontoType.Mødrekvote,
        StønadskontoType.Fedrekvote,
        StønadskontoType.Fellesperiode
    ];
};
