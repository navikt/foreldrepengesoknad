import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { ContextDataType } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';

import * as stories from './ArbeidIUtlandet.stories';

const { Default } = composeStories(stories);

describe('<ArbeidIUtlandet>', () => {
    it('skal vise feilmelding når ingenting er utfylt', async () => {
        render(<Default />);
        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi land du har jobbet i.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi navn på arbeidsgiver i utlandet.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi en startdato.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Du må svare på om du fortsatt jobber i utlandet.')[0]).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Hvilket land har du jobbet i?')).toBeInTheDocument();

        const hvilkeLandInput = screen.getByLabelText('Hvilket land har du jobbet i?');
        await userEvent.selectOptions(hvilkeLandInput, 'UA');
        await userEvent.tab();

        expect(screen.getByText('Hva er navnet på arbeidsgiveren din?')).toBeInTheDocument();
        const arbeidsgiverInput = screen.getByLabelText('Hva er navnet på arbeidsgiveren din?');
        await userEvent.type(arbeidsgiverInput, 'Arbeidsgiver');
        await userEvent.tab();

        expect(screen.getByText('Når startet du i jobben?')).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText('Når startet du i jobben?');
        await userEvent.type(startdatoInput, dayjs('2022-12-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Når sluttet du i jobben?')).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText('Når sluttet du i jobben?');
        await userEvent.type(sluttdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi land du har jobbet i.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi navn på arbeidsgiver i utlandet.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi en startdato.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må svare på om du fortsatt jobber i utlandet.')).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                arbeidIUtlandet: [
                    {
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
            data: undefined,
            key: ContextDataType.VALGT_TILRETTELEGGING_ID,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: SøknadRoutes.VELG_ARBEID,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal vise feilmelding når dato er i feil format', async () => {
        render(<Default />);

        expect(await screen.findByText('Når startet du i jobben?')).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText('Når startet du i jobben?');
        await userEvent.type(startdatoInput, 'bla bla');

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Når sluttet du i jobben?')).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText('Når sluttet du i jobben?');
        await userEvent.type(sluttdatoInput, 'bla bla');

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Startdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText('Sluttdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });

    it('validering når sluttdato er tidligere enn startdato', async () => {
        render(<Default />);

        expect(await screen.findByText('Når startet du i jobben?')).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText('Når startet du i jobben?');
        await userEvent.type(startdatoInput, dayjs().subtract(4, 'month').format('DD.MM.YYYY'));

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Når sluttet du i jobben?')).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText('Når sluttet du i jobben?');
        await userEvent.type(sluttdatoInput, dayjs().subtract(4, 'month').subtract(1, 'day').format('DD.MM.YYYY'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Startdatoen må være lik eller før sluttdatoen.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Sluttdatoen må være lik eller etter startdatoen.')[0]).toBeInTheDocument();
    });

    it('validering når startdato er etter dagens dato', async () => {
        render(<Default />);

        expect(await screen.findByText('Når startet du i jobben?')).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText('Når startet du i jobben?');
        await userEvent.type(startdatoInput, dayjs('2053-12-30').format('DD.MM.YYYY'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Startdatoen må være før eller lik dagens dato.')[0]).toBeInTheDocument();
    });

    it('validering når sluttdato er for over 5 måneder siden', async () => {
        render(<Default />);

        expect(await screen.findByText('Når startet du i jobben?')).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText('Når startet du i jobben?');
        await userEvent.type(startdatoInput, dayjs('2022-10-30').format('DD.MM.YYYY'));

        expect(screen.getByText('Jobber du der fortsatt?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Når sluttet du i jobben?')).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText('Når sluttet du i jobben?');
        await userEvent.type(sluttdatoInput, dayjs('2022-12-30').format('DD.MM.YYYY'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(
                'Datoen er før 5 måneder siden. Hvis du sluttet i jobben for mer enn 5 måneder siden, trenger du ikke å oppgi arbeidsforholdet til NAV.',
            )[0],
        ).toBeInTheDocument();
    });

    it('validering når flere arbeidsforhold er lagt til', async () => {
        render(<Default />);

        expect(await screen.findByText('Legg til flere arbeidsforhold i utlandet')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legg til flere arbeidsforhold i utlandet'));

        expect(screen.getAllByText('Hvilket land har du jobbet i?')[1]).toBeInTheDocument();
    });

    it('validering når arbeidsforhold er slettet', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvilket land har du jobbet i?')).toBeInTheDocument();

        expect(screen.getByText('Legg til flere arbeidsforhold i utlandet')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legg til flere arbeidsforhold i utlandet'));

        expect(screen.getAllByText('Hva er navnet på arbeidsgiveren din?')[1]).toBeInTheDocument();
        const arbeidsgiverInput = screen.getAllByText('Hva er navnet på arbeidsgiveren din?')[1];
        await userEvent.type(arbeidsgiverInput, 'Arbeidsgivernavn');
        await userEvent.tab();

        expect(screen.getByDisplayValue('Arbeidsgivernavn')).toBeInTheDocument();

        expect(screen.getAllByText('Fjern perioden', { exact: false })[0]).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Fjern perioden')[0]);

        expect(screen.queryByDisplayValue('Arbeidsgivernavn')).not.toBeInTheDocument();
    });
});
