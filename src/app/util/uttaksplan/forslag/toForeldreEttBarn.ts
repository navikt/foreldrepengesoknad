import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';
import { Permisjonsregler } from '../../../types/uttaksplan/permisjonsregler';
import { Tidsperiode, Dekningsgrad, Forelder } from 'common/types';
import { Periodetype, StønadskontoType, Periode } from '../../../types/uttaksplan/periodetyper';
import { getTidsperiode } from '../Tidsperioden';
import { getPermisjonStartdato } from '../permisjonUtils';
import { sorterPerioder } from '../Periodene';
import { Uttaksdagen } from '../Uttaksdagen';

const UTTAKSDAGER_I_UKE = 5;

function getMødrekvoteFørTermin(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Tidsperiode {
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

function getFrivilligMødrekvoteEtterTermin(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Tidsperiode {
    const startdato = Uttaksdagen(getPakrevdMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler).tom).neste();
    return getTidsperiode(
        startdato,
        (permisjonsregler.antallUkerMødrekvote - permisjonsregler.antallUkerMødrekvoteEtterFødsel) * UTTAKSDAGER_I_UKE
    );
}

function getFellesperiodeMor(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerMor: number
): Tidsperiode {
    const startdato = Uttaksdagen(getFrivilligMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler).tom).neste();
    return getTidsperiode(startdato, fellesukerMor * UTTAKSDAGER_I_UKE);
}

function getFellesperiodeFarMedmor(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerMor: number,
    fellesukerFarMedmor: number
): Tidsperiode {
    const startdato = Uttaksdagen(
        fellesukerMor === 0
            ? getFrivilligMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler).tom
            : getFellesperiodeMor(familiehendelsedato, permisjonsregler, fellesukerMor).tom
    ).neste();
    return getTidsperiode(startdato, fellesukerFarMedmor * UTTAKSDAGER_I_UKE);
}

function getFedrekvote(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerMor: number,
    fellesukerFarMedmor: number
): Tidsperiode {
    const startdato = Uttaksdagen(
        fellesukerFarMedmor === 0
            ? getFellesperiodeMor(familiehendelsedato, permisjonsregler, fellesukerMor).tom
            : getFellesperiodeFarMedmor(familiehendelsedato, permisjonsregler, fellesukerMor, fellesukerFarMedmor).tom
    ).neste();
    return getTidsperiode(startdato, permisjonsregler.antallUkerFedrekvote * UTTAKSDAGER_I_UKE);
}

/** Oppretter default stønadsperioder ut fra familiehendelsedato ++ */
export function opprettUttaksperioderToForeldreEttBarn(
    familiehendelsedato: Date,
    dekningsgrad: Dekningsgrad,
    fellesukerMor: number,
    fellesukerFarMedmor: number,
    permisjonsregler: Permisjonsregler
): Periode[] {
    familiehendelsedato = normaliserDato(familiehendelsedato);

    const perioder: Periode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: getMødrekvoteFørTermin(familiehendelsedato, permisjonsregler),
            ønskerSamtidigUttak: false
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getPakrevdMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler),
            ønskerSamtidigUttak: false
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getFrivilligMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler),
            ønskerSamtidigUttak: false
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.FARMEDMOR,
            konto: StønadskontoType.Fedrekvote,
            tidsperiode: getFedrekvote(familiehendelsedato, permisjonsregler, fellesukerMor, fellesukerFarMedmor),
            ønskerSamtidigUttak: false
        }
    ];

    if (fellesukerMor > 0) {
        perioder.push({
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: getFellesperiodeMor(familiehendelsedato, permisjonsregler, fellesukerMor),
            ønskerSamtidigUttak: false
        });
    }

    if (fellesukerFarMedmor > 0) {
        perioder.push({
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.FARMEDMOR,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: getFellesperiodeFarMedmor(
                familiehendelsedato,
                permisjonsregler,
                fellesukerMor,
                fellesukerFarMedmor
            ),
            ønskerSamtidigUttak: false
        });
    }

    return perioder.sort(sorterPerioder);
}
