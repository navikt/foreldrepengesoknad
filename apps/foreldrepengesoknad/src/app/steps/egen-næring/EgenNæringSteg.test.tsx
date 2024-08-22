import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { ContextDataType } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import * as stories from './EgenNæringSteg.stories';

const { Default } = composeStories(stories);

describe('<EgenNæringSteg>', () => {
    it('skal gå til neste steg når informasjon er korrekt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Hvilken type virksomhet har du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jordbruk'));

        const virksomhetsnavnInput = screen.getByLabelText('Hva heter virksomheten?');
        await userEvent.type(virksomhetsnavnInput, 'Virksomhetsnavn AS');

        expect(screen.getByText('Er virksomheten registrert i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        const orgnummerInput = screen.getByLabelText('Hva er organisasjonsnummeret?');
        await userEvent.type(orgnummerInput, '997519485');

        const startdatoInput = screen.getByLabelText('Når startet du virksomheten?');
        await userEvent.type(startdatoInput, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const næringsresultatInput = screen.getByLabelText(
            'Hva har du hatt i næringsresultat før skatt de siste 12 månedene?',
        );
        await userEvent.type(næringsresultatInput, '1000');

        expect(
            screen.getByText('Har du begynt å jobbe i løpet av de tre siste ferdigliknede årene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]);

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
                pågående: true,
                registrertINorge: true,
                fomDato: '2023-04-30',
            },
            key: ContextDataType.EGEN_NÆRING,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.OPPSUMMERING,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
});
