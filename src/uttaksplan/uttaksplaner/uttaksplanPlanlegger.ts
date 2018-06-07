import {
    Permisjonsregler,
    Uttaksperiode,
    Dekningsgrad,
    StønadskontoType,
    Periodetype
} from 'uttaksplan/types';
import { Tidsperiode } from 'nav-datovelger';
import { sorterPerioder } from 'uttaksplan/utils/periodeUtils';
import { getPermisjonStartdato } from 'uttaksplan/utils/permisjonUtils';
import { uttaksdagUtil } from 'uttaksplan/utils/uttaksdagerUtils';
import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';

const UTTAKSDAGER_I_UKE = 5;

function getMødrekvoteFørTermin(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    const startdato = getPermisjonStartdato(termindato, permisjonsregler);
    return {
        startdato,
        sluttdato: uttaksdagUtil(startdato).periodeslutt(
            permisjonsregler.antallUkerForelder1FørFødsel * UTTAKSDAGER_I_UKE
        )
    };
}

export function getPakrevdMødrekvoteEtterTermin(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    return {
        startdato: termindato,
        sluttdato: uttaksdagUtil(termindato).periodeslutt(
            permisjonsregler.antallUkerForelder1EtterFødsel * UTTAKSDAGER_I_UKE
        )
    };
}

function getFrivilligMødrekvoteEtterTermin(
    termindato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    const startdato = uttaksdagUtil(
        getPakrevdMødrekvoteEtterTermin(termindato, permisjonsregler).sluttdato
    ).neste();
    return {
        startdato,
        sluttdato: uttaksdagUtil(startdato).periodeslutt(
            (permisjonsregler.antallUkerMødrekvote -
                permisjonsregler.antallUkerForelder1EtterFødsel) *
                UTTAKSDAGER_I_UKE
        )
    };
}

function getFellesperiodeForelder1(
    termindato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number
): Tidsperiode {
    const startdato = uttaksdagUtil(
        getFrivilligMødrekvoteEtterTermin(termindato, permisjonsregler)
            .sluttdato
    ).neste();
    return {
        startdato,
        sluttdato: uttaksdagUtil(startdato).periodeslutt(
            fellesukerForelder1 * UTTAKSDAGER_I_UKE
        )
    };
}

function getFellesperiodeForelder2(
    termindato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number,
    fellesukerForelder2: number
): Tidsperiode {
    const startdato = uttaksdagUtil(
        fellesukerForelder1 === 0
            ? getFrivilligMødrekvoteEtterTermin(termindato, permisjonsregler)
                  .sluttdato
            : getFellesperiodeForelder1(
                  termindato,
                  permisjonsregler,
                  fellesukerForelder1
              ).sluttdato
    ).neste();
    return {
        startdato,
        sluttdato: uttaksdagUtil(startdato).periodeslutt(
            fellesukerForelder2 * UTTAKSDAGER_I_UKE
        )
    };
}

function getFedrekvote(
    termindato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number,
    fellesukerForelder2: number
): Tidsperiode {
    const startdato = uttaksdagUtil(
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
    return {
        startdato,
        sluttdato: uttaksdagUtil(startdato).periodeslutt(
            permisjonsregler.antallUkerFedrekvote * UTTAKSDAGER_I_UKE
        )
    };
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
            låstForelder: true,
            låstPeriode: true
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getPakrevdMødrekvoteEtterTermin(
                termindato,
                permisjonsregler
            ),
            låstForelder: true,
            låstPeriode: true
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
