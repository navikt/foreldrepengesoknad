import {
    Periodetype,
    UtsettelseÅrsakType,
    Utsettelsesperiode
} from 'uttaksplan/types';

export const mockArbeid: Utsettelsesperiode = {
    id: '380114646-12555-8102-5233-7705536919779',
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Arbeid,
    tidsperiode: {
        fom: new Date('2018-07-30T22:00:00.000Z'),
        tom: new Date('2018-07-30T22:00:00.000Z')
    },
    forelder: 'forelder1'
};
export const mockFerie: Utsettelsesperiode = {
    id: '380114646-12555-8102-5233-7705536919777',
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Ferie,
    tidsperiode: {
        fom: new Date('2018-08-05T22:00:00.000Z'),
        tom: new Date('2018-08-10T22:00:00.000Z')
    },
    forelder: 'forelder1'
};

export const mockUtsettelser = [mockFerie];
