import {
    StønadskontoUttak,
    Dekningsgrad,
    StønadskontoType
} from 'uttaksplan/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import { getAntallUkerFellesperiode } from 'uttaksplan/utils/permisjonUtils';
import { Kjønn } from 'app/types/common';
import { erFarEllerMedmor } from 'app/util/personUtil';
import { SøkerGrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

/** Forutsetter nå kun default som fødsel, ett barn og to foreldre */
export const getStønadskontoerMedUttaksdager = (
    termindato: Date,
    dekningsgrad: Dekningsgrad
): StønadskontoUttak => {
    const permisjonsregler = getPermisjonsregler(termindato);

    const dager: StønadskontoUttak = new Map();
    dager.set(
        StønadskontoType.ForeldrepengerFørFødsel,
        permisjonsregler.antallUkerForeldrepengerFørFødsel
    );
    dager.set(
        StønadskontoType.Mødrekvote,
        permisjonsregler.antallUkerMødrekvote +
            permisjonsregler.antallUkerMødrekvoteEtterFødsel
    );
    dager.set(
        StønadskontoType.Fedrekvote,
        permisjonsregler.antallUkerFedrekvote
    );
    dager.set(
        StønadskontoType.Fellesperiode,
        getAntallUkerFellesperiode(permisjonsregler, dekningsgrad)
    );

    return dager;
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
        StønadskontoType.Mødrekvote,
        StønadskontoType.Fedrekvote,
        StønadskontoType.Fellesperiode
    ];
};
