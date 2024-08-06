import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OppsummeringSide.stories';

const {
    ArbeidstakerMed20000Imåneden,
    ArbeidstakerMed100000Imåneden,
    ArbeidstakerMed1000Imåneden,
    ArbeidstakerMed10000IMåneden,
} = composeStories(stories);

describe('<OppsummeringSide>', () => {
    it('skal vise oppsummering for arbeidstaker med 20000 i måneden ', async () => {
        render(<ArbeidstakerMed20000Imåneden />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();

        expect(screen.getByText('Gjennomsnittlig utbetaling med 100% foreldrepenger i 49 uker')).toBeInTheDocument();
        expect(screen.getByText('Gjennomsnittlig utbetaling med 80% foreldrepenger i 59 uker')).toBeInTheDocument();
        expect(screen.getAllByText('Månedlig før skatt')).toHaveLength(2);
        expect(screen.getAllByText('20 000 kr')).toHaveLength(4);
        expect(screen.getByText('16 000 kr')).toBeInTheDocument();
        expect(screen.getAllByText('Daglig før skatt')).toHaveLength(2);
        expect(screen.getByText('923 kr')).toBeInTheDocument();
        expect(screen.getByText('738 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 25 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('115 375 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 30 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('110 700 kr')).toBeInTheDocument();

        expect(
            screen.getByText('Mange får lønn utbetalt som vanlig fra arbeidsgiveren sin mens man har permisjon'),
        ).toBeInTheDocument();

        expect(screen.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();
    });

    it('skal vise oppsummering for arbeidstaker med 100000 i måneden ', async () => {
        render(<ArbeidstakerMed100000Imåneden />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();

        expect(screen.getByText('Du får dekket opptil 744 168 kr av din inntekt')).toBeInTheDocument();

        expect(screen.getByText('Gjennomsnittlig utbetaling med 100% foreldrepenger i 49 uker')).toBeInTheDocument();
        expect(screen.getByText('Gjennomsnittlig utbetaling med 80% foreldrepenger i 59 uker')).toBeInTheDocument();
        expect(screen.getAllByText('Månedlig før skatt')).toHaveLength(2);
        expect(screen.getByText('62 014 kr')).toBeInTheDocument();
        expect(screen.getByText('49 611 kr')).toBeInTheDocument();
        expect(screen.getAllByText('Daglig før skatt')).toHaveLength(2);
        expect(screen.getByText('2 862 kr')).toBeInTheDocument();
        expect(screen.getByText('2 290 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 25 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('357 750 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 30 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('343 500 kr')).toBeInTheDocument();

        expect(
            screen.getByText('Mange får lønn utbetalt som vanlig fra arbeidsgiveren sin mens man har permisjon'),
        ).toBeInTheDocument();

        expect(screen.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();

        expect(screen.getAllByText('100 000 kr')).toHaveLength(3);
    });

    it('skal vise oppsummering for arbeidstaker med 1000 i måneden ', async () => {
        render(<ArbeidstakerMed1000Imåneden />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();

        expect(screen.getByText('Med årslønn under 62 014 kr har du ikke rett til foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText(/årslønn på 12 000 kr i året/)).toBeInTheDocument();
        expect(screen.getByText(/62 014 kr i året/)).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for arbeidstaker med 10000 i måneden ', async () => {
        render(<ArbeidstakerMed10000IMåneden />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();

        expect(screen.queryByText('Du får dekket opptil 744 168 kr av din inntekt')).not.toBeInTheDocument();

        expect(screen.getByText('Gjennomsnittlig utbetaling med 100% foreldrepenger i 49 uker')).toBeInTheDocument();
        expect(screen.getByText('Gjennomsnittlig utbetaling med 80% foreldrepenger i 59 uker')).toBeInTheDocument();
        expect(screen.getAllByText('Månedlig før skatt')).toHaveLength(2);
        expect(screen.getAllByText('10 000 kr')).toHaveLength(4);
        expect(screen.getByText('8 000 kr')).toBeInTheDocument();
        expect(screen.getAllByText('Daglig før skatt')).toHaveLength(2);
        expect(screen.getByText('462 kr')).toBeInTheDocument();
        expect(screen.getByText('369 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 25 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('57 750 kr')).toBeInTheDocument();
        expect(screen.getByText('Totalt for 30 uker før skatt')).toBeInTheDocument();
        expect(screen.getByText('55 350 kr')).toBeInTheDocument();

        expect(
            screen.getByText('Det kan være lurt for deg å sammenligne foreldrepenger og engangsstønad'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Mange får lønn utbetalt som vanlig fra arbeidsgiveren sin mens man har permisjon'),
        ).toBeInTheDocument();

        expect(screen.getByText('Nåværende arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Arbeidstaker eller frilanser')).toBeInTheDocument();
    });
});
