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

        expect(screen.getByText('Du må huske å svare på dette spørsmålet før du går videre.')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hvordan vil dere fordele fellesperioden?'), '9');

        expect(screen.getByText('Klaras første dag: 11.12.23')).toBeInTheDocument();
        expect(screen.getByText('Klaras siste dag: 17.06.24')).toBeInTheDocument();
        expect(screen.getByText('Espens første dag: 18.06.24')).toBeInTheDocument();
        expect(screen.getByText('Espens siste dag: 19.11.24')).toBeInTheDocument();

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