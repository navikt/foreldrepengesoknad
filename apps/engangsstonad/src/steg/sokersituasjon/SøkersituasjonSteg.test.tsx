import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './SøkersituasjonSteg.stories';

const { Default } = composeStories(stories);

describe('<SøkersituasjonSteg>', () => {
    it('skal validere valg og så gå videre til neste steg', async () => {
        const gåTilNesteSide = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Din situasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 4')).toBeInTheDocument();
        expect(screen.getByText('Hva gjelder for deg?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi hva som gjelder for deg')).toHaveLength(2);

        await userEvent.click(screen.getByText('Fødsel'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'fødsel',
            },
            key: 'SØKERSITUASJON',
            type: 'update',
        });

        expect(screen.getByText('Neste side: /soknad/om-barnet')).toBeInTheDocument();
    });
});
