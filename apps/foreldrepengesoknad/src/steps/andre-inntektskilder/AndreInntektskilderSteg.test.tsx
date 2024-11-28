import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';

import * as stories from './AndreInntektskilderSteg.stories';

const { Default } = composeStories(stories);

describe('<AndreInntektskilderSteg>', () => {
    it('skal velge Jobb i utlandet, at en jobber der nå, og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jobb i utlandet'));

        await userEvent.selectOptions(screen.getByLabelText('Hvilket land har du jobbet i?'), 'UA');
        await userEvent.tab();

        await userEvent.type(screen.getByLabelText('Hva er navnet på arbeidsgiveren?'), 'NAV');

        expect(screen.getByText('Jobber du der nå?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fraDato = screen.getByLabelText('Fra');
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    arbeidsgiverNavn: 'NAV',
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
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jobb i utlandet'));

        await userEvent.selectOptions(screen.getByLabelText('Hvilket land har du jobbet i?'), 'UA');
        await userEvent.tab();

        await userEvent.type(screen.getByLabelText('Hva er navnet på arbeidsgiveren?'), 'NAV');

        expect(screen.getByText('Jobber du der nå?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        const fraDato = screen.getByLabelText('Fra');
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText('Til');
        await userEvent.type(tilDato, dayjs('2023-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    arbeidsgiverNavn: 'NAV',
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
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jobb i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi hvilket land du har jobbet i')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi navnet til arbeidsgiveren')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi om du jobber der nå')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi fra dato')).toHaveLength(2);

        expect(screen.getByText('Jobber du der nå?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi fra dato')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi til dato')).toHaveLength(2);

        const fraDato = screen.getByLabelText('Fra');
        await userEvent.type(fraDato, dayjs('2050-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText('Til');
        await userEvent.type(tilDato, dayjs('2050-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Fra og med dato må være før eller lik dagens dato')).toHaveLength(2);
        expect(screen.getAllByText('Til og med dato må være før eller lik dagens dato')).toHaveLength(2);

        await userEvent.type(tilDato, dayjs('2013-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Fra og med dato må være før eller lik dagens dato')).toHaveLength(2);

        await userEvent.type(fraDato, 'asdfas');
        await userEvent.tab();

        await userEvent.type(tilDato, 'asdfas');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi en gyldig fra dato')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi en gyldig til dato')).toHaveLength(2);
    });

    it('skal velge Etterlønn eller sluttvederlag og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Etterlønn eller sluttvederlag'));

        const fraDato = screen.getByLabelText('Perioden den gjelder fra');
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText('Til');
        await userEvent.type(tilDato, dayjs('2023-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(
                'Senere i søknaden vil du bli bedt om å laste opp dokumentasjon fra arbeidsgiveren din. Den må vise inntekten og perioden den gjelder for.',
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
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Etterlønn eller sluttvederlag'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi perioden den gjelder fra')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi til dato')).toHaveLength(2);

        const fraDato = screen.getByLabelText('Perioden den gjelder fra');
        await userEvent.type(fraDato, dayjs('2050-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText('Til');
        await userEvent.type(tilDato, dayjs('2050-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Perioden den gjelder fra må være før eller lik dagens dato')).toHaveLength(2);

        await userEvent.type(tilDato, dayjs('2013-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Perioden den gjelder fra må være før eller lik dagens dato')).toHaveLength(2);

        await userEvent.type(fraDato, 'asdfas');
        await userEvent.tab();

        await userEvent.type(tilDato, 'asdfas');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi en gyldig dato for perioden den gjelder for')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi en gyldig til dato')).toHaveLength(2);
    });

    it('skal velge Førstegangstjeneste, at en jobber der nå, og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Førstegangstjeneste'));

        expect(screen.getByText('Er du i førstegangstjeneste nå?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fraDato = screen.getByLabelText('Fra');
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText(
                'Senere i søknaden vil du bli bedt om å laste opp dokumentasjon på perioden fra tjenestestedet ditt.',
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
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Førstegangstjeneste'));

        expect(screen.getByText('Er du i førstegangstjeneste nå?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        const fraDato = screen.getByLabelText('Fra');
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText('Til');
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
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Førstegangstjeneste'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi om du er i førstegangstjeneste nå?')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi fra dato')).toHaveLength(2);

        expect(screen.getByText('Er du i førstegangstjeneste nå?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi fra dato')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi til dato')).toHaveLength(2);

        const fraDato = screen.getByLabelText('Fra');
        await userEvent.type(fraDato, dayjs('2050-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText('Til');
        await userEvent.type(tilDato, dayjs('2050-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Fra og med dato må være før eller lik dagens dato')).toHaveLength(2);
        expect(screen.getAllByText('Til og med dato må være før eller lik dagens dato')).toHaveLength(2);

        await userEvent.type(tilDato, dayjs('2013-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Fra og med dato må være før eller lik dagens dato')).toHaveLength(2);

        await userEvent.type(fraDato, 'asdfas');
        await userEvent.tab();

        await userEvent.type(tilDato, 'asdfas');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi en gyldig fra dato')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi en gyldig til dato')).toHaveLength(2);
    });

    it('skal velge flere typer inntektskilder, og så gå til neste steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Jobb i utlandet'));

        await userEvent.selectOptions(screen.getByLabelText('Hvilket land har du jobbet i?'), 'UA');
        await userEvent.tab();

        await userEvent.type(screen.getByLabelText('Hva er navnet på arbeidsgiveren?'), 'NAV');

        expect(screen.getByText('Jobber du der nå?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const fraDato = screen.getByLabelText('Fra');
        await userEvent.type(fraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Legg til en ny inntektskilde'));

        expect(screen.getAllByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?')).toHaveLength(
            2,
        );

        await userEvent.click(screen.getByText('Slett inntektskilde'));

        expect(
            await screen.findByText('Hvilken type annen inntektskilde har du hatt de siste 10 månedene?'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til en ny inntektskilde'));

        await userEvent.click(screen.getAllByText('Etterlønn eller sluttvederlag')[1]);

        const periodenfraDato = screen.getByLabelText('Perioden den gjelder fra');
        await userEvent.type(periodenfraDato, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilDato = screen.getByLabelText('Til');
        await userEvent.type(tilDato, dayjs('2023-09-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: [
                {
                    arbeidsgiverNavn: 'NAV',
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
