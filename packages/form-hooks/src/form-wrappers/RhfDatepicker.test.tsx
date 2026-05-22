import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { IntlProvider } from 'react-intl';

import { RhfDatepicker } from './RhfDatepicker';
import { RhfForm } from './RhfForm';

type FormValues = {
    dato: string;
};

const SetValueTestWrapper = ({ onReady }: { onReady: (setValue: (val: string) => void) => void }) => {
    const formMethods = useForm<FormValues>({
        defaultValues: { dato: '2024-01-15' },
    });

    onReady((val: string) => formMethods.setValue('dato', val));

    return (
        <IntlProvider locale="nb" messages={{ 'Skjema.input.dato.placeholder': 'dd.mm.åååå' }}>
            <RhfForm formMethods={formMethods}>
                <RhfDatepicker name="dato" control={formMethods.control} label="Velg dato" />
            </RhfForm>
        </IntlProvider>
    );
};

describe('RhfDatepicker', () => {
    it('skal oppdatere input-feltet når formverdien endres programmatisk med setValue', async () => {
        let setValueFn: (val: string) => void = () => {};
        render(<SetValueTestWrapper onReady={(fn) => (setValueFn = fn)} />);

        const input = screen.getByLabelText('Velg dato') as HTMLInputElement;
        expect(input.value).toBe('15.01.2024');

        act(() => {
            setValueFn('2024-06-20');
        });

        await waitFor(() => {
            expect(input.value).toBe('20.06.2024');
        });
    });

    it('skal ikke overskrive pågående fri-tekst input når datoen er ugyldig', async () => {
        let setValueFn: (val: string) => void = () => {};
        render(<SetValueTestWrapper onReady={(fn) => (setValueFn = fn)} />);

        const input = screen.getByLabelText('Velg dato') as HTMLInputElement;
        expect(input.value).toBe('15.01.2024');

        await userEvent.clear(input);
        await userEvent.type(input, '03.0');

        act(() => {
            setValueFn('03.0');
        });

        await waitFor(() => {
            expect(input.value).toBe('03.0');
        });
    });
});
