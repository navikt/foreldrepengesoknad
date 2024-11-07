import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './Saksoversikt.stories';

const { Engangsstønad } = composeStories(stories);

describe('<Saksoversikt>', () => {
    it('skal vise hvor mye engangsstønad en har rett på', async () => {
        await applyRequestHandlers(Engangsstønad.parameters.msw);
        render(<Engangsstønad />);

        expect(await screen.findByText('Dette har du søkt om')).toBeInTheDocument();

        expect(screen.getByText('Engangsstønad på 92 648 kr')).toBeInTheDocument();
        expect(screen.getByText('Utbetales til kontonummer 23232323 hvis søknaden innvilges')).toBeInTheDocument();
        expect(screen.getByText('Endre kontonummer')).toBeInTheDocument();
    });
});
