import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './TidslinjePage.stories';

const { FPAdopsjon } = composeStories(stories);

describe('<TidslinjePage>', () => {
    it(
        'skal vise hvor mye engangsstønad en har rett på',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPAdopsjon.parameters.msw);
            render(<FPAdopsjon />);

            expect(await screen.findByText('Dette har du søkt om')).toBeInTheDocument();

            expect(screen.getByText('Engangsstønad på 92 648 kr')).toBeInTheDocument();
            expect(screen.getByText('Utbetales til kontonummer 23232323 hvis søknaden innvilges')).toBeInTheDocument();
            expect(screen.getByText('Endre kontonummer')).toBeInTheDocument();
        }),
    );
});
