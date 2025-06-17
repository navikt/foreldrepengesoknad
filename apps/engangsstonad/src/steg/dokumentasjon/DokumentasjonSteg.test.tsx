import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import dayjs from 'dayjs';
import { type Context, applyRequestHandlers } from 'msw-storybook-addon';
import { setupWorker } from 'msw/browser';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './DokumentasjonSteg.stories';

const { Terminbekreftelse, Adopsjonsbekreftelse } = composeStories(stories);

const mswWrapper = (
    fn: ({ setHandlers }: { setHandlers: (msw: Context['parameters']['msw']) => void }) => Promise<void>,
) => {
    if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
        return async () => {
            const setHandlers = (msw: Context['parameters']['msw']) => {
                applyRequestHandlers(msw);
            };
            await fn({ setHandlers });
        };
    }
    if (import.meta.env['TEST_MODE'] !== 'browser-mode') {
        throw new Error('TEST_MODE must be set to either "jsdom-mode" or "browser-mode"');
    }

    const worker = setupWorker();

    return async () => {
        await worker.start();
        const setHandlers = (msw: Context['parameters']['msw']) => {
            // @ts-expect-error Usikker på kva som er greia her
            worker.use(...msw.handlers);
        };

        try {
            await fn({ setHandlers });
        } finally {
            worker.resetHandlers();
        }
    };
};

describe('<DokumentasjonSteg>', () => {
    it(
        'skal laste opp terminbekreftelse',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreOgNaviger = vi.fn();

            setHandlers(Adopsjonsbekreftelse.parameters.msw);
            const utils = render(
                <Terminbekreftelse gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
            );
            expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

            expect(screen.getAllByText('Bekreft termin')).toHaveLength(2);
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
            const fileInput = screen.getByLabelText('Last opp bekreftelse på termindato');

            await userEvent.upload(fileInput, file);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: {
                    terminbekreftelsedato: dayjs().format(ISO_DATE_FORMAT),
                    vedlegg: [
                        expect.objectContaining({
                            filename: 'hello.png',
                            filesize: 5,
                            pending: false,
                            skjemanummer: 'I000141',
                            type: 'terminbekreftelse',
                            uploaded: true,
                            url: 'test.com',
                            uuid: 'uuid-test',
                        }),
                    ],
                },
                key: ContextDataType.DOKUMENTASJON,
                type: 'update',
            });

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: Path.UTENLANDSOPPHOLD,
                key: ContextDataType.CURRENT_PATH,
                type: 'update',
            });

            expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
        }),
    );

    it(
        'skal laste opp adopsjonsbekreftelse',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreOgNaviger = vi.fn();

            setHandlers(Adopsjonsbekreftelse.parameters.msw);
            render(
                <Adopsjonsbekreftelse gåTilNesteSide={gåTilNesteSide} mellomlagreOgNaviger={mellomlagreOgNaviger} />,
            );
            expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

            expect(screen.getAllByText('Bekreft adopsjon')).toHaveLength(2);
            expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(screen.getByText('Du må laste opp bekreftelse på adopsjon')).toBeInTheDocument();

            const file = new File(['hello'], 'hello.png', { type: 'image/png' });
            const fileInput = screen.getByLabelText('Bekreftelse på adopsjon');
            await userEvent.upload(fileInput, file);

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
                            url: 'test.com',
                            uuid: 'uuid-test',
                        }),
                    ],
                },
                key: 'DOKUMENTASJON',
                type: 'update',
            });

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: Path.UTENLANDSOPPHOLD,
                key: ContextDataType.CURRENT_PATH,
                type: 'update',
            });

            expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
        }),
    );
});
