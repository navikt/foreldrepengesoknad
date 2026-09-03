import { composeStories } from '@storybook/react-vite';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';

import * as stories from './ArbeidsforholdOgInntektSteg.stories';

const { Default, MedFrilansoppdrag } = composeStories(stories);

describe('<ArbeidsforholdOgInntektSteg>', () => {
    const egenNæringFraInntektsstepper = {
        navnPåNæringen: 'Fiskebåten',
        næringstype: 'FISKE',
        fom: '2024-01-01',
        registrertINorge: true,
        organisasjonsnummer: '998877665',
    } as const;

    it('skal vise frilansoppdrag', async () => {
        await MedFrilansoppdrag.run();

        expect(await screen.findByText('Mine frilansoppdrag')).toBeInTheDocument();
    });

    it('skal gå til neste steg når informasjon er korrekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Default.run({
            args: { ...Default.args, gåTilNesteSide, mellomlagreSøknadOgNaviger },
        });

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        expect(screen.queryByRole('radio', { name: 'Etterlønn eller sluttvederlag' })).not.toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: 'Førstegangstjeneste' })).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole('radio', { name: 'Jobb i utlandet' }));
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett' }));
        await userEvent.selectOptions(screen.getByLabelText('Hvilket land har du jobbet i?'), 'SE');
        await userEvent.type(screen.getByLabelText('Hva er navnet på arbeidsgiveren?'), 'Svensk arbeidsgiver');
        await userEvent.click(
            within(screen.getByRole('radiogroup', { name: 'Jobber du der nå?' })).getByRole('radio', {
                name: 'Ja',
            }),
        );
        await userEvent.type(screen.getByLabelText('Fra'), '01.01.2024');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                arbeidIUtlandet: [
                    {
                        arbeidsgiverNavn: 'Svensk arbeidsgiver',
                        fom: '2024-01-01',
                        land: 'SE',
                        pågående: true,
                        tom: undefined,
                        type: 'JOBB_I_UTLANDET',
                    },
                ],
            },
            key: ContextDataType.ARBEID_I_UTLANDET,
            type: 'update',
        });

        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: {
                harHattArbeidIUtlandet: true,
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: true,
            },
            key: ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: undefined,
            key: ContextDataType.FRILANS,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(4, {
            data: SøknadRoute.NÆRING,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
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

        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));

        await waitFor(() => expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce());
        expect(gåTilNesteSide).not.toHaveBeenCalledWith(
            expect.objectContaining({
                data: SøknadRoute.NÆRING,
                key: ContextDataType.APP_ROUTE,
            }),
        );
    });
});
