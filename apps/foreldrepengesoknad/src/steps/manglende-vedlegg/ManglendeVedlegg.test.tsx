import { composeStories } from '@storybook/react-vite';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';

import { Skjemanummer } from '@navikt/fp-constants';
import { mswTest } from '@navikt/fp-utils-test';

import * as stories from './ManglendeVedlegg.stories';

const {
    Termindatodokumentasjon,
    Omsorgsovertakelsedokumentasjon,
    Aleneomsorgdokumentasjon,
    FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,
    FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid,
    BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,
} = composeStories(stories);

describe('<ManglendeVedlegg>', () => {
    mswTest('skal lage "send inn senere" vedlegg for terminbekreftelse', async ({ setHandlers }) => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        setHandlers(Termindatodokumentasjon.parameters.msw);
        const screen = render(
            <Termindatodokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Dokumentasjon av termindato')).toBeInTheDocument();

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

    mswTest.skip('skal laste opp vedlegg for terminbekreftelse', async ({ setHandlers }) => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        setHandlers(Termindatodokumentasjon.parameters.msw);
        const screen = render(
            <Termindatodokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Dokumentasjon av termindato')).toBeInTheDocument();

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

    mswTest('skal lage "send inn senere" vedlegg for omsorgsovertakelse', async ({ setHandlers }) => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        setHandlers(Omsorgsovertakelsedokumentasjon.parameters.msw);
        const screen = render(
            <Omsorgsovertakelsedokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Dokumentasjon om omsorgsovertakelse')).toBeInTheDocument();

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

    mswTest.skip('skal laste opp vedlegg for omsorgsovertakelse', async ({ setHandlers }) => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        setHandlers(Omsorgsovertakelsedokumentasjon.parameters.msw);
        const screen = render(
            <Omsorgsovertakelsedokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Dokumentasjon om omsorgsovertakelse')).toBeInTheDocument();

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

    mswTest('skal lage "send inn senere" vedlegg for aleneomsorg', async ({ setHandlers }) => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        setHandlers(Aleneomsorgdokumentasjon.parameters.msw);
        const screen = render(
            <Aleneomsorgdokumentasjon
                {...Aleneomsorgdokumentasjon.args}
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Dokumentasjon av aleneomsorg')).toBeInTheDocument();

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

    mswTest.skip('skal laste opp vedlegg for aleneomsorg', async ({ setHandlers }) => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        setHandlers(Aleneomsorgdokumentasjon.parameters.msw);
        const screen = render(
            <Aleneomsorgdokumentasjon
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Dokumentasjon av aleneomsorg')).toBeInTheDocument();

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

    mswTest(
        'skal håndtere automatisk dokumentasjon når mor jobber mer enn 75% og vi ikke trenger dokumentere arbeid',
        async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid.parameters.msw);
            const screen = render(
                <FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            // Verifiser at "Ingen dokumentasjon påkrevd" melding vises
            expect(await screen.findByText('Dokumentasjon på at mor er i arbeid')).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Du trenger ikke sende inn dokumentasjon. Vi innhenter opplysninger om mors arbeid ' +
                        'fra Arbeidsgiver- og arbeidstakerregisteret. Mor vil bli informert når søknaden blir sendt.',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.OPPSUMMERING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        },
    );

    mswTest(
        'skal vise krav om dokumentasjon for mors arbeid når stillingsprosenten er < 75%',
        async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid.parameters.msw);
            const screen = render(
                <FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findByText('Dokumentasjon på at mor er i arbeid')).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Du må legge ved bekreftelse fra Eline sin arbeidsgiver som viser hvilken periode hun skal jobbe og i hvilken stillingsprosent.' +
                        ' Dersom Eline er selvstendig næringsdrivende, frilanser eller er ansatt i eget AS skriver hun denne bekreftelsen selv.',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.OPPSUMMERING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        },
    );

    mswTest(
        'skal håndtere automatisk dokumentasjon når bfhr og mor jobber mer enn 75% og vi ikke trenger dokumentere arbeid',
        async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid.parameters.msw);
            const screen = render(
                <BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            // Verifiser at "Ingen dokumentasjon påkrevd" melding vises
            expect(await screen.findByText('Dokumentasjon på at mor er i arbeid')).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Du trenger ikke sende inn dokumentasjon. Vi innhenter opplysninger om mors arbeid ' +
                        'fra Arbeidsgiver- og arbeidstakerregisteret. Mor vil bli informert når søknaden blir sendt.',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.OPPSUMMERING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        },
    );
});
