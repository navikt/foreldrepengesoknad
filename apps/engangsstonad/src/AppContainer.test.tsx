import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './AppContainer.stories';
import dayjs from 'dayjs';
import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

const { SøkerErKvinne } = composeStories(stories);

describe('<AppContainer>', () => {
    it('skal gå raskeste vei gjennom applikasjonen og så tilbake', async () => {
        const utils = render(<SøkerErKvinne />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));
        await userEvent.click(screen.getByText('Start søknaden'));

        expect(await screen.findByText('Din situasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        const fødselsdato = utils.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);
        await userEvent.click(screen.getByText('Ett barn'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();
        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(await screen.findByText('Barnet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(await screen.findByText('Din situasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(await screen.findByText('Ja, jeg har forstått mine plikter.')).toBeInTheDocument();
    });
});
