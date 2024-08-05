import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './AppContainer.stories';

const { VisAppKvinneMedArbeid } = composeStories(stories);

describe('<AppContainer>', () => {
    it('skal gå raskeste vei gjennom applikasjonen og så tilbake', async () => {
        const utils = render(<VisAppKvinneMedArbeid doLogging={false} />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));
        await userEvent.click(screen.getByText('Start søknaden'));

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 6')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        const fødselsdato = utils.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);
        const termindato = utils.getByLabelText('Termindato');
        await userEvent.type(termindato, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Arbeidsforhold og inntekt')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);
        await userEvent.click(screen.getAllByText('Nei')[1]);
        await userEvent.click(screen.getAllByText('Nei')[2]);
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Velg bedrift')).toBeInTheDocument();
        expect(screen.getByText('Steg 4 av 7')).toBeInTheDocument();
        await userEvent.click(screen.getByText('SYKEHUSET I VESTFOLD'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Last opp skjema')).toBeInTheDocument();
        expect(screen.getByText('Steg 5 av 7')).toBeInTheDocument();
        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Behov for tilrettelegging')).toBeInTheDocument();
        expect(screen.getByText('Steg 6 av 7')).toBeInTheDocument();
        const behovDato = utils.getByLabelText('Fra hvilken dato har du behov for tilrettelegging eller omplassering?');
        await userEvent.type(behovDato, dayjs().subtract(1, 'month').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(behovDato);
        await userEvent.click(screen.getByText('Jeg kan jobbe redusert'));
        await userEvent.click(screen.getByText('Nei, jeg skal ha perioder med ulik arbeidsprosent'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Perioder med tilrettelegging')).toBeInTheDocument();
        expect(screen.getByText('Steg 7 av 8')).toBeInTheDocument();
        const jobbeFra = utils.getByLabelText('Du skal jobbe fra:');
        await userEvent.type(jobbeFra, dayjs().subtract(1, 'month').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(jobbeFra);
        await userEvent.click(screen.getByText('Frem til tre uker før termin'));
        const stillingsprosent = utils.getByLabelText('Hvilken stillingsprosent skal du jobbe i denne perioden?');
        await userEvent.type(stillingsprosent, '50');
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();
        expect(screen.getByText('Steg 8 av 8')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Perioder med tilrettelegging')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Behov for tilrettelegging')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Last opp skjema')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Velg bedrift')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Arbeidsforhold og inntekt')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Barnet')).toBeInTheDocument();
    });
});
