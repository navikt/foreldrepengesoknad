import { render, screen } from '@testing-library/react';
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

        expect(screen.getByText('Du må bekrefte at du har lest og forstått')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(startSøknad).toHaveBeenCalledTimes(1);
        expect(startSøknad).toHaveBeenNthCalledWith(1, true);

        expect(screen.getByText('Neste side: /soknad/søkersituasjon')).toBeInTheDocument();
    });
});
