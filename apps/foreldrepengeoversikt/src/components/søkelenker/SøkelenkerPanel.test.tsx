import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { erLokaltEllerDev } from '@navikt/fp-utils';

import * as stories from './SøkelenkerPanel.stories';

vi.mock('@navikt/fp-utils', { spy: true });

const { Default } = composeStories(stories);

describe('<SøkelenkerPanel>', () => {
    afterEach(() => {
        vi.mocked(erLokaltEllerDev).mockReset();
    });

    it('skal vise lenker', async () => {
        render(<Default />);

        expect(await screen.findByText('Les om hva du har rett på')).toBeInTheDocument();
        expect(screen.getByText('Søk om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Søk om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Søk om engangsstønad')).toBeInTheDocument();
    });

    it.each([
        { erDev: true, host: 'https://www.intern.dev.nav.no' },
        { erDev: false, host: 'https://www.nav.no' },
    ])('lenker til søknadene på $host', async ({ erDev, host }) => {
        vi.mocked(erLokaltEllerDev).mockReturnValue(erDev);

        render(<Default />);

        expect(await screen.findByRole('link', { name: 'Søk om foreldrepenger' })).toHaveAttribute(
            'href',
            `${host}/foreldrepenger/soknad`,
        );
        expect(screen.getByRole('link', { name: 'Søk om svangerskapspenger' })).toHaveAttribute(
            'href',
            `${host}/svangerskapspenger/soknad`,
        );
        expect(screen.getByRole('link', { name: 'Søk om engangsstønad' })).toHaveAttribute(
            'href',
            `${host}/engangsstonad/soknad`,
        );
        expect(screen.getByRole('link', { name: /Les om hva du har rett på/ })).toHaveAttribute(
            'href',
            'https://www.nav.no/barn',
        );
    });
});
