import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './MinidialogPage.stories';

const { FeilVedHentingAvMinidialog } = composeStories(stories);

describe('<MinidialogPage>', () => {
    it('skal vise feilmelding med mulighet for å prøve igjen når henting av oppgaven feiler', async () => {
        await FeilVedHentingAvMinidialog.run();

        expect(await screen.findByText('Vi har problemer med å hente oppgaven din.')).toBeInTheDocument();
        expect(screen.queryByText('Ønsker du å uttale deg i saken før vi behandler den?')).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Prøv igjen' }));

        expect(await screen.findByText('Ønsker du å uttale deg i saken før vi behandler den?')).toBeInTheDocument();
        expect(screen.queryByText('Vi har problemer med å hente oppgaven din.')).not.toBeInTheDocument();
    });
});
