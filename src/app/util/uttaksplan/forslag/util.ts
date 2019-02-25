import { Permisjonsregler } from '../../../types/uttaksplan/permisjonsregler';
import { Uttaksdagen } from '../Uttaksdagen';
import { getTidsperiode } from '../Tidsperioden';
import { getDefaultPermisjonStartdato } from '../permisjonUtils';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { Stønadskontouttak } from '../../../components/uttaksoppsummering/Uttaksoppsummering';
import { Tidsperiode } from 'common/types';

const UTTAKSDAGER_I_UKE = 5;

export function getMødrekvoteFørTermin(familiehendelsedato: Date, permisjonsregler: Permisjonsregler): Tidsperiode {
    return getTidsperiode(
        getDefaultPermisjonStartdato(familiehendelsedato, permisjonsregler),
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

export function getErDeltUttak(kontoer: Array<TilgjengeligStønadskonto | Stønadskontouttak>): boolean {
    return kontoer.find((u) => u.konto === StønadskontoType.Foreldrepenger) === undefined;
}
