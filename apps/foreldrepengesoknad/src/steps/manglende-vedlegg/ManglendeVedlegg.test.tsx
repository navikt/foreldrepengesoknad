import { composeStories } from '@storybook/react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { applyRequestHandlers } from 'msw-storybook-addon';

import { Skjemanummer } from '@navikt/fp-constants';

import * as stories from './ManglendeVedlegg.stories';

const { Termindatodokumentasjon, Omsorgsovertakelsedokumentasjon, Aleneomsorgdokumentasjon } = composeStories(stories);

describe('<ManglendeVedlegg>', () => {
    it('skal lage "send inn senere" vedlegg for terminbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await applyRequestHandlers(Termindatodokumentasjon.parameters.msw);
        const screen = render(
            <Termindatodokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: expect.objectContaining({
                [Skjemanummer.TERMINBEKREFTELSE]: [
                    expect.objectContaining({
                        dokumenterer: {
                            type: 'BARN',
                        },
                        filename: '',
                        filesize: '',
                        innsendingsType: 'SEND_SENERE',
                        pending: false,
                        skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                        type: 'terminbekreftelse',
                        uploaded: false,
                    }),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.OPPSUMMERING,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal laste opp vedlegg for terminbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await applyRequestHandlers(Termindatodokumentasjon.parameters.msw);
        const screen = render(
            <Termindatodokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Dokumentasjon av termindato');
        await fireEvent.change(fileInput, {
            target: { files: [file] },
        });

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: expect.objectContaining({
                [Skjemanummer.TERMINBEKREFTELSE]: [
                    expect.objectContaining({
                        dokumenterer: {
                            type: 'BARN',
                        },
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                        type: 'terminbekreftelse',
                        uploaded: true,
                        url: 'test.com',
                        uuid: 'uuid-test',
                    }),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
    });

    it('skal lage "send inn senere" vedlegg for omsorgsovertakelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await applyRequestHandlers(Omsorgsovertakelsedokumentasjon.parameters.msw);
        const screen = render(
            <Omsorgsovertakelsedokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: expect.objectContaining({
                [Skjemanummer.OMSORGSOVERTAKELSE]: [
                    expect.objectContaining({
                        dokumenterer: {
                            type: 'BARN',
                        },
                        filename: '',
                        filesize: '',
                        innsendingsType: 'SEND_SENERE',
                        pending: false,
                        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
                        type: 'omsorgsovertakelse',
                        uploaded: false,
                    }),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.OPPSUMMERING,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal laste opp vedlegg for omsorgsovertakelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await applyRequestHandlers(Omsorgsovertakelsedokumentasjon.parameters.msw);
        const screen = render(
            <Omsorgsovertakelsedokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Dokumentasjon om omsorgsovertakelse');
        await fireEvent.change(fileInput, {
            target: { files: [file] },
        });

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: expect.objectContaining({
                [Skjemanummer.OMSORGSOVERTAKELSE]: [
                    expect.objectContaining({
                        dokumenterer: {
                            type: 'BARN',
                        },
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
                        type: 'omsorgsovertakelse',
                        uploaded: true,
                        url: 'test.com',
                        uuid: 'uuid-test',
                    }),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
    });

    it('skal lage "send inn senere" vedlegg for aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await applyRequestHandlers(Aleneomsorgdokumentasjon.parameters.msw);
        const screen = render(
            <Aleneomsorgdokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: expect.objectContaining({
                [Skjemanummer.DOK_AV_ALENEOMSORG]: [
                    expect.objectContaining({
                        dokumenterer: {
                            type: 'BARN',
                        },
                        filename: '',
                        filesize: '',
                        innsendingsType: 'SEND_SENERE',
                        pending: false,
                        skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
                        type: 'dokumentasjonAvAleneomsorg',
                        uploaded: false,
                    }),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.OPPSUMMERING,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal laste opp vedlegg for aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await applyRequestHandlers(Aleneomsorgdokumentasjon.parameters.msw);
        const screen = render(
            <Aleneomsorgdokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Dokumentasjon av aleneomsorg');
        await fireEvent.change(fileInput, {
            target: { files: [file] },
        });

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: expect.objectContaining({
                [Skjemanummer.DOK_AV_ALENEOMSORG]: [
                    expect.objectContaining({
                        dokumenterer: {
                            type: 'BARN',
                        },
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
                        type: 'dokumentasjonAvAleneomsorg',
                        uploaded: true,
                        url: 'test.com',
                        uuid: 'uuid-test',
                    }),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
    });
});
