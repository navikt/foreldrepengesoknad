import { StønadskontoType } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import { UttakUkerOgDager } from './uttakUtils';

export type UkerOgDager = {
    uker: number;
    dager: number;
    totaltAntallDager: number;
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

export const getUkerOgDager = (totaltAntallDager: number) => {
    const uker = Math.floor(totaltAntallDager / 5);
    return { uker, dager: totaltAntallDager - uker * 5, totaltAntallDager: totaltAntallDager };
};

const getDagerForKonto = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    stønadskontoType: StønadskontoType,
) => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager : 0;
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

export const getAntallDagerForeldrepengerFørFødsel = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): number => getDagerForKonto(stønadskontoer, StønadskontoType.ForeldrepengerFørFødsel);

export const getAntallUkerOgDagerForeldrepengerFørFødsel = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): UkerOgDager => getUkerOgDagerForKonto(stønadskontoer, StønadskontoType.ForeldrepengerFørFødsel);

export const getAntallDagerMødrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Mødrekvote);

export const getAntallDagerFedrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Fedrekvote);

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
