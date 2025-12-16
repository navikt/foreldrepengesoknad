import { PlanForslag } from 'types/PlanForslag';

import { KontoDto, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { UttaksdagenString, getTidsperiodeString } from '@navikt/fp-utils';
import { sorterPerioder } from '@navikt/fp-uttaksplan-ny';

interface DeltUttakParams {
    famDato: string;
    tilgjengeligeStønadskontoer: KontoDto[];
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
    const morsPerioder: UttakPeriode_fpoversikt[] = [];
    const farsPerioder: UttakPeriode_fpoversikt[] = [];
    const fellesperiodeDagerFarMedmor =
        tilgjengeligeStønadskontoer.find((k) => k.konto === 'FELLESPERIODE')!.dager - fellesperiodeDagerMor;
    const foreldrepengerFørFødsel = tilgjengeligeStønadskontoer.find((k) => k.konto === 'FORELDREPENGER_FØR_FØDSEL');
    const mødrekvote = tilgjengeligeStønadskontoer.find((k) => k.konto === 'MØDREKVOTE');
    const fedrekvote = tilgjengeligeStønadskontoer.find((k) => k.konto === 'FEDREKVOTE');
    let currentTomDate: string = førsteUttaksdag;

    if (foreldrepengerFørFødsel !== undefined) {
        const tidsperiode = getTidsperiodeString(
            UttaksdagenString(currentTomDate).trekkFra(15),
            foreldrepengerFørFødsel.dager,
        );
        const periodeFPFF: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeFPFF);

        currentTomDate = UttaksdagenString(periodeFPFF.tom).neste();
    }

    if (mødrekvote !== undefined) {
        const tidsperiode = getTidsperiodeString(currentTomDate, mødrekvote.dager);
        const periodeMødrekvote: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeMødrekvote);

        currentTomDate = UttaksdagenString(periodeMødrekvote.tom).neste();
    }

    if (fellesperiodeDagerMor !== undefined && fellesperiodeDagerMor > 0) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerMor);
        const periodeFellesperiode: UttakPeriode_fpoversikt = {
            forelder: 'MOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        morsPerioder.push(periodeFellesperiode);

        currentTomDate = UttaksdagenString(periodeFellesperiode.tom).neste();
    }

    if (fellesperiodeDagerFarMedmor !== undefined && fellesperiodeDagerFarMedmor > 0) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fellesperiodeDagerFarMedmor);
        const periodeFellesperiode: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FELLESPERIODE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        farsPerioder.push(periodeFellesperiode);

        currentTomDate = UttaksdagenString(periodeFellesperiode.tom).neste();
    }

    if (fedrekvote !== undefined) {
        const tidsperiode = getTidsperiodeString(currentTomDate, fedrekvote.dager);
        const periodeFedrekvote: UttakPeriode_fpoversikt = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            fom: tidsperiode.fom,
            tom: tidsperiode.tom,
        };

        farsPerioder.push(periodeFedrekvote);
    }

    return {
        søker1: [...morsPerioder].sort(sorterPerioder),
        søker2: [...farsPerioder].sort(sorterPerioder),
    };
};
