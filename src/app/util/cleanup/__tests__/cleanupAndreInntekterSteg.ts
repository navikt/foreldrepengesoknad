import cleanup from './../cleanupAndreInntekterSteg';
import { default as Søker, SøkerPartial } from '../../../types/søknad/Søker';
import { Næring } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { FrilansInformasjon } from '../../../types/søknad/FrilansInformasjon';
import { AnnenInntekt } from '../../../types/søknad/AnnenInntekt';

const næring1 = {};
const frilans = {};
const annenInntekt = {};

const søkerPartial: SøkerPartial = {
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    harJobbetSomFrilansSiste10Mnd: false,
    harHattAnnenInntektSiste10Mnd: false,
    selvstendigNæringsdrivendeInformasjon: [næring1 as Næring],
    frilansInformasjon: frilans as FrilansInformasjon,
    andreInntekterSiste10Mnd: [annenInntekt as AnnenInntekt],
};

jest.mock('../cleanupNæring', () => () => 1);
jest.mock('../cleanupFrilansInformasjon', () => () => 2);
jest.mock('../cleanupAnnenInntekt', () => () => 3);

describe('cleanupAndreInntekterSteg', () => {
    describe('selvstendigNæringsdrivendeInformasjon', () => {
        it('should be undefined if harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd is not true', () => {
            const søker = cleanup(søkerPartial as Søker);
            const { selvstendigNæringsdrivendeInformasjon } = søker;
            expect(selvstendigNæringsdrivendeInformasjon).toBeUndefined();
        });

        it('should assign return-values from cleanupNæring to every row in selvstendigNæringsdrivendeInformasjon if harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', () => {
            søkerPartial.selvstendigNæringsdrivendeInformasjon = [næring1 as Næring];
            søkerPartial.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd = true;

            const søker = cleanup(søkerPartial as Søker);
            expect(søker.selvstendigNæringsdrivendeInformasjon).toBeDefined();
            if (søker.selvstendigNæringsdrivendeInformasjon) {
                expect(søker.selvstendigNæringsdrivendeInformasjon[0]).toBe(1);
            }
        });
    });

    describe('frilansInformasjon', () => {
        it('should be undefined if harJobbetSomFrilansSiste10Mnd is not true', () => {
            const søker = cleanup(søkerPartial as Søker);
            const { frilansInformasjon } = søker;
            expect(frilansInformasjon).toBeUndefined();
        });

        it('should set frilansInformasjon to return value from cleanupFrilansInformasjon if harJobbetSomFrilansSiste10Mnd', () => {
            søkerPartial.harJobbetSomFrilansSiste10Mnd = true;
            søkerPartial.frilansInformasjon = frilans as FrilansInformasjon;
            const søker = cleanup(søkerPartial as Søker);
            expect(søker.frilansInformasjon).toBe(2);
        });
    });

    describe('andreInntekterSiste10Mnd', () => {
        it('should be undefined if harHattAnnenInntektSiste10Mnd is not true', () => {
            const søker = cleanup(søkerPartial as Søker);
            const { andreInntekterSiste10Mnd } = søker;
            expect(andreInntekterSiste10Mnd).toBeUndefined();
        });

        it('should assign return-values from cleanupAnnenInntekt to every row in andreInntekterSiste10Mnd if harHattAnnenInntektSiste10Mnd', () => {
            søkerPartial.andreInntekterSiste10Mnd = [annenInntekt as AnnenInntekt];
            søkerPartial.harHattAnnenInntektSiste10Mnd = true;

            const søker = cleanup(søkerPartial as Søker);
            expect(søker.andreInntekterSiste10Mnd).toBeDefined();
            if (søker.andreInntekterSiste10Mnd) {
                expect(søker.andreInntekterSiste10Mnd[0]).toBe(3);
            }
        });
    });
});
