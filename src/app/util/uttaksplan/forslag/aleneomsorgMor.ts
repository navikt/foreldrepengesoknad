import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';
import { Forelder } from 'common/types';
import { Permisjonsregler } from '../../../types/uttaksplan/permisjonsregler';
import { Uttaksperiode, Periodetype, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { getPermisjonStartdato } from '../permisjonUtils';
import { getTidsperiode } from '../Tidsperioden';
import { sorterPerioder } from '../Periodene';

/** Oppretter default stønadsperioder ut fra familiehendelsedato ++ */
export function opprettUttaksperioderAleneomsorgMor(
    familiehendelsedato: Date,
    permisjonsregler: Permisjonsregler,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): Uttaksperiode[] {
    familiehendelsedato = normaliserDato(familiehendelsedato);
    const perioder: Uttaksperiode[] = tilgjengeligeStønadskontoer.map((konto): Uttaksperiode => {
        return {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: konto.konto,
            tidsperiode: getTidsperiode(getPermisjonStartdato(familiehendelsedato, permisjonsregler), konto.dager),
            vedlegg: [],
            ønskerSamtidigUttak: false
        };
    });
    return perioder.sort(sorterPerioder);
}
