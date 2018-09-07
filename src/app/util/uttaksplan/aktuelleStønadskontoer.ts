import Søknad, { SøkerRolle } from '../../types/søknad/Søknad';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';

export const getAktuelleStønadskontoerForSøker = (søknad: Søknad): StønadskontoType[] => {
    const aktuelleKontoer: StønadskontoType[] = [StønadskontoType.Fellesperiode];

    const { annenForelder, barn, søker } = søknad;
    const { antallBarn } = barn;
    const { rolle } = søker;
    const { harRettPåForeldrepenger, skalHaForeldrepenger } = annenForelder;

    // Hvis søker har aleneomsorg, men annen forelder har rett på og skal ha foreldrepenger: fordel som vanlig
    // Hvis annen forelder er ukjent, eller ikke har rett på/skal ha foreldrepenger, bruk kun FORELDREPENGER (+FLERBARNSUKER)
    if (rolle === SøkerRolle.MOR) {
        if (harRettPåForeldrepenger && skalHaForeldrepenger) {
            aktuelleKontoer.push(
                StønadskontoType.ForeldrepengerFørFødsel,
                StønadskontoType.Fellesperiode,
                StønadskontoType.Mødrekvote
            );
        } else {
            aktuelleKontoer.push(StønadskontoType.Foreldrepenger);
        }
    } else {
        if (harRettPåForeldrepenger && skalHaForeldrepenger) {
            aktuelleKontoer.push(StønadskontoType.Fellesperiode, StønadskontoType.Fedrekvote);
        } else {
            aktuelleKontoer.push(StønadskontoType.Foreldrepenger);
        }
    }

    if (antallBarn > 1) {
        aktuelleKontoer.push(StønadskontoType.Flerbarnsuker);
    }

    return aktuelleKontoer;
};

export const getVelgbareStønadskontotyper = (stønadskontoTyper: StønadskontoType[]): StønadskontoType[] =>
    stønadskontoTyper.filter(
        (type) =>
            type === StønadskontoType.Flerbarnsuker ||
            type === StønadskontoType.Fellesperiode ||
            type === StønadskontoType.Fedrekvote ||
            type === StønadskontoType.Mødrekvote
    );
