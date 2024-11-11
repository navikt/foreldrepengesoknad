import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { PlanForslag, SaksperiodeNy } from '@navikt/fp-types';
import { Stønadskonto } from '@navikt/fp-types/src/TilgjengeligeStønadskontoer';
import { UttaksdagenString, getTidsperiodeString } from '@navikt/fp-utils';
import { sorterPerioder } from '@navikt/fp-uttaksplan-ny';

export interface DeltUttakParams {
    famDato: string;
    tilgjengeligeStønadskontoer: Stønadskonto[];
    fellesperiodeDagerMor: number | undefined;
    startdato?: string;
}

export const deltUttak = ({
    famDato,
    tilgjengeligeStønadskontoer,
    fellesperiodeDagerMor,
    startdato,
}: DeltUttakParams): PlanForslag => {
    if (fellesperiodeDagerMor === undefined) {
        return {
            søker1: [],
            søker2: [],
        };
    }

    const førsteUttaksdag = UttaksdagenString(startdato ?? famDato).denneEllerNeste();
    const morsPerioder: SaksperiodeNy[] = [];
    const farsPerioder: SaksperiodeNy[] = [];
    const fellesperiodeDagerFarMedmor =
        tilgjengeligeStønadskontoer.find((k) => k.konto === StønadskontoType.Fellesperiode)!.dager -
        fellesperiodeDagerMor;
    const foreldrepengerFørFødsel = tilgjengeligeStønadskontoer.find(
        (k) => k.konto === StønadskontoType.ForeldrepengerFørFødsel,
    );
    const mødrekvote = tilgjengeligeStønadskontoer.find((k) => k.konto === StønadskontoType.Mødrekvote);
    const fedrekvote = tilgjengeligeStønadskontoer.find((k) => k.konto === StønadskontoType.Fedrekvote);
    let currentTomDate: string = førsteUttaksdag;

    if (foreldrepengerFørFødsel !== undefined) {
        const tidsperiode = getTidsperiodeString(
            UttaksdagenString(currentTomDate).trekkFra(15),
            foreldrepengerFørFødsel.dager,
        );
        const periodeFPFF: SaksperiodeNy = {
            forelder: Forelder.mor,
            kontoType: StønadskontoType.ForeldrepengerFørFødsel,
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeFPFF);

        currentTomDate = UttaksdagenString(periodeFPFF.tom).neste();
    }

    if (mødrekvote !== undefined) {
        const tidsperiode = getTidsperiodeString(currentTomDate, mødrekvote.dager);
        const periodeMødrekvote: SaksperiodeNy = {
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Mødrekvote,
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeMødrekvote);

        currentTomDate = UttaksdagenString(periodeMødrekvote.tom).neste();
    }

    if (fellesperiodeDagerMor !== undefined && fellesperiodeDagerMor > 0) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerMor);
        const periodeFellesperiode: SaksperiodeNy = {
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeFellesperiode);

        currentTomDate = UttaksdagenString(periodeFellesperiode.tom).neste();
    }

    if (fellesperiodeDagerFarMedmor !== undefined && fellesperiodeDagerFarMedmor > 0) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerFarMedmor);
        const periodeFellesperiode: SaksperiodeNy = {
            forelder: Forelder.farMedmor,
            kontoType: StønadskontoType.Fellesperiode,
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        farsPerioder.push(periodeFellesperiode);

        currentTomDate = UttaksdagenString(periodeFellesperiode.tom).neste();
    }

    if (fedrekvote !== undefined) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fedrekvote.dager);
        const periodeFedrekvote: SaksperiodeNy = {
            forelder: Forelder.farMedmor,
            kontoType: StønadskontoType.Fedrekvote,
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        farsPerioder.push(periodeFedrekvote);
    }

    return {
        søker1: morsPerioder.sort(sorterPerioder),
        søker2: farsPerioder.sort(sorterPerioder),
    };
};
