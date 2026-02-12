import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Kvittering.stories';

const {
    KreverGoSysHandlingGåTilMinSide,
    JournalførtGåTilInnsyn,
    YngreMannEndringssøknad,
    EldreMannEndringssøknad,
    KvinneEndringssøknad,
    YngreMannFørstegangssøknad,
} = composeStories(stories);

describe('<MedSaksnummer>', () => {
    it('Hvis krever gosys handling skal navigering gå til min side', async () => {
        render(<KreverGoSysHandlingGåTilMinSide />);
        const buttonLink = await screen.findByRole('button', { name: 'Se søknaden din på Min side' });
        expect(buttonLink).toHaveAttribute('href', 'https://www.nav.no/minside');
    });

    it('Hvis journalført skal vi gå til innsyn på et saksnummer', async () => {
        render(<JournalførtGåTilInnsyn />);
        const buttonLink = await screen.findByRole('button', { name: 'Se søknaden din på Min side' });
        expect(buttonLink).toHaveAttribute('href', 'https://www.nav.no/foreldrepenger/oversikt/sak/1');
    });
});

describe('<YngreMannMelding>', () => {
    it('Skal vise melding for yngre mann ved endringssøknad', async () => {
        render(<YngreMannEndringssøknad />);
        expect(
            await screen.findByText(/som ung mann under 25 år som endrer søknaden om foreldrepenger/i),
        ).toBeInTheDocument();
    });

    it('Skal IKKE vise melding for eldre mann ved endringssøknad', async () => {
        render(<EldreMannEndringssøknad />);
        expect(
            screen.queryByText(/som ung mann under 25 år som endrer søknaden om foreldrepenger/i),
        ).not.toBeInTheDocument();
    });

    it('Skal IKKE vise melding for kvinne ved endringssøknad', async () => {
        render(<KvinneEndringssøknad />);
        expect(
            screen.queryByText(/som ung mann under 25 år som endrer søknaden om foreldrepenger/i),
        ).not.toBeInTheDocument();
    });

    it('Skal IKKE vise melding for yngre mann ved førstegangssøknad', async () => {
        render(<YngreMannFørstegangssøknad />);
        expect(
            screen.queryByText(/som ung mann under 25 år som endrer søknaden om foreldrepenger/i),
        ).not.toBeInTheDocument();
    });
});
