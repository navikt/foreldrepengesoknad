import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from 'stories/steps/om-barnet/OmBarnet.stories';
import dayjs from 'dayjs';
import MockDate from 'mockdate';

const { Default, ForAdopsjon, FarFødsel, MedmorFødsel } = composeStories(stories);
const farEllerMedMorSøker = [FarFødsel, MedmorFødsel];

const GÅ_VIDERE_KNAPP = 'Gå videre';
const JA = 'Ja';
const NEI = 'Nei';

describe('<OmBarnet>', () => {
    it('skal ha født ett barn', async () => {
        render(<Default />);

        expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
        expect(screen.getByText('15.03.2021')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Søknaden min gjelder et annet barn'));
        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

        await userEvent.click(screen.getByText(JA));
        expect(await screen.findByText('Hvor mange barn har du fått?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ett barn'));
        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();

        const barnFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnFødtInput, dayjs().format('DD.MM.YYYY'));

        await userEvent.tab();
        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));

        await userEvent.tab();
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ikke ha født barn ennå', async () => {
        render(<Default />);

        expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
        expect(screen.getByText('15.03.2021')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Søknaden min gjelder et annet barn'));

        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
        await userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText('Hvor mange barn venter du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når er termindatoen?')).toBeInTheDocument();
        const termindatoInput = screen.getByLabelText('Når er termindatoen?');
        await userEvent.type(termindatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            await screen.findByText(
                'Du må legge ved en bekreftelse på termindato. Denne må være datert og signert av lege eller jordmor når du er i 22. svangerskapsuke eller senere.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om terminbekreftelse')).toBeInTheDocument();

        expect(await screen.findByText('Når er terminbekreftelsen datert?')).toBeInTheDocument();
        const termindatoDatertInput = screen.getByLabelText('Når er terminbekreftelsen datert?');
        await userEvent.type(termindatoDatertInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('mor skal bli spurt om termindato hvis hun velger registrert barn født innenfor de siste 12 ukene', async () => {
        MockDate.set(new Date('2021-03-16'));

        render(<Default />);
        expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
        expect(screen.getByText('15.03.2021')).toBeInTheDocument();

        await userEvent.click(screen.getByText('KLØKTIG MIDTPUNKT'));
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();
        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs(new Date('2021-03-17')).format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        MockDate.reset();
    });

    it('mor skal bli spurt om termindato hvis hun velger registrert barn født tidligere enn de siste 12 ukene', async () => {
        MockDate.set(new Date('2021-06-16'));
        render(<Default />);
        expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
        expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
        expect(screen.getByText('15.03.2021')).toBeInTheDocument();

        await userEvent.click(screen.getByText('KLØKTIG MIDTPUNKT'));
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();
        const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
        await userEvent.type(termindatoInput, dayjs(new Date('2021-03-17')).format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        MockDate.reset();
    });

    it('skal søke stebarnsadopsjon for ett barn', async () => {
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await userEvent.click(screen.getByText(JA));

        expect(await screen.findByText('Oppgi datoen for stebarnsadopsjon')).toBeInTheDocument();
        const stebarnsadopsjonInput = screen.getByLabelText('Oppgi datoen for stebarnsadopsjon');
        await userEvent.type(stebarnsadopsjonInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnetFødtInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            await screen.findByText(
                'Du må laste opp dokumentasjon på stebarnsadopsjonen og bekreftelse på dato for stebarnsadopsjonen.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal søke adopsjon men ikke stebarnsadopsjon for ett barn', async () => {
        render(<ForAdopsjon />);

        expect(await screen.findByText('Gjelder søknaden din stebarnsadopsjon?')).toBeInTheDocument();
        await userEvent.click(screen.getByText(NEI));

        expect(await screen.findByText('Når overtar du omsorgen?')).toBeInTheDocument();
        const overtaOmsorgDatoInput = screen.getByLabelText('Når overtar du omsorgen?');
        await userEvent.type(overtaOmsorgDatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hvor mange barn skal du adoptere?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ett barn'));

        expect(await screen.findByText('Når ble barnet født?')).toBeInTheDocument();
        const barnetFødtInput = screen.getByLabelText('Når ble barnet født?');
        await userEvent.type(barnetFødtInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Adopterer du fra utlandet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);

        expect(await screen.findByText('Når kommer barnet til Norge?')).toBeInTheDocument();
        const kommerTilNorgeDatoInput = screen.getByLabelText('Når kommer barnet til Norge?');
        await userEvent.type(kommerTilNorgeDatoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            await screen.findByText(
                'Du må legge ved adopsjonsbevillingen og bekreftelse på datoen du overtok omsorgen.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Trykk her for å laste opp dokumentasjon om adopsjon')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it.each(farEllerMedMorSøker)(
        'Far/medmor må oppgi termin hvis han velger registrert barn som er født de siste 12 ukene',
        async (FarEllerMedMorSøker) => {
            MockDate.set(new Date('2021-03-16'));
            render(<FarEllerMedMorSøker />);

            expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
            expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
            expect(screen.getByText('15.03.2021')).toBeInTheDocument();
            await userEvent.click(screen.getByText('KLØKTIG MIDTPUNKT'));
            expect(await screen.findByText('Hva var termindatoen?')).toBeInTheDocument();
            const termindatoInput = screen.getByLabelText('Hva var termindatoen?');
            await userEvent.type(termindatoInput, dayjs(new Date('2021-03-01')).format('DD.MM.YYYY'));
            await userEvent.tab();
            expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
            MockDate.reset();
        }
    );

    it.each(farEllerMedMorSøker)(
        'Far/medmor må ikke oppgi termin hvis han velger registrert barn som er født tidligere enn de siste 12 ukene',
        async (FarEllerMedMorSøker) => {
            MockDate.set(new Date('2021-06-16'));
            render(<FarEllerMedMorSøker />);
            expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
            expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
            expect(screen.getByText('15.03.2021')).toBeInTheDocument();
            expect(screen.getByText('Søknaden min gjelder et annet barn')).toBeInTheDocument();
            await userEvent.click(screen.getByText('KLØKTIG MIDTPUNKT'));
            expect(screen.queryByText('Hva var termindatoen?')).not.toBeInTheDocument();
            expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
            MockDate.reset();
        }
    );

    it.each(farEllerMedMorSøker)(
        'Far/medmor kan ikke søke på termin hvis WLB regler ikke gjelder',
        async (FarEllerMedMorSøker) => {
            MockDate.set(new Date('2022-08-01'));
            render(<FarEllerMedMorSøker />);

            expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
            expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
            expect(screen.getByText('15.03.2021')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Søknaden min gjelder et annet barn'));
            expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();

            await userEvent.click(screen.getByText(NEI));
            expect(await screen.findByText('Hvor mange barn venter dere?')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Ett barn'));
            expect(await screen.findByText('Når er termindatoen?')).toBeInTheDocument();

            const termindatoInput = screen.getByLabelText('Når er termindatoen?');
            await userEvent.type(termindatoInput, dayjs(new Date('2022-08-02')).format('DD.MM.YYYY'));
            await userEvent.tab();

            expect(
                await screen.findByText('Du kan dessverre ikke søke om foreldrepenger før barnet er født. ', {
                    exact: false,
                })
            ).toBeInTheDocument();
            expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
            MockDate.reset();
        }
    );

    it.each(farEllerMedMorSøker)(
        'Far/medmor kan søke på termin hvis WLB regler gjelder',
        async (FarEllerMedMorSøker) => {
            MockDate.set(new Date('2022-08-02'));
            render(<FarEllerMedMorSøker />);
            expect(await screen.findByText('Barn registrert på deg:')).toBeInTheDocument();
            expect(screen.getByText('KLØKTIG MIDTPUNKT')).toBeInTheDocument();
            expect(screen.getByText('15.03.2021')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Søknaden min gjelder et annet barn'));

            expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
            await userEvent.click(screen.getByText(NEI));
            expect(await screen.findByText('Hvor mange barn venter dere?')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ett barn'));
            expect(await screen.findByText('Når er termindatoen?')).toBeInTheDocument();

            const termindatoInput = screen.getByLabelText('Når er termindatoen?');
            await userEvent.type(termindatoInput, dayjs(new Date('2022-08-02')).format('DD.MM.YYYY'));
            await userEvent.tab();
            expect(
                screen.queryByText('Du kan dessverre ikke søke om foreldrepenger før barnet er født. ', {
                    exact: false,
                })
            ).not.toBeInTheDocument();
            expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Du må legge ved en bekreftelse på termindato. Denne må være datert og signert av lege eller jordmor når mor er i 22. svangerskapsuke eller senere.'
                )
            ).toBeInTheDocument();
            expect(
                screen.getByText('Trykk her for å laste opp dokumentasjon om terminbekreftelse')
            ).toBeInTheDocument();

            expect(await screen.findByText('Når er terminbekreftelsen datert?')).toBeInTheDocument();
            const termindatoDatertInput = screen.getByLabelText('Når er terminbekreftelsen datert?');
            await userEvent.type(termindatoDatertInput, dayjs().format('DD.MM.YYYY'));
            await userEvent.tab();

            expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
            MockDate.reset();
        }
    );
});
