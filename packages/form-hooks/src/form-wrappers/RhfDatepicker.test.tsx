import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { IntlProvider } from 'react-intl';

import nbMessages from '../intl/messages/nb_NO.json';
import { RhfDatepicker } from './RhfDatepicker';
import { RhfForm } from './RhfForm';

type FormValues = {
    tom?: string;
};

const renderSkjema = ({
    defaultValue,
    defaultMonth,
    onChange,
}: {
    defaultValue?: string;
    defaultMonth?: string;
    onChange?: (value: string) => void;
} = {}) => {
    const { result } = renderHook(() => useForm<FormValues>({ defaultValues: { tom: defaultValue } }));
    const formMethods = result.current;
    render(
        <IntlProvider locale="nb" messages={nbMessages}>
            <RhfForm formMethods={formMethods}>
                <RhfDatepicker
                    name="tom"
                    control={formMethods.control}
                    label="Til og med"
                    defaultMonth={defaultMonth}
                    onChange={onChange}
                />
            </RhfForm>
        </IntlProvider>,
    );
    return formMethods;
};

const åpneKalender = async () => {
    await userEvent.click(screen.getByRole('button', { name: /datovelger/i }));
};

describe('RhfDatepicker', () => {
    it('skal vise datoen i feltet og i kalenderen når RHF-verdien settes programmatisk', async () => {
        const formMethods = renderSkjema();
        const felt = screen.getByLabelText('Til og med');
        expect(felt).toHaveValue('');

        act(() => formMethods.setValue('tom', '2025-03-14'));

        expect(felt).toHaveValue('14.03.2025');

        await åpneKalender();
        expect(screen.getByText(/mars 2025/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'fredag 14', pressed: true })).toBeInTheDocument();
    });

    it('skal følge nye programmatiske verdier flere ganger, også til en annen måned', async () => {
        const formMethods = renderSkjema({ defaultValue: '2025-03-14' });
        const felt = screen.getByLabelText('Til og med');
        expect(felt).toHaveValue('14.03.2025');

        act(() => formMethods.setValue('tom', '2025-08-01'));
        expect(felt).toHaveValue('01.08.2025');

        await åpneKalender();
        expect(screen.getByText(/august 2025/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'fredag 1', pressed: true })).toBeInTheDocument();
    });

    it('skal tømme feltet og kalenderen ved programmatisk clear og reset', async () => {
        const formMethods = renderSkjema({ defaultValue: '2025-03-14' });
        const felt = screen.getByLabelText('Til og med');

        act(() => formMethods.setValue('tom', ''));
        expect(felt).toHaveValue('');

        act(() => formMethods.setValue('tom', '2025-05-20'));
        expect(felt).toHaveValue('20.05.2025');

        act(() => formMethods.reset());
        expect(felt).toHaveValue('14.03.2025');

        act(() => formMethods.reset({ tom: '' }));
        expect(felt).toHaveValue('');

        await åpneKalender();
        expect(screen.queryByRole('button', { pressed: true })).not.toBeInTheDocument();
    });

    it('skal bevare halvskrevet input og formattering mens bruker skriver', async () => {
        const formMethods = renderSkjema();
        const felt = screen.getByLabelText('Til og med');

        await userEvent.type(felt, '1403');
        expect(felt).toHaveValue('1403');
        expect(formMethods.getValues('tom')).toBe('1403');

        await userEvent.type(felt, '2025');
        expect(felt).toHaveValue('14.03.2025');
        expect(formMethods.getValues('tom')).toBe('2025-03-14');
    });

    it('skal la kalenderen følge manuelt skrevet dato', async () => {
        renderSkjema();
        await userEvent.type(screen.getByLabelText('Til og med'), '14.03.2025');

        await åpneKalender();
        expect(screen.getByText(/mars 2025/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'fredag 14', pressed: true })).toBeInTheDocument();
    });

    it('skal oppdatere RHF og feltet når bruker velger dag i kalenderen', async () => {
        const formMethods = renderSkjema({ defaultValue: '2025-03-14' });
        await åpneKalender();
        await userEvent.click(screen.getByRole('button', { name: 'torsdag 20' }));

        expect(formMethods.getValues('tom')).toBe('2025-03-20');
        expect(screen.getByLabelText('Til og med')).toHaveValue('20.03.2025');
    });

    it('skal ikke kalle onChange når verdien settes eller nullstilles utenfra', () => {
        const onChange = vi.fn();
        const formMethods = renderSkjema({ defaultValue: '2025-03-14', onChange });

        act(() => formMethods.setValue('tom', '2025-08-01'));
        act(() => formMethods.setValue('tom', ''));
        act(() => formMethods.reset());

        expect(onChange).not.toHaveBeenCalled();
    });

    it('skal kalle onChange når bruker skriver eller velger dato', async () => {
        const onChange = vi.fn();
        renderSkjema({ defaultValue: '2025-03-14', onChange });

        await userEvent.clear(screen.getByLabelText('Til og med'));
        await userEvent.type(screen.getByLabelText('Til og med'), '01.08.2025');
        expect(onChange).toHaveBeenLastCalledWith('2025-08-01');

        onChange.mockClear();
        await åpneKalender();
        await userEvent.click(screen.getByRole('button', { name: 'lørdag 2' }));
        expect(onChange).toHaveBeenCalledExactlyOnceWith('2025-08-02');
    });

    it('skal åpne kalenderen på defaultMonth når feltet nullstilles etter at det hadde startverdi', async () => {
        const formMethods = renderSkjema({ defaultValue: '2025-03-14', defaultMonth: '2025-10-01' });

        act(() => formMethods.setValue('tom', ''));
        expect(screen.getByLabelText('Til og med')).toHaveValue('');

        await åpneKalender();
        expect(screen.getByText(/oktober 2025/i)).toBeInTheDocument();
    });

    it('skal åpne på defaultMonth uten valgt dato og la bruker navigere manuelt i kalenderen', async () => {
        const formMethods = renderSkjema({ defaultMonth: '2025-10-01' });

        await åpneKalender();
        expect(screen.getByText(/oktober 2025/i)).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Gå til neste måned' }));
        expect(screen.getByText(/november 2025/i)).toBeInTheDocument();

        act(() => formMethods.setValue('tom', ''));
        expect(screen.getByText(/november 2025/i)).toBeInTheDocument();
    });
});
