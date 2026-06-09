import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs from 'dayjs';
import MockDate from 'mockdate';

import * as stories from './ArbeidIUtlandetSteg.stories';

import messages from '../../intl/nb_NO.json';

const { Default } = composeStories(stories);

describe('<ArbeidIUtlandetSteg>', () => {
    it('skal vise feilmelding når ingenting er utfylt', async () => {
        render(<Default />);
        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.arbeidIUtlandetLand.påkrevd'])[0]).toBeInTheDocument();
        expect(screen.getAllByText(messages['valideringsfeil.arbeidIUtlandetNavn.påkrevd'])[0]).toBeInTheDocument();
        expect(screen.getAllByText(messages['valideringsfeil.fraOgMedDato.påkrevd'])[0]).toBeInTheDocument();
        expect(screen.getAllByText(messages['valideringsfeil.arbeidIUtlandetPågående.påkrevd'])[0]).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        MockDate.set(new Date('2024-03-25'));
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText(messages['ArbeidIUtlandetFieldArray.land'])).toBeInTheDocument();

        const hvilkeLandInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.land']);
        await userEvent.selectOptions(hvilkeLandInput, 'UA');
        await userEvent.tab();

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.navn'])).toBeInTheDocument();
        const arbeidsgiverInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.navn']);
        await userEvent.type(arbeidsgiverInput, 'Arbeidsgiver');
        await userEvent.tab();

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.fom'])).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.fom']);
        await userEvent.type(startdatoInput, dayjs('2022-12-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.næring.pågående'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.tom'])).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.tom']);
        await userEvent.type(sluttdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText(messages['valideringsfeil.arbeidIUtlandetLand.påkrevd'])).not.toBeInTheDocument();
        expect(screen.queryByText(messages['valideringsfeil.arbeidIUtlandetNavn.påkrevd'])).not.toBeInTheDocument();
        expect(screen.queryByText(messages['valideringsfeil.fraOgMedDato.påkrevd'])).not.toBeInTheDocument();
        expect(screen.queryByText(messages['valideringsfeil.arbeidIUtlandetPågående.påkrevd'])).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                arbeidIUtlandet: [
                    {
                        type: 'JOBB_I_UTLANDET',
                        arbeidsgiverNavn: 'Arbeidsgiver',
                        land: 'UA',
                        pågående: false,
                        fom: '2022-12-30',
                        tom: '2023-12-30',
                    },
                ],
            },
            key: ContextDataType.ARBEID_I_UTLANDET,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, '995090910'),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
        MockDate.reset();
    });

    it('skal vise feilmelding når dato er i feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['ArbeidIUtlandetFieldArray.fom'])).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.fom']);
        await userEvent.type(startdatoInput, 'bla bla');

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.næring.pågående'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.tom'])).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.tom']);
        await userEvent.type(sluttdatoInput, 'bla bla');

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.fraOgMedDato.gyldigDato'])[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText(messages['valideringsfeil.tilOgMedDato.gyldigDato'])[0],
        ).toBeInTheDocument();
    });

    it('validering når sluttdato er tidligere enn startdato', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['ArbeidIUtlandetFieldArray.fom'])).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.fom']);
        await userEvent.type(startdatoInput, dayjs().subtract(3, 'month').format('DD.MM.YYYY'));

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.næring.pågående'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['nei']));

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.tom'])).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.tom']);
        await userEvent.type(sluttdatoInput, dayjs().subtract(4, 'month').format('DD.MM.YYYY'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.fraOgMedDato.førTilDato'])[0]).toBeInTheDocument();
        expect(screen.getAllByText(messages['valideringsfeil.tilOgMedDato.etterFraDato'])[0]).toBeInTheDocument();
    });

    it('validering når startdato er etter dagens dato', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['ArbeidIUtlandetFieldArray.fom'])).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.fom']);
        await userEvent.type(startdatoInput, dayjs('2053-12-30').format('DD.MM.YYYY'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.fraOgMedDato.erIFremtiden'])[0]).toBeInTheDocument();
    });

    it('validering når sluttdato er for over 5 måneder siden', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['ArbeidIUtlandetFieldArray.fom'])).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.fom']);
        await userEvent.type(startdatoInput, dayjs('2022-10-30').format('DD.MM.YYYY'));

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.næring.pågående'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['nei']));

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.tom'])).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(messages['ArbeidIUtlandetFieldArray.tom']);
        await userEvent.type(sluttdatoInput, dayjs('2022-12-30').format('DD.MM.YYYY'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.tilOgMedDato.arbeidIUtlandet.merEnn5MånederSiden'],
            )[0],
        ).toBeInTheDocument();
    });

    it('validering når flere arbeidsforhold er lagt til', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['ArbeidIUtlandetFieldArray.tittel.ny'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['ArbeidIUtlandetFieldArray.tittel.ny']));

        expect(screen.getAllByText(messages['ArbeidIUtlandetFieldArray.land'])[1]).toBeInTheDocument();
    });

    it('validering når arbeidsforhold er slettet', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['ArbeidIUtlandetFieldArray.land'])).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidIUtlandetFieldArray.tittel.ny'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['ArbeidIUtlandetFieldArray.tittel.ny']));

        expect(screen.getAllByText(messages['ArbeidIUtlandetFieldArray.navn'])[1]).toBeInTheDocument();
        const arbeidsgiverInput = screen.getAllByText(messages['ArbeidIUtlandetFieldArray.navn'])[1]!;
        await userEvent.type(arbeidsgiverInput, 'Arbeidsgivernavn');
        await userEvent.tab();

        expect(screen.getByDisplayValue('Arbeidsgivernavn')).toBeInTheDocument();

        expect(screen.getAllByText(messages['perioder.varierende.slett'], { exact: false })[0]).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['perioder.varierende.slett'])[0]!);

        expect(screen.queryByDisplayValue('Arbeidsgivernavn')).not.toBeInTheDocument();
    });
});
