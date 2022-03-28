import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/annen-forelder/AnnenForelder.stories';
import dayjs from 'dayjs';

const { Default, SkalOppgiPersonalia, ForFar } = composeStories(stories);

const GÅ_VIDERE_KNAPP = 'Gå videre';
const ALENE_OMSORG_LABEL = 'Er du alene om omsorgen av barnet?';
const JA = 'Ja';
const NEI = 'Nei';
const INFO_TEKST = 'Dere kan avtale at LEALAUS tar ut foreldrepenger.';
const HAR_RETT_TIL_FP_LABEL = 'Har LEALAUS rett til foreldrepenger?';
const HAR_DU_ORIENTERT_LABEL = 'Har du orientert LEALAUS om søknaden din?';
const DU_MÅ_INFORMERE_INFO_TEKST = 'Du må orientere LEALAUS om søknaden, før du kan gå videre.';
const NAVN_ANNEN_FORELDER_LABEL = 'Hva heter den andre forelderen?';
const KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL = 'Jeg kan ikke oppgi navnet til den andre forelderen';

describe('<AnnenForelder>', () => {
    it('skal fylle ut at en har aleneomsorg for barnet', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080 (37 år)')).toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText(JA));

        expect(await screen.findByText(INFO_TEKST)).toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og ikke rett til foreldrepenger', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080 (37 år)')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText(HAR_RETT_TIL_FP_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getAllByText(NEI)[1]);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har ikke orientert annen part', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080 (37 år)')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText(HAR_RETT_TIL_FP_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText(HAR_DU_ORIENTERT_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getAllByText(NEI)[2]);

        expect(await screen.findByText(DU_MÅ_INFORMERE_INFO_TEKST)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har orientert annen part', async () => {
        render(<Default />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080 (37 år)')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText(HAR_RETT_TIL_FP_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText(HAR_DU_ORIENTERT_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getAllByText(JA)[2]);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(DU_MÅ_INFORMERE_INFO_TEKST)).not.toBeInTheDocument();
        expect(screen.queryByText(INFO_TEKST)).not.toBeInTheDocument();
    });

    it('skal velge at en ikke kan oppgi personalia til den andre forelderen', async () => {
        render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByRole('checkbox'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal oppgi personalia til den andre forelderen og velge at han har utenlandsk fødselsnummer', async () => {
        const utils = render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = utils.getByLabelText('Fornavn:');
        userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = utils.getByLabelText('Etternavn:');
        userEvent.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = utils.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        userEvent.type(fødselsnrInput, '05057923424');

        userEvent.click(screen.getAllByRole('checkbox')[1]);

        expect(await screen.findByText('Hvor bor Espen?')).toBeInTheDocument();

        const hvorBorSelect = utils.getByLabelText('Hvor bor Espen?');
        userEvent.selectOptions(hvorBorSelect, 'Oman');

        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(JA));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal oppgi personalia til den andre forelderen men ikke velge at han har utenlandsk fødselsnummer', async () => {
        const utils = render(<SkalOppgiPersonalia />);

        expect(await screen.findByText(NAVN_ANNEN_FORELDER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(KAN_IKKE_OPPGI_ANNEN_FORELDER_LABEL)).toBeInTheDocument();

        const fornavnInput = utils.getByLabelText('Fornavn:');
        userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = utils.getByLabelText('Etternavn:');
        userEvent.type(etternavnInput, 'Utvikler');

        expect(await screen.findByText('Hva er fødselsnummeret eller D-nummeret til Espen?')).toBeInTheDocument();

        const fødselsnrInput = utils.getByLabelText('Hva er fødselsnummeret eller D-nummeret til Espen?');
        userEvent.type(fødselsnrInput, '05057923424');

        expect(await screen.findByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(JA));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal søke som far og ha aleneomsorg for barnet', async () => {
        const utils = render(<ForFar />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080 (37 år)')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText(ALENE_OMSORG_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText(JA));

        expect(await screen.findByText('Dato du ble alene om omsorgen')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        const datoAleneInput = utils.getByLabelText('Dato du ble alene om omsorgen');
        userEvent.type(datoAleneInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(datoAleneInput);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();

        expect(
            screen.getByText('Du må legge ved bekreftelse på datoen du ble alene om omsorgen for barnet.')
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om aleneomsorg')).toBeInTheDocument();
    });
});
