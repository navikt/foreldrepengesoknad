import { composeStories } from '@storybook/react/*';
import { render, screen } from '@testing-library/react';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './AppContainer.stories';

const { SøkerErMann } = composeStories(stories);

describe('<AppContainer>', () => {
    it('skal returnere spinner når data blir hentet', async () => {
        await applyRequestHandlers(SøkerErMann.parameters.msw);
        render(<SøkerErMann />);

        expect(screen.getByText('venter...')).toBeInTheDocument();
    });
});
