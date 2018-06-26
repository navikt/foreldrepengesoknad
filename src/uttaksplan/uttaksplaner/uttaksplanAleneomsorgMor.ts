import {
    Permisjonsregler,
    Uttaksperiode,
    StønadskontoType,
    Periodetype,
    Dekningsgrad
} from 'uttaksplan/types';
import {
    sorterPerioder,
    Uttaksdagen,
    getTidsperiode
} from 'uttaksplan/utils/dataUtils';
import {
    getPermisjonStartdato,
    getAntallUkerTotalt
} from 'uttaksplan/utils/permisjonUtils';
import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';

const UTTAKSDAGER_I_UKE = 5;

/** Oppretter default stønadsperioder ut fra termindato ++ */
export function opprettUttaksperioderAleneomsorgMor(
    termindato: Date,
    dekningsgrad: Dekningsgrad,
    permisjonsregler: Permisjonsregler
): Uttaksperiode[] {
    termindato = normaliserDato(termindato);
    const dagerTotalt =
        getAntallUkerTotalt(permisjonsregler, dekningsgrad) * UTTAKSDAGER_I_UKE;
    const dagerFørTermin =
        permisjonsregler.antallUkerForeldrepengerFørFødsel * UTTAKSDAGER_I_UKE;
    const dagerEtterTermin = dagerTotalt - dagerFørTermin;
    const perioder: Uttaksperiode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: getTidsperiode(
                getPermisjonStartdato(termindato, permisjonsregler),
                dagerFørTermin
            ),
            låstForelder: true
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: 'forelder1',
            konto: StønadskontoType.Foreldrepenger,
            tidsperiode: getTidsperiode(
                Uttaksdagen(termindato).denneEllerNeste(),
                dagerEtterTermin
            )
        }
    ];
    return perioder.sort(sorterPerioder);
}
