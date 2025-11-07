import { KontoBeregningDto, KontoTypeUttak } from '@navikt/fp-types';

import { UttakUkerOgDager } from './uttakUtils';

export type UkerOgDager = {
    uker: number;
    dager: number;
    totaltAntallDager: number;
};

export const getAntallUkerOgDager = (stønadskontoer: KontoBeregningDto): UttakUkerOgDager => {
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

const getDagerForKonto = (stønadskontoer: KontoBeregningDto, stønadskontoType: KontoTypeUttak) => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);
    return konto ? konto.dager : 0;
};

const getUkerOgDagerForKonto = (stønadskontoer: KontoBeregningDto, stønadskontoType: KontoTypeUttak): UkerOgDager => {
    const konto = stønadskontoer.kontoer.find((k) => k.konto === stønadskontoType);

    if (konto) {
        return getUkerOgDager(konto.dager);
    }

    return { uker: 0, dager: 0, totaltAntallDager: 0 };
};

export const getAntallDagerForeldrepengerFørFødsel = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'FORELDREPENGER_FØR_FØDSEL');
export const getAntallDagerMødrekvote = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'MØDREKVOTE');

export const getAntallDagerFedrekvote = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'FEDREKVOTE');

export const getAntallUkerOgDagerAktivitetsfriKvote = (stønadskontoer: KontoBeregningDto): UkerOgDager =>
    getUkerOgDagerForKonto(stønadskontoer, 'AKTIVITETSFRI_KVOTE');

export const getAntallDagerAktivitetsfriKvote = (stønadskontoer: KontoBeregningDto): number =>
    getDagerForKonto(stønadskontoer, 'AKTIVITETSFRI_KVOTE');

export const getAntallUkerOgDagerFellesperiode = (stønadskontoer: KontoBeregningDto): UkerOgDager =>
    getUkerOgDagerForKonto(stønadskontoer, 'FELLESPERIODE');

export const getAntallUkerOgDagerForeldrepenger = (stønadskontoer: KontoBeregningDto): UkerOgDager =>
    getUkerOgDagerForKonto(stønadskontoer, 'FORELDREPENGER');
