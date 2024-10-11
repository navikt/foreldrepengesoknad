import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './AppContainer.stories';

const { SøkerErMann } = composeStories(stories);

describe('<AppContainer>', () => {
    it('skal vise forside', async () => {
        await applyRequestHandlers(SøkerErMann.parameters.msw);
        render(<SøkerErMann />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();

        //TODO (TOR) Test navigering gjennom app
    });

    //TODO (TOR) Test Søker er kvinne
});
