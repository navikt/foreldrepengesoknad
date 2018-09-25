import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';
import { Forelder } from 'common/types';
import { Uttaksperiode, Periodetype, TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { getTidsperiode } from '../Tidsperioden';
import { Uttaksdagen } from '../Uttaksdagen';

/** Oppretter default stønadsperioder ut fra familiehendelsedato ++ */
export function opprettUttaksperioderAleneomsorgFarEllerMedmor(
    familiehendelsedato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): Uttaksperiode[] {
    familiehendelsedato = normaliserDato(Uttaksdagen(familiehendelsedato).denneEllerNeste());
    const perioder: Uttaksperiode[] = tilgjengeligeStønadskontoer.map((konto): Uttaksperiode => ({
        id: guid(),
        type: Periodetype.Uttak,
        forelder: Forelder.FARMEDMOR,
        konto: konto.konto,
        tidsperiode: getTidsperiode(familiehendelsedato, konto.dager),
        vedlegg: [],
        ønskerSamtidigUttak: false
    }));
    return perioder;
}
