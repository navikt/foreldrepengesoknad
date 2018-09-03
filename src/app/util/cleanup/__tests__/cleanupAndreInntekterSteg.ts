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
    andreInntekterSiste10Mnd: [annenInntekt as AnnenInntekt]
};

describe('cleanupAndreInntekterSteg', () => {
    describe('selvstendigNæringsdrivendeInformasjon', () => {
        it('should be undefined if harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd is not true', () => {
            const søker = cleanup(søkerPartial as Søker);
            const { selvstendigNæringsdrivendeInformasjon } = søker;
            expect(selvstendigNæringsdrivendeInformasjon).toBeUndefined();
        });
    });

    describe('frilansInformasjon', () => {
        it('should be undefined if harJobbetSomFrilansSiste10Mnd is not true', () => {
            const søker = cleanup(søkerPartial as Søker);
            const { frilansInformasjon } = søker;
            expect(frilansInformasjon).toBeUndefined();
        });
    });

    describe('andreInntekterSiste10Mnd', () => {
        it('should be undefined if harHattAnnenInntektSiste10Mnd is not true', () => {
            const søker = cleanup(søkerPartial as Søker);
            const { andreInntekterSiste10Mnd } = søker;
            expect(andreInntekterSiste10Mnd).toBeUndefined();
        });
    });
});
