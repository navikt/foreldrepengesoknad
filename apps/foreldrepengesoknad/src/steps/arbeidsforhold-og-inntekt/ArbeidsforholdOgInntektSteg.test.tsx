import { composeStories } from '@storybook/react-vite';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';

import * as stories from './ArbeidsforholdOgInntektSteg.stories';

const { Default, BrukerKanSøkeVedKunNeiSvar } = composeStories(stories);

describe('<ArbeidsforholdOgInntektSteg>', () => {
    const egenNæringFraInntektsstepper = {
        navnPåNæringen: 'Fiskebåten',
        næringstype: 'FISKE',
        fom: '2024-01-01',
        registrertINorge: true,
        organisasjonsnummer: '998877665',
    } as const;

    it('skal gå til neste steg når informasjon er korrekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Default.run({
            args: { ...Default.args, gåTilNesteSide, mellomlagreSøknadOgNaviger },
        });

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(await screen.findByText('Arbeid som selvstendig næringsdrivende')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]!);

        await userEvent.click(screen.getAllByText('Nei')[1]!);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: false,
            },
            key: ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.FRILANS,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: undefined,
            key: ContextDataType.EGEN_NÆRING,
            type: 'update',
        });
        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal gi valideringsmelding når inputs ikke er utfylt', async () => {
        await Default.run();

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi om du har arbeidet som frilanser de siste 4 ukene.')).toHaveLength(2);
        expect(
            screen.getAllByText('Du må oppgi om du har hatt inntekt som selvstendig næringsdrivende de siste 4 ukene.'),
        ).toHaveLength(2);
    });

    it('skal ikke kunne søke når det er ingen aktive arbeidsforhold og en svarer nei på frilans og selvstendig næringsdrivende', async () => {
        await BrukerKanSøkeVedKunNeiSvar.run();

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]!);

        await userEvent.click(screen.getAllByText('Nei')[1]!);

        expect(screen.queryByText('Du kan dessverre ikke gå videre i søknaden.')).not.toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal hoppe over eget SN-steg når næringen er ferdig utfylt via Legg til inntekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Default.run({
            args: {
                ...Default.args,
                gåTilNesteSide,
                mellomlagreSøknadOgNaviger,
                egenNæring: egenNæringFraInntektsstepper,
                selvstendigNæring: [],
            },
        });

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce());
        expect(gåTilNesteSide).not.toHaveBeenCalledWith(
            expect.objectContaining({
                data: SøknadRoutes.EGEN_NÆRING,
                key: ContextDataType.APP_ROUTE,
            }),
        );
    });
});
