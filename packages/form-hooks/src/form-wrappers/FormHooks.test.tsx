import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import * as stories from './FormHooks.stories';

const { VisFormkomponenter } = composeStories(stories);

describe('<FormHooks>', () => {
    it('skal sjekke at input-komponenter fungerer', async () => {
        const utils = render(<VisFormkomponenter />);

        await userEvent.click(screen.getByText('Dette er en radioknapp'));

        await userEvent.selectOptions(utils.getByLabelText('Dette er en dropdown'), 'value1');
        //@ts-expect-error fiks
        expect(await screen.getByRole('option', { name: 'Test 1' }).selected).toBe(true);

        const dateLabel = screen.getByText('Dette er en datepicker');
        const datofelt = dateLabel.closest('div')?.querySelector('input') as HTMLInputElement;
        await userEvent.type(datofelt, '01.02.2020');
        fireEvent.blur(datofelt);
    });

    it('skal sjekke datoinput komponent støtter riktige formater', async () => {
        render(<VisFormkomponenter />);

        const dateLabel = screen.getByText('Dette er en datepicker');
        const datofelt = dateLabel.closest('div')?.querySelector('input') as HTMLInputElement;

        // Test standardformat med punkter
        await userEvent.type(datofelt, '01.02.2020');
        expect(screen.getByText('datepickerField: 2020-02-01')).toBeInTheDocument();

        // Test 8-sifret format (DDMMYYYY)
        await userEvent.clear(datofelt);
        await userEvent.type(datofelt, '03022020');
        expect(screen.getByText('datepickerField: 2020-02-03')).toBeInTheDocument();

        // Test 6-sifret format (DDMMYY) - år 19 blir 2019
        await userEvent.clear(datofelt);
        await userEvent.type(datofelt, '010219');
        expect(screen.getByText('datepickerField: 2019-02-01')).toBeInTheDocument();

        // Test 6-sifret format (DDMMYY) - år 85 blir 1985
        await userEvent.clear(datofelt);
        await userEvent.type(datofelt, '010285');
        expect(screen.getByText('datepickerField: 1985-02-01')).toBeInTheDocument();

        // Test 6-sifret format (DDMMYY) - år 49 blir 2049
        await userEvent.clear(datofelt);
        await userEvent.type(datofelt, '010249');
        expect(screen.getByText('datepickerField: 2049-02-01')).toBeInTheDocument();
    });
});
