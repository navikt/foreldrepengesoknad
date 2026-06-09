import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';

import * as stories from './AndreInntektskilderSteg.stories';

import messages from '../../intl/nb_NO.json';

const { Default } = composeStories(stories);

describe('<AndreInntektskilderSteg>', () => {
    it('skal velge Jobb i utlandet, at en jobber der nå, og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Utlandet']));

        await userEvent.selectOptions(screen.getByLabelText(messages['JobbIUtlandetPanel.LandDuHarJobbet']), 'UA');
        await userEvent.tab();

        await userEvent.type(screen.getByLabelText(messages['JobbIUtlandetPanel.NavnPåArbeidsgiver']), 'Nav');

        expect(screen.getByText(messages['JobbIUtlandetPanel.JobberDuDerNå'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fraDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    arbeidsgiverNavn: 'Nav',
                    fom: '2023-04-30',
                    land: 'UA',
                    type: 'JOBB_I_UTLANDET',
                    pågående: true,
                },
            ],
            key: ContextDataType.ANDRE_INNTEKTSKILDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal velge Jobb i utlandet, at en ikke jobber der nå, og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Utlandet']));

        await userEvent.selectOptions(screen.getByLabelText(messages['JobbIUtlandetPanel.LandDuHarJobbet']), 'UA');
        await userEvent.tab();

        await userEvent.type(screen.getByLabelText(messages['JobbIUtlandetPanel.NavnPåArbeidsgiver']), 'Nav');

        expect(screen.getByText(messages['JobbIUtlandetPanel.JobberDuDerNå'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        const fraDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Tom']);
        await userEvent.type(tilDato, dayjs('2023-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    arbeidsgiverNavn: 'Nav',
                    fom: '2023-04-30',
                    tom: '2023-09-30',
                    land: 'UA',
                    type: 'JOBB_I_UTLANDET',
                    pågående: false,
                },
            ],
            key: ContextDataType.ANDRE_INNTEKTSKILDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal velge Jobb i utlandet og validere input', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Utlandet']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.LandDuHarJobber'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.NavnPåArbeidsgiver'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.JobberDuDerNå'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Required.Fom'])).toHaveLength(2);

        expect(screen.getByText(messages['JobbIUtlandetPanel.JobberDuDerNå'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Required.Fom'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Required.Tom'])).toHaveLength(2);

        const fraDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2050-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Tom']);
        await userEvent.type(tilDato, dayjs('2050-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.FraOgMedDato.ErIFremtiden'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.TilOgMedDato.ErIFremtiden'])).toHaveLength(2);

        await userEvent.type(tilDato, dayjs('2013-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.FraOgMedDato.ErIFremtiden'])).toHaveLength(2);

        await userEvent.type(fraDato, 'asdfas');
        await userEvent.tab();

        await userEvent.type(tilDato, 'asdfas');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Valid.Fom'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Valid.Tom'])).toHaveLength(2);
    });

    it('skal velge Etterlønn eller sluttvederlag og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Etterlønn']));

        const fraDato = screen.getByLabelText(messages['EtterlønnEllerSluttvederlagPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Tom']);
        await userEvent.type(tilDato, dayjs('2023-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(messages['EtterlønnEllerSluttvederlagPanel.Vedlegg'],
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    fom: '2023-04-30',
                    tom: '2023-09-30',
                    type: 'ETTERLØNN_SLUTTPAKKE',
                },
            ],
            key: ContextDataType.ANDRE_INNTEKTSKILDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal velge Etterlønn eller sluttvederlag og validere input', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Etterlønn']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['EtterlønnEllerSluttvederlagPanel.Validering.Required.Fom'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Required.Tom'])).toHaveLength(2);

        const fraDato = screen.getByLabelText(messages['EtterlønnEllerSluttvederlagPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2050-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Tom']);
        await userEvent.type(tilDato, dayjs('2050-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['EtterlønnEllerSluttvederlagPanel.FraOgMedDato.ErIFremtiden'])).toHaveLength(2);

        await userEvent.type(tilDato, dayjs('2013-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['EtterlønnEllerSluttvederlagPanel.FraOgMedDato.ErIFremtiden'])).toHaveLength(2);

        await userEvent.type(fraDato, 'asdfas');
        await userEvent.tab();

        await userEvent.type(tilDato, 'asdfas');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['EtterlønnEllerSluttvederlagPanel.Validering.Valid.Fom'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Valid.Tom'])).toHaveLength(2);
    });

    it('skal velge Førstegangstjeneste, at en jobber der nå, og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Førstegangstjeneste']));

        expect(screen.getByText(messages['FørstegangstjenestePanel.IFørstegangstjenesteNå'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fraDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(messages['FørstegangstjenestePanel.Vedlegg'],
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    fom: '2023-04-30',
                    type: 'MILITÆR_ELLER_SIVILTJENESTE',
                    pågående: true,
                },
            ],
            key: ContextDataType.ANDRE_INNTEKTSKILDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal velge Førstegangstjeneste, at en ikke jobber der nå, og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Førstegangstjeneste']));

        expect(screen.getByText(messages['FørstegangstjenestePanel.IFørstegangstjenesteNå'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        const fraDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Tom']);
        await userEvent.type(tilDato, dayjs('2023-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    fom: '2023-04-30',
                    tom: '2023-09-30',
                    type: 'MILITÆR_ELLER_SIVILTJENESTE',
                    pågående: false,
                },
            ],
            key: ContextDataType.ANDRE_INNTEKTSKILDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal velge Førstegangstjeneste og validere input', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Førstegangstjeneste']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['FørstegangstjenestePanel.Validering.IFørstegangstjenesteNå'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Required.Fom'])).toHaveLength(2);

        expect(screen.getByText(messages['FørstegangstjenestePanel.IFørstegangstjenesteNå'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Required.Fom'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Required.Tom'])).toHaveLength(2);

        const fraDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2050-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Tom']);
        await userEvent.type(tilDato, dayjs('2050-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.FraOgMedDato.ErIFremtiden'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.TilOgMedDato.ErIFremtiden'])).toHaveLength(2);

        await userEvent.type(tilDato, dayjs('2013-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.FraOgMedDato.ErIFremtiden'])).toHaveLength(2);

        await userEvent.type(fraDato, 'asdfas');
        await userEvent.tab();

        await userEvent.type(tilDato, 'asdfas');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Valid.Fom'])).toHaveLength(2);
        expect(screen.getAllByText(messages['JobbIUtlandetPanel.Validering.Valid.Tom'])).toHaveLength(2);
    });

    it('skal velge flere typer inntektskilder, og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.RadioButton.Utlandet']));

        await userEvent.selectOptions(screen.getByLabelText(messages['JobbIUtlandetPanel.LandDuHarJobbet']), 'UA');
        await userEvent.tab();

        await userEvent.type(screen.getByLabelText(messages['JobbIUtlandetPanel.NavnPåArbeidsgiver']), 'Nav');

        expect(screen.getByText(messages['JobbIUtlandetPanel.JobberDuDerNå'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fraDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Fom']);
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.LeggTil']));

        expect(screen.getAllByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder'])).toHaveLength(
            2,
        );

        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.Slett']));

        expect(
            await screen.findByText(messages['AndreInntektskilderStep.HvilkenTypeAnnenInntekskilder']),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['AndreInntektskilderStep.LeggTil']));

        await userEvent.click(screen.getAllByText(messages['AndreInntektskilderStep.RadioButton.Etterlønn'])[1]!);

        const periodenfraDato = screen.getByLabelText(messages['EtterlønnEllerSluttvederlagPanel.Fom']);
        await userEvent.type(periodenfraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText(messages['JobbIUtlandetPanel.Tom']);
        await userEvent.type(tilDato, dayjs('2023-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    arbeidsgiverNavn: 'Nav',
                    fom: '2023-04-30',
                    land: 'UA',
                    type: 'JOBB_I_UTLANDET',
                    pågående: true,
                },
                {
                    fom: '2023-04-30',
                    tom: '2023-09-30',
                    type: 'ETTERLØNN_SLUTTPAKKE',
                },
            ],
            key: ContextDataType.ANDRE_INNTEKTSKILDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ANNEN_FORELDER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });
});
