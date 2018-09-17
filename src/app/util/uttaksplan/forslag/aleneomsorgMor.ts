import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';
import { Dekningsgrad, Forelder } from 'common/types';
import { Permisjonsregler } from '../../../types/uttaksplan/permisjonsregler';
import { Uttaksperiode, Periodetype, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { getAntallUkerTotalt, getPermisjonStartdato } from '../permisjonUtils';
import { getTidsperiode } from '../Tidsperioden';
import { Uttaksdagen } from '../Uttaksdagen';
import { sorterPerioder } from '../Periodene';

const UTTAKSDAGER_I_UKE = 5;

/** Oppretter default stønadsperioder ut fra familiehendelsedato ++ */
export function opprettUttaksperioderAleneomsorgMor(
    familiehendelsedato: Date,
    dekningsgrad: Dekningsgrad,
    permisjonsregler: Permisjonsregler
): Uttaksperiode[] {
    familiehendelsedato = normaliserDato(familiehendelsedato);
    const dagerTotalt = getAntallUkerTotalt(permisjonsregler, dekningsgrad) * UTTAKSDAGER_I_UKE;
    const dagerFørTermin = permisjonsregler.antallUkerForeldrepengerFørFødsel * UTTAKSDAGER_I_UKE;
    const dagerEtterTermin = dagerTotalt - dagerFørTermin;
    const perioder: Uttaksperiode[] = [
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: getTidsperiode(getPermisjonStartdato(familiehendelsedato, permisjonsregler), dagerFørTermin),
            vedlegg: [],
            ønskerSamtidigUttak: false
        },
        {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Foreldrepenger,
            tidsperiode: getTidsperiode(Uttaksdagen(familiehendelsedato).denneEllerNeste(), dagerEtterTermin),
            vedlegg: [],
            ønskerSamtidigUttak: false
        }
    ];
    return perioder.sort(sorterPerioder);
}
