import { NæringDto } from '@navikt/fp-types';

import { skalViseEgenNæringSteg } from './skalViseEgenNæringSteg';

const ferdigUtfyltNæring = {
    navnPåNæringen: 'Fiskebåten',
    næringstype: 'FISKE',
    fom: '2024-01-01',
    registrertINorge: true,
} satisfies NæringDto;

describe('skalViseEgenNæringSteg', () => {
    it('skal vise steget for registrert næring selv om svarene er lagret', () => {
        expect(
            skalViseEgenNæringSteg({
                harJobbetSomSelvstendigNæringsdrivende: true,
                harRegistrertNæring: true,
                egenNæring: ferdigUtfyltNæring,
            }),
        ).toBe(true);
    });

    it('skal skjule steget når næringen er ferdig utfylt via Legg til inntekt', () => {
        expect(
            skalViseEgenNæringSteg({
                harJobbetSomSelvstendigNæringsdrivende: true,
                harRegistrertNæring: false,
                egenNæring: ferdigUtfyltNæring,
            }),
        ).toBe(false);
    });

    it('skal vise steget for ufullstendig eller gammel flyt uten registertreff', () => {
        expect(
            skalViseEgenNæringSteg({
                harJobbetSomSelvstendigNæringsdrivende: true,
                harRegistrertNæring: false,
            }),
        ).toBe(true);
    });

    it('skal beholde gammelt steg mens brukeren står på det', () => {
        expect(
            skalViseEgenNæringSteg({
                harJobbetSomSelvstendigNæringsdrivende: true,
                harRegistrertNæring: false,
                egenNæring: ferdigUtfyltNæring,
                erPåEgenNæringSteg: true,
            }),
        ).toBe(true);
    });
});
