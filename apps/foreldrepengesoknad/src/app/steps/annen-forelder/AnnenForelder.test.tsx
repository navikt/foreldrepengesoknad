import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/annen-forelder/AnnenForelder.stories';
import dayjs from 'dayjs';

const {
    Default,
    SkalOppgiPersonalia,
    ForFar,
    SkalOppgiPersonaliaNavnMangler,
    SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,
} = composeStories(stories);
const GÅ_VIDERE_KNAPP = 'Gå videre';
const ALENE_OMSORG_LABEL = 'Er du alene om omsorgen av barnet?';
const JA = 'Ja';
const NEI = 'Nei';
const INFO_TEKST = 'Dere kan avtale at LEALAUS tar ut foreldrepenger.';
const HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL = 'Har LEALAUS rett til foreldrepenger i Norge?';
const HAR_FAR_HATT_OPPHOLD_I_EØS_LAND =
    'Har LEALAUS oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?';
const HAR_FAR_RETT_TIL_FP_I_EØS_LABEL = 'Har LEALAUS arbeidet eller mottatt pengestøtte i et EØS-land';
const HAR_MOR_HATT_OPPHOLD_I_EØS_LAND =
    'Har TALENTFULL oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?';
const HAR_MOR_RETT_TIL_FP_I_NORGE_LABEL = 'Har TALENTFULL rett til foreldrepenger i Norge?';
const HAR_MOR_RETT_TIL_FP_I_EØS_LABEL = 'Har TALENTFULL arbeidet eller mottatt pengestøtte i et EØS-land';
const ER_ANNEN_FORELDER_UFØR = 'Har TALENTFULL uføretrygd?';
const HAR_DU_ORIENTERT_LABEL = 'Har du orientert LEALAUS om søknaden din?';
const DU_MÅ_INFORMERE_INFO_TEKST = 'Du må orientere LEALAUS om søknaden, før du kan gå videre.';
const NAVN_ANNEN_FORELDER_LABEL = 'Hva heter den andre forelderen?';
const KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL = 'Jeg kan ikke oppgi navnet til den andre forelderen';

describe('<AnnenForelder>', () => {
    it('skal fylle ut at en har aleneomsorg for barnet', async () => {
        const user = userEvent.setup();
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await user.click(screen.getByText(JA));

        expect(await screen.findByText(INFO_TEKST)).toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og ikke rett til foreldrepenger i Norge og ikke hatt opphold i EØS', async () => {
        const user = userEvent.setup();
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await user.click(screen.getByText(NEI));

        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[1]);
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText(HAR_FAR_HATT_OPPHOLD_I_EØS_LAND, { exact: false })).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[2]);
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet, ikke rett til foreldrepenger i Norge, opphold men ikke optjening i EØS', async () => {
        const user = userEvent.setup();
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await user.click(screen.getByText(NEI));

        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[1]);
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText(HAR_FAR_HATT_OPPHOLD_I_EØS_LAND, { exact: false })).toBeInTheDocument();
        await user.click(screen.getAllByText(JA)[2]);
        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_EØS_LABEL, { exact: false })).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[3]);
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har ikke orientert annen part', async () => {
        const user = userEvent.setup();
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await user.click(screen.getByText(NEI));

        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await user.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText(HAR_DU_ORIENTERT_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await user.click(screen.getAllByText(NEI)[2]);

        expect(await screen.findByText(DU_MÅ_INFORMERE_INFO_TEKST)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har orientert annen part', async () => {
        const user = userEvent.setup();
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await user.click(screen.getByText(NEI));

        expect(await screen.findByText(HAR_FAR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await user.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText(HAR_DU_ORIENTERT_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await user.click(screen.getAllByText(JA)[2]);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(DU_MÅ_INFORMERE_INFO_TEKST)).not.toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal velge at en ikke kan oppgi personalia til den andre forelderen', async () => {
        const user = userEvent.setup();
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        await user.click(screen.getByRole('checkbox'));

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
        const user = userEvent.setup();
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await user.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await user.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        await user.type(fødselsnrInput, '05057923424');

        await user.click(screen.getAllByRole('checkbox')[1]);

        expect(await screen.findByText('Hvor bor Espen?')).toBeInTheDocument();

        const hvorBorSelect = screen.getByLabelText('Hvor bor Espen?');
        await user.selectOptions(hvorBorSelect, 'Oman');

        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await user.click(screen.getByText(JA));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal oppgi personalia til den andre forelderen men ikke velge at han har utenlandsk fødselsnummer', async () => {
        const user = userEvent.setup();
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = screen.getByLabelText('Fornavn:');
        await user.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavn:');
        await user.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        await user.type(fødselsnrInput, '05057923424');

        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await user.click(screen.getByText(JA));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal søke som far og ha aleneomsorg for barnet', async () => {
        const user = userEvent.setup();
        render(<ForFar />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        await user.click(screen.getByText(JA));

        expect(await screen.findByText('Dato du ble alene om omsorgen')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        const datoAleneInput = screen.getByLabelText('Dato du ble alene om omsorgen');
        await user.type(datoAleneInput, dayjs().format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();

        expect(
            screen.getByText('Du må legge ved bekreftelse på datoen du ble alene om omsorgen for barnet.')
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om aleneomsorg')).toBeInTheDocument();
    });

    it('Skal søke som far og velge at mor har foreldrepenger i EØS', async () => {
        const user = userEvent.setup();
        render(<ForFar />);
        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        await user.click(screen.getByText(NEI));
        expect(await screen.findByText(HAR_MOR_RETT_TIL_FP_I_NORGE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[1]);
        expect(await screen.findByText(HAR_MOR_HATT_OPPHOLD_I_EØS_LAND, { exact: false })).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await user.click(screen.getAllByText(JA)[2]);
        expect(await screen.findByText(HAR_MOR_RETT_TIL_FP_I_EØS_LABEL, { exact: false })).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await user.click(screen.getAllByText(JA)[3]);
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[3]);
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText(ER_ANNEN_FORELDER_UFØR)).toBeInTheDocument();
        await user.click(screen.getAllByText(NEI)[4]);
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
