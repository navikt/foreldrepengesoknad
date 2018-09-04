import cleanup from './../cleanupNæring';
import {
    Næring,
    NæringPartial,
    Næringsrelasjon,
    NæringsrelasjonPartial
} from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';

jest.mock('../../../components/selvstendig-næringsdrivende-modal/visibility', () => ({
    næringRegistrertILand: () => false,
    nyIArbeidslivet: () => false,
    varigEndringAvNæringsinntekt: () => false,
    revisorBolk: () => false,
    kanInnhenteOpplysningerFraRevisor: () => false
}));

const revisorMock: NæringsrelasjonPartial = {};
const regnskapsførerMock: NæringsrelasjonPartial = {};

const næring: NæringPartial = {
    registrertILand: 'testland',
    nyIArbeidslivet: true,
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
    harRevisor: true,
    revisor: revisorMock as Næringsrelasjon,
    harRegnskapsfører: true,
    regnskapsfører: regnskapsførerMock as Næringsrelasjon,
    kanInnhenteOpplsyningerFraRevisor: true
};

describe('cleanupNæring', () => {
    it('should set næring properties to undefined where fields are not visible', () => {
        const result = cleanup(næring as Næring);
        const {
            registrertILand,
            nyIArbeidslivet,
            hattVarigEndringAvNæringsinntektSiste4Kalenderår,
            harRevisor,
            kanInnhenteOpplsyningerFraRevisor
        } = result;

        expect(registrertILand).toBeUndefined();
        expect(nyIArbeidslivet).toBeUndefined();
        expect(hattVarigEndringAvNæringsinntektSiste4Kalenderår).toBeUndefined();
        expect(harRevisor).toBeUndefined();
        expect(kanInnhenteOpplsyningerFraRevisor).toBeUndefined();
    });
});
