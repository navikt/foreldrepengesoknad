import Søknad, { SøkerRolle } from '../../types/søknad/Søknad';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';

export const getAktuelleStønadskontoerForSøker = (søknad: Søknad): StønadskontoType[] => {
    const aktuelleKontoer: StønadskontoType[] = [StønadskontoType.Fellesperiode];

    const { annenForelder, barn, søker } = søknad;
    const { antallBarn } = barn;
    const { rolle } = søker;
    const { harRettPåForeldrepenger, skalHaForeldrepenger } = annenForelder;

    if (rolle === SøkerRolle.MOR) {
        // Mangler: når erAleneOmsorg === false, blir bruker kun spurt om harRettPåForeldrepenger.
        // I tilfellet hvor harRettPåForeldrepenger === true, skal Fellesperiode, Mødrekvote og ForeldrepengerFørFødsel
        // legges til. Hvis harRettPåForeldrepenger === false, kun Foreldrepenger (+ Flerbarnsuker)
        //
        // Merk JIRA-sak (BRIS-393) om at disse to spørsmålene skal slåes sammen, så dette bør gjøres sammen med den.
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
        // Mangler: når erAleneOmsorg === false, blir bruker kun spurt om harRettPåForeldrepenger.
        // I tilfellet hvor harRettPåForeldrepenger === true, skal Fellesperiode og Fedrekvote legges til.
        // Hvis harRettPåForeldrepenger === false, kun Foreldrepenger (+ Flerbarnsuker)
        //
        // Merk JIRA-sak (BRIS-393) om at disse to spørsmålene skal slåes sammen, så dette bør gjøres sammen med den.
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
