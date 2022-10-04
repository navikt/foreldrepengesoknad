import MockDate from 'mockdate';
import hvemSkalTaUttakSkalBesvares from './hvemSkalTaUttakSkalBesvares';

describe('hvemSkalTaUttakSkalBesvares - når WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    const erDeltUttakINorge = true;
    const erFarEllerMedmor = true;
    const fødsel = 'fødsel';

    it('Far/medmor skal ikke måtte besvare spørsmål om hvem som skal ta uttak hvis de legger til periode før fødsel og det er delt uttak i Norge ', () => {
        const result = hvemSkalTaUttakSkalBesvares(
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            erDeltUttakINorge,
            new Date('2022-08-10T00:00:00.000Z'),
            erFarEllerMedmor,
            fødsel
        );
        expect(result).toEqual(false);
    });
    it('Far/medmor skal ikke måtte besvare spørsmål om hvem som skal ta uttak hvis de legger til periode som starter de første seks ukene etter fødsel og det er delt uttak i Norge', () => {
        const result = hvemSkalTaUttakSkalBesvares(
            { fom: new Date('2022-09-20T00:00:00.000Z'), tom: new Date('2022-09-20T00:00:00.000Z') },
            erDeltUttakINorge,
            new Date('2022-08-10T00:00:00.000Z'),
            erFarEllerMedmor,
            fødsel
        );
        expect(result).toEqual(false);
    });
    it('Far/medmor skal måtte besvare spørsmål om hvem som skal ta uttak hvis de legger til periode som starter etter første seks ukene etter fødsel og det er delt uttak i Norge', () => {
        const result = hvemSkalTaUttakSkalBesvares(
            { fom: new Date('2022-09-21T00:00:00.000Z'), tom: new Date('2022-09-21T00:00:00.000Z') },
            erDeltUttakINorge,
            new Date('2022-08-10T00:00:00.000Z'),
            erFarEllerMedmor,
            fødsel
        );
        expect(result).toEqual(true);
    });
    it('Far/medmor skal ikke måtte besvare spørsmål om hvem som skal ta uttak hvis ikke delt uttak i Norge', () => {
        const result = hvemSkalTaUttakSkalBesvares(
            { fom: new Date('2022-09-21T00:00:00.000Z'), tom: new Date('2022-09-21T00:00:00.000Z') },
            !erDeltUttakINorge,
            new Date('2022-08-10T00:00:00.000Z'),
            erFarEllerMedmor,
            fødsel
        );
        expect(result).toEqual(false);
    });
    it('Mor skal ikke måtte besvare spørsmål om hvem som skal ta uttak hvis ikke delt uttak i Norge', () => {
        const result = hvemSkalTaUttakSkalBesvares(
            { fom: new Date('2022-09-21T00:00:00.000Z'), tom: new Date('2022-09-21T00:00:00.000Z') },
            !erDeltUttakINorge,
            new Date('2022-08-10T00:00:00.000Z'),
            !erFarEllerMedmor,
            fødsel
        );
        expect(result).toEqual(false);
    });
});
