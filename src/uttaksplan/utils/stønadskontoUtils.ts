import {
    StønadskontoUttak,
    Dekningsgrad,
    StønadskontoType
} from 'uttaksplan/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import { getAntallUkerFellesperiode } from 'uttaksplan/utils/permisjonUtils';
import Person from 'app/types/Person';
import AnnenForelder from 'app/types/s\u00F8knad/AnnenForelder';
import { Kjønn } from 'app/types/common';
import { Søker } from 'app/types/s\u00F8knad/S\u00F8ker';
import { erFarEllerMedmor } from 'app/util/personUtil';

/** Forutsetter nå kun default som fødsel, ett barn og to foreldre */
export const getStønadskontoerMedUttaksdager = (
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    fødsel: boolean = true,
    aleneomsorg: boolean = false,
    antallBarn: number = 1
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
    bruker: Person,
    søker: Søker,
    annenForelder?: AnnenForelder
): StønadskontoType[] => {
    if (bruker.kjønn === Kjønn.KVINNE && søker.erAleneOmOmsorg) {
        return [
            // StønadskontoType.ForeldrepengerFørFødsel,
            StønadskontoType.Foreldrepenger
        ];
    }
    if (erFarEllerMedmor(bruker.kjønn, søker.rolle)) {
        return [StønadskontoType.Foreldrepenger];
    }
    return [
        StønadskontoType.ForeldrepengerFørFødsel,
        StønadskontoType.Mødrekvote,
        StønadskontoType.Fedrekvote,
        StønadskontoType.Foreldrepenger,
        StønadskontoType.Fellesperiode
    ];
};
