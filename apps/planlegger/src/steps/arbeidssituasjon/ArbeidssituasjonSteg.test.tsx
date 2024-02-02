import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';

import * as stories from './ArbeidssituasjonSteg.stories';
import { ContextDataType } from 'appData/PlanleggerDataContext';

const { ArbeidssituasjonMorOgFar } = composeStories(stories);

describe('<ArbeidssituasjonSteg>', () => {
    //TODO: Fiks test
    it.skip('skal vise arbeidssituasjon for far og mor', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Jobber og tjener mer enn 50 000 i året eller er ufør')[0]);
        await userEvent.click(
            screen.getAllByText(
                'Jobber ikke eller jobber og tjener under 50 000 i året eller er student uten deltidsjobb',
            )[1],
        );

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                arbeidssituasjonFar: 'jobberIkke',
                arbeidssituasjonMor: 'jobber',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });
});
