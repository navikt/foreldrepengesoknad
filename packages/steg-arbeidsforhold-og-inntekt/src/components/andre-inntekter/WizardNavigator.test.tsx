import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WizardNavigator } from './WizardNavigator';

describe('<WizardNavigator>', () => {
    it('skal skjule tilbake på første steg og vise neste', async () => {
        const onCancel = vi.fn();
        const onNext = vi.fn();

        render(<WizardNavigator isLastStep={false} onCancel={onCancel} onNext={onNext} />);

        expect(screen.queryByRole('button', { name: 'Tilbake' })).not.toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));

        expect(onCancel).toHaveBeenCalledOnce();
        expect(onNext).toHaveBeenCalledOnce();
    });

    it('skal vise tilbake og legg til på siste steg', async () => {
        const onBack = vi.fn();
        const onNext = vi.fn();

        render(<WizardNavigator isLastStep onCancel={vi.fn()} onBack={onBack} onNext={onNext} />);

        await userEvent.click(screen.getByRole('button', { name: 'Tilbake' }));
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onBack).toHaveBeenCalledOnce();
        expect(onNext).toHaveBeenCalledOnce();
    });
});
