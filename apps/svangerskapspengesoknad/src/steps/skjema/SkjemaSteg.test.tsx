import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './SkjemaSteg.stories';

const { SkalIkkeFeileOpplasting, MedVedlegg, MedToTilrettelegginger, ErTypeFrilans, KanMaxHaToVedlegg } =
    composeStories(stories);

describe('<SkjemaSteg>', () => {
    it(
        'skal vise feilmelding når en ikke har lastet opp minst ett vedlegg',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(SkalIkkeFeileOpplasting.parameters.msw);
            render(
                <SkalIkkeFeileOpplasting
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
            expect(screen.getAllByText('Last opp skjema')).toHaveLength(2);
            expect(
                screen.getByText('Last opp skjema for risiko og tilrettelegging i svangerskapet'),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Du må laste opp minst ett dokument')).toBeInTheDocument();

            const file = new File(['hello'], 'hello.png', { type: 'image/png' });
            const fileInput = screen.getByLabelText('Last opp skjema for risiko og tilrettelegging i svangerskapet');
            await userEvent.upload(fileInput, file);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.queryByText('Du må laste opp minst ett dokument')).not.toBeInTheDocument();
            expect(
                await screen.findByText('Last opp skjema for risiko og tilrettelegging i svangerskapet'),
            ).toBeInTheDocument();

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: {
                    '990322244': [
                        expect.objectContaining({
                            filename: 'hello.png',
                            filesize: 5,
                            pending: false,
                            skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                            type: AttachmentType.TILRETTELEGGING,
                            uploaded: true,
                            uuid: 'uuid-test',
                            id: expect.any(String),
                            file: expect.any(Object),
                            innsendingsType: 'LASTET_OPP',
                        } satisfies Attachment),
                    ],
                },
                key: ContextDataType.TILRETTELEGGINGER_VEDLEGG,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: addTilretteleggingIdToRoute(SøknadRoute.TILRETTELEGGING, '990322244'),
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
        }),
    );

    it(
        'skal vise opplaster vedlegg',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MedVedlegg.parameters.msw);
            render(<MedVedlegg />);

            expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
            expect(screen.getByText('Filnavn1.jpg')).toBeInTheDocument();
        }),
    );

    it(
        'skal vise skjema når en har minst to tilrettelegginger',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MedToTilrettelegginger.parameters.msw);
            render(<MedToTilrettelegginger />);

            expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
            expect(screen.getAllByText('Last opp skjema for Omsorgspartner Vestfold AS')).toHaveLength(2);
            expect(screen.getByText('Om ditt arbeidsforhold i')).toBeInTheDocument();
            expect(screen.getByText('Omsorgspartner Vestfold AS')).toBeInTheDocument();
        }),
    );

    it(
        'skal vise skjema for type frilans',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(ErTypeFrilans.parameters.msw);
            render(<ErTypeFrilans />);

            expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
            expect(
                screen.getByText('Last opp bekreftelse for krav til svangerskapspenger til frilans'),
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Her skal du laste opp bekreftelsen som er skrevet av din lege eller jordmor./),
            ).toBeInTheDocument();
        }),
    );

    it(
        'skal vise kunne laste opp maks 2 (40 i prod) vedlegg',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(KanMaxHaToVedlegg.parameters.msw);
            render(<KanMaxHaToVedlegg />);

            expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

            const file1 = new File(['hello'], 'hello.png', { type: 'image/png' });
            const fileInput = screen.getByLabelText('Last opp skjema for risiko og tilrettelegging i svangerskapet');
            await userEvent.upload(fileInput, file1);

            await userEvent.click(screen.getByText('Neste steg'));

            expect(
                await screen.findByText(
                    'Du kan laste opp maksimalt 40 vedlegg i din søknad. Slett 1 vedlegg for å gå videre.',
                ),
            ).toBeInTheDocument();
        }),
    );
});
