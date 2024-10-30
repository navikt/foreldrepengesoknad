import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './DinPlan.stories';

const { Default } = composeStories(stories);

describe('<Default>', () => {
    it('Skal vise liste med tre perioder', async () => {
        await applyRequestHandlers(Default.parameters.msw);
        render(<Default />);

        expect(await screen.findByText('Liste')).toBeInTheDocument();
        expect(screen.getByText('Endre planen')).toBeInTheDocument();
        expect(screen.getByText('Kalender')).toBeInTheDocument();

        const allButtons = screen.getAllByRole('button');

        expect(within(allButtons[1]).getByText('10. juni - 30. juni')).toBeInTheDocument();
        expect(within(allButtons[1]).getByText('3 uker')).toBeInTheDocument();
        expect(within(allButtons[1]).getAllByText('Du i permisjon')).toHaveLength(2);

        expect(within(allButtons[2]).getByText('01. juli')).toBeInTheDocument();
        expect(within(allButtons[2]).getAllByText('Fødsel')).toHaveLength(2);

        expect(within(allButtons[3]).getByText('01. juli - 21. des.')).toBeInTheDocument();
        expect(within(allButtons[3]).getByText('24 uker og 4 dager')).toBeInTheDocument();
        expect(within(allButtons[3]).getAllByText('Du i permisjon')).toHaveLength(2);
    });

    it('Skal bytte til kalender', async () => {
        await applyRequestHandlers(Default.parameters.msw);
        render(<Default />);

        expect(await screen.findByText('Liste')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Kalender'));

        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Du og Helga har permisjon samtidig')).toBeInTheDocument();
        expect(screen.getByText('Helg (er ikke dager med foreldrepenger)')).toBeInTheDocument();
    });
});
