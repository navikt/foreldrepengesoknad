import { Periodetype } from 'uttaksplan/types/Periode';
import MockDate from 'mockdate';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { graderingSkalBesvaresPgaWLBUttakRundtFødsel } from './graderingSkalBesvaresPgaWLBUttakRundtFødsel';

describe('graderingSkalBesvaresPgaWLBUttakRundtFødsel - når WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal måtte besvare spørsmål om gradering hvis legger til uttak av fedrekvote rundt fødsel', () => {
        const result = graderingSkalBesvaresPgaWLBUttakRundtFødsel(
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            true, //erFarEllerMedmor
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel'
        );
        expect(result).toEqual(true);
    });
    it('Skal ikke måtte besvare spørsmål om gradering hvis er mor', () => {
        const result = graderingSkalBesvaresPgaWLBUttakRundtFødsel(
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            false, //erFarEllerMedmor
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel'
        );
        expect(result).toEqual(false);
    });
    it('Skal ikke måtte besvare spørsmål om gradering hvis bruker en annen kvote enn fedrekvote', () => {
        const result = graderingSkalBesvaresPgaWLBUttakRundtFødsel(
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            Periodetype.Uttak,
            StønadskontoType.Fellesperiode,
            true, //erFarEllerMedmor
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel'
        );
        expect(result).toEqual(false);
    });
});
describe('graderingSkalBesvaresPgaWLBUttakRundtFødsel - når WLB ikke gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-01T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal ikke måtte besvare spørsmål om gradering pga WLB fordi WLB ikke gjelder', () => {
        const result = graderingSkalBesvaresPgaWLBUttakRundtFødsel(
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            true, //erFarEllerMedmor
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato,
            'fødsel'
        );
        expect(result).toEqual(false);
    });
});
