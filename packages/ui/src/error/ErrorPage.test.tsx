import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { links } from '@navikt/fp-constants';

import * as stories from './ErrorPage.stories';

const { Default } = composeStories(stories);

describe('<ErrorPage>', () => {
    it('skal vise kontakt brukerstøtte som én lenke og ikke som knapp', () => {
        render(<Default />);

        expect(screen.getByRole('link', { name: 'Kontakt brukerstøtte' })).toHaveAttribute('href', links.kontaktOss);
        expect(screen.queryByRole('button', { name: 'Kontakt brukerstøtte' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Søk på nytt' })).toBeInTheDocument();
    });
});
