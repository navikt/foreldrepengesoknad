import {
    StønadskontoUttak,
    Dekningsgrad,
    StønadskontoType
} from 'uttaksplan/types';
import { getPermisjonsregler } from 'uttaksplan/data/permisjonsregler';
import { getAntallUkerFellesperiode } from 'uttaksplan/utils/permisjonUtils';

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
