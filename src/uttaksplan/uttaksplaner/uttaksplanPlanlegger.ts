import {
    Permisjonsregler,
    Uttaksperiode,
    StønadskontoType,
    Periodetype,
    Dekningsgrad
} from 'uttaksplan/types';
import { Tidsperiode } from 'nav-datovelger';
import {
    sorterPerioder,
    Uttaksdagen,
    getTidsperiode
} from 'uttaksplan/utils/dataUtils';
import { getPermisjonStartdato } from 'uttaksplan/utils/permisjonUtils';
import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';

const UTTAKSDAGER_I_UKE = 5;

function getMødrekvoteFørTermin(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    return getTidsperiode(
        getPermisjonStartdato(termindato, permisjonsregler),
        permisjonsregler.antallUkerForeldrepengerFørFødsel * UTTAKSDAGER_I_UKE
    );
}

export function getPakrevdMødrekvoteEtterTermin(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    return getTidsperiode(
        Uttaksdagen(termindato).denneEllerNeste(),
        permisjonsregler.antallUkerMødrekvoteEtterFødsel * UTTAKSDAGER_I_UKE
    );
}

function getFrivilligMødrekvoteEtterTermin(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    const startdato = Uttaksdagen(
        getPakrevdMødrekvoteEtterTermin(termindato, permisjonsregler).sluttdato
    ).neste();
    return getTidsperiode(
        startdato,
        (permisjonsregler.antallUkerMødrekvote -
            permisjonsregler.antallUkerMødrekvoteEtterFødsel) *
            UTTAKSDAGER_I_UKE
    );
}

function getFellesperiodeForelder1(
    termindato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number
): Tidsperiode {
    const startdato = Uttaksdagen(
        getFrivilligMødrekvoteEtterTermin(termindato, permisjonsregler)
            .sluttdato
    ).neste();
    return getTidsperiode(startdato, fellesukerForelder1 * UTTAKSDAGER_I_UKE);
}

function getFellesperiodeForelder2(
    termindato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number,
    fellesukerForelder2: number
): Tidsperiode {
    const startdato = Uttaksdagen(
        fellesukerForelder1 === 0
            ? getFrivilligMødrekvoteEtterTermin(termindato, permisjonsregler)
                  .sluttdato
            : getFellesperiodeForelder1(
                  termindato,
                  permisjonsregler,
                  fellesukerForelder1
              ).sluttdato
    ).neste();
    return getTidsperiode(startdato, fellesukerForelder2 * UTTAKSDAGER_I_UKE);
}

function getFedrekvote(
    termindato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number,
    fellesukerForelder2: number
): Tidsperiode {
    const startdato = Uttaksdagen(
        fellesukerForelder2 === 0
            ? getFellesperiodeForelder1(
                  termindato,
                  permisjonsregler,
                  fellesukerForelder1
              ).sluttdato
            : getFellesperiodeForelder2(
                  termindato,
                  permisjonsregler,
                  fellesukerForelder1,
                  fellesukerForelder2
              ).sluttdato
    ).neste();
    return getTidsperiode(
        startdato,
        permisjonsregler.antallUkerFedrekvote * UTTAKSDAGER_I_UKE
    );
}

/** Oppretter default stønadsperioder ut fra termindato ++ */
export function opprettUttaksperioder(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    fellesukerForelder1: number,
    fellesukerForelder2: number,
    permisjonsregler: Permisjonsregler
): Uttaksperiode[] {
    termindato = normaliserDato(termindato);
    const perioder: Uttaksperiode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: getMødrekvoteFørTermin(termindato, permisjonsregler),
            låstForelder: true
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getPakrevdMødrekvoteEtterTermin(
                termindato,
                permisjonsregler
            )
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getFrivilligMødrekvoteEtterTermin(
                termindato,
                permisjonsregler
            )
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder2',
            konto: StønadskontoType.Fedrekvote,
            tidsperiode: getFedrekvote(
                termindato,
                permisjonsregler,
                fellesukerForelder1,
                fellesukerForelder2
            )
        }
    ];
    if (fellesukerForelder1 > 0) {
        perioder.push({
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: getFellesperiodeForelder1(
                termindato,
                permisjonsregler,
                fellesukerForelder1
            )
        });
    }
    if (fellesukerForelder2 > 0) {
        perioder.push({
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder2',
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: getFellesperiodeForelder2(
                termindato,
                permisjonsregler,
                fellesukerForelder1,
                fellesukerForelder2
            )
        });
    }
    return perioder.sort(sorterPerioder);
}
