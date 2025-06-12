import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './EgenNæringPanel.stories';

const { Default } = composeStories(stories);

describe('<Arbeid som selvstendig næringsdrivende>', () => {
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvilken type virksomhet har du?')).toBeInTheDocument();

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
        const saveOnNext = vi.fn();

        render(<Default saveOnNext={saveOnNext} />);

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

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            fom: '2023-04-30',
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
            navnPåNæringen: 'Virksomhetsnavn AS',
            næringsinntekt: '1000',
            næringstype: 'JORDBRUK_SKOGBRUK',
            organisasjonsnummer: '997519485',
            pågående: true,
            registrertINorge: true,
        });
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

    it('skal avslutte søknad', async () => {
        const cancelApplication = vi.fn();

        render(<Default cancelApplication={cancelApplication} />);

        expect(await screen.findByText('Er virksomheten registrert i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Avslutt')[0]);

        expect(screen.getAllByText('Fortsett senere')[0]).toBeInTheDocument();
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<Default onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Barnet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'BARNET_PATH');
    });
});
