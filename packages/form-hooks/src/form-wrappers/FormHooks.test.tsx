import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './FormHooks.stories';

const { VisFormkomponenter } = composeStories(stories);

describe('<FormHooks>', () => {
    it('skal sjekke at input-komponenter fungerer', async () => {
        const utils = render(<VisFormkomponenter />);

        await userEvent.click(screen.getByText('Dette er en radioknapp'));

        await userEvent.selectOptions(utils.getByLabelText('Dette er en dropdown'), 'value1');
        //@ts-expect-error fiks
        expect(await screen.getByRole('option', { name: 'Test 1' }).selected).toBe(true);

        const datofelt = screen.getByText('Dette er en datepicker');
        await userEvent.type(datofelt, '01.02.2020');
        fireEvent.blur(datofelt);
    });

    it('skal sjekke at formatterTallTextField fungerer som forventet', async () => {
        const utils = render(<VisFormkomponenter />);

        const norskMinusTegn = '\u2212';
        const norskMellomRom = '\u00A0';

        const inputfelt = utils.getByLabelText('Tekstfelt for formattert tall');

        await userEvent.type(inputfelt, '1');
        expect(inputfelt).toHaveValue('1');
        await userEvent.type(inputfelt, '0');
        expect(inputfelt).toHaveValue('10');
        await userEvent.type(inputfelt, '0');
        expect(inputfelt).toHaveValue('100');
        await userEvent.type(inputfelt, '0');
        expect(inputfelt).toHaveValue(`1${norskMellomRom}000`);
        await userEvent.type(inputfelt, '000');
        expect(inputfelt).toHaveValue(`1${norskMellomRom}000${norskMellomRom}000`);

        // Skal ikke kunne skrive punktum
        await userEvent.clear(inputfelt);
        await userEvent.type(inputfelt, '100.');
        expect(inputfelt).toHaveValue('100');

        // Skal kun kunne skrive to desimaler
        await userEvent.clear(inputfelt);
        await userEvent.type(inputfelt, '100,123');
        expect(inputfelt).toHaveValue('100,12');

        // Skal skrive minustall
        await userEvent.clear(inputfelt);
        await userEvent.type(inputfelt, '-1000,123');
        expect(inputfelt).toHaveValue(`${norskMinusTegn}1${norskMellomRom}000,12`);

        // Skal ignorere mellomrom
        await userEvent.clear(inputfelt);
        await userEvent.type(inputfelt, '1 00');
        expect(inputfelt).toHaveValue(`100`);
    });
});
