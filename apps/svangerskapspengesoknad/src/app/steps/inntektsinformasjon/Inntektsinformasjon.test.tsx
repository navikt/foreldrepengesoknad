import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Inntektsinformasjon.stories';
import { render, screen } from '@testing-library/react';
import { ContextDataType } from 'app/context/SvpDataContext';
import SøknadRoutes from 'app/routes/routes';

const { Default } = composeStories(stories);

describe('<Inntektsinformasjon>', () => {
    it('skal vise feilmelding hvis spørsmål ikke er besvart', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Har du jobbet og hatt inntekt som frilanser de siste 4 ukene?')).toBeInTheDocument();
        expect(
            screen.getByText('Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 4 ukene?'),
        ).toBeInTheDocument();
        expect(screen.getByText('Har du jobbet i utlandet de siste 4 ukene?')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi om du har arbeidet som frilanser de siste 4 ukene.')).toHaveLength(2);
        expect(
            screen.getAllByText('Du må oppgi om du har hatt inntekt som selvstendig næringsdrivende de siste 4 ukene.'),
        ).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi om du har arbeidet i utlandet de siste 4 ukene.')).toHaveLength(2);
    });

    it('skal ikke vise feilmelding', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]);

        await userEvent.click(screen.getAllByText('Nei')[1]);

        await userEvent.click(screen.getAllByText('Ja')[2]);
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.queryByText('Du må oppgi om du har arbeidet som frilanser de siste 4 ukene.'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText('Du må oppgi om du har hatt inntekt som selvstendig næringsdrivende de siste 4 ukene.'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText('Du må oppgi om du har arbeidet i utlandet de siste 4 ukene.'),
        ).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                andreInntekter: undefined,
                frilansInformasjon: undefined,
                harHattAnnenInntekt: true,
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: false,
                rolle: 'mor',
                selvstendigNæringsdrivendeInformasjon: undefined,
            },
            key: ContextDataType.SØKER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ARBEID_I_UTLANDET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
});
