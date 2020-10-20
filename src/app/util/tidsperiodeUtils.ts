import { createDatoInputVerdi } from '../../common/components/skjema/elements/dato-input/datoInputUtils';
import { Tidsperiode, TidsperiodeDatoInputVerdi } from '../../common/types';

export const mapTidsperiodeDatoInputVerdiToTidsperiode = (
    t: Partial<TidsperiodeDatoInputVerdi>
): Partial<Tidsperiode> => {
    return {
        fom: t.fom?.date,
        tom: t.tom?.date,
    };
};

export const mapTidsperiodeToTidsperiodeDatoInputVerdi = (
    t: Partial<Tidsperiode>
): Partial<TidsperiodeDatoInputVerdi> => {
    return {
        fom: createDatoInputVerdi(t.fom),
        tom: createDatoInputVerdi(t.tom),
    };
};
