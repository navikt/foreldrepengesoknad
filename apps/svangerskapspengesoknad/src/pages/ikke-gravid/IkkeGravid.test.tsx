import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './IkkeGravid.stories';

const { Default } = composeStories(stories);

describe('<IkkeGravid>', () => {
    it('skal vise tittel og tekst', async () => {
        render(<Default />);

        expect(await screen.findByText('Du kan ikke søke om svangerskapspenger')).toBeInTheDocument();
        expect(
            screen.getByText(
                /Du har dessverre ikke rett på svangerskapspenger. Svangerskapspenger er for deg som er gravid/,
            ),
        ).toBeInTheDocument();
    });

    it('skal vise knapp til nav.no', async () => {
        render(<Default />);

        expect(await screen.findByText('Gå til nav.no')).toBeInTheDocument();

        const link = screen.getByRole('link', { name: 'Gå til nav.no' });
        expect(link).toHaveAttribute('href', 'https://www.nav.no');
    });
});

