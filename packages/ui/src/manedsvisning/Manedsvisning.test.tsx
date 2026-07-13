import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Manedsvisning.stories';

const { Standard, UtenUkenummer, HelgSkjult, TomMåned } = composeStories(stories);

describe('<Manedsvisning>', () => {
    it('skal vise ukenummer for alle vekene i månaden', async () => {
        render(<Standard />);
        const ukenummer = (await screen.findAllByTestId('ukenummer')).map((el) => el.textContent);
        expect(ukenummer.length).toBeGreaterThan(0);
    });

    it('skal ikkje vise ukenummer når showWeekNumbers er false', () => {
        render(<UtenUkenummer />);
        expect(screen.queryByTestId('ukenummer')).not.toBeInTheDocument();
    });

    it('skal skjule helgedagane når hideWeekend er sett', () => {
        render(<HelgSkjult />);
        // 4.-8. mai 2026 er ei arbeidsveke måndag-fredag; ei helg (9.-10. mai) skal ikkje finnast
        expect(screen.queryByTestId('dag:9')).not.toBeInTheDocument();
        expect(screen.queryByTestId('dag:10')).not.toBeInTheDocument();
    });

    it('skal vise korrekt periodetype på dagane i mai 2026', async () => {
        render(<Standard />);
        expect(await screen.findByTestId('dag:4;type:MOR')).toBeInTheDocument();
        expect(screen.getByTestId('dag:18;type:FAR')).toBeInTheDocument();
        expect(screen.getByTestId('dag:13;type:FELLES')).toBeInTheDocument();
        expect(screen.getByTestId('dag:14;type:FERIE')).toBeInTheDocument();
    });

    it('skal ikkje vise nokon periodar i ein tom månad', () => {
        render(<TomMåned />);
        expect(screen.queryByTestId(/type:/, { exact: false })).not.toBeInTheDocument();
    });

    it('skal vise månadstittelen', async () => {
        render(<Standard />);
        expect(await screen.findByText('Mai 2026')).toBeInTheDocument();
    });
});
