import { normaliserDato } from 'common/util/datoUtils';
import { guid } from 'nav-frontend-js-utils';
import {
    Periodetype,
    StønadskontoType,
    Periode,
    TilgjengeligStønadskonto
} from '../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import { sorterPerioder } from '../Periodene';
import { getTidsperiode } from '../Tidsperioden';
import { Uttaksdagen } from '../Uttaksdagen';

/** Oppretter default stønadsperioder ut fra familiehendelsedato ++ */
export function opprettUttaksperioderToForeldreEttBarnMor(
    familiehendelsedato: Date,
    fellesukerMor: number,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): Periode[] {
    familiehendelsedato = normaliserDato(familiehendelsedato);
    const perioder: Periode[] = [];
    const fpFørFødselKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.ForeldrepengerFørFødsel
    );
    const mkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Mødrekvote
    );
    let currentTomDate: Date = familiehendelsedato;

    if (fpFørFødselKonto !== undefined) {
        const startdatoFpFørFødsel = Uttaksdagen(currentTomDate).trekkFra(fpFørFødselKonto.dager);

        const periodeFørFødsel: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            tidsperiode: {
                fom: startdatoFpFørFødsel,
                tom: Uttaksdagen(currentTomDate).forrige()
            },
            ønskerSamtidigUttak: false
        };

        perioder.push(periodeFørFødsel);
    }

    if (mkKonto !== undefined) {
        currentTomDate = Uttaksdagen(currentTomDate).leggTil(mkKonto.dager);

        const periodeMødrekvote: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: {
                fom: familiehendelsedato,
                tom: currentTomDate
            },
            ønskerSamtidigUttak: false
        };

        perioder.push(periodeMødrekvote);
    }

    if (fellesukerMor > 0) {
        const periodeFellesperiodeMor: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.MOR,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: getTidsperiode(Uttaksdagen(currentTomDate).neste(), fellesukerMor * 5),
            ønskerSamtidigUttak: false
        };

        perioder.push(periodeFellesperiodeMor);
    }

    return perioder.sort(sorterPerioder);
}
