import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswTest } from '@navikt/fp-utils-test';

import * as stories from './AppContainer.stories';

const { SøkerErMann } = composeStories(stories);

describe('<AppContainer>', () => {
    mswTest.skip('skal gå raskeste vei gjennom applikasjonen som far', async ({ setHandlers }) => {
        // TODO Fiks test
        setHandlers(SøkerErMann.parameters.msw);
        const utils = render(<SøkerErMann />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Et annet barn'));
        await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));
        await userEvent.click(screen.getByText('Start søknaden'));

        expect(screen.getAllByText('Din situasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getByText('Ett barn'));
        const termindato = utils.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        const fødselsdato = utils.getByLabelText('Når ble barnet født?');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 9')).toBeInTheDocument();
        const neiRadios = screen.getAllByText('Nei');
        await userEvent.click(neiRadios[0]);
        await userEvent.click(neiRadios[1]);
        await userEvent.click(neiRadios[2]);
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);
        expect(screen.getByText('Steg 5 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jeg kan ikke oppgi den andre forelderen'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
        expect(screen.getByText('Steg 6 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('75 uker med 100 prosent foreldrepenger'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Fordeling av foreldrepenger')).toHaveLength(2);
        expect(screen.getByText('Steg 7 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Da barnet ble født'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findAllByText('Din plan med foreldrepenger')).toHaveLength(2);
        expect(screen.getByText('Steg 8 av 9')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Steg 9 av 9')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Din plan med foreldrepenger')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Fordeling av foreldrepenger')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Periode med foreldrepenger')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Den andre forelderen')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Barnet')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Din situasjon')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Hvilket barn gjelder søknaden din?')).toBeInTheDocument();
    });

    //TODO (TOR) Test Søker er kvinne
});
