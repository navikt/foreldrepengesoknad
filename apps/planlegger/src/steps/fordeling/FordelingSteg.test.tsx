import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';

import * as stories from './FordelingSteg.stories';

const { FlereForsørgereEttBarn } = composeStories(stories);

describe('<FordelingSteg>', () => {
    it('skal velge å fordele 9 uker til mor og 7 uker til far', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<FlereForsørgereEttBarn gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Fordeling')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(screen.getByText('Du må oppgi hvordan dere vil fordele fellesperioden.')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hvordan vil dere fordele fellesperioden?'), '9');

        expect(screen.getByText('Klara: 11. des. 2023 – 14. juni 2024')).toBeInTheDocument();
        expect(screen.getByText('Espen: 17. juni 2024 – 15. nov. 2024')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallUkerSøker1: '9',
            },
            key: ContextDataType.FORDELING,
            type: 'update',
        });
    });
});
