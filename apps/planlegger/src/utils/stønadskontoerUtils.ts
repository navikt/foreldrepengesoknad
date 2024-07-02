import { StønadskontoType } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

export type UkerOgDager = {
    uker: number;
    dager: number;
    totaltAntallDager: number;
};

export const getAntallUker = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number => {
    return Object.values(stønadskontoer.kontoer).reduce((sum: number, konto) => sum + konto.dager / 5, 0);
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

const getUkerOgDagerForKonto = (
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

export const getAntallUkerForeldrepengerFørFødsel = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): number => getUkerForKonto(stønadskontoer, StønadskontoType.ForeldrepengerFørFødsel);

export const getAntallDagerMødrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Mødrekvote);

export const getAntallUkerMødrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getUkerForKonto(stønadskontoer, StønadskontoType.Mødrekvote);

export const getAntallDagerFedrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Fedrekvote);

export const getAntallUkerFedrekvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getUkerForKonto(stønadskontoer, StønadskontoType.Fedrekvote);

export const getAntallDagerFellesperiode = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Fellesperiode);

export const getAntallUkerFellesperiode = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getUkerForKonto(stønadskontoer, StønadskontoType.Fellesperiode);

export const getAntallUkerOgDagerFellesperiode = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
): UkerOgDager => getUkerOgDagerForKonto(stønadskontoer, StønadskontoType.Fellesperiode);

export const getAntallDagerForeldrepenger = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.Foreldrepenger);

export const getAntallUkerForeldrepenger = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getUkerForKonto(stønadskontoer, StønadskontoType.Foreldrepenger);

export const getAntallDagerAktivitetsfriKvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getDagerForKonto(stønadskontoer, StønadskontoType.AktivitetsfriKvote);

export const getAntallUkerAktivitetsfriKvote = (stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad): number =>
    getUkerForKonto(stønadskontoer, StønadskontoType.AktivitetsfriKvote);
