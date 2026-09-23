import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import { Button } from '@navikt/ds-react';

import { RhfForm } from './RhfForm';
import { RhfTextField } from './RhfTextField';
import { RhfTextarea } from './RhfTextarea';

type FormValues = {
    navn?: string;
    beskrivelse?: string;
};

const TestSkjema = ({ onSubmit }: { onSubmit: (values: FormValues) => void }) => {
    const formMethods = useForm<FormValues>({ defaultValues: { navn: undefined, beskrivelse: undefined } });

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <RhfTextField name="navn" control={formMethods.control} label="Navn" />
            <RhfTextarea name="beskrivelse" control={formMethods.control} label="Beskrivelse" />
            <Button type="submit">Send inn</Button>
        </RhfForm>
    );
};

describe('Trimming av tekstverdier', () => {
    it('skal trimme verdien i et tekstfelt når feltet mister fokus', async () => {
        render(<TestSkjema onSubmit={vi.fn()} />);

        const navnefelt = screen.getByLabelText('Navn');
        await userEvent.type(navnefelt, '  Ola  ');
        await userEvent.tab();

        expect(navnefelt).toHaveValue('Ola');
    });

    it('skal trimme verdien i et tekstområde når feltet mister fokus', async () => {
        render(<TestSkjema onSubmit={vi.fn()} />);

        const beskrivelsesfelt = screen.getByLabelText('Beskrivelse');
        await userEvent.type(beskrivelsesfelt, '  Litt tekst  ');
        await userEvent.tab();

        expect(beskrivelsesfelt).toHaveValue('Litt tekst');
    });

    it('skal trimme alle tekstverdier ved innsending, selv om feltene ikke har mistet fokus', async () => {
        const onSubmit = vi.fn();
        render(<TestSkjema onSubmit={onSubmit} />);

        const navnefelt = screen.getByLabelText('Navn');
        await userEvent.type(navnefelt, '  Ola  ');
        await userEvent.type(screen.getByLabelText('Beskrivelse'), '  Litt tekst  ');

        // Sender inn uten at feltene har mistet fokus
        fireEvent.submit(navnefelt.closest('form') as HTMLFormElement);

        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ navn: 'Ola', beskrivelse: 'Litt tekst' }));
    });
});
