import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';

import { LeggTilAndreInntekterWizard } from './LeggTilAndreInntekterWizard';

const renderWizard = () =>
    render(
        <IntlProvider locale="nb" messages={{ ...formHookMessages.nb, ...egenNæringMessages.nb }}>
            <LeggTilAndreInntekterWizard />
        </IntlProvider>,
    );

describe('<LeggTilAndreInntekterWizard>', () => {
    it('skal navigere eksplisitt og avbryte wizarden', async () => {
        renderWizard();

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
        expect(screen.queryByText('Inntekt fra lott')).not.toBeInTheDocument();

        const nesteFiskersteg = screen.getByRole('button', { name: 'Neste' });
        expect(nesteFiskersteg).toBeDisabled();

        await userEvent.click(screen.getByRole('radio', { name: 'Lott' }));

        expect(screen.queryByText('Inntekt fra lott')).not.toBeInTheDocument();
        expect(nesteFiskersteg).toBeEnabled();

        await userEvent.click(nesteFiskersteg);

        expect(screen.getByText('Inntekt fra lott')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Legg til' })).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Tilbake' }));

        expect(screen.getByText('Hvilken ordning har du som fisker eller mannskap?')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Lott' })).toBeChecked();

        await userEvent.click(screen.getByRole('button', { name: 'Tilbake' }));

        expect(screen.getByText('Hvilken type inntekt har du hatt?')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: /Jeg er fisker eller mannskap på båt/ })).toBeChecked();

        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(screen.getByRole('button', { name: 'Legg til inntekt' })).toBeInTheDocument();
    });

    it.each([
        ['Lott', 'Inntekt fra lott', true],
        ['Hyre', 'Du må be arbeidsgiver må registrere deg som arbeidstaker', false],
        ['Lott og hyre Description', 'Inntekt fra lott og hyre', true],
        ['Egen båt', 'Fiske med egen båt', true],
    ])('skal vise riktig informasjonssteg for %s', async (radioLabel, expectedText, skalViseEgenNæring) => {
        renderWizard();

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(
            screen.getByRole('radio', {
                name: /Jeg er fisker eller mannskap på båt Hyre og\/eller lott, eller egen båt/,
            }),
        );
        await userEvent.click(screen.getByRole('button', { name: 'Neste' }));
        await userEvent.click(screen.getByRole('radio', { name: radioLabel }));

        expect(screen.queryByText(expectedText)).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Neste' }));

        expect(screen.getByText(expectedText)).toBeInTheDocument();
        expect(screen.queryByText('Hvilken type virksomhet har du?')).not.toBeInTheDocument();
        if (skalViseEgenNæring) {
            expect(screen.getByText('Hva heter virksomheten? (valgfritt)')).toBeInTheDocument();
        } else {
            expect(screen.queryByText('Hva heter virksomheten? (valgfritt)')).not.toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Legg til' })).toBeDisabled();
        }
    });
});
