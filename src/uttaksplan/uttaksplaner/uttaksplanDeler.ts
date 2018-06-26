import {
    Permisjonsregler,
    Uttaksperiode,
    StønadskontoType,
    Periodetype,
    Dekningsgrad
} from 'uttaksplan/types';
import {
    sorterPerioder,
    getTidsperiode,
    Uttaksdagen
} from 'uttaksplan/utils/dataUtils';
import { getPermisjonStartdato } from 'uttaksplan/utils/permisjonUtils';
import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';

const UTTAKSDAGER_I_UKE = 5;

/** Oppretter default stønadsperioder ut fra termindato ++ */
export function opprettUttaksperioderEnkel(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    fellesukerForelder1: number,
    fellesukerForelder2: number,
    permisjonsregler: Permisjonsregler
): Uttaksperiode[] {
    termindato = normaliserDato(termindato);

    const ukerMorFørTermin = permisjonsregler.antallUkerForeldrepengerFørFødsel;
    const ukerMorsDel =
        fellesukerForelder1 + permisjonsregler.antallUkerMødrekvote;

    const ukerFarsDel =
        fellesukerForelder2 + permisjonsregler.antallUkerFedrekvote;

    const morsDelFørTermin: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        forelder: 'forelder1',
        konto: StønadskontoType.MorsDelFørTermin,
        tidsperiode: getTidsperiode(
            getPermisjonStartdato(termindato, permisjonsregler),
            ukerMorFørTermin * UTTAKSDAGER_I_UKE
        )
    };
    const morsDelEtterTermin: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        forelder: 'forelder1',
        konto: StønadskontoType.MorsDel,
        tidsperiode: getTidsperiode(
            Uttaksdagen(termindato).denneEllerNeste(),
            ukerMorsDel * UTTAKSDAGER_I_UKE
        )
    };
    const farsDel: Uttaksperiode = {
        id: guid(),
        type: Periodetype.Uttak,
        forelder: 'forelder2',
        konto: StønadskontoType.FarsDel,
        tidsperiode: getTidsperiode(
            Uttaksdagen(morsDelEtterTermin.tidsperiode.sluttdato).neste(),
            ukerFarsDel * UTTAKSDAGER_I_UKE
        )
    };

    const perioder: Uttaksperiode[] = [
        morsDelFørTermin,
        morsDelEtterTermin,
        farsDel
    ];
    return perioder.sort(sorterPerioder);
}
