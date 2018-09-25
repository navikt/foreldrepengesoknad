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

export function opprettUttaksperioderToForeldreEttBarnFarEllerMedmor(
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    morSinSisteUttaksdag?: Date
) {
    const perioder: Periode[] = [];
    const fkKonto: TilgjengeligStønadskonto | undefined = tilgjengeligeStønadskontoer.find(
        (konto) => konto.konto === StønadskontoType.Fedrekvote
    );

    if (fkKonto !== undefined) {
        const periodeFedrekvote: Periode = {
            id: guid(),
            type: Periodetype.Uttak,
            forelder: Forelder.FARMEDMOR,
            konto: StønadskontoType.Fedrekvote,
            tidsperiode: getTidsperiode(
                Uttaksdagen(normaliserDato(morSinSisteUttaksdag!)).denneEllerNeste(),
                fkKonto.dager
            ),
            ønskerSamtidigUttak: false
        };

        perioder.push(periodeFedrekvote);
    }

    return perioder.sort(sorterPerioder);
}
