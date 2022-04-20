import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from 'stories/steps/om-barnet/OmBarnet.stories';
import dayjs from 'dayjs';

const { Default, ForAdopsjon } = composeStories(stories);

const GÅ_VIDERE_KNAPP = 'Gå videre';
const JA = 'Ja';
const NEI = 'Nei';

describe('<OmBarnet>', () => {
    it('skal ha født ett barn', async () => {
        const utils = render(<Default />);

        expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
        expect(screen.getByText('15.03.2021')).toBeInTheDocument();

        userEvent.click(screen.getByText('Søknaden min gjelder et annet barn'));

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        userEvent.click(screen.getByText(JA));

        expect(await screen.findByText('Hvor mange barn har du fått?')).toBeInTheDocument();
        userEvent.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        const barnFødtInput = utils.getByLabelText('Når ble barnet født?');
        userEvent.type(barnFødtInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(barnFødtInput);

        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();
        const termindatoInput = utils.getByLabelText('Hva var termindatoen?');
        userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(termindatoInput);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ikke ha født barn ennå', async () => {
        const utils = render(<Default />);

        expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
        expect(screen.getByText('15.03.2021')).toBeInTheDocument();

        userEvent.click(screen.getByText('Søknaden min gjelder et annet barn'));

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText('Hvor mange barn venter du?')).toBeInTheDocument();
        userEvent.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når er termindatoen?')).toBeInTheDocument();
        const termindatoInput = utils.getByLabelText('Når er termindatoen?');
        userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(termindatoInput);

        expect(
            await screen.findByText(
                'Du må legge ved en bekreftelse på termindato. Denne må være datert og signert av lege eller jordmor når du er i 22. svangerskapsuke eller senere.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om terminbekreftelse')).toBeInTheDocument();

        expect(await screen.findByText('Når er terminbekreftelsen datert?')).toBeInTheDocument();
        const termindatoDatertInput = utils.getByLabelText('Når er terminbekreftelsen datert?');
        userEvent.type(termindatoDatertInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(termindatoDatertInput);

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal søke stebarnsadopsjon for ett barn', async () => {
        const utils = render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        userEvent.click(screen.getByText(JA));

        expect(await screen.findByText('Oppgi datoen for stebarnsadopsjon')).toBeInTheDocument();
        const stebarnsadopsjonInput = utils.getByLabelText('Oppgi datoen for stebarnsadopsjon');
        userEvent.type(stebarnsadopsjonInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(stebarnsadopsjonInput);

        expect(await screen.findByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        userEvent.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        const barnetFødtInput = utils.getByLabelText('Når ble barnet født?');
        userEvent.type(barnetFødtInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(barnetFødtInput);

        expect(
            await screen.findByText(
                'Du må laste opp dokumentasjon på stebarnsadopsjonen og bekreftelse på dato for stebarnsadopsjonen.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal søke adopsjon men ikke stebarnsadopsjon for ett barn', async () => {
        const utils = render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText('Når overtar du omsorgen?')).toBeInTheDocument();
        const overtaOmsorgDatoInput = utils.getByLabelText('Når overtar du omsorgen?');
        userEvent.type(overtaOmsorgDatoInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(overtaOmsorgDatoInput);

        expect(await screen.findByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        userEvent.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        const barnetFødtInput = utils.getByLabelText('Når ble barnet født?');
        userEvent.type(barnetFødtInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(barnetFødtInput);

        expect(await screen.findByText('Adopterer du fra utlandet?')).toBeInTheDocument();
        userEvent.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText('Når kommer barnet til Norge?')).toBeInTheDocument();
        const kommerTilNorgeDatoInput = utils.getByLabelText('Når kommer barnet til Norge?');
        userEvent.type(kommerTilNorgeDatoInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(kommerTilNorgeDatoInput);

        expect(
            await screen.findByText(
                'Du må legge ved adopsjonsbevillingen og bekreftelse på datoen du overtok omsorgen.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
