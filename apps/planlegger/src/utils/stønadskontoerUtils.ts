import { StønadskontoType } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import { UttakUkerOgDager } from './uttakUtils';

export type UkerOgDager = {
    uker: number;
    dager: number;
    totaltAntallDager: number;
};

export const getAntallUker = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number => {
    return Object.values(stønadskontoer.kontoer).reduce((sum: number, konto) => sum + konto.dager / 5, 0);
};

export const getAntallUkerOgDager = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): UttakUkerOgDager => {
    return Object.values(stønadskontoer.kontoer).reduce(
        (sum: UttakUkerOgDager, konto) => {
            const ukerOgDager = getUkerOgDager(konto.dager);
            return {
                uker: sum.uker + ukerOgDager.uker,
                dager: sum.dager + ukerOgDager.dager,
            };
        },
        { uker: 0, dager: 0 },
    );
};

const getUkerForKonto = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    stønadskontoType: StønadskontoType,
) => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager / 5 : 0;
};

const getDagerForKonto = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    stønadskontoType: StønadskontoType,
) => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager : 0;
};

export const getUkerOgDager = (totaltAntallDager: number) => {
    const uker = Math.floor(totaltAntallDager / 5);
    return { uker, dager: totaltAntallDager - uker * 5, totaltAntallDager: totaltAntallDager };
};

export const getUkerOgDagerForKonto = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    stønadskontoType: StønadskontoType,
): UkerOgDager => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);

    if (konto) {
        return getUkerOgDager(konto.dager);
    }

    return { uker: 0, dager: 0, totaltAntallDager: 0 };
};

export const getAntallUkerForeldrepengerFørFødsel = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): number => getUkerForKonto(stønadskontoer, StønadskontoType.ForeldrepengerFørFødsel);

export const getAntallDagerForeldrepengerFørFødsel = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): number => getDagerForKonto(stønadskontoer, StønadskontoType.ForeldrepengerFørFødsel);

export const getAntallUkerMødrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getUkerForKonto(stønadskontoer, StønadskontoType.Mødrekvote);

export const getAntallDagerMødrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Mødrekvote);

export const getAntallUkerFedrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getUkerForKonto(stønadskontoer, StønadskontoType.Fedrekvote);

export const getAntallDagerFedrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Fedrekvote);

export const getAntallUkerAktivitetsfriKvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getUkerForKonto(stønadskontoer, StønadskontoType.AktivitetsfriKvote);

export const getAntallUkerOgDagerAktivitetsfriKvote = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): UkerOgDager => getUkerOgDagerForKonto(stønadskontoer, StønadskontoType.AktivitetsfriKvote);

export const getAntallDagerAktivitetsfriKvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.AktivitetsfriKvote);

export const getAntallUkerOgDagerFellesperiode = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): UkerOgDager => getUkerOgDagerForKonto(stønadskontoer, StønadskontoType.Fellesperiode);

export const getAntallUkerOgDagerForeldrepenger = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): UkerOgDager => getUkerOgDagerForKonto(stønadskontoer, StønadskontoType.Foreldrepenger);
