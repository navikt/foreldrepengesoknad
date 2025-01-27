import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './SkjemaSteg.stories';

const { SkalIkkeFeileOpplasting, MedVedlegg, MedToTilrettelegginger, ErTypeFrilans, KanMaxHaToVedlegg } =
    composeStories(stories);

describe('<SkjemaSteg>', () => {
    it.skip('skal vise feilmelding når en ikke har lastet opp minst ett vedlegg', async () => {
        // TODO Fiks test
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await applyRequestHandlers(SkalIkkeFeileOpplasting.parameters.msw);
        render(
            <SkalIkkeFeileOpplasting
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getAllByText('Last opp skjema')).toHaveLength(2);
        expect(screen.getByText('Last opp skjema for risiko og tilrettelegging i svangerskapet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må laste opp minst ett dokument')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp skjema for risiko og tilrettelegging i svangerskapet');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });

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
                        skjemanummer: 'I000109',
                        type: 'tilrettelegging',
                        uploaded: true,
                        url: 'test.com',
                        uuid: 'uuid-test',
                    }),
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
        await applyRequestHandlers(MedVedlegg.parameters.msw);
        render(<MedVedlegg />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Filnavn1.jpg')).toBeInTheDocument();
    });

    it('skal vise skjema når en har minst to tilrettelegginger', async () => {
        await applyRequestHandlers(MedToTilrettelegginger.parameters.msw);
        render(<MedToTilrettelegginger />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getAllByText('Last opp skjema for Omsorgspartner Vestfold AS')).toHaveLength(2);
        expect(screen.getByText('Om ditt arbeidsforhold i')).toBeInTheDocument();
        expect(screen.getByText('Omsorgspartner Vestfold AS')).toBeInTheDocument();
    });

    it('skal vise skjema for type frilans', async () => {
        await applyRequestHandlers(ErTypeFrilans.parameters.msw);
        render(<ErTypeFrilans />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(
            screen.getByText('Last opp bekreftelse for krav til svangerskapspenger til frilans'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Her skal du laste opp bekreftelsen som er skrevet av din lege eller jordmor./),
        ).toBeInTheDocument();
    });

    it.skip('skal vise kunne laste opp maks 2 (40 i prod) vedlegg', async () => {
        // TODO Fiks test
        await applyRequestHandlers(KanMaxHaToVedlegg.parameters.msw);
        render(<KanMaxHaToVedlegg />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        const file1 = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp skjema for risiko og tilrettelegging i svangerskapet');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file1, length: 1, 0: file1 } },
        });

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            await screen.findByText(
                'Du kan laste opp maksimalt 40 vedlegg i din søknad. Slett 1 vedlegg for å gå videre.',
            ),
        ).toBeInTheDocument();
    });
});
