import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Tidsperiode, TidsperiodeString } from '../../common/types';

export const mapTidsperiodeDatoInputVerdiToTidsperiode = (t: Partial<TidsperiodeString>): Partial<Tidsperiode> => {
    return {
        fom: ISOStringToDate(t.fom),
        tom: ISOStringToDate(t.tom),
    };
};

export const mapTidsperiodeToTidsperiodeDatoInputVerdi = (t: Partial<Tidsperiode>): Partial<TidsperiodeString> => {
    return {
        fom: dateToISOString(t.fom),
        tom: dateToISOString(t.tom),
    };
};
