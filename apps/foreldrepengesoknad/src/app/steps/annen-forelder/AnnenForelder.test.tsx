import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import dayjs from 'dayjs';
import * as stories from './AnnenForelder.stories';

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
const GÅ_VIDERE_KNAPP = 'Neste steg';
const ALENE_OMSORG_LABEL = 'Er dere sammen om omsorgen for barnet?';
const JA = 'Ja';
const NEI = 'Nei';
const ALENE_OM_OMSORG_NEI = 'Ja';
const ALENE_OM_OMSORG_JA = 'Nei, jeg har aleneomsorg';
const INFO_TEKST = 'Dere kan avtale at LEALAUS tar ut foreldrepenger.';
const HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL = 'Har LEALAUS rett til foreldrepenger i Norge?';
const HAR_FAR_HATT_OPPHOLD_I_EØS_LAND =
    'Har LEALAUS oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?';
const HAR_FAR_RETT_TIL_FP_I_EØS_LABEL = 'Har LEALAUS arbeidet eller mottatt pengestøtte i et EØS-land';
const HAR_MOR_HATT_OPPHOLD_I_EØS_LAND =
    'Har TALENTFULL oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?';
const HAR_MOR_RETT_TIL_FP_I_NORGE_LABEL = 'Har TALENTFULL rett til foreldrepenger i Norge?';
const HAR_MOR_RETT_TIL_FP_I_EØS_LABEL = 'Har TALENTFULL arbeidet eller mottatt pengestøtte i et EØS-land';
const ER_ANNEN_FORELDER_UFØR = 'Mottar TALENTFULL uføretrygd?';
const HAR_DU_ORIENTERT_LABEL = 'Har du orientert LEALAUS om søknaden din?';
const DU_MÅ_INFORMERE_INFO_TEKST = 'Du må si ifra til LEALAUS om søknaden før du kan gå videre.';
const NAVN_ANNEN_FORELDER_LABEL = 'Hva heter den andre forelderen?';
const KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL = 'Jeg kan ikke oppgi navnet til den andre forelderen';
const LINK_TIL_FARSKAPSPORTAL_MOR = 'Her kan far erklære farskap digitalt';
const LINK_TIL_FARSKAPSPORTAL_FAR = 'Her kan du erklære farskap digitalt';
describe('<AnnenForelder>', () => {
    it('skal fylle ut at en har aleneomsorg for barnet', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_JA));

        expect(await screen.findByText(INFO_TEKST)).toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og ikke rett til foreldrepenger i Norge og ikke hatt opphold i EØS', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));

        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText(HAR_FAR_HATT_OPPHOLD_I_EØS_LAND, { exact: false })).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[1]);
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet, ikke rett til foreldrepenger i Norge, opphold men ikke optjening i EØS', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));

        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText(HAR_FAR_HATT_OPPHOLD_I_EØS_LAND, { exact: false })).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[2]);
        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_EØS_LABEL, { exact: false })).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[2]);
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har ikke orientert annen part', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));

        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText(HAR_DU_ORIENTERT_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(NEI)[1]);

        expect(await screen.findByText(DU_MÅ_INFORMERE_INFO_TEKST)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har orientert annen part', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));

        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText(HAR_DU_ORIENTERT_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(JA)[2]);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(DU_MÅ_INFORMERE_INFO_TEKST)).not.toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal velge at en ikke kan oppgi personalia til den andre forelderen', async () => {
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByRole('checkbox'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal måtte oppgi navn og fornavn annen forelder', async () => {
        render(<SkalOppgiPersonaliaNavnMangler />);
        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
    });

    it('skal måtte oppgi navn og fornavn annen forelder der fnr på annen forelder på saken og fnr annen forelder på barnet er ulike', async () => {
        render(<SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike />);
        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
    });

    it('skal oppgi personalia til den andre forelderen og velge at han har utenlandsk fødselsnummer', async () => {
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        await userEvent.type(fødselsnrInput, '05057923424');

        await userEvent.click(screen.getAllByRole('checkbox')[1]);

        expect(await screen.findByText('Hvor bor Espen?')).toBeInTheDocument();

        const hvorBorSelect = screen.getByLabelText('Hvor bor Espen?');
        await userEvent.selectOptions(hvorBorSelect, 'Oman');

        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_JA));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal oppgi personalia til den andre forelderen men ikke velge at han har utenlandsk fødselsnummer', async () => {
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        await userEvent.type(fødselsnrInput, '05057923424');

        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_JA));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal søke som far og ha aleneomsorg for barnet', async () => {
        render(<ForFar />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_JA));

        expect(await screen.findByText('Dato du ble alene om omsorgen')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        const datoAleneInput = screen.getByLabelText('Dato du ble alene om omsorgen');
        await userEvent.type(datoAleneInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();

        expect(
            screen.getByText('Du må legge ved bekreftelse på datoen du ble alene om omsorgen for barnet.'),
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om aleneomsorg')).toBeInTheDocument();
    });

    it('Skal søke som far og velge at mor har foreldrepenger i EØS', async () => {
        render(<ForFar />);
        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));
        expect(await screen.findByText(HAR_MOR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);
        expect(await screen.findByText(HAR_MOR_HATT_OPPHOLD_I_EØS_LAND, { exact: false })).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[2]);
        expect(await screen.findByText(HAR_MOR_RETT_TIL_FP_I_EØS_LABEL, { exact: false })).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[3]);
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[2]);
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText(ER_ANNEN_FORELDER_UFØR)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[3]);
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
    it('skal vise infoboks om farskapsportal når mor søker på termin, annen forelder er far og har rett i Norge', async () => {
        const screen = render(<MorUfødtBarn />);
        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        await userEvent.type(fødselsnrInput, '05057923524');

        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));
        expect(await screen.findByText('Har Espen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);
        expect(screen.queryByText(LINK_TIL_FARSKAPSPORTAL_MOR, { exact: false })).not.toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);
        expect(await screen.findByText(LINK_TIL_FARSKAPSPORTAL_MOR, { exact: false })).toBeInTheDocument();
    });
    it('skal ikke vise infoboks om farskapsportal når mor søker på termin, annen forelder er en medmor og har rett i Norge', async () => {
        render(<MorUfødtBarn />);
        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Medmor');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Medmor?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Medmor?');
        //Endrer fnr på annen forelder til en kvinnelig fnr:
        await userEvent.type(fødselsnrInput, '05057923824');
        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));
        expect(await screen.findByText('Har Medmor rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);
        expect(screen.queryByText(LINK_TIL_FARSKAPSPORTAL_MOR, { exact: false })).not.toBeInTheDocument();
    });
    it('skal vise infoboks om farskapsportal når mor søker på termin, annen forelder har utenlandsk fnr og har rett i Norge', async () => {
        render(<MorUfødtBarn />);
        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Eksotisk');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Eksotisk?')).toBeInTheDocument();
        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Eksotisk?');
        await userEvent.type(fødselsnrInput, '0000000000000000');
        await userEvent.click(screen.getAllByRole('checkbox')[1]);
        expect(await screen.findByText('Hvor bor Eksotisk?')).toBeInTheDocument();
        const hvorBorSelect = screen.getByLabelText('Hvor bor Eksotisk?');
        await userEvent.selectOptions(hvorBorSelect, 'Oman');
        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));
        expect(await screen.findByText('Har Eksotisk rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);
        expect(screen.queryByText(LINK_TIL_FARSKAPSPORTAL_MOR, { exact: false })).toBeInTheDocument();
    });
    it('skal vise infoboks om farskapsportal når far søker på termin, ikke er gift og uansett om mor har rett til foreldrepenger', async () => {
        render(<FarUfødtBarn />);
        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Mor');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');
        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Mor?')).toBeInTheDocument();
        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Mor?');
        await userEvent.type(fødselsnrInput, '05057923424');
        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));
        expect(await screen.findByText('Har Mor rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);
        expect(screen.queryByText(LINK_TIL_FARSKAPSPORTAL_FAR, { exact: false })).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);
        expect(await screen.findByText(LINK_TIL_FARSKAPSPORTAL_FAR, { exact: false })).toBeInTheDocument();
    });
    it('skal ikke vise infoboks om farskapsportal når medmor søker', async () => {
        render(<MedmorUfødtBarn />);
        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Mor');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');
        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Mor?')).toBeInTheDocument();
        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Mor?');
        await userEvent.type(fødselsnrInput, '05057923424');
        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));
        expect(await screen.findByText('Har Mor rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);
        expect(screen.queryByText(LINK_TIL_FARSKAPSPORTAL_FAR, { exact: false })).not.toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);
        expect(screen.queryByText(LINK_TIL_FARSKAPSPORTAL_FAR, { exact: false })).not.toBeInTheDocument();
    });
    it('skal ikke vise infoboks om farskapsportal når far er gift', async () => {
        render(<FarGiftUfødtBarn />);
        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        const fornavnInput = screen.getByLabelText('Fornavn:');
        await userEvent.type(fornavnInput, 'Mor');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await userEvent.type(etternavnInput, 'Utvikler');
        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Mor?')).toBeInTheDocument();
        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Mor?');
        await userEvent.type(fødselsnrInput, '05057923424');
        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await userEvent.click(screen.getByText(ALENE_OM_OMSORG_NEI));
        expect(await screen.findByText('Har Mor rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);
        expect(screen.queryByText(LINK_TIL_FARSKAPSPORTAL_FAR, { exact: false })).not.toBeInTheDocument();
    });
});
