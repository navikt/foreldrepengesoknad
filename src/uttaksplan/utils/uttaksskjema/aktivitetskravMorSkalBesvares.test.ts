import { Periodetype } from 'uttaksplan/types/Periode';
import MockDate from 'mockdate';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';

describe('aktivitetskravMorSkalBesvares - når WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal ikke måtte besvare spørsmål om mors aktivitet hvis WLB gjelder og søker legger til periode rundt fødsel ', () => {
        const result = aktivitetskravMorSkalBesvares(
            false, //ønskerFlerbarnsdager
            true, //samtidigUttak
            false, //erMorForSyk
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            false, // søkerErMor
            false, // erAleneOmOmsorg
            false, //  annenForelderKanIkkeOppgis
            false, //søkerHarMidlertidigOmsorg
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            new Date('2022-08-08T00:00:00.000Z'),
            false //erFlerbarnssøknad
        );
        expect(result).toEqual(false);
    });
    it('Skal måtte besvare spørsmål om mors aktivitet søker legger til bruk av fellesperiode-kvote rundt fødsel ', () => {
        const result = aktivitetskravMorSkalBesvares(
            false, //ønskerFlerbarnsdager
            false, //samtidigUttak
            false, //erMorForSyk
            Periodetype.Uttak,
            StønadskontoType.Fellesperiode,
            false, // søkerErMor
            false, // erAleneOmOmsorg
            false, //  annenForelderKanIkkeOppgis
            false, //søkerHarMidlertidigOmsorg
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            new Date('2022-08-01T00:00:00.000Z'),
            false //erFlerbarnssøknad
        );
        expect(result).toEqual(true);
    });
});
