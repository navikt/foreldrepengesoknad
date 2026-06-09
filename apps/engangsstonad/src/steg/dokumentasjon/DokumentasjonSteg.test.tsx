import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import dayjs from 'dayjs';

import { AttachmentType, DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './DokumentasjonSteg.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Terminbekreftelse, Adopsjonsbekreftelse } = composeStories(stories);

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
            expect(await screen.findByText(messages['Engangsstønad.Pagetitle'])).toBeInTheDocument();

            expect(screen.getAllByText(messages['useStepConfig.Termin'])).toHaveLength(2);
            expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText(messages['TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi'])).toHaveLength(2);

            const terminbekreftelse = utils.getByLabelText(messages['TerminDokPanel.Terminbekreftelsesdato']);
            await userEvent.type(terminbekreftelse, dayjs().format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(terminbekreftelse);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(screen.getByText(messages['DokumentasjonSteg.MinstEttDokumentTermin'])).toBeInTheDocument();

            const file = new File(['hello'], 'hello.png', { type: 'image/png' });
            const fileInput = screen.getByLabelText(messages['TerminDokPanel.Vedlegg.Terminbekreftelse']);

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
                            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                            type: AttachmentType.TERMINBEKREFTELSE,
                            uploaded: true,
                            uuid: 'uuid-test',
                            innsendingsType: 'LASTET_OPP',
                            id: expect.any(String),
                            file: expect.any(Object),
                        } satisfies Attachment),
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
            expect(await screen.findByText(messages['Engangsstønad.Pagetitle'])).toBeInTheDocument();

            expect(screen.getAllByText(messages['useStepConfig.Adopsjon'])).toHaveLength(2);
            expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(screen.getByText(messages['DokumentasjonSteg.MinstEttDokumentAdopsjon'])).toBeInTheDocument();

            const file = new File(['hello'], 'hello.png', { type: 'image/png' });
            const fileInput = screen.getByLabelText(messages['AdopsjonDokPanel.Vedlegg.Adopsjon']);
            await userEvent.upload(fileInput, file);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: {
                    vedlegg: [
                        expect.objectContaining({
                            filename: 'hello.png',
                            filesize: 5,
                            pending: false,
                            skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
                            type: AttachmentType.OMSORGSOVERTAKELSE,
                            uploaded: true,
                            innsendingsType: 'LASTET_OPP',
                            uuid: 'uuid-test',
                            id: expect.any(String),
                            file: expect.any(Object),
                        } satisfies Attachment),
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
