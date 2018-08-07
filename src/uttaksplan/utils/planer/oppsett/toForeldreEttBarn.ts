import {
    Permisjonsregler,
    Uttaksperiode,
    StønadskontoType,
    Periodetype,
    Dekningsgrad,
    Tidsperiode
} from 'uttaksplan/types';
import { sorterPerioder, Uttaksdagen, getTidsperiode } from 'uttaksplan/utils';
import { getPermisjonStartdato } from 'uttaksplan/utils/permisjonUtils';
import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';

const UTTAKSDAGER_I_UKE = 5;

function getMødrekvoteFørTermin(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    return getTidsperiode(
        getPermisjonStartdato(familiehendelsedato, permisjonsregler),
        permisjonsregler.antallUkerForeldrepengerFørFødsel * UTTAKSDAGER_I_UKE
    );
}

export function getPakrevdMødrekvoteEtterTermin(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    return getTidsperiode(
        Uttaksdagen(familiehendelsedato).denneEllerNeste(),
        permisjonsregler.antallUkerMødrekvoteEtterFødsel * UTTAKSDAGER_I_UKE
    );
}

function getFrivilligMødrekvoteEtterTermin(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    const startdato = Uttaksdagen(
        getPakrevdMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler)
            .tom
    ).neste();
    return getTidsperiode(
        startdato,
        (permisjonsregler.antallUkerMødrekvote -
            permisjonsregler.antallUkerMødrekvoteEtterFødsel) *
            UTTAKSDAGER_I_UKE
    );
}

function getFellesperiodeForelder1(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number
): Tidsperiode {
    const startdato = Uttaksdagen(
        getFrivilligMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler)
            .tom
    ).neste();
    return getTidsperiode(startdato, fellesukerForelder1 * UTTAKSDAGER_I_UKE);
}

function getFellesperiodeForelder2(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number,
    fellesukerForelder2: number
): Tidsperiode {
    const startdato = Uttaksdagen(
        fellesukerForelder1 === 0
            ? getFrivilligMødrekvoteEtterTermin(
                  familiehendelsedato,
                  permisjonsregler
              ).tom
            : getFellesperiodeForelder1(
                  familiehendelsedato,
                  permisjonsregler,
                  fellesukerForelder1
              ).tom
    ).neste();
    return getTidsperiode(startdato, fellesukerForelder2 * UTTAKSDAGER_I_UKE);
}

function getFedrekvote(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerForelder1: number,
    fellesukerForelder2: number
): Tidsperiode {
    const startdato = Uttaksdagen(
        fellesukerForelder2 === 0
            ? getFellesperiodeForelder1(
                  familiehendelsedato,
                  permisjonsregler,
                  fellesukerForelder1
              ).tom
            : getFellesperiodeForelder2(
                  familiehendelsedato,
                  permisjonsregler,
                  fellesukerForelder1,
                  fellesukerForelder2
              ).tom
    ).neste();
    return getTidsperiode(
        startdato,
        permisjonsregler.antallUkerFedrekvote * UTTAKSDAGER_I_UKE
    );
}

/** Oppretter default stønadsperioder ut fra familiehendelsedato ++ */
export function opprettUttaksperioderToForeldreEttBarn(
    familiehendelsedato: Date,
    dekningsgrad: Dekningsgrad,
    fellesukerForelder1: number,
    fellesukerForelder2: number,
    permisjonsregler: Permisjonsregler
): Uttaksperiode[] {
    familiehendelsedato = normaliserDato(familiehendelsedato);
    const perioder: Uttaksperiode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: getMødrekvoteFørTermin(
                familiehendelsedato,
                permisjonsregler
            ),
            låstForelder: true
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getPakrevdMødrekvoteEtterTermin(
                familiehendelsedato,
                permisjonsregler
            )
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getFrivilligMødrekvoteEtterTermin(
                familiehendelsedato,
                permisjonsregler
            )
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder2',
            konto: StønadskontoType.Fedrekvote,
            tidsperiode: getFedrekvote(
                familiehendelsedato,
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
                familiehendelsedato,
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
                familiehendelsedato,
                permisjonsregler,
                fellesukerForelder1,
                fellesukerForelder2
            )
        });
    }
    return perioder.sort(sorterPerioder);
}
