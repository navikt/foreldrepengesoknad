import moment from 'moment';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../../types/uttaksplan/periodetyper';

const date1July2018 = moment(new Date(2018, 6, 1));
const UKERFØRJULI = 10;

export const skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018 = (
    familiehendelsesdato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): boolean => {
    const harKontoerSomErBerørt = tilgjengeligeStønadskontoer.find((ts) => ts.konto === StønadskontoType.Mødrekvote);
    return harKontoerSomErBerørt !== undefined && moment(familiehendelsesdato).isBefore(date1July2018);
};

export const overstyrAntallTilgjengeligeUkerForBarnFørJuli2018 = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): TilgjengeligStønadskonto[] => {
    const mødrekvote = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Mødrekvote);
    const fedrekvote = tilgjengeligeStønadskontoer.find((konto) => konto.konto === StønadskontoType.Fedrekvote);

    const ekstraMødrekvoteDager = mødrekvote!.dager - UKERFØRJULI * 5;
    const ekstraFedrekvoteDager = fedrekvote!.dager - UKERFØRJULI * 5;

    return tilgjengeligeStønadskontoer.map((konto) => {
        if (konto.konto === StønadskontoType.Fedrekvote || konto.konto === StønadskontoType.Mødrekvote) {
            return {
                konto: konto.konto,
                dager: UKERFØRJULI * 5,
            };
        } else if (konto.konto === StønadskontoType.Fellesperiode) {
            return {
                konto: konto.konto,
                dager: konto.dager + ekstraFedrekvoteDager + ekstraMødrekvoteDager,
            };
        } else {
            return konto;
        }
    });
};
