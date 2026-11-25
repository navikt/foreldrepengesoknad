import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import { Radio } from '@navikt/ds-react';

import { IntlProvider, uiMessages } from '@navikt/fp-ui';

import { RhfForm } from '../form-wrappers/RhfForm';
import { RhfRadioGroup } from '../form-wrappers/RhfRadioGroup';
import { RhfTextField } from '../form-wrappers/RhfTextField';
import { ErrorSummaryHookForm } from './ErrorSummaryHookForm';

type FormValues = {
    fornavn?: string;
    etternavn?: string;
    svar?: string;
};

const påkrevd = (melding: string) => (value: unknown) => (value ? null : melding);

const Skjema = () => {
    const formMethods = useForm<FormValues>();
    return (
        <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: uiMessages.nb }}>
            <RhfForm formMethods={formMethods} onSubmit={() => undefined}>
                <ErrorSummaryHookForm />
                <RhfTextField
                    name="fornavn"
                    control={formMethods.control}
                    label="Fornavn"
                    validate={[påkrevd('Navn mangler')]}
                />
                <RhfTextField
                    name="etternavn"
                    control={formMethods.control}
                    label="Etternavn"
                    validate={[påkrevd('Navn mangler')]}
                />
                <RhfRadioGroup
                    name="svar"
                    control={formMethods.control}
                    label="Svar"
                    validate={[påkrevd('Svar mangler')]}
                >
                    <Radio value="ja">Ja</Radio>
                </RhfRadioGroup>
                <button type="submit">Send</button>
            </RhfForm>
        </IntlProvider>
    );
};

describe('<ErrorSummaryHookForm>', () => {
    it('skal lenke hver feil til feltet med href, også når flere felt deler samme feilmelding', async () => {
        render(<Skjema />);

        await userEvent.click(screen.getByRole('button', { name: 'Send' }));

        const navnLenke = await screen.findByRole('link', { name: 'Navn mangler' });
        const svarLenke = screen.getByRole('link', { name: 'Svar mangler' });

        expect(screen.getAllByRole('link')).toHaveLength(2);
        expect(navnLenke).toHaveAttribute('href', `#${screen.getByLabelText('Fornavn').id}`);
        expect(svarLenke).toHaveAttribute('href', `#${screen.getByRole('radio').closest('fieldset')?.id}`);
    });

    it('skal flytte fokus til feltet når lenken aktiveres med tastatur', async () => {
        render(<Skjema />);

        await userEvent.click(screen.getByRole('button', { name: 'Send' }));
        await screen.findByRole('link', { name: 'Navn mangler' });

        await userEvent.tab();
        expect(screen.getByRole('link', { name: 'Navn mangler' })).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        expect(screen.getByLabelText('Fornavn')).toHaveFocus();

        await userEvent.click(screen.getByRole('link', { name: 'Svar mangler' }));
        expect(screen.getByRole('radio')).toHaveFocus();
    });
});
