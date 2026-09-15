import { composeStories } from '@storybook/react-vite';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';

import * as stories from './ArbeidsforholdOgInntektSteg.stories';

const { Default, IngenAktiveArbeidsforhold } = composeStories(stories);

describe('<ArbeidsforholdOgInntektSteg>', () => {
    const egenNæringFraInntektsstepper = {
        navnPåNæringen: 'Fiskebåten',
        næringstype: 'FISKE',
        fom: '2024-01-01',
        registrertINorge: true,
        organisasjonsnummer: '998877665',
    } as const;

    it('skal gå til neste steg med harJobbetSomFrilans og harJobbetSomSelvstendigNæringsdrivende utleda fra registerdata', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Default.run({
            args: { ...Default.args, gåTilNesteSide, mellomlagreSøknadOgNaviger },
        });

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                harJobbetSomFrilans: true,
                harJobbetSomSelvstendigNæringsdrivende: true,
            },
            key: ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT,
            type: 'update',
        });
        // Siden Default-historien har frilansoppdrag og selvstendig næring skal brukeren
        // videre til Frilans-steget, ikke rett til neste steg i standardrekkefølgen.
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.FRILANS,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal fortsatt kunne søke selv om det verken finnes arbeidsforhold, frilansoppdrag eller registrert næring (FP blokkerer ikke, kun SVP gjør det)', async () => {
        await IngenAktiveArbeidsforhold.run({
            args: {
                ...IngenAktiveArbeidsforhold.args,
                arbeidsforhold: [],
                frilansoppdrag: [],
                registrerteNæringer: [],
            },
        });

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();

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
                registrerteNæringer: [],
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
