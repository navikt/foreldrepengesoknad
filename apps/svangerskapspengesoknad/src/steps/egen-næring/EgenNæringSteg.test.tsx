import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs from 'dayjs';

import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';

import * as stories from './EgenNæringSteg.stories';

const { Default } = composeStories(stories);

describe('<EgenNæringSteg>', () => {
    it('skal lagre tomt valgfritt organisasjonsnummer som undefined for fiske', async () => {
        const gåTilNesteSide = vi.fn();
        const startdato = dayjs().subtract(1, 'year');

        render(<Default gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Hvilken type virksomhet har du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fiske'));

        await userEvent.click(
            within(screen.getByRole('radiogroup', { name: 'Er virksomheten registrert i Norge?' })).getByRole('radio', {
                name: 'Ja',
            }),
        );

        const orgnummerInput = screen.getByLabelText(/Hva er organisasjonsnummeret?/);
        await userEvent.type(orgnummerInput, '123');
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Organisasjonsnummeret er ikke et gyldig norsk organisasjonsnummer.'),
        ).not.toHaveLength(0);

        await userEvent.clear(orgnummerInput);

        await userEvent.type(screen.getByLabelText('Når startet du virksomheten?'), startdato.format('DD.MM.YYYY'));
        await userEvent.click(
            within(screen.getByRole('radiogroup', { name: 'Jobber du der fortsatt?' })).getByRole('radio', {
                name: 'Ja',
            }),
        );
        await userEvent.type(
            screen.getByLabelText('Hva har du hatt i næringsresultat før skatt de siste 12 månedene?'),
            '1000',
        );
        await userEvent.click(
            within(
                screen.getByRole('radiogroup', {
                    name: 'Har du begynt å jobbe i løpet av de tre siste ferdigliknede årene?',
                }),
            ).getByRole('radio', { name: 'Nei' }),
        );

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                fom: startdato.format('YYYY-MM-DD'),
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
                navnPåNæringen: undefined,
                næringsinntekt: '1000',
                næringstype: 'FISKE',
                organisasjonsnummer: undefined,
                registrertINorge: true,
            },
            key: ContextDataType.EGEN_NÆRING,
            type: 'update',
        });
    });

    it('skal gå til neste steg når informasjon er korrekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Hvilken type næring har du hatt?')).toBeInTheDocument();
        expect(await screen.findByRole('radio', { name: 'Gårdsdrift' })).toBeChecked();
        await userEvent.click(screen.getByText('Gårdsdrift'));

        const virksomhetsnavnInput = screen.getByLabelText('Hva heter virksomheten?');
        await userEvent.type(virksomhetsnavnInput, 'Virksomhetsnavn AS');

        expect(screen.queryByText('Er virksomheten registrert i Norge?')).not.toBeInTheDocument();

        const orgnummerInput = screen.getByLabelText('Hva er organisasjonsnummeret?');
        await userEvent.type(orgnummerInput, '997519485');

        const startdatoInput = screen.getByLabelText('Når startet du virksomheten?');
        await userEvent.type(startdatoInput, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        const næringsresultatInput = screen.getByLabelText(
            'Hva var næringsresultatet ditt før skatt de siste 12 månedene?',
        );
        await userEvent.type(næringsresultatInput, '1000');

        expect(screen.getByText('Har du vært yrkesaktiv i mindre enn tre år?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]!);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi organisasjonsnummer.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi næringsresultat de siste 12 månedene.')).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
                navnPåNæringen: 'Virksomhetsnavn AS',
                næringsinntekt: '1000',
                næringstype: 'JORDBRUK_SKOGBRUK',
                organisasjonsnummer: '997519485',
                registrertINorge: true,
                fom: '2023-04-30',
            },
            key: ContextDataType.EGEN_NÆRING,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, EGEN_NÆRING_ID),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
});
