import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import dayjs from 'dayjs';
import * as stories from './AnnenForelder.stories';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType } from 'app/context/FpDataContext';

const {
    Default,
    SkalOppgiPersonalia,
    ForFar,
    SkalOppgiPersonaliaNavnMangler,
    SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,
    MorUfødtBarn,
    MedmorUfødtBarn,
    FarUfødtBarn,
    FarGiftUfødtBarn,
} = composeStories(stories);

//TODO (TOR) Testane her må i større grad testa output frå onSubmit-funksjonen. Kan testast gjennom 'gåTilNesteSide'

describe('<AnnenForelder>', () => {
    it('skal fylle ut at en har aleneomsorg for barnet', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).not.toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei, jeg har aleneomsorg'));

        expect(screen.getByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(5);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallBarn: 1,
                datoForAleneomsorg: undefined,
                dokumentasjonAvAleneomsorg: undefined,
                fnr: ['21091981146'],
                fødselsdatoer: [dayjs('2021-03-15').startOf('day').toDate()],
                type: 'født',
            },
            key: ContextDataType.OM_BARNET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: {
                erAleneOmOmsorg: true,
                harHattAnnenInntektSiste10Mnd: undefined,
                harJobbetSomFrilansSiste10Mnd: undefined,
                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
            },
            key: ContextDataType.SØKER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: {
                bostedsland: undefined,
                erInformertOmSøknaden: undefined,
                erUfør: undefined,
                etternavn: 'BÆREPOSE',
                fnr: '12038517080',
                fornavn: 'LEALAUS',
                harOppholdtSegIEØS: undefined,
                harRettPåForeldrepengerIEØS: false,
                harRettPåForeldrepengerINorge: undefined,
                kanIkkeOppgis: false,
                utenlandskFnr: false,
            },
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(4, {
            data: {
                I000110: [],
            },
            key: ContextDataType.VEDLEGG,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(5, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal lagre route når en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.OM_BARNET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og ikke rett til foreldrepenger i Norge og ikke hatt opphold i EØS', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har LEALAUS rett til foreldrepenger i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(
            screen.getByText(
                'Har LEALAUS oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                { exact: false },
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[1]);

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        expect(screen.queryByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet, ikke rett til foreldrepenger i Norge, opphold men ikke optjening i EØS', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har LEALAUS rett til foreldrepenger i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(
            screen.getByText(
                'Har LEALAUS oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                { exact: false },
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[2]);

        expect(
            screen.getByText('Har LEALAUS arbeidet eller mottatt pengestøtte i et EØS-land', { exact: false }),
        ).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        expect(screen.queryByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har ikke orientert annen part', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har LEALAUS rett til foreldrepenger i Norge?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Har du orientert LEALAUS om søknaden din?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[1]);

        expect(screen.getByText('Du må si ifra til LEALAUS om søknaden før du kan gå videre.')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.queryByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har orientert annen part', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har LEALAUS rett til foreldrepenger i Norge?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Har du orientert LEALAUS om søknaden din?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[2]);

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        expect(
            screen.queryByText('Du må si ifra til LEALAUS om søknaden før du kan gå videre.'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).not.toBeInTheDocument();
    });

    it('skal velge at en ikke kan oppgi personalia til den andre forelderen', async () => {
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Jeg kan ikke oppgi navnet til den andre forelderen')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('checkbox'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal måtte oppgi navn og fornavn annen forelder', async () => {
        render(<SkalOppgiPersonaliaNavnMangler />);
        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
    });

    it('skal måtte oppgi navn og fornavn annen forelder der fnr på annen forelder på saken og fnr annen forelder på barnet er ulike', async () => {
        render(<SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike />);
        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
    });

    it('skal oppgi personalia til den andre forelderen og velge at han har utenlandsk fødselsnummer', async () => {
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Jeg kan ikke oppgi navnet til den andre forelderen')).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        await userEvent.type(fødselsnrInput, '05057923424');

        await userEvent.click(screen.getAllByRole('checkbox')[1]);

        expect(screen.getByText('Hvor bor Espen?')).toBeInTheDocument();

        const hvorBorSelect = screen.getByLabelText('Hvor bor Espen?');
        await userEvent.selectOptions(hvorBorSelect, 'Oman');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei, jeg har aleneomsorg'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal oppgi personalia til den andre forelderen men ikke velge at han har utenlandsk fødselsnummer', async () => {
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Jeg kan ikke oppgi navnet til den andre forelderen')).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        await userEvent.type(fødselsnrInput, '05057923424');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei, jeg har aleneomsorg'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal søke som far og ha aleneomsorg for barnet', async () => {
        render(<ForFar />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei, jeg har aleneomsorg'));

        expect(screen.getByText('Dato du ble alene om omsorgen')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        const datoAleneInput = screen.getByLabelText('Dato du ble alene om omsorgen');
        await userEvent.type(datoAleneInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        expect(
            screen.getByText('Du må legge ved bekreftelse på datoen du ble alene om omsorgen for barnet.'),
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om aleneomsorg')).toBeInTheDocument();
    });

    it('Skal søke som far og velge at mor har foreldrepenger i EØS', async () => {
        render(<ForFar />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har TALENTFULL rett til foreldrepenger i Norge?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(
            screen.getByText(
                'Har TALENTFULL oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                { exact: false },
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[2]);

        expect(
            screen.getByText('Har TALENTFULL arbeidet eller mottatt pengestøtte i et EØS-land', {
                exact: false,
            }),
        ).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[3]);

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Mottar TALENTFULL uføretrygd?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[3]);

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise infoboks om farskapsportal når mor søker på termin, annen forelder er far og har rett i Norge', async () => {
        const screen = render(<MorUfødtBarn />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Jeg kan ikke oppgi navnet til den andre forelderen')).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        await userEvent.type(fødselsnrInput, '05057923524');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har Espen rett til foreldrepenger i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(screen.queryByText('Her kan far erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Her kan far erklære farskap digitalt', { exact: false })).toBeInTheDocument();
    });

    it('skal ikke vise infoboks om farskapsportal når mor søker på termin, annen forelder er en medmor og har rett i Norge', async () => {
        render(<MorUfødtBarn />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Jeg kan ikke oppgi navnet til den andre forelderen')).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Medmor');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Hva er fødselsnummeret eller D-nummeret til Medmor?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Medmor?');

        //Endrer fnr på annen forelder til en kvinnelig fnr:
        await userEvent.type(fødselsnrInput, '05057923824');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har Medmor rett til foreldrepenger i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.queryByText('Her kan far erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();
    });

    it('skal vise infoboks om farskapsportal når mor søker på termin, annen forelder har utenlandsk fnr og har rett i Norge', async () => {
        render(<MorUfødtBarn />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Jeg kan ikke oppgi navnet til den andre forelderen')).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Eksotisk');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Hva er fødselsnummeret eller D-nummeret til Eksotisk?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Eksotisk?');
        await userEvent.type(fødselsnrInput, '0000000000000000');

        await userEvent.click(screen.getAllByRole('checkbox')[1]);

        expect(screen.getByText('Hvor bor Eksotisk?')).toBeInTheDocument();

        const hvorBorSelect = screen.getByLabelText('Hvor bor Eksotisk?');
        await userEvent.selectOptions(hvorBorSelect, 'Oman');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har Eksotisk rett til foreldrepenger i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.queryByText('Her kan far erklære farskap digitalt', { exact: false })).toBeInTheDocument();
    });

    it('skal vise infoboks om farskapsportal når far søker på termin, ikke er gift og uansett om mor har rett til foreldrepenger', async () => {
        render(<FarUfødtBarn />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Mor');

        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Hva er fødselsnummeret eller D-nummeret til Mor?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Mor?');
        await userEvent.type(fødselsnrInput, '05057923424');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har Mor rett til foreldrepenger i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(screen.queryByText('Her kan du erklære farskap digitalt', { exact: false })).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Her kan du erklære farskap digitalt', { exact: false })).toBeInTheDocument();
    });

    it('skal ikke vise infoboks om farskapsportal når medmor søker', async () => {
        render(<MedmorUfødtBarn />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Mor');

        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Hva er fødselsnummeret eller D-nummeret til Mor?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Mor?');
        await userEvent.type(fødselsnrInput, '05057923424');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har Mor rett til foreldrepenger i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(screen.queryByText('Her kan du erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.queryByText('Her kan du erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();
    });
    it('skal ikke vise infoboks om farskapsportal når far er gift', async () => {
        render(<FarGiftUfødtBarn />);

        expect(await screen.findByText('Hva heter den andre forelderen?')).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Mor');

        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Hva er fødselsnummeret eller D-nummeret til Mor?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Mor?');
        await userEvent.type(fødselsnrInput, '05057923424');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har Mor rett til foreldrepenger i Norge?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.queryByText('Her kan du erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();
    });
});
