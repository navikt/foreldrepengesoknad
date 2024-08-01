import { composeStories } from '@storybook/react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Skjemanummer } from '@navikt/fp-constants';

import { ContextDataType } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import * as stories from './ManglendeVedlegg.stories';

const { Termindatodokumentasjon, Omsorgsovertakelsedokumentasjon, Aleneomsorgdokumentasjon } = composeStories(stories);

describe('<ManglendeVedlegg>', () => {
    it('skal lage "send inn senere" vedlegg for terminbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

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
            data: SøknadRoutes.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal laste opp vedlegg for terminbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        const screen = render(
            <Termindatodokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
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
                        url: undefined,
                        uuid: undefined,
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
            data: SøknadRoutes.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal laste opp vedlegg for omsorgsovertakelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        const screen = render(
            <Omsorgsovertakelsedokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
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
                        url: undefined,
                        uuid: undefined,
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
            data: SøknadRoutes.UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal laste opp vedlegg for aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        const screen = render(
            <Aleneomsorgdokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
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
                        url: undefined,
                        uuid: undefined,
                    }),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
    });
});
