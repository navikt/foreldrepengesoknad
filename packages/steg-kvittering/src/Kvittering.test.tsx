import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Kvittering.stories';

import messages from './intl/messages/nb_NO.json';

const { KreverGoSysHandlingGåTilMinSide, JournalførtGåTilInnsyn } = composeStories(stories);

describe('<MedSaksnummer>', () => {
    it('Hvis krever gosys handling skal navigering gå til min side', async () => {
        render(<KreverGoSysHandlingGåTilMinSide />);
        const buttonLink = await screen.findByRole('button', { name: messages['minSide.button'] });
        expect(buttonLink).toHaveAttribute('href', 'https://www.nav.no/minside');
    });

    it('Hvis journalført skal vi gå til innsyn på et saksnummer', async () => {
        render(<JournalførtGåTilInnsyn />);
        const buttonLink = await screen.findByRole('button', { name: messages['minSide.button'] });
        expect(buttonLink).toHaveAttribute('href', 'https://www.nav.no/foreldrepenger/oversikt/sak/1');
    });
});
