import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import nbMessages from '../../intl/messages/nb_NO.json';
import { WizardNavigator } from './WizardNavigator';

describe('<WizardNavigator>', () => {
    it('skal skjule tilbake på første steg og vise neste', async () => {
        const onCancel = vi.fn();
        const onNext = vi.fn();

        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <WizardNavigator isLastStep={false} onCancel={onCancel} onNext={onNext} />
            </IntlProvider>,
        );

        expect(screen.queryByRole('button', { name: 'Tilbake' })).not.toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        expect(onCancel).toHaveBeenCalledOnce();
        expect(onNext).toHaveBeenCalledOnce();
    });

    it('skal vise tilbake og legg til på siste steg', async () => {
        const onBack = vi.fn();
        const onNext = vi.fn();

        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <WizardNavigator isLastStep onCancel={vi.fn()} onBack={onBack} onNext={onNext} />
            </IntlProvider>,
        );

        await userEvent.click(screen.getByRole('button', { name: 'Tilbake' }));
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onBack).toHaveBeenCalledOnce();
        expect(onNext).toHaveBeenCalledOnce();
    });
});
