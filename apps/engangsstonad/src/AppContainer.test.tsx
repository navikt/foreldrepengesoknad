import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './AppContainer.stories';

const { SøkerErKvinne } = composeStories(stories);

describe('<AppContainer>', () => {
    it('skal gå raskeste vei gjennom applikasjonen og så tilbake', async () => {
        const utils = render(<SøkerErKvinne doLogging={false} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));
        await userEvent.click(screen.getByText('Start søknaden'));

        expect(screen.getAllByText('Din situasjon')).toHaveLength(2);
        expect(screen.getByText('Steg 1 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Barnet')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 4')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        const fødselsdato = utils.getByLabelText('Fødselsdato');
        await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(fødselsdato);
        const termindato = utils.getByLabelText('Termindato');
        await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(termindato);
        await userEvent.click(screen.getByText('Ett barn'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Bekreft termin')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();
        const terminbekreftelseDokument = utils.getByLabelText('Når fikk du terminbekreftelsen?');
        await userEvent.type(terminbekreftelseDokument, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(terminbekreftelseDokument);

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp bekreftelse på termindato');
        fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2);
        expect(screen.getByText('Steg 4 av 5')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Bekreft termin')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Barnet')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getAllByText('Din situasjon')).toHaveLength(2);

        await userEvent.click(screen.getByText('Forrige steg'));
        expect(screen.getByText('Ja, jeg har forstått mine plikter.')).toBeInTheDocument();
    });
});
