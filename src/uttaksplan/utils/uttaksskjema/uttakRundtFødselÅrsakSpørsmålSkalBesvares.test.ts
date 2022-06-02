import { Periodetype } from 'uttaksplan/types/Periode';
import uttakRundtFødselÅrsakSpørsmålSkalBesvares from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';
import MockDate from 'mockdate';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

describe('uttakRundtFødselÅrsakSpørsmålSkalBesvares - når WLB gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal måtte besvare spørsmål om type uttak rundt fødsel hvis far/medmor velger å bruke fedrekvote rundt fødsel', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            true, //søkerErFarEllerMedmor
            false, //erFlerbarnssøknad
            false, //erAleneOmOmsorg
            false, //annenForelderKanIkkeOppgis
            false, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel' //situasjon
        );
        expect(result).toEqual(true);
    });
    it('Skal ikke måtte besvare spørsmål om type uttak rundt fødsel hvis far/medmor ikke velger å bruke fedrekvote', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fellesperiode,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            true, //søkerErFarEllerMedmor
            false, //erFlerbarnssøknad
            false, //erAleneOmOmsorg
            false, //annenForelderKanIkkeOppgis
            false, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel' //situasjon
        );
        expect(result).toEqual(false);
    });
    it('Skal ikke måtte besvare spørsmål om type uttak rundt fødsel hvis far/medmor setter perioden mer enn 6 uker etter fødsel', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            { fom: new Date('2022-09-14T00:00:00.000Z'), tom: new Date('2022-09-15T00:00:00.000Z') },
            true, //søkerErFarEllerMedmor
            false, //erFlerbarnssøknad
            false, //erAleneOmOmsorg
            false, //annenForelderKanIkkeOppgis
            false, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel' //situasjon
        );
        expect(result).toEqual(false);
    });
    it('Skal ikke måtte besvare spørsmål om type uttak rundt fødsel hvis søker er mor', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            false, //søkerErFarEllerMedmor
            false, //erFlerbarnssøknad
            false, //erAleneOmOmsorg
            false, //annenForelderKanIkkeOppgis
            false, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel' //situasjon
        );
        expect(result).toEqual(false);
    });
    it('Skal ikke måtte besvare spørsmål om type uttak rundt fødsel hvis far/medmor ønsker å bruke flerbarnsdager', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            true, //søkerErFarEllerMedmor
            true, //erFlerbarnssøknad
            false, //erAleneOmOmsorg
            false, //annenForelderKanIkkeOppgis
            true, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel' //situasjon
        );
        expect(result).toEqual(false);
    });
    it('Skal ikke måtte besvare spørsmål om type uttak rundt fødsel hvis far/medmor har aleneomsorg', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            true, //søkerErFarEllerMedmor
            true, //erFlerbarnssøknad
            true, //erAleneOmOmsorg
            false, //annenForelderKanIkkeOppgis
            false, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel' // situasjon
        );
        expect(result).toEqual(false);
    });
    it('Skal ikke måtte besvare spørsmål om type uttak rundt fødsel hvis far/medmor søker og annen forelder kan ikke oppgis', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            true, //søkerErFarEllerMedmor
            true, //erFlerbarnssøknad
            false, //erAleneOmOmsorg
            true, //annenForelderKanIkkeOppgis
            false, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel' //situasjon
        );
        expect(result).toEqual(false);
    });
    it('Skal ikke måtte besvare spørsmål om type uttak rundt fødsel hvis barnet er adoptert', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            true, //søkerErFarEllerMedmor
            false, //erFlerbarnssøknad
            false, //erAleneOmOmsorg
            false, //annenForelderKanIkkeOppgis
            false, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'adopsjon' //situasjon
        );
        expect(result).toEqual(false);
    });
});

describe('uttakRundtFødselÅrsakSpørsmålSkalBesvares - når WLB ikke gjelder', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-01T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal ikke måtte besvare spørsmål om type uttak rundt fødsel hvis far/medmor velger å bruke fedrekvote rundt fødsel', () => {
        const result = uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            Periodetype.Uttak,
            StønadskontoType.Fedrekvote,
            { fom: new Date('2022-08-08T00:00:00.000Z'), tom: new Date('2022-08-09T00:00:00.000Z') },
            true, //søkerErFarEllerMedmor
            false, //erFlerbarnssøknad
            false, //erAleneOmOmsorg
            false, //annenForelderKanIkkeOppgis
            false, //ønskerFlerbarnsdager
            false, //søkerHarMidlertidigOmsorg
            new Date('2022-08-02T00:00:00.000Z'), //familiehendelsesdato
            new Date('2022-08-02T00:00:00.000Z'), //termindato
            'fødsel' //situasjon
        );
        expect(result).toEqual(false);
    });
});
