import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Action, ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Skjemautkast } from '@navikt/fp-form-hooks';
import { Attachment } from '@navikt/fp-types';

import * as stories from './SkjemaSteg.stories';

const { SkalIkkeFeileOpplasting, MedVedlegg, MedToTilrettelegginger, ErTypeFrilans, KanMaxHaToVedlegg } =
    composeStories(stories);

describe('<SkjemaSteg>', () => {
    it('gjenoppretter et nytt vedlegg på riktig arbeidsforhold etter fortsett senere', async () => {
        let skjemautkast: Skjemautkast | undefined;
        const gåTilNesteSide = vi.fn((action: Action) => {
            if (action.type === 'update' && action.key === ContextDataType.SKJEMAUTKAST) {
                skjemautkast = action.data as Skjemautkast;
            }
        });
        await SkalIkkeFeileOpplasting.run({
            args: {
                ...SkalIkkeFeileOpplasting.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger: () => new Promise<void>(() => {}),
            },
        });
        await userEvent.upload(
            screen.getByLabelText('Last opp skjema for risiko og tilrettelegging i svangerskapet'),
            new File(['innhold'], 'tilrettelegging.png', { type: 'image/png' }),
        );
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
        await userEvent.click(screen.getByRole('button', { name: 'Ok' }));
        expect(skjemautkast).toMatchObject({
            route: addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, '990322244'),
            verdier: { vedlegg: [expect.objectContaining({ uuid: 'uuid-test', uploaded: true })] },
        });
        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);

        const lagretJson = JSON.stringify(skjemautkast);
        const gjenåpnet = render(<SkalIkkeFeileOpplasting skjemautkast={JSON.parse(lagretJson) as Skjemautkast} />);
        expect(within(gjenåpnet.container).getByText('tilrettelegging.png')).toBeInTheDocument();
    });

    it('skal vise feilmelding når en ikke har lastet opp minst ett vedlegg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        await SkalIkkeFeileOpplasting.run({
            args: { ...SkalIkkeFeileOpplasting.args, gåTilNesteSide, mellomlagreSøknadOgNaviger },
        });

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getAllByText('Last opp skjema')).toHaveLength(2);
        expect(screen.getByText('Last opp skjema for risiko og tilrettelegging i svangerskapet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må laste opp minst ett dokument')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp skjema for risiko og tilrettelegging i svangerskapet');
        await userEvent.upload(fileInput, file);

        // Vent til opplastinga er ferdig (pending = false) før vi går vidare.
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());

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
    });

    it('skal vise opplaster vedlegg', async () => {
        await MedVedlegg.run();

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Filnavn1.jpg')).toBeInTheDocument();
    });

    it('skal vise skjema når en har minst to tilrettelegginger', async () => {
        await MedToTilrettelegginger.run();

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getAllByText('Last opp skjema for Omsorgspartner Vestfold AS')).toHaveLength(2);
        expect(screen.getByText('Om ditt arbeidsforhold i')).toBeInTheDocument();
        expect(screen.getByText('Omsorgspartner Vestfold AS')).toBeInTheDocument();
    });

    it('skal vise skjema for type frilans', async () => {
        await ErTypeFrilans.run();

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(
            screen.getByText('Last opp bekreftelse for krav til svangerskapspenger til frilans'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Her skal du laste opp bekreftelsen som er skrevet av din lege eller jordmor./),
        ).toBeInTheDocument();
    });

    it('skal vise kunne laste opp maks 2 (40 i prod) vedlegg', async () => {
        await KanMaxHaToVedlegg.run();

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        const file1 = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp skjema for risiko og tilrettelegging i svangerskapet');
        await userEvent.upload(fileInput, file1);

        // Vent til opplastinga er ferdig (pending = false) før vi går vidare.
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            await screen.findByText(
                'Du kan laste opp maksimalt 40 vedlegg i din søknad. Slett 1 vedlegg for å gå videre.',
            ),
        ).toBeInTheDocument();
    });
});
