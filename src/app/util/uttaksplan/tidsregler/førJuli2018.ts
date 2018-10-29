import moment from 'moment';
import { TilgjengeligStønadskonto, StønadskontoType } from '../../../types/uttaksplan/periodetyper';

const date1July2018 = moment(new Date(2018, 6, 1));

export const skalTilgjengeligeKontoerJusteresPgaFamiliehendelsesdatoFørJuli2018 = (
    familiehendelsesdato: Date,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): boolean => {
    const harKontoerSomErBerørt = tilgjengeligeStønadskontoer.filter((ts) => ts.konto === StønadskontoType.Mødrekvote);
    return harKontoerSomErBerørt && moment(familiehendelsesdato).isBefore(date1July2018);
};

export const overstyrAntallTilgjengeligeUkerForBarnFørJuli2018 = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]
): TilgjengeligStønadskonto[] => {
    return tilgjengeligeStønadskontoer;
};
