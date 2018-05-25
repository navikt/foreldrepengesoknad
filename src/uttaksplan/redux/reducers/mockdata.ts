import {
    Periodetype,
    UtsettelseÅrsakType,
    Utsettelsesperiode
} from 'uttaksplan/types';

const mockArbeid: Utsettelsesperiode = {
    id: '380114646-12555-8102-5233-7705536919779',
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Arbeid,
    tidsperiode: {
        startdato: new Date('2018-06-28T22:00:00.000Z'),
        sluttdato: new Date('2018-06-28T22:00:00.000Z')
    },
    forelder: 'forelder1'
};
const mockFerie: Utsettelsesperiode = {
    id: '380114646-12555-8102-5233-7705536919777',
    type: Periodetype.Utsettelse,
    årsak: UtsettelseÅrsakType.Ferie,
    tidsperiode: {
        startdato: new Date('2018-07-05T22:00:00.000Z'),
        sluttdato: new Date('2018-07-10T22:00:00.000Z')
    },
    forelder: 'forelder1'
};

export const mockUtsettelser = [mockArbeid, mockFerie];
