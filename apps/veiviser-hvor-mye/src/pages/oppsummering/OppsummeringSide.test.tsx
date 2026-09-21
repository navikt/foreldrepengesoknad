import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './OppsummeringSide.stories';

const {
    ArbeidstakerMed20000Imåneden,
    ArbeidstakerMed100000Imåneden,
    ArbeidstakerMed1000Imåneden,
    ArbeidstakerMed10000IMåneden,
} = composeStories(stories);

describe('<OppsummeringSide>', () => {
    it('skal vise oppsummering for arbeidstaker med 20000 i måneden', async () => {
        render(<ArbeidstakerMed20000Imåneden />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();

        expect(screen.getByText('Gjennomsnittlig utbetaling med 100 % foreldrepenger i 49 uker')).toBeInTheDocument();
        expect(screen.getByText('Gjennomsnittlig utbetaling med 80 % foreldrepenger i 61 uker og 1 dag')).toBeInTheDocument();
        expect(screen.getAllByText('Månedlig før skatt')).toHaveLength(2);
        expect(screen.getAllByText('20 000 kr')).toHaveLength(4);
        expect(screen.getByText('16 000 kr')).toBeInTheDocument();
        expect(screen.getAllByText('Daglig før skatt')).toHaveLength(2);
        expect(screen.getByText('923 kr')).toBeInTheDocument();
        expect(screen.getByText('738 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 15 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('69 225 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 19 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('70 110 kr')).toBeInTheDocument();

        expect(
            screen.getByText('Mange får utbetalt lønn som vanlig fra arbeidsgiveren sin mens de har permisjon'),
        ).toBeInTheDocument();

        expect(screen.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();
    });

    it('skal vise oppsummering for arbeidstaker med 100000 i måneden', async () => {
        render(<ArbeidstakerMed100000Imåneden />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();

        expect(screen.getByText('Du får dekket opptil 819 294 kr av din inntekt')).toBeInTheDocument();

        expect(screen.getByText('Gjennomsnittlig utbetaling med 100 % foreldrepenger i 49 uker')).toBeInTheDocument();
        expect(screen.getByText('Gjennomsnittlig utbetaling med 80 % foreldrepenger i 61 uker og 1 dag')).toBeInTheDocument();
        expect(screen.getAllByText('Månedlig før skatt')).toHaveLength(2);
        expect(screen.getByText('68 275 kr')).toBeInTheDocument();
        expect(screen.getByText('54 620 kr')).toBeInTheDocument();
        expect(screen.getAllByText('Daglig før skatt')).toHaveLength(2);
        expect(screen.getByText('3 151 kr')).toBeInTheDocument();
        expect(screen.getByText('2 521 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 15 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('236 325 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 19 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('239 495 kr')).toBeInTheDocument();

        expect(
            screen.getByText('Mange får utbetalt lønn som vanlig fra arbeidsgiveren sin mens de har permisjon'),
        ).toBeInTheDocument();

        expect(screen.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();

        expect(screen.getAllByText('100 000 kr')).toHaveLength(3);
    });

    it('skal vise oppsummering for arbeidstaker med 1000 i måneden', async () => {
        render(<ArbeidstakerMed1000Imåneden />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();

        expect(screen.getByText('Med årslønn under 68 275 kr har du ikke rett til foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText(/12 000 kr i året/)).toBeInTheDocument();
        expect(screen.getByText(/68 275 kr i året/)).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for arbeidstaker med 10000 i måneden', async () => {
        render(<ArbeidstakerMed10000IMåneden />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();

        expect(screen.queryByText('Du får dekket opptil 780 960 kr av din inntekt')).not.toBeInTheDocument();

        expect(screen.getByText('Gjennomsnittlig utbetaling med 100 % foreldrepenger i 49 uker')).toBeInTheDocument();
        expect(screen.getByText('Gjennomsnittlig utbetaling med 80 % foreldrepenger i 61 uker og 1 dag')).toBeInTheDocument();
        expect(screen.getAllByText('Månedlig før skatt')).toHaveLength(2);
        expect(screen.getAllByText('10 000 kr')).toHaveLength(4);
        expect(screen.getByText('8 000 kr')).toBeInTheDocument();
        expect(screen.getAllByText('Daglig før skatt')).toHaveLength(2);
        expect(screen.getByText('462 kr')).toBeInTheDocument();
        expect(screen.getByText('369 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 15 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('34 650 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 19 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('35 055 kr')).toBeInTheDocument();

        expect(
            screen.getByText('Det kan være lurt for deg å sammenligne foreldrepenger og engangsstønad'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Mange får utbetalt lønn som vanlig fra arbeidsgiveren sin mens de har permisjon'),
        ).toBeInTheDocument();

        expect(screen.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();
    });
});
