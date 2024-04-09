import dayjs from 'dayjs';

export type BarnetErFødt = {
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
};

export type BarnetErIkkeFødt = {
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
};

export type BarnetErAdoptert = {
    erFødsel: boolean;
    antallBarn: string;
    adopsjonsdato: string;
    overtakelsesdato: string;
    fødselsdato: string;
};

export type Fødsel = BarnetErFødt | BarnetErIkkeFødt;

export type OmBarnet = Fødsel | BarnetErAdoptert;

export const erBarnetIkkeFødt = (omBarnet: OmBarnet): omBarnet is BarnetErIkkeFødt => {
    if ((omBarnet as BarnetErIkkeFødt).erBarnetFødt === false) {
        return true;
    }
    return false;
};

export const erBarnetFødt = (omBarnet: OmBarnet): omBarnet is BarnetErFødt => {
    if ((omBarnet as BarnetErFødt).erBarnetFødt === true) {
        return true;
    }
    return false;
};
export const erBarnetAdoptert = (omBarnet: OmBarnet): omBarnet is BarnetErAdoptert => {
    if ((omBarnet as BarnetErAdoptert).erFødsel === false) {
        return true;
    }
    return false;
};

export const erEttBarn = (omBarnet: OmBarnet): boolean => {
    return omBarnet.antallBarn === '1';
};

export const erToBarn = (omBarnet: OmBarnet): boolean => {
    return omBarnet.antallBarn === '2';
};

export const erFlereEnnToBarn = (omBarnet: OmBarnet): boolean => {
    return omBarnet.antallBarn === '3';
};

export const barnehagestartDato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    if (erFødt || erIkkeFødt || erAdoptert) {
        const dato = erAdoptert || erFødt ? barnet.fødselsdato : barnet.termindato;

        if (dayjs(dato).month() < 8) return dayjs(dato).month(7).add(1, 'year').format('MMMM YYYY');

        if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) return dayjs(dato).add(1, 'year').format('MMMM YYYY');

        if (dayjs(dato).month() === 11)
            return dayjs(dato).startOf('year').add(2, 'year').add(7, 'months').format('MMMM YYYY');
    }
    return undefined;
};
