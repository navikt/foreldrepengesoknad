import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './EgenNæring.stories';
import dayjs from 'dayjs';
import { ContextDataType } from 'app/context/SvpDataContext';
import SøknadRoutes from 'app/routes/routes';

const { Default } = composeStories(stories);

describe('<Arbeid som selvstendig næringsdrivende>', () => {
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Hvilken type virksomhet har du?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryAllByText('Du må oppgi type virksomhet du har.')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi navnet på virksomheten din')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi om virksomheten er registrert i Norge')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi en startdato.')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi om virksomheten din er pågående.')[0]).toBeInTheDocument();
        expect(screen.queryAllByText('Du må oppgi næringsresultat de siste 12 månedene.')[0]).toBeInTheDocument();
        expect(
            screen.queryAllByText('Du må oppgi om du har begynt å jobbe i løpet av de 3 siste ferdigliknede årene.')[0],
        ).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
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
                hattVarigEndringAvNæringsinntektSiste4Kalenderår: undefined,
                navnPåNæringen: 'Virksomhetsnavn AS',
                næringsinntekt: '1000',
                næringstyper: ['FISKE'],
                oppstartsdato: '',
                organisasjonsnummer: '997519485',
                pågående: true,
                registrertILand: undefined,
                registrertINorge: true,
                tidsperiode: {
                    fom: '2023-04-30',
                    tom: '',
                },
                varigEndringBeskrivelse: undefined,
                varigEndringDato: '',
                varigEndringInntektEtterEndring: '',
            },
            key: ContextDataType.EGEN_NÆRING,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.VALGT_TILRETTELEGGING_ID,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: SøknadRoutes.VELG_ARBEID,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvilken type virksomhet har du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jordbruk'));

        expect(screen.getByText('Hva heter virksomheten?')).toBeInTheDocument();
        const virksomhetsnavnInput = screen.getByLabelText('Hva heter virksomheten?');
        await userEvent.type(virksomhetsnavnInput, 'Virksomhetsnavn AS');
        await userEvent.tab();

        expect(screen.getByText('Er virksomheten registrert i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Hva er organisasjonsnummeret?')).toBeInTheDocument();
        const orgnummerInput = screen.getByLabelText('Hva er organisasjonsnummeret?');
        await userEvent.type(orgnummerInput, '997519485');
        await userEvent.tab();

        const startdatoInput = screen.getByLabelText('Når startet du virksomheten?');
        await userEvent.type(startdatoInput, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(
            screen.getByText('Hva har du hatt i næringsresultat før skatt de siste 12 månedene?'),
        ).toBeInTheDocument();
        const næringsresultatInput = screen.getByLabelText(
            'Hva har du hatt i næringsresultat før skatt de siste 12 månedene?',
        );
        await userEvent.type(næringsresultatInput, '1000');
        await userEvent.tab();

        expect(
            screen.getByText('Har du begynt å jobbe i løpet av de tre siste ferdigliknede årene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi organisasjonsnummer.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi næringsresultat de siste 12 månedene.')).not.toBeInTheDocument();
    });
    it('skal ikke vise feilmelding hvis fisker ikke fyller ut navn eller orgnummer', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvilken type virksomhet har du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fiske'));

        expect(screen.getByText('Er virksomheten registrert i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        const startdatoInput = screen.getByLabelText('Når startet du virksomheten?');
        await userEvent.type(startdatoInput, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(
            screen.getByText('Hva har du hatt i næringsresultat før skatt de siste 12 månedene?'),
        ).toBeInTheDocument();
        const næringsresultatInput = screen.getByLabelText(
            'Hva har du hatt i næringsresultat før skatt de siste 12 månedene?',
        );
        await userEvent.type(næringsresultatInput, '1000');
        await userEvent.tab();

        expect(
            screen.getByText('Har du begynt å jobbe i løpet av de tre siste ferdigliknede årene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi organisasjonsnummer.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi næringsresultat de siste 12 månedene.')).not.toBeInTheDocument();
    });

    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText('Når startet du virksomheten?')).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText('Når startet du virksomheten?');
        await userEvent.type(startdatoInput, 'ikemfke');
        await userEvent.tab();

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]);

        expect(screen.getByText('Når avsluttet du virksomheten?')).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText('Når avsluttet du virksomheten?');
        await userEvent.type(sluttdatoInput, 'sjnkf');
        await userEvent.tab();

        expect(
            screen.getByText('Har du begynt å jobbe i løpet av de tre siste ferdigliknede årene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        expect(screen.getByText('Når ble du yrkesaktiv?')).toBeInTheDocument();
        const yrkesaktidDatoInput = screen.getByLabelText('Når ble du yrkesaktiv?');
        await userEvent.type(yrkesaktidDatoInput, 'sjnkf');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Startdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText('Sluttdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });

    it('skal vise feilmelding når land ikke er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText('Er virksomheten registrert i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(screen.getByText('I hvilket land er virksomheten din registrert i?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryAllByText('Du må oppgi hvilket land næringen er registert i.')[0]).toBeInTheDocument();
    });
});
