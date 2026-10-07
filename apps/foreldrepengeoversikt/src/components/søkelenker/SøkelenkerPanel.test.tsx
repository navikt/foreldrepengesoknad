import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { getLenker } from '@navikt/fp-utils';

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

    it('lenker til søknadene i kjøremiljøet og beholder informasjonssiden på nav.no', async () => {
        const lenker = getLenker();

        render(<Default />);

        expect(await screen.findByRole('link', { name: 'Søk om foreldrepenger' })).toHaveAttribute(
            'href',
            lenker.foreldrepengesoknad,
        );
        expect(screen.getByRole('link', { name: 'Søk om svangerskapspenger' })).toHaveAttribute(
            'href',
            lenker.svangerskapspengesoknad,
        );
        expect(screen.getByRole('link', { name: 'Søk om engangsstønad' })).toHaveAttribute(
            'href',
            lenker.engangsstønadSøknad,
        );
        expect(screen.getByRole('link', { name: /Les om hva du har rett på/ })).toHaveAttribute(
            'href',
            'https://www.nav.no/barn',
        );
    });
});
