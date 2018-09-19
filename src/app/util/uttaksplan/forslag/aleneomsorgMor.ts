import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';
import { Forelder } from 'common/types';
import {
    Periodetype,
    TilgjengeligStønadskonto,
    Periode,
    StønadskontoType
} from '../../../types/uttaksplan/periodetyper';
import { getTidsperiode } from '../Tidsperioden';
import { sorterPerioder } from '../Periodene';
import { Uttaksdagen } from '../Uttaksdagen';

/** Oppretter default stønadsperioder ut fra familiehendelsedato ++ */
export function opprettUttaksperioderAleneomsorgMor(
    familiehendelsedato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): Periode[] {
    familiehendelsedato = normaliserDato(familiehendelsedato);
    const perioder: Periode[] = [];
    const fpFørFødselKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    const foreldrepengerKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Foreldrepenger
    );

    if (fpFørFødselKonto !== undefined) {
        const startdatoFpFørFødsel = Uttaksdagen(familiehendelsedato).trekkFra(fpFørFødselKonto.dager);

        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: fpFørFødselKonto.konto,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(familiehendelsedato).forrige()
            },
            vedlegg: [],
            ønskerSamtidigUttak: false
        };

        perioder.push(periodeFørFødsel);
    }

    if (foreldrepengerKonto !== undefined) {
        const foreldrepengerPeriode: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: foreldrepengerKonto.konto,
            tidsperiode: getTidsperiode(familiehendelsedato, foreldrepengerKonto.dager),
            vedlegg: [],
            ønskerSamtidigUttak: false
        };

        perioder.push(foreldrepengerPeriode);
    }

    return perioder.sort(sorterPerioder);
}
