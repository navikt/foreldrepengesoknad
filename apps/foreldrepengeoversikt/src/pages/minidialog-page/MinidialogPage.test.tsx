import { composeStories } from '@storybook/react-vite';
import { focusManager } from '@tanstack/react-query';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './MinidialogPage.stories';

const { FeilVedHentingAvMinidialog, FeilVedBakgrunnshentingAvMinidialog } = composeStories(stories);

describe('<MinidialogPage>', () => {
    it('skal vise feilmelding med mulighet for å prøve igjen når henting av oppgaven feiler', async () => {
        await FeilVedHentingAvMinidialog.run();

        expect(await screen.findByText('Vi har problemer med å hente oppgaven din.')).toBeInTheDocument();
        expect(screen.queryByText('Ønsker du å uttale deg i saken før vi behandler den?')).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Prøv igjen' }));

        expect(await screen.findByText('Ønsker du å uttale deg i saken før vi behandler den?')).toBeInTheDocument();
        expect(screen.queryByText('Vi har problemer med å hente oppgaven din.')).not.toBeInTheDocument();
    });

    it('skal beholde påbegynt svar når en bakgrunnshenting av oppgaven feiler', async () => {
        await FeilVedBakgrunnshentingAvMinidialog.run();

        await userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        await userEvent.type(screen.getByRole('textbox'), 'Mitt svar');

        act(() => {
            focusManager.setFocused(false);
            focusManager.setFocused(true);
        });

        await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue('Mitt svar'));
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(screen.getByRole('textbox')).toHaveValue('Mitt svar');
        expect(screen.getByRole('radio', { name: 'Ja' })).toBeChecked();
        expect(screen.queryByText('Vi har problemer med å hente oppgaven din.')).not.toBeInTheDocument();

        act(() => focusManager.setFocused(undefined));
    });
});
