import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';

import * as stories from './SøkersituasjonSteg.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<SøkersituasjonSteg>', () => {
    it('skal validere valg og så gå videre til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />);
        expect(await screen.findByText(messages['Engangsstønad.Pagetitle'])).toBeInTheDocument();

        expect(screen.getAllByText(messages['useStepConfig.Søkersituasjon'])).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 4')).toBeInTheDocument();
        expect(screen.getByText(messages['SøkersituasjonSteg.Situasjon'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText(messages['SøkersituasjonSteg.Validering.OppgiFodselEllerAdopsjon'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['SøkersituasjonSteg.Fødsel']));

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
