import { Permisjonsregler } from '../../../types/uttaksplan/permisjonsregler';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { Uttaksdagen } from '../Uttaksdagen';
import { getTidsperiode } from '../Tidsperioden';
import { getPermisjonStartdato } from '../permisjonUtils';

const UTTAKSDAGER_I_UKE = 5;

export function getMødrekvoteFørTermin(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Tidsperiode {
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

export function getFrivilligMødrekvoteEtterTermin(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler
): Tidsperiode {
    const startdato = Uttaksdagen(getPakrevdMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler).tom).neste();
    return getTidsperiode(
        startdato,
        (permisjonsregler.antallUkerMødrekvote - permisjonsregler.antallUkerMødrekvoteEtterFødsel) * UTTAKSDAGER_I_UKE
    );
}

export function getFellesperiodeMor(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    fellesukerMor: number
): Tidsperiode {
    const startdato = Uttaksdagen(getFrivilligMødrekvoteEtterTermin(familiehendelsedato, permisjonsregler).tom).neste();
    return getTidsperiode(startdato, fellesukerMor * UTTAKSDAGER_I_UKE);
}

export function getFellesperiodeFarMedmor(
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

export function getFedrekvote(
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
