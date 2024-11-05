import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './HarIkkeSaker.stories';

const { HarOppdatertSak, Default } = composeStories(stories);

describe('<HarIkkeSaker>', () => {
    it('skal vise infotekst og lenker', async () => {
        render(<HarOppdatertSak />);

        expect(
            await screen.findByText('Du har ingen søknader om foreldrepenger, engangsstønad eller svangerskapspenger'),
        ).toBeInTheDocument();
        expect(screen.getByText('Les om hva du har rett på')).toBeInTheDocument();
        expect(screen.getByText('Søk om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Søk om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Søk om engangsstønad')).toBeInTheDocument();
    });

    it('skal kun vise lenker', async () => {
        render(<Default />);

        expect(await screen.findByText('Les om hva du har rett på')).toBeInTheDocument();
        expect(screen.getByText('Søk om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Søk om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Søk om engangsstønad')).toBeInTheDocument();
        expect(
            screen.queryByText('Du har ingen søknader om foreldrepenger, engangsstønad eller svangerskapspenger'),
        ).not.toBeInTheDocument();
    });
});
