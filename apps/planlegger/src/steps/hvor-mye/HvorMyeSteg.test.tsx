import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';

import * as stories from './HvorMyeSteg.stories';

const { FlereForsørgere, AleneforsørgerMor } = composeStories(stories);

describe('<HvorMyeSteg>', () => {
    it('skal vises inputfelt for både mor og far', async () => {
        const gåTilNesteSide = vi.fn();
        const utils = render(<FlereForsørgere gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Hvor mye')).toHaveLength(2);

        const morLønn = utils.getByLabelText('Hva tjener Klara ca. i måneden? (valgfritt)');
        await userEvent.type(morLønn, '1000');
        const farLønn = utils.getByLabelText('Hva tjener Espen ca. i måneden? (valgfritt)');
        await userEvent.type(farLønn, '70000');

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: { lønnSøker1: '1000', lønnSøker2: '70000' },
            key: ContextDataType.HVOR_MYE,
            type: 'update',
        });
    });

    it('skal kun vise inputfelt for mor', async () => {
        render(<AleneforsørgerMor />);
        expect(await screen.findAllByText('Hvor mye')).toHaveLength(2);
        expect(screen.getByText('Hva tjener Klara ca. i måneden? (valgfritt)')).toBeInTheDocument();
        expect(screen.queryByText('Hva tjener Espen ca. i måneden? (valgfritt)')).not.toBeInTheDocument();
    });
});
