import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Oppsummering.stories';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType } from 'app/context/FpDataContext';

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
    ErEndringssøknad,
} = composeStories(stories);

describe('<Oppsummering>', () => {
    it('skal bekrefte vilkårene og sende inn søknad', async () => {
        const sendSøknad = vi.fn();

        render(<Default sendSøknad={sendSøknad} />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.queryByText('Du må bekrefte at du har gjort deg kjent med vilkårene.')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Send inn søknad'));

        expect(screen.getByText('Du må bekrefte at du har gjort deg kjent med vilkårene.')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'Jeg har gjort meg kjent med vilkårene for å motta foreldrepenger, og skal ha omsorgen for barnet i perioden jeg søker om.',
            ),
        );

        expect(screen.queryByText('Du må bekrefte at du har gjort deg kjent med vilkårene.')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Send inn søknad'));

        expect(sendSøknad).toHaveBeenCalledTimes(1);
    });

    it('skal vise informasjon om barnet men har ikke info om andre foreldre eller arbeidsforhold', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknaden gjelder')).toBeInTheDocument();
        expect(screen.getByText('Ett barn')).toBeInTheDocument();
        expect(screen.getByText('Fødselsdato')).toBeInTheDocument();
        expect(screen.getByText('15.03.2021')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Den andre forelderen'));

        expect(screen.getByText('Jeg kan ikke oppgi den andre forelderen')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Arbeidsforhold og andre inntektskilder'));

        expect(screen.getByText('Du er ikke registrert med noen arbeidsforhold.')).toBeInTheDocument();
    });

    it('skal vise informasjon om den andre forelderen', async () => {
        render(<MedAnnenForelder />);

        await userEvent.click(await screen.findByText('Den andre forelderen'));

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

        await userEvent.click(await screen.findByText('Den andre forelderen'));

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

        await userEvent.click(await screen.findByText('Den andre forelderen'));

        expect(screen.getByText('Mottar Eline uføretrygd?')).toBeInTheDocument();
        expect(screen.getAllByText('Ja')[1]).toBeInTheDocument();
    });

    it('skal vise informasjon om adoptert barn', async () => {
        render(<MedAdoptertBarn />);

        await userEvent.click(await screen.findByText('Barnet'));

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

        await userEvent.click(await screen.findByText('Utenlandsopphold'));

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

        await userEvent.click(await screen.findByText('Arbeidsforhold og andre inntektskilder'));

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
    });
    it('skal vise informasjon om uttaksplan', async () => {
        render(<FarMedUførMor />);

        await userEvent.click(await screen.findByText('Din plan'));

        expect(screen.getByText('Lengde med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger før fødsel')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Utsettelse')).toBeInTheDocument();
        expect(screen.getByText('Begrunnelse for å søke om utsettelse')).toBeInTheDocument();
        expect(screen.getByText('Utsettelsesgrunn', { exact: false })).toBeInTheDocument();
    });
    it('Skal vise informasjon om at mor har rett til foreldrepenger i EØS', async () => {
        render(<FarMedMorSomHarRettIEØS />);

        await userEvent.click(await screen.findByText('Den andre forelderen'));

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

        await userEvent.click(await screen.findByText('Den andre forelderen'));

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

        await userEvent.click(await screen.findByText('Den andre forelderen'));

        expect(screen.getByText('Har Frida rett til foreldrepenger i Norge?')).toBeInTheDocument();
        expect(
            screen.queryByText('Har Anne oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText('Har Anne arbeidet eller mottatt pengestøtte i et EØS-land?', { exact: false }),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Mottar Frida uføretrygd')).not.toBeInTheDocument();
    });

    it('skal går til inntektsinformasjon når førstegangssøknad og en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.INNTEKTSINFORMASJON,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal går til uttaksplan når endringssøknad og en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <ErEndringssøknad
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Oppsummering')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.UTTAKSPLAN,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
