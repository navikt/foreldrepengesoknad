import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './ArbeidIUtlandet.stories';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

const { Default } = composeStories(stories);

const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const HVILKET_LAND_HAR_DU_JOBBET_I = 'Hvilket land har du jobbet i?';
const ARBEIDSGIVER = 'Hva er navnet på arbeidsgiveren din?';
const STARTDATO = 'Når startet du i jobben?';
const JOBBER_FORTSATT = 'Jobber du der fortsatt?';
const NEI = 'Nei';
const SLUTTDATO = 'Når sluttet du i jobben?';
const LEGG_TIL_FLERE = 'Legg til flere arbeidsforhold i utlandet';
const SLETT_PERIODEN = 'Slett perioden';
const NESTE_STEG = 'Neste steg';

describe('<ArbeidIUtlandet>', () => {
    const user = userEvent.setup();

    it('skal vise feilmelding når ingenting er utfylt', async () => {
        render(<Default />);
        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi land du har jobbet i.')[0]).toBeInTheDocument();
        expect(await screen.getAllByText('Du må oppgi navn på arbeidsgiver i utlandet.')[0]).toBeInTheDocument();
        expect(await screen.getAllByText('Du må oppgi en startdato.')[0]).toBeInTheDocument();
        expect(await screen.getAllByText('Du må svare på om du fortsatt jobber i utlandet.')[0]).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText(HVILKET_LAND_HAR_DU_JOBBET_I)).toBeInTheDocument();

        const hvilkeLandInput = screen.getByLabelText(HVILKET_LAND_HAR_DU_JOBBET_I);
        await userEvent.selectOptions(hvilkeLandInput, 'UA');
        await user.tab();

        expect(await screen.findByText(ARBEIDSGIVER)).toBeInTheDocument();
        const arbeidsgiverInput = screen.getByLabelText(ARBEIDSGIVER);
        await user.type(arbeidsgiverInput, 'Arbeidsgiver');
        await user.tab();

        expect(await screen.findByText(STARTDATO)).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(STARTDATO);
        await user.type(startdatoInput, dayjs('2022-12-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(JOBBER_FORTSATT)).toBeInTheDocument();
        await user.click(screen.getByText(NEI));

        expect(await screen.findByText(SLUTTDATO)).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(SLUTTDATO);
        await user.type(sluttdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.queryByText('Du må oppgi land du har jobbet i.')).not.toBeInTheDocument();
        expect(await screen.queryByText('Du må oppgi navn på arbeidsgiver i utlandet.')).not.toBeInTheDocument();
        expect(await screen.queryByText('Du må oppgi en startdato.')).not.toBeInTheDocument();
        expect(await screen.queryByText('Du må svare på om du fortsatt jobber i utlandet.')).not.toBeInTheDocument();
    });
    it('skal vise feilmelding når dato er i feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(STARTDATO)).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(STARTDATO);
        await user.type(startdatoInput, 'bla bla');

        expect(await screen.findByText(JOBBER_FORTSATT)).toBeInTheDocument();
        await user.click(screen.getByText(NEI));

        expect(await screen.findByText(SLUTTDATO)).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(SLUTTDATO);
        await user.type(sluttdatoInput, 'bla bla');

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Startdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
        expect(
            await screen.getAllByText('Sluttdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('validering når sluttdato er tidligere enn startdato', async () => {
        render(<Default />);

        expect(await screen.findByText(STARTDATO)).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(STARTDATO);
        await user.type(startdatoInput, dayjs('2023-10-30').format('DD.MM.YYYY'));

        expect(await screen.findByText(JOBBER_FORTSATT)).toBeInTheDocument();
        await user.click(screen.getByText(NEI));

        expect(await screen.findByText(SLUTTDATO)).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(SLUTTDATO);
        await user.type(sluttdatoInput, dayjs('2023-09-30').format('DD.MM.YYYY'));

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Startdatoen må være lik eller før sluttdatoen.')[0]).toBeInTheDocument();
        expect(await screen.getAllByText('Sluttdatoen må være lik eller etter startdatoen.')[0]).toBeInTheDocument();
    });
    it('validering når startdato er etter dagens dato', async () => {
        render(<Default />);

        expect(await screen.findByText(STARTDATO)).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(STARTDATO);
        await user.type(startdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Startdatoen må være før eller lik dagens dato.')[0]).toBeInTheDocument();
    });
    it('validering når sluttdato er for over 5 måneder siden', async () => {
        render(<Default />);

        expect(await screen.findByText(STARTDATO)).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(STARTDATO);
        await user.type(startdatoInput, dayjs('2022-10-30').format('DD.MM.YYYY'));

        expect(await screen.findByText(JOBBER_FORTSATT)).toBeInTheDocument();
        await user.click(screen.getByText(NEI));

        expect(await screen.findByText(SLUTTDATO)).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(SLUTTDATO);
        await user.type(sluttdatoInput, dayjs('2022-12-30').format('DD.MM.YYYY'));

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText(
                'Datoen er før 5 måneder siden. Hvis du sluttet i jobben for mer enn 5 måneder siden, trenger du ikke å oppgi arbeidsforholdet til NAV.',
            )[0],
        ).toBeInTheDocument();
    });
    it('validering når flere arbeidsforhold er lagt til', async () => {
        render(<Default />);

        expect(await screen.findByText(LEGG_TIL_FLERE)).toBeInTheDocument();
        await user.click(screen.getByText(LEGG_TIL_FLERE));

        expect(await screen.getAllByText(HVILKET_LAND_HAR_DU_JOBBET_I)[1]).toBeInTheDocument();
    });
    it('validering når arbeidsforhold er slettet', async () => {
        render(<Default />);

        expect(await screen.findByText(HVILKET_LAND_HAR_DU_JOBBET_I)).toBeInTheDocument();

        expect(await screen.findByText(LEGG_TIL_FLERE)).toBeInTheDocument();
        await user.click(screen.getByText(LEGG_TIL_FLERE));

        expect(await screen.getAllByText(ARBEIDSGIVER)[1]).toBeInTheDocument();
        const arbeidsgiverInput = screen.getAllByText(ARBEIDSGIVER)[1];
        await user.type(arbeidsgiverInput, 'Arbeidsgivernavn');
        await user.tab();

        expect(await screen.findByDisplayValue('Arbeidsgivernavn')).toBeInTheDocument();

        expect(await screen.getAllByText(SLETT_PERIODEN, { exact: false })[0]).toBeInTheDocument();
        await user.click(screen.getAllByText(SLETT_PERIODEN)[0]);

        expect(await screen.queryByDisplayValue('Arbeidsgivernavn')).not.toBeInTheDocument();
    });
});
