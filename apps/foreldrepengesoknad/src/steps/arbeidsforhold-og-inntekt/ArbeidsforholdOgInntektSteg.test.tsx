import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';

import * as stories from './ArbeidsforholdOgInntektSteg.stories';

const { Default, BrukerKanSøkeVedKunNeiSvar } = composeStories(stories);

describe('<ArbeidsforholdOgInntektSteg>', () => {
    it('skal gå til neste steg når informasjon er korrekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]!);

        await userEvent.click(screen.getAllByText('Nei')[1]!);

        await userEvent.click(screen.getAllByText('Ja')[2]!);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                harHattAndreInntektskilder: true,
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
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(4, {
            data: SøknadRoutes.ANDRE_INNTEKTER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal gi valideringsmelding når inputs ikke er utfylt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi om du har arbeidet som frilanser de siste 4 ukene.')).toHaveLength(2);
        expect(
            screen.getAllByText('Du må oppgi om du har hatt inntekt som selvstendig næringsdrivende de siste 4 ukene.'),
        ).toHaveLength(2);
        expect(
            screen.getAllByText('Du må oppgi om du har hatt andre inntektskilder de siste 10 månedene.'),
        ).toHaveLength(2);
    });

    it('skal ikke kunne søke når det er ingen aktive arbeidsforhold og en svarer nei på frilans og selvstendig næringsdrivende', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <BrukerKanSøkeVedKunNeiSvar
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]!);

        await userEvent.click(screen.getAllByText('Nei')[1]!);

        await userEvent.click(screen.getAllByText('Ja')[2]!);

        expect(screen.queryByText('Du kan dessverre ikke gå videre i søknaden.')).not.toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
