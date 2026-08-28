import { KontoBeregningDto, KontoTypeUttak } from '@navikt/fp-types';

import { UttakUkerOgDager } from './uttakUtils';

export type UkerOgDager = {
    uker: number;
    dager: number;
    totaltAntallDager: number;
};

export const getAntallUkerOgDager = (stønadskvoter: KontoBeregningDto): UttakUkerOgDager => {
    const sum: UttakUkerOgDager = { uker: 0, dager: 0 };

    Object.values(stønadskvoter.kontoer).forEach((konto) => {
        const ukerOgDager = getUkerOgDager(konto.dager);
        sum.uker += ukerOgDager.uker;
        sum.dager += ukerOgDager.dager;
    });

    return sum;
};

export const getUkerOgDager = (totaltAntallDager: number) => {
    const uker = Math.floor(totaltAntallDager / 5);
    return { uker, dager: totaltAntallDager - uker * 5, totaltAntallDager: totaltAntallDager };
};

const getDagerForKvote = (stønadskvoter: KontoBeregningDto, stønadskvoteType: KontoTypeUttak) => {
    const konto = stønadskvoter.kontoer.find((k) => k.konto === stønadskvoteType);
    return konto ? konto.dager : 0;
};

const getUkerOgDagerForKvote = (stønadskvoter: KontoBeregningDto, stønadskvoteType: KontoTypeUttak): UkerOgDager => {
    const konto = stønadskvoter.kontoer.find((k) => k.konto === stønadskvoteType);

    if (konto) {
        return getUkerOgDager(konto.dager);
    }

    return { uker: 0, dager: 0, totaltAntallDager: 0 };
};

export const getAntallDagerForeldrepengerFørFødsel = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'FORELDREPENGER_FØR_FØDSEL');
export const getAntallDagerMødrekvote = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'MØDREKVOTE');

export const getAntallDagerFedrekvote = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'FEDREKVOTE');

export const getAntallUkerOgDagerAktivitetsfriKvote = (stønadskvoter: KontoBeregningDto): UkerOgDager =>
    getUkerOgDagerForKvote(stønadskvoter, 'AKTIVITETSFRI_KVOTE');

export const getAntallDagerAktivitetsfriKvote = (stønadskvoter: KontoBeregningDto): number =>
    getDagerForKvote(stønadskvoter, 'AKTIVITETSFRI_KVOTE');

export const getAntallUkerOgDagerFellesperiode = (stønadskvoter: KontoBeregningDto): UkerOgDager =>
    getUkerOgDagerForKvote(stønadskvoter, 'FELLESPERIODE');

export const getAntallUkerOgDagerForeldrepenger = (stønadskvoter: KontoBeregningDto): UkerOgDager =>
    getUkerOgDagerForKvote(stønadskvoter, 'FORELDREPENGER');
