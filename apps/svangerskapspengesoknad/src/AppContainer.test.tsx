import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './AppContainer.stories';

import messages from './intl/nb_NO.json';

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

            expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['Forside.samtykke']));
            await userEvent.click(screen.getByText(messages['Forside.begynnMedSøknad']));

            expect(await screen.findByText(messages['barnet.erBarnetFødt'])).toBeInTheDocument();
            expect(screen.getByText('Steg 1 av 7')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja'));
            const fødselsdato = utils.getByLabelText(messages['barnet.fødselsdato']);
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            const termindato = utils.getByLabelText(messages['barnet.termindato']);
            await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 2 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText(messages['steps.label.utenlandsopphold'])).toHaveLength(2);
            await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
            await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 3 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText(messages['steps.label.arbeid'])).toHaveLength(2);
            await userEvent.click(screen.getAllByText(messages['nei'])[0]!);
            await userEvent.click(screen.getAllByText(messages['nei'])[1]!);
            await userEvent.click(screen.getAllByText(messages['nei'])[2]!);
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 4 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText(messages['steps.label.velgArbeid'])).toHaveLength(2);
            await userEvent.click(screen.getByText('Sykehuset i Vestfold'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 5 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText(messages['steps.label.skjema.en'])).toHaveLength(2);
            const file = new File(['hello'], 'hello.png', { type: 'image/png' });
            const fileInput = screen.getByLabelText(messages['skjema.vedlegg.label.arbeidsgiver']);
            await userEvent.upload(fileInput, file);
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 6 av 8')).toBeInTheDocument();
            expect(await screen.findAllByText(messages['steps.label.tilrettelegging.en'])).toHaveLength(2);
            const behovDato = utils.getByLabelText(messages['tilrettelegging.tilrettelagtArbeidFom.label.en'],
            );
            await userEvent.type(behovDato, dayjs().subtract(1, 'month').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(behovDato);
            await userEvent.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));
            await userEvent.click(screen.getByText(messages['tilrettelegging.tilretteleggingPeriodetype.variert']));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 7 av 9')).toBeInTheDocument();
            expect(await screen.findAllByText(messages['steps.label.periode.en'])).toHaveLength(2);
            const jobbeFra = utils.getByLabelText(messages['perioder.varierende.fom.label']);
            await userEvent.type(jobbeFra, dayjs().subtract(1, 'month').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(jobbeFra);
            await userEvent.click(screen.getByText(messages['perioder.varierende.tomType.treUkerFørTermin']));
            const stillingsprosent = utils.getByLabelText(messages['perioder.varierende.stillingsprosent.label']);
            await userEvent.type(stillingsprosent, '50');
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 8 av 9')).toBeInTheDocument();
            expect(await screen.findAllByText(messages['steps.label.ferie.en'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['nei']));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
            expect(await screen.findAllByText(messages['steps.label.oppsummering'])).toHaveLength(2);
            expect(screen.getByText('Steg 9 av 9')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText(messages['steps.label.ferie.en'])).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText(messages['steps.label.periode.en'])).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText(messages['steps.label.tilrettelegging.en'])).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText(messages['steps.label.skjema.en'])).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText(messages['steps.label.velgArbeid'])).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText(messages['steps.label.arbeid'])).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText(messages['steps.label.utenlandsopphold'])).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText(messages['steps.label.barnet'])).toHaveLength(2);
        }),
    );
});
