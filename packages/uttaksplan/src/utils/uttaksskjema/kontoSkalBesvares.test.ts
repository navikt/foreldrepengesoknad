import MockDate from 'mockdate';

import { Periodetype, StønadskontoType } from '@navikt/fp-constants';

import kontoSkalBesvares from './kontoSkalBesvarer';

describe('kontoSkalBesvares - når WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Far/medmor skal ikke måtte besvare spørsmål om konto hvis de legger til periode før fødsel', () => {
        const result = kontoSkalBesvares(
            Periodetype.Uttak,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            [{ konto: StønadskontoType.Fedrekvote, dager: 50 }], //stønadskontoer
            new Date('2022-08-10T00:00:00.000Z'), //familiehendelsesdato
            true, //erFarEllerMedmor
        );
        expect(result).toEqual(false);
    });
    it('Far/medmor skal måtte besvare spørsmål om konto hvis de legger til periode de første seks ukene etter fødsel', () => {
        const result = kontoSkalBesvares(
            Periodetype.Uttak,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            [{ konto: StønadskontoType.Fedrekvote, dager: 50 }], //stønadskontoer
            new Date('2022-08-08T00:00:00.000Z'), //familiehendelsesdato
            true, //erFarEllerMedmor
        );
        expect(result).toEqual(true);
    });
});
