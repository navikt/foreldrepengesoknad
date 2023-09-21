import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Oppsummering.stories';

const {
    Default,
    MedAnnenForelder,
    FarMedUførMor,
    FarMedMorSomHarRettIEØS,
    FarMedMorSomHarRettINorge,
    MedAdoptertBarn,
    MedUtenlandsopphold,
    MedArbeidsforholdOgAndreInntekter,
    MedAleneOmsorg,
} = composeStories(stories);

const SEND_INN_SØKNAD_KNAPP = 'Send inn søknad';
const DU_MÅ_BEKREFTE_VILKÅRENE_FEILMELDING = 'Du må bekrefte at du har gjort deg kjent med vilkårene.';
const OM_BARNET_PANEL = 'Barnet';
const ANDRE_FORELDER_PANEL = 'Den andre forelderen';
const UTENLANDSOPPHOLD_PANEL = 'Utenlandsopphold';
const ARBEIDSFORHOLD_OG_INNTEKTER_PANEL = 'Arbeidsforhold og andre inntektskilder';
const UTTAKSPLAN_PANEL = 'Din plan';

describe('<Oppsummering>', () => {
    it('skal bekrefte vilkårene før innsending', async () => {
        render(<Default />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.queryByText(DU_MÅ_BEKREFTE_VILKÅRENE_FEILMELDING)).not.toBeInTheDocument();

        userEvent.click(screen.getByText(SEND_INN_SØKNAD_KNAPP));

        expect(await screen.findByText(DU_MÅ_BEKREFTE_VILKÅRENE_FEILMELDING)).toBeInTheDocument();

        userEvent.click(
            screen.getByText(
                'Jeg har gjort meg kjent med vilkårene for å motta foreldrepenger, og skal ha omsorgen for barnet i perioden jeg søker om.',
            ),
        );

        await waitFor(() => expect(screen.queryByText(DU_MÅ_BEKREFTE_VILKÅRENE_FEILMELDING)).not.toBeInTheDocument());
    });

    it('skal vise informasjon om barnet men har ikke info om andre foreldre eller arbeidsforhold', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknaden gjelder')).toBeInTheDocument();
        expect(screen.getByText('Ett barn')).toBeInTheDocument();
        expect(screen.getByText('Fødselsdato')).toBeInTheDocument();
        expect(screen.getByText('15.03.2021')).toBeInTheDocument();

        userEvent.click(screen.getByText(ANDRE_FORELDER_PANEL));

        expect(screen.getByText('Jeg kan ikke oppgi den andre forelderen')).toBeInTheDocument();

        userEvent.click(screen.getByText(ARBEIDSFORHOLD_OG_INNTEKTER_PANEL));

        expect(screen.getByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();
    });

    it('skal vise informasjon om den andre forelderen', async () => {
        render(<MedAnnenForelder />);

        userEvent.click(await screen.findByText(ANDRE_FORELDER_PANEL));

        expect(screen.getByText('Den andre forelderen heter')).toBeInTheDocument();
        expect(screen.getByText('Espen Utvikler')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer eller D-nummer')).toBeInTheDocument();
        expect(screen.getByText('1212121313')).toBeInTheDocument();
        expect(screen.getByText('Vi har')).toBeInTheDocument();
        expect(screen.getByText('Felles omsorg')).toBeInTheDocument();
        expect(screen.getByText('Har Espen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        expect(
            screen.queryByText('Har Espen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(
                'Har Espen arbeidet eller mottatt pengestøtte i et EØS-land i minst seks av de siste ti månedene før barnet ble født?',
            ),
        ).not.toBeInTheDocument();
        expect(screen.getAllByText('Ja')[1]).toBeInTheDocument();
        expect(screen.queryByText('Mottar Espen uføretrygd?')).not.toBeInTheDocument();
    });
    it('Skal vise riktig informasjon om aleneomsorg', async () => {
        render(<MedAleneOmsorg />);

        userEvent.click(await screen.findByText(ANDRE_FORELDER_PANEL));
        expect(screen.getByText('Den andre forelderen heter')).toBeInTheDocument();
        expect(screen.getByText('Ingen Omsorg')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer eller D-nummer')).toBeInTheDocument();
        expect(screen.getByText('1212121313')).toBeInTheDocument();
        expect(screen.getByText('Jeg har')).toBeInTheDocument();
        expect(screen.getByText('Aleneomsorg')).toBeInTheDocument();
        expect(screen.queryByText('Har Ingen rett til foreldrepenger i Norge')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Har Ingen arbeidet eller mottatt pengestøtte i et EØS-land ', { exact: false }),
        ).not.toBeInTheDocument();
    });
    it('skal vise informasjon om at mor er ufør', async () => {
        render(<FarMedUførMor />);

        userEvent.click(await screen.findByText(ANDRE_FORELDER_PANEL));
        expect(screen.getByText('Mottar Eline uføretrygd?')).toBeInTheDocument();
        expect(screen.getAllByText('Ja')[1]).toBeInTheDocument();
    });

    it('skal vise informasjon om adoptert barn', async () => {
        render(<MedAdoptertBarn />);

        userEvent.click(await screen.findByText(OM_BARNET_PANEL));

        expect(screen.getByText('Søknaden gjelder')).toBeInTheDocument();
        expect(screen.getByText('Ett barn')).toBeInTheDocument();
        expect(screen.getByText('Fødselsdato')).toBeInTheDocument();
        expect(screen.getByText('01.01.2021')).toBeInTheDocument();
        expect(screen.getByText('Gjelder søknaden stebarnsadopsjon?')).toBeInTheDocument();
        expect(screen.getAllByText('Ja')[1]).toBeInTheDocument();
        expect(screen.getByText('Adopsjonsdato')).toBeInTheDocument();
        expect(screen.getByText('01.10.2021')).toBeInTheDocument();
    });

    it('skal vise informasjon om utenlandsopphold', async () => {
        render(<MedUtenlandsopphold />);

        userEvent.click(await screen.findByText(UTENLANDSOPPHOLD_PANEL));

        expect(screen.getByText('De siste 12 månedene har jeg')).toBeInTheDocument();
        expect(screen.getByText('Bodd i Sverige')).toBeInTheDocument();
        expect(screen.getByText('01.01.2020 - 31.12.2020')).toBeInTheDocument();
        expect(screen.getByText('De neste 12 månedene skal jeg')).toBeInTheDocument();
        expect(screen.getByText('Bo i Sverige')).toBeInTheDocument();
        expect(screen.getByText('01.01.2021 - 31.12.2021')).toBeInTheDocument();
        expect(screen.getByText('Jeg er i Norge på fødselstidspunktet')).toBeInTheDocument();
        expect(screen.getAllByText('Nei')[0]).toBeInTheDocument();
    });

    it('skal vise informasjon om arbeidsforhold og andre inntekter', async () => {
        render(<MedArbeidsforholdOgAndreInntekter />);

        userEvent.click(await screen.findByText(ARBEIDSFORHOLD_OG_INNTEKTER_PANEL));

        expect(screen.getByText('Org nr: 1')).toBeInTheDocument();
        expect(screen.getByText('80 prosent')).toBeInTheDocument();
        expect(screen.getByText('Auto Joachim Bilpleie')).toBeInTheDocument();
        expect(screen.getByText('01.01.2015 - Pågående')).toBeInTheDocument();

        expect(screen.queryByText('Org nr: 2')).not.toBeInTheDocument();
        expect(screen.queryByText('20 prosent')).not.toBeInTheDocument();
        expect(screen.queryByText('Taco Express')).not.toBeInTheDocument();
        expect(screen.queryByText('01.01.2019 - 01.01.2021')).not.toBeInTheDocument();

        expect(screen.getByText('Frilansarbeid')).toBeInTheDocument();
        expect(screen.getByText('Oppstartsdato som frilans')).toBeInTheDocument();
        expect(screen.getByText('01.01.2019')).toBeInTheDocument();
        expect(screen.getByText('Jeg jobber fremdeles som frilans')).toBeInTheDocument();
        expect(screen.getAllByText('Ja')[1]).toBeInTheDocument();
        expect(screen.getByText('Jeg driver fosterhjem')).toBeInTheDocument();
        expect(screen.getAllByText('Nei')[0]).toBeInTheDocument();
    });
    it('skal vise informasjon om uttaksplan', async () => {
        render(<FarMedUførMor />);

        userEvent.click(await screen.findByText(UTTAKSPLAN_PANEL));
        expect(screen.getByText('Lengde med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger før fødsel')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Utsettelse')).toBeInTheDocument();
        expect(screen.getByText('Begrunnelse for å søke om utsettelse')).toBeInTheDocument();
        expect(screen.getByText('Utsettelsesgrunn', { exact: false })).toBeInTheDocument();
    });
    it('Skal vise informasjon om at mor har rett til foreldrepenger i EØS', async () => {
        render(<FarMedMorSomHarRettIEØS />);

        userEvent.click(await screen.findByText(ANDRE_FORELDER_PANEL));
        expect(screen.getByText('Har Anne rett til foreldrepenger i Norge?')).toBeInTheDocument();
        expect(
            screen.getByText('Har Anne oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Har Anne arbeidet eller mottatt pengestøtte i et EØS-land i minst seks av de siste ti månedene før barnet ble født?',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Mottar Anne uføretrygd')).not.toBeInTheDocument();
    });
    it('Skal vise informasjon om at mor har hatt opphold men ikke rett til foreldrepenger i EØS', async () => {
        render(<FarMedMorSomHarRettIEØS />);

        userEvent.click(await screen.findByText(ANDRE_FORELDER_PANEL));
        expect(screen.getByText('Har Anne rett til foreldrepenger i Norge?')).toBeInTheDocument();
        expect(
            screen.getByText('Har Anne oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Har Anne arbeidet eller mottatt pengestøtte i et EØS-land i minst seks av de siste ti månedene før barnet ble født?',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Mottar Anne uføretrygd')).not.toBeInTheDocument();
    });
    it('skal vise informasjon om at mor har rett til foreldrepenger i Norge og ikke vise info om EØS eller uføretrygd', async () => {
        render(<FarMedMorSomHarRettINorge />);

        userEvent.click(await screen.findByText(ANDRE_FORELDER_PANEL));
        expect(screen.getByText('Har Frida rett til foreldrepenger i Norge?')).toBeInTheDocument();
        expect(
            screen.queryByText('Har Anne oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText('Har Anne arbeidet eller mottatt pengestøtte i et EØS-land?', { exact: false }),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Mottar Frida uføretrygd')).not.toBeInTheDocument();
    });
});
