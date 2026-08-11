import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LeggTilAndreInntekterWizard } from './LeggTilAndreInntekterWizard';

describe('<LeggTilAndreInntekterWizard>', () => {
    it('skal navigere eksplisitt og avbryte wizarden', async () => {
        render(<LeggTilAndreInntekterWizard />);

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));

        expect(screen.queryByRole('button', { name: 'Tilbake' })).not.toBeInTheDocument();
        const neste = screen.getByRole('button', { name: 'Neste' });
        expect(neste).toBeDisabled();

        await userEvent.click(
            screen.getByText('Jeg er fisker eller mannskap på båt Hyre og/eller lott, eller egen båt'),
        );

        expect(screen.getByText('Hvilken type inntekt har du hatt?')).toBeInTheDocument();
        expect(neste).toBeEnabled();

        await userEvent.click(neste);

        expect(screen.getByText('Hvilken ordning har du som fisker eller mannskap?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Tilbake' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Legg til' })).toBeDisabled();

        await userEvent.click(screen.getByRole('button', { name: 'Tilbake' }));

        expect(screen.getByText('Hvilken type inntekt har du hatt?')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: /Jeg er fisker eller mannskap på båt/ })).toBeChecked();

        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(screen.getByRole('button', { name: 'Legg til inntekt' })).toBeInTheDocument();
    });
});
