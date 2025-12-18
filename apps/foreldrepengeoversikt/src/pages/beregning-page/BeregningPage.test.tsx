import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './BeregningPage.stories.tsx';

const { Beregning } = composeStories(stories);

describe('<BeregningPage>', () => {
    it(
        'Default Beregning',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(Beregning.parameters.msw);
            render(<Beregning />);

            expect(await screen.findByText('Beregning av din ytelse')).toBeInTheDocument();
            expect(await screen.findByText('Dagsats: 3 004 kr')).toBeInTheDocument();

            (await screen.findByText('Beregning av foreldrepenger')).click();

            expect(await screen.findByText('Bedriften as - 992257822')).toBeInTheDocument();
            expect(await screen.findByText('Frilans')).toBeInTheDocument();
        }),
    );
});
