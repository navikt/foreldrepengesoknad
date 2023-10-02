import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './SøkersituasjonSteg.stories';

const { Default } = composeStories(stories);

describe('<SøkersituasjonSteg>', () => {
    it('skal validere valg og så gå videre til neste steg', async () => {
        const startSøknad = vi.fn();

        render(<Default startSøknad={startSøknad} />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Din situasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 5')).toBeInTheDocument();
        expect(screen.getByText('Hva gjelder for deg?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi hva som gjelder for deg')).toHaveLength(2);

        await userEvent.click(screen.getByText('Fødsel'));

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(startSøknad).toHaveBeenCalledTimes(1));
        expect(startSøknad).toHaveBeenNthCalledWith(1, true);
    });
});
