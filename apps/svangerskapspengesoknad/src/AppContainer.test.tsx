import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './AppContainer.stories';

const { VisAppKvinneMedArbeid } = composeStories(stories);

describe('<AppContainer>', () => {
    beforeEach(() => {
        vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
            setAvailableLanguages: vi.fn(),
            onLanguageSelect: vi.fn(),
        }));
    });

    it(
        'skal gå raskeste vei gjennom applikasjonen og så tilbake',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(VisAppKvinneMedArbeid.parameters.msw);
            const utils = render(<VisAppKvinneMedArbeid />);

            expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));
            await userEvent.click(screen.getByText('Start søknaden'));

            expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
            expect(screen.getByText('Steg 1 av 7')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja'));
            const fødselsdato = utils.getByLabelText('Fødselsdato');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            const termindato = utils.getByLabelText('Termindato');
            await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 2 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText('Bo i utlandet')).toHaveLength(2);
            await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
            await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 3 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
            await userEvent.click(screen.getAllByText('Nei')[0]);
            await userEvent.click(screen.getAllByText('Nei')[1]);
            await userEvent.click(screen.getAllByText('Nei')[2]);
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 4 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText('Velg bedrift')).toHaveLength(2);
            await userEvent.click(screen.getByText('Sykehuset i Vestfold'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 5 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText('Last opp skjema')).toHaveLength(2);
            const file = new File(['hello'], 'hello.png', { type: 'image/png' });
            const fileInput = screen.getByLabelText('Last opp skjema for risiko og tilrettelegging i svangerskapet');
            await userEvent.upload(fileInput, file);
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 6 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText('Behov for tilrettelegging')).toHaveLength(2);
            const behovDato = utils.getByLabelText(
                'Fra hvilken dato har du behov for tilrettelegging eller omplassering?',
            );
            await userEvent.type(behovDato, dayjs().subtract(1, 'month').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(behovDato);
            await userEvent.click(screen.getByText('Jeg kan jobbe redusert'));
            await userEvent.click(screen.getByText('Nei, jeg skal ha perioder med ulik arbeidsprosent'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 7 av 9')).toBeInTheDocument();
            expect(await screen.findAllByText('Perioder med tilrettelegging')).toHaveLength(2);
            const jobbeFra = utils.getByLabelText('Du skal jobbe fra:');
            await userEvent.type(jobbeFra, dayjs().subtract(1, 'month').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(jobbeFra);
            await userEvent.click(screen.getByText('Frem til tre uker før termin'));
            const stillingsprosent = utils.getByLabelText('Hvilken stillingsprosent skal du jobbe i denne perioden?');
            await userEvent.type(stillingsprosent, '50');
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 8 av 9')).toBeInTheDocument();
            expect(await screen.findAllByText('Ferie')).toHaveLength(2);
            await userEvent.click(screen.getByText('Nei'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
            expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
            expect(screen.getByText('Steg 9 av 9')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Ferie')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Perioder med tilrettelegging')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Behov for tilrettelegging')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Last opp skjema')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Velg bedrift')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Barnet')).toHaveLength(2);
        }),
    );
});
