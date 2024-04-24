import { BarnetErAdoptert, BarnetErFødt, BarnetErIkkeFødt, OmBarnet } from 'types/Barnet';

export const erBarnetUFødt = (omBarnet: OmBarnet): omBarnet is BarnetErIkkeFødt => {
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
