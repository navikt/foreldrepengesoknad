import { composeStories } from '@storybook/react-vite';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { expect } from 'vitest';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import * as stories from './ManglendeVedlegg.stories';

const {
    Termindatodokumentasjon,
    Omsorgsovertakelsedokumentasjon,
    Aleneomsorgdokumentasjon,
    FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,
    FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid,
    BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,
    KreverIngenDokumentasjonMenHarOpplastetVedlegg,
} = composeStories(stories);

describe('<ManglendeVedlegg>', () => {
    it('skal lage "send inn senere" vedlegg for terminbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Termindatodokumentasjon.run({
            args: {
                ...Termindatodokumentasjon.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

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
                        innsendingsType: 'SEND_SENERE',
                        pending: false,
                        skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                        type: AttachmentType.TERMINBEKREFTELSE,
                        uploaded: false,
                        id: expect.any(String),
                        filesize: undefined,
                        file: expect.any(Object),
                    } satisfies Attachment),
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

        await Termindatodokumentasjon.run({
            args: {
                ...Termindatodokumentasjon.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

        expect(await screen.findByText('Dokumentasjon av termindato')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Dokumentasjon av termindato');
        await userEvent.upload(fileInput, file);

        // Vent til opplastinga er ferdig (pending = false) før vi går vidare.
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());

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
                        type: AttachmentType.TERMINBEKREFTELSE,
                        uploaded: true,
                        uuid: 'uuid-test',
                        innsendingsType: 'LASTET_OPP',
                        id: expect.any(String),
                        file: expect.any(Object),
                    } satisfies Attachment),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
    });

    it('skal lage "send inn senere" vedlegg for omsorgsovertakelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Omsorgsovertakelsedokumentasjon.run({
            args: {
                ...Omsorgsovertakelsedokumentasjon.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

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
                        innsendingsType: 'SEND_SENERE',
                        pending: false,
                        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
                        type: AttachmentType.OMSORGSOVERTAKELSE,
                        uploaded: false,
                        id: expect.any(String),
                        filesize: undefined,
                        file: expect.any(Object),
                    } satisfies Attachment),
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

        await Omsorgsovertakelsedokumentasjon.run({
            args: {
                ...Omsorgsovertakelsedokumentasjon.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

        expect(await screen.findByText('Dokumentasjon om omsorgsovertakelse')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Dokumentasjon om omsorgsovertakelse');
        await userEvent.upload(fileInput, file);

        // Vent til opplastinga er ferdig (pending = false) før vi går vidare.
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());

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
                        type: AttachmentType.OMSORGSOVERTAKELSE,
                        uploaded: true,
                        uuid: 'uuid-test',
                        innsendingsType: 'LASTET_OPP',
                        id: expect.any(String),
                        file: expect.any(Object),
                    } satisfies Attachment),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
    });

    it('skal lage "send inn senere" vedlegg for aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Aleneomsorgdokumentasjon.run({
            args: {
                ...Aleneomsorgdokumentasjon.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

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
                        innsendingsType: 'SEND_SENERE',
                        pending: false,
                        skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
                        type: AttachmentType.ALENEOMSORG,
                        uploaded: false,
                        id: expect.any(String),
                        filesize: undefined,
                        file: expect.any(Object),
                    } satisfies Attachment),
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

        await Aleneomsorgdokumentasjon.run({
            args: {
                ...Aleneomsorgdokumentasjon.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

        expect(await screen.findByText('Dokumentasjon av aleneomsorg')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Dokumentasjon av aleneomsorg');
        await userEvent.upload(fileInput, file);

        // Vent til opplastinga er ferdig (pending = false) før vi går vidare.
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());

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
                        type: AttachmentType.ALENEOMSORG,
                        uploaded: true,
                        uuid: 'uuid-test',
                        innsendingsType: 'LASTET_OPP',
                        id: expect.any(String),
                        file: expect.any(Object),
                    } satisfies Attachment),
                ],
            }),
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
    });

    it('skal håndtere automatisk dokumentasjon når mor jobber mer enn 75% og vi ikke trenger dokumentere arbeid', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid.run({
            args: {
                ...FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

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
    });

    it('skal vise krav om dokumentasjon for mors arbeid når stillingsprosenten er < 75%', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid.run({
            args: {
                ...FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

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
    });

    it('skal håndtere automatisk dokumentasjon når bfhr og mor jobber mer enn 75% og vi ikke trenger dokumentere arbeid', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid.run({
            args: {
                ...BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

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
    });

    it('skal vise dokumentasjonssteget når uttaksplanen ikke krever dokumentasjon men det finnes opplastet vedlegg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await KreverIngenDokumentasjonMenHarOpplastetVedlegg.run({
            args: {
                ...KreverIngenDokumentasjonMenHarOpplastetVedlegg.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
            },
        });

        // Steget skal rendre uten å kaste «Ingen valgte steg funnet» fordi det finnes
        // et opplastet vedlegg, selv om uttaksplanen ikke lenger krever dokumentasjon.
        expect(await screen.findByText('Neste steg')).toBeInTheDocument();
    });
});
