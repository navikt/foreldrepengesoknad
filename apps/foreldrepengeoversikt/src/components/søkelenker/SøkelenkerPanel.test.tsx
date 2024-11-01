import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './SøkelenkerPanel.stories';

const { Default } = composeStories(stories);

describe('<SøkelenkerPanel>', () => {
    it('skal vise lenker', async () => {
        render(<Default />);

        expect(await screen.findByText('Les om hva du har rett på')).toBeInTheDocument();
        expect(screen.getByText('Søk om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Søk om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Søk om engangsstønad')).toBeInTheDocument();
    });
});
