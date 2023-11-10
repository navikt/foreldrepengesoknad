import dayjs from 'dayjs';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './DokumentasjonSteg.stories';

const { Terminbekreftelse, Adopsjonsbekreftelse } = composeStories(stories);

describe('<DokumentasjonSteg>', () => {
    it('skal laste opp terminbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();

        const utils = render(<Terminbekreftelse gåTilNesteSide={gåTilNesteSide} />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Bekreft termin')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi terminbekreftelse dato')).toHaveLength(2);

        const terminbekreftelse = utils.getByLabelText('Når fikk du terminbekreftelsen?');
        await userEvent.type(terminbekreftelse, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(terminbekreftelse);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må laste opp bekreftelse på termindato')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });

        await userEvent.click(screen.getByText('Neste steg'));
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                terminbekreftelsedato: dayjs().format(ISO_DATE_FORMAT),
                vedlegg: [
                    expect.objectContaining({
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: 'I000062',
                        type: 'terminbekreftelse',
                        uploaded: true,
                        url: undefined,
                        uuid: undefined,
                    }),
                ],
            },
            key: 'DOKUMENTASJON',
            type: 'update',
        });

        expect(screen.getByText('Neste side: /soknad/utenlandsopphold')).toBeInTheDocument();
    });

    it('skal laste opp adopsjonsbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();

        render(<Adopsjonsbekreftelse gåTilNesteSide={gåTilNesteSide} />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Bekreft adopsjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må laste opp bekreftelse på adopsjon')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
        await fireEvent.change(fileInput, {
            target: { files: [file] },
        });

        await userEvent.click(screen.getByText('Neste steg'));
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                vedlegg: [
                    expect.objectContaining({
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: 'I000042',
                        type: 'omsorgsovertakelse',
                        uploaded: true,
                        url: undefined,
                        uuid: undefined,
                    }),
                ],
            },
            key: 'DOKUMENTASJON',
            type: 'update',
        });

        expect(screen.getByText('Neste side: /soknad/utenlandsopphold')).toBeInTheDocument();
    });
});
