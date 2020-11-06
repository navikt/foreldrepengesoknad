import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Tidsperiode, TidsperiodeString } from '../../common/types';

export const mapTidsperiodeStringToTidsperiode = (t: Partial<TidsperiodeString>): Partial<Tidsperiode> => {
    return {
        fom: ISOStringToDate(t.fom),
        tom: ISOStringToDate(t.tom),
    };
};

export const mapTidsperiodeToTidsperiodeString = (t: Partial<Tidsperiode>): Partial<TidsperiodeString> => {
    return {
        fom: dateToISOString(t.fom),
        tom: dateToISOString(t.tom),
    };
};
