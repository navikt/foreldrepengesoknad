import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';

import * as stories from './Velkommen.stories';

const { Default } = composeStories(stories);

describe('<Velkommen>', () => {
    it('skal vise velkomst-siden og så velge å starte søknaden', async () => {
        const startSøknad = vi.fn();
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        render(
            <Default
                startSøknad={startSøknad}
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreOgNaviger={mellomlagreOgNaviger}
            />,
        );
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(screen.getByText('Du må bekrefte at du har lest og forstått')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(startSøknad).toHaveBeenCalledTimes(1);
        expect(startSøknad).toHaveBeenNthCalledWith(1, true);

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: Path.SØKERSITUASJON,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });
});
