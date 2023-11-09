import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from './FormHooks.stories';

const { VisFormkomponenter } = composeStories(stories);

describe('<FormHooks>', () => {
    it('skal gå raskeste vei gjennom applikasjonen og så tilbake', async () => {
        const utils = render(<VisFormkomponenter />);

        await userEvent.click(screen.getByText('Dette er en radioknapp'));

        await userEvent.selectOptions(utils.getByLabelText('Dette er en dropdown'), 'value1');
        // @ts-ignore
        expect(await screen.getByRole('option', { name: 'Test 1' }).selected).toBe(true);

        const datofelt = screen.getByText('Dette er en datepicker');
        await userEvent.type(datofelt, '01.02.2020');
        fireEvent.blur(datofelt);
    });
});
