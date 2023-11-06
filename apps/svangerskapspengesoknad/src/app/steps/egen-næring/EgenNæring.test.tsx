import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './EgenNæring.stories';
import dayjs from 'dayjs';

const { Default } = composeStories(stories);
const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const HVILKEN_TYPE_VIRKSOMHET = 'Hvilken type virksomhet har du?';
const FISKE = 'Fiske';
const HVA_HETER_VIRKSOMHETEN = 'Hva heter virksomheten?';
const REGISTRERT_I_NORGE = 'Er virksomheten registrert i Norge?';
const ORGNUMMER = 'Hva er organisasjonsnummeret?';
const HVILKET_LAND = 'I hvilket land er virksomheten din registrert i?';
const STARTDATO = 'Når startet du virksomheten?';
const JOBBER_DU_DER_FORTSATT = 'Jobber du der fortsatt?';
const JA = 'Ja';
const NEI = 'Nei';
const SLUTTDATO = 'Når avsluttet du virksomheten?';
const NÆRINGSRESULTAT = 'Hva har du hatt i næringsresultat før skatt de siste 12 månedene?';
const FERDIGLIKNENDE_ÅR = 'Har du begynt å jobbe i løpet av de tre siste ferdigliknede årene?';
const YRKERAKTIV = 'Når ble du yrkesaktiv?';
const NESTE_STEG = 'Neste steg';

describe('<Arbeid som selvstendig næringsdrivende>', () => {
    const user = userEvent.setup();
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(HVILKEN_TYPE_VIRKSOMHET)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.queryAllByText('Du må oppgi type virksomhet du har.')[0]).toBeInTheDocument();
        expect(await screen.queryAllByText('Du må oppgi navnet på virksomheten din')[0]).toBeInTheDocument();
        expect(await screen.queryAllByText('Du må oppgi om virksomheten er registrert i Norge')[0]).toBeInTheDocument();
        expect(await screen.queryAllByText('Du må oppgi en startdato.')[0]).toBeInTheDocument();
        expect(await screen.queryAllByText('Du må oppgi om virksomheten din er pågående.')[0]).toBeInTheDocument();
        expect(await screen.queryAllByText('Du må oppgi næringsresultat de siste 12 månedene.')[0]).toBeInTheDocument();
        expect(
            await screen.queryAllByText(
                'Du må oppgi om du har begynt å jobbe i løpet av de 3 siste ferdigliknede årene.',
            )[0],
        ).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText(HVILKEN_TYPE_VIRKSOMHET)).toBeInTheDocument();
        await user.click(screen.getByText(FISKE));

        expect(await screen.findByText(HVA_HETER_VIRKSOMHETEN)).toBeInTheDocument();
        const virksomhetsnavnInput = screen.getByLabelText(HVA_HETER_VIRKSOMHETEN);
        await user.type(virksomhetsnavnInput, 'Virksomhetsnavn AS');
        await user.tab();

        expect(await screen.findByText(REGISTRERT_I_NORGE)).toBeInTheDocument();
        await user.click(screen.getAllByText(JA)[0]);

        expect(await screen.findByText(ORGNUMMER)).toBeInTheDocument();
        const orgnummerInput = screen.getByLabelText(ORGNUMMER);
        await user.type(orgnummerInput, '997519485');
        await user.tab();

        const startdatoInput = screen.getByLabelText(STARTDATO);
        await user.type(startdatoInput, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(JOBBER_DU_DER_FORTSATT)).toBeInTheDocument();
        await user.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText(NÆRINGSRESULTAT)).toBeInTheDocument();
        const næringsresultatInput = screen.getByLabelText(NÆRINGSRESULTAT);
        await user.type(næringsresultatInput, '1000');
        await user.tab();

        expect(await screen.findByText(FERDIGLIKNENDE_ÅR)).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[0]);

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.queryByText('Du må oppgi organisasjonsnummer.')).not.toBeInTheDocument();
        expect(await screen.queryByText('Du må oppgi næringsresultat de siste 12 månedene.')).not.toBeInTheDocument();
    });
    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(STARTDATO)).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(STARTDATO);
        await user.type(startdatoInput, 'ikemfke');
        await user.tab();

        expect(await screen.findByText(JOBBER_DU_DER_FORTSATT)).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[1]);

        expect(await screen.findByText(SLUTTDATO)).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(SLUTTDATO);
        await user.type(sluttdatoInput, 'sjnkf');
        await user.tab();

        expect(await screen.findByText(FERDIGLIKNENDE_ÅR)).toBeInTheDocument();
        await user.click(screen.getAllByText(JA)[2]);

        expect(await screen.findByText(YRKERAKTIV)).toBeInTheDocument();
        const yrkesaktidDatoInput = screen.getByLabelText(YRKERAKTIV);
        await user.type(yrkesaktidDatoInput, 'sjnkf');
        await user.tab();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Startdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
        expect(
            await screen.getAllByText('Sluttdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('skal vise feilmelding når land ikke er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText(REGISTRERT_I_NORGE)).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[0]);

        expect(await screen.findByText(HVILKET_LAND)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.queryAllByText('Du må oppgi hvilket land næringen er registert i.')[0]).toBeInTheDocument();
    });
});
