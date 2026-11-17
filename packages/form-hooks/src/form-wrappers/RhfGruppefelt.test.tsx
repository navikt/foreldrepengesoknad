import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import { Button, Checkbox, Radio } from '@navikt/ds-react';

import { RhfCheckboxGroup } from './RhfCheckboxGroup';
import { RhfForm } from './RhfForm';
import { RhfRadioGroup } from './RhfRadioGroup';

type FormValues = {
    valg?: string[];
    radio?: string;
};

const påkrevd = (value?: string | string[]) => (value && value.length > 0 ? null : 'Feltet er påkrevd');

const CheckboxGroupSkjema = ({ førsteDisabled = false }: { førsteDisabled?: boolean }) => {
    const formMethods = useForm<FormValues>();
    return (
        <RhfForm formMethods={formMethods} onSubmit={() => undefined}>
            <RhfCheckboxGroup name="valg" control={formMethods.control} label="Velg" validate={[påkrevd]}>
                <Checkbox value="a" disabled={førsteDisabled}>
                    A
                </Checkbox>
                <Checkbox value="b">B</Checkbox>
            </RhfCheckboxGroup>
            <Button type="submit">Send</Button>
        </RhfForm>
    );
};

const RadioGroupSkjema = ({ førsteDisabled = false }: { førsteDisabled?: boolean }) => {
    const formMethods = useForm<FormValues>();
    return (
        <RhfForm formMethods={formMethods} onSubmit={() => undefined}>
            <RhfRadioGroup name="radio" control={formMethods.control} label="Velg" validate={[påkrevd]}>
                <Radio value="a" disabled={førsteDisabled}>
                    A
                </Radio>
                <Radio value="b">B</Radio>
            </RhfRadioGroup>
            <Button type="submit">Send</Button>
        </RhfForm>
    );
};

describe('Fokus ved feil i gruppefelt', () => {
    it('skal sette fokus på første checkbox når påkrevd CheckboxGroup sendes inn uten valg', async () => {
        render(<CheckboxGroupSkjema />);

        await userEvent.click(screen.getByRole('button', { name: 'Send' }));

        expect(await screen.findByText('Feltet er påkrevd')).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: 'A' })).toHaveFocus();
    });

    it('skal sette fokus på første aktive checkbox når første er disabled', async () => {
        render(<CheckboxGroupSkjema førsteDisabled />);

        await userEvent.click(screen.getByRole('button', { name: 'Send' }));

        expect(await screen.findByText('Feltet er påkrevd')).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: 'B' })).toHaveFocus();
    });

    it('skal sette fokus på første radioknapp når påkrevd RadioGroup sendes inn uten valg', async () => {
        render(<RadioGroupSkjema />);

        await userEvent.click(screen.getByRole('button', { name: 'Send' }));

        expect(await screen.findByText('Feltet er påkrevd')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'A' })).toHaveFocus();
    });

    it('skal sette fokus på første aktive radioknapp når første er disabled', async () => {
        render(<RadioGroupSkjema førsteDisabled />);

        await userEvent.click(screen.getByRole('button', { name: 'Send' }));

        expect(await screen.findByText('Feltet er påkrevd')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'B' })).toHaveFocus();
    });
});
