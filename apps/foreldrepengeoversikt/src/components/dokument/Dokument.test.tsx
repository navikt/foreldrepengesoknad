import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Dokument.stories';

const { Default, UtenTittel } = composeStories(stories);

describe('<Dokument>', () => {
    it('skal bruke tittelen som lenketekst', async () => {
        render(<Default />);

        expect(await screen.findAllByRole('link', { name: 'Dette er en tittel' })).not.toHaveLength(0);
    });

    it('skal vise reservetekst som lenketekst når dokumentet mangler tittel', async () => {
        render(<UtenTittel />);

        expect(await screen.findAllByRole('link', { name: 'Dokument uten tittel' })).not.toHaveLength(0);
    });
});
