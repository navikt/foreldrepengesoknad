import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Velkommen.stories';

const { Default } = composeStories(stories);

describe('<Velkommen>', () => {
    it('skal vise velkomst-siden og så velge å starte søknaden', async () => {
        const startSøknad = vi.fn();

        render(<Default startSøknad={startSøknad} />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(await screen.findByText('Du må bekrefte at du har lest og forstått')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));

        await userEvent.click(screen.getByText('Start søknaden'));

        await waitFor(() => expect(startSøknad).toHaveBeenCalledTimes(1));
        expect(startSøknad).toHaveBeenNthCalledWith(1, true);

        expect(await screen.findByText('Neste side: /soknad/søkersituasjon')).toBeInTheDocument();
    });
});
