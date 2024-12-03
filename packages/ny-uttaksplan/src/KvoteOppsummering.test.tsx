import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import * as stories from './KvoteOppsummering.stories';

const { BeggeRettMorIngenDagerBrukt, BeggeRettMorLedigeDager } = composeStories(stories);

describe('<KvoteOppsummering >', () => {
    it('<BeggeRettMorLedigeDager >', async () => {
        render(<BeggeRettMorLedigeDager />);

        expect(screen.getByText('Det er 12 uker og 3 dager igjen som kan legges til i planen')).toBeInTheDocument();
        expect(
            screen.getByText(
                '5 uker og 2 dager av fellesperioden, 5 uker og 1 dag til mor og 2 uker til far ligger ikke i planen.',
                { exact: false },
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Hvis du ønsker å bruke mer foreldrepenger enn det som ligger i planen nå, kan du sende en endringssøknad.',
                { exact: false },
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Annen forelder må sende søknad selv for å bruke sine uker med foreldrepenger.', {
                exact: false,
            }),
        ).toBeInTheDocument();
    });
});
