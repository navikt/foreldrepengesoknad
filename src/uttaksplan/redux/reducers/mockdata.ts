import {
    Periodetype,
    UtsettelseÅrsakType,
    Utsettelsesperiode,
    TaptPeriode
} from 'uttaksplan/types';

export const mockArbeid: Utsettelsesperiode = {
    id: '380114646-12555-8102-5233-7705536919779',
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Arbeid,
    tidsperiode: {
        startdato: new Date('2018-07-30T22:00:00.000Z'),
        sluttdato: new Date('2018-07-30T22:00:00.000Z')
    },
    forelder: 'forelder1'
};
export const mockFerie: Utsettelsesperiode = {
    id: '380114646-12555-8102-5233-7705536919777',
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Ferie,
    tidsperiode: {
        startdato: new Date('2018-08-05T22:00:00.000Z'),
        sluttdato: new Date('2018-08-10T22:00:00.000Z')
    },
    forelder: 'forelder1'
};

export const taptPeriodeMock: TaptPeriode = {
    id: '047917579-30650-03820-6480-44252887821741',
    type: Periodetype.TaptPeriode,
    tidsperiode: {
        startdato: new Date('2018-07-06T10:00:00.000Z'),
        sluttdato: new Date('2018-07-08T22:00:00.000Z')
    },
    forelder: 'forelder1'
};

export const mockUtsettelser = [mockFerie];
