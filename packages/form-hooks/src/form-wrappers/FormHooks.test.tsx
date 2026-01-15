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

        const dateLabel = screen.getByText('Dette er en datepicker');
        const datofelt = dateLabel.closest('div')?.querySelector('input') as HTMLInputElement;
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

        // Test 8-sifret format (DDMMYYYY)
        await userEvent.clear(datofelt);
        await userEvent.type(datofelt, '22111995');
        expect(screen.getByText('datepickerField: 1995-11-22')).toBeInTheDocument();

        // Test 8-sifret ugyldig format. Skal ikke sette "."
        await userEvent.clear(datofelt);
        await userEvent.type(datofelt, '12345678');
        expect(screen.getByText('datepickerField: 12345678')).toBeInTheDocument();

        // Skriver 8 siffer. Formatterer med punktum. Deretter endrer dag
        await userEvent.clear(datofelt);
        await userEvent.type(datofelt, '09112023');
        // Edit from index 3 - select from position 3 to end and replace
        datofelt.focus();
        datofelt.setSelectionRange(3, 3);
        const slettTreCharacters = '{Backspace}'.repeat(3);
        await userEvent.keyboard(`${slettTreCharacters}22`);
        expect(screen.getByText('datepickerField: 2023-11-22')).toBeInTheDocument();
    });
});
