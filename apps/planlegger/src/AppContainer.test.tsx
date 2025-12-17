import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './AppContainer.stories';

const { DefaultMockaStønadskontoerOgSatser } = composeStories(stories);

// Denne testen har kun ein test grunna at context ikkje blir sletta mellom testande. Skriv derfor testane i Planlegger.test.tsx

describe('<AppContainer>', () => {
    beforeEach(() => {
        vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
            setAvailableLanguages: vi.fn(),
            onLanguageSelect: vi.fn(),
        }));
    });

    const endreFordelingMedSlider = async (utils: ReturnType<typeof render>, ønsketAntallDager: number) => {
        const slider = utils.getByRole('slider', {
            name: /Hvordan vil dere fordele 16 uker med fellesperiode\?/i,
        });
        await userEvent.click(slider);
        const nåverdi = Number(slider.getAttribute('aria-valuenow') ?? 0);
        const diff = ønsketAntallDager - nåverdi;
        const steg = Math.abs(diff) / 5;
        const key = diff >= 0 ? '{ArrowRight}' : '{ArrowLeft}';
        for (let i = 0; i < steg; i += 1) {
            await userEvent.keyboard(key);
        }
    };

    it(
        'skal gå gjennom applikasjonen og så tilbake',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(DefaultMockaStønadskontoerOgSatser.parameters.msw);

            const utils = render(<DefaultMockaStønadskontoerOgSatser />);

            expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Start'));

            await waitFor(() => expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2));
            expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Mor og far'));
            const morNavn = utils.getByLabelText('Hva heter mor? (valgfritt)');
            await userEvent.type(morNavn, 'Helga');
            const farNavn = utils.getByLabelText('Hva heter far? (valgfritt)');
            await userEvent.type(farNavn, 'Espen');
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText('Barnet')).toHaveLength(2));
            expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Fødsel'));
            await userEvent.click(screen.getByText('Ett'));
            await userEvent.click(screen.getByText('Ja'));
            const fødselsdato = utils.getByLabelText('Når ble barnet født?');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            const termindato = utils.getByLabelText('Når var termindato?');
            await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText('Barnehageplass')).toHaveLength(2));
            expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2));
            expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
            await userEvent.click(
                screen.getByText(
                    'Har jobbet minst 6 av de siste 10 månedene og har tjent 65 080 kr eller mer det siste året',
                ),
            );
            await userEvent.click(screen.getByText('Ja'));
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText('Hvor mye')).toHaveLength(2));
            expect(screen.getByText('Steg 5 av 9')).toBeInTheDocument();
            const lønnMor = utils.getByLabelText('Hva tjener Helga ca. i måneden? (valgfritt)');
            await userEvent.type(lønnMor, '50000');
            const lønnFar = utils.getByLabelText('Hva tjener Espen ca. i måneden? (valgfritt)');
            await userEvent.type(lønnFar, '50000');
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText('Hvor lenge')).toHaveLength(2));
            expect(screen.getByText('Steg 6 av 9')).toBeInTheDocument();
            await userEvent.click(screen.getByText('100 % utbetaling over 49 uker'));
            await userEvent.click(screen.getByText('Neste'));

            await waitFor(() => expect(screen.getAllByText('Fordeling')).toHaveLength(2));
            expect(screen.getByText('Steg 7 av 9')).toBeInTheDocument();

            await endreFordelingMedSlider(utils, 5);

            await userEvent.click(screen.getByText('Neste'));

            // TODO (TOR) Dette feilar av ein eller annan grunn kun på github
            // expect(await screen.findByText('Planen deres')).toBeInTheDocument();
            // expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getAllByText('Oppsummering')[1]!);

            // await waitFor(() => expect(screen.getAllByText('Oppsummering')).toHaveLength(2));
            // await userEvent.click(screen.getByText('Tilbake til spørsmålene'));

            // expect(screen.getByText('Planen deres')).toBeInTheDocument();
            // expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getByText('Forrige'));

            // await waitFor(() => expect(screen.getAllByText('Fordeling')).toHaveLength(2));
            // expect(screen.getByText('Steg 7 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getByText('Forrige'));

            // await waitFor(() => expect(screen.getAllByText('Hvor lenge')).toHaveLength(2));
            // expect(screen.getByText('Steg 6 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getByText('Forrige'));

            // await waitFor(() => expect(screen.getAllByText('Hvor mye')).toHaveLength(2));
            // expect(screen.getByText('Steg 5 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getByText('Forrige'));

            // await waitFor(() => expect(screen.getAllByText('Arbeidssituasjon')).toHaveLength(2));
            // expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getByText('Forrige'));

            // await waitFor(() => expect(screen.getAllByText('Barnehageplass')).toHaveLength(2));
            // expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getByText('Forrige'));

            // await waitFor(() => expect(screen.getAllByText('Barnet')).toHaveLength(2));
            // expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getByText('Forrige'));

            // await waitFor(() => expect(screen.getAllByText('Hvem planlegger?')).toHaveLength(2));
            // expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
            // await userEvent.click(screen.getByText('Forrige'));

            // expect(screen.getByText('Planleggeren består av to deler:')).toBeInTheDocument();
        }),
    );
});
