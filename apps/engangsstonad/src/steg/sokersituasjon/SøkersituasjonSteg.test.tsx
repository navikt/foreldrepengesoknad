import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';

import * as stories from './SøkersituasjonSteg.stories';

const { Default } = composeStories(stories);

describe('<SøkersituasjonSteg>', () => {
    it('skal validere valg og så gå videre til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Din situasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 4')).toBeInTheDocument();
        expect(screen.getByText('Hva gjelder for deg?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi hva som gjelder for deg')).toHaveLength(2);

        await userEvent.click(screen.getByText('Fødsel'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'fødsel',
            },
            key: ContextDataType.SØKERSITUASJON,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.OM_BARNET,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });
});
