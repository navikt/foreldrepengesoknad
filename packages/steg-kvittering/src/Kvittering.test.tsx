import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { getLenker } from '@navikt/fp-utils';

import * as stories from './Kvittering.stories';

const { KreverGoSysHandlingGåTilMinSide, JournalførtGåTilInnsyn } = composeStories(stories);

describe('<MedSaksnummer>', () => {
    it('Hvis krever gosys handling skal navigering gå til min side', async () => {
        render(<KreverGoSysHandlingGåTilMinSide />);
        const buttonLink = await screen.findByRole('button', { name: 'Se søknaden din på Min side' });
        expect(buttonLink).toHaveAttribute('href', getLenker().minSide);
    });

    it('Hvis journalført skal vi gå til innsyn på et saksnummer', async () => {
        render(<JournalførtGåTilInnsyn />);
        const buttonLink = await screen.findByRole('button', { name: 'Se søknaden din på Min side' });
        expect(buttonLink).toHaveAttribute('href', `${getLenker().innsyn}/sak/1`);
    });
});
