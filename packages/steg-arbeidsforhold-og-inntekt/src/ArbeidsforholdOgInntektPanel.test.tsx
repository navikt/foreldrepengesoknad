import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { NæringDto } from '@navikt/fp-types';

import * as stories from './ArbeidsforholdOgInntektPanel.stories';

const {
    ForSvangerskapspenger,
    ForForeldrepenger,
    ForForeldrepengerMedAndreInntekter,
    ForForeldrepengerMedSelvstendigNæring,
} = composeStories(stories);

const manueltLagtTilNæring = {
    navnPåNæringen: 'Fiskebåten',
    næringstype: 'FISKE',
    fom: '2023-01-01',
    næringsinntekt: 1000,
    registrertINorge: true,
    organisasjonsnummer: '998877665',
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
} satisfies NæringDto;

describe('<ArbeidsforholdOgInntektPanel>', () => {
    it('skal vise feilmelding hvis spørsmål ikke er besvart', async () => {
        render(<ForSvangerskapspenger />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(screen.getByText('Har du jobbet og hatt inntekt som frilanser de siste 4 ukene?')).toBeInTheDocument();
        expect(
            screen.getByText('Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 4 ukene?'),
        ).toBeInTheDocument();
        expect(screen.getByText('Har du jobbet i utlandet de siste 4 ukene?')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi om du har arbeidet som frilanser de siste 4 ukene.')).toHaveLength(2);
        expect(
            screen.getAllByText('Du må oppgi om du har hatt inntekt som selvstendig næringsdrivende de siste 4 ukene.'),
        ).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi om du har arbeidet i utlandet de siste 4 ukene.')).toHaveLength(2);
    });

    it('skal vise og åpne wizard for andre inntekter', async () => {
        render(<ForForeldrepenger />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(screen.getByText('Legg til inntekt')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Nei')[0]!);
        await userEvent.click(screen.getAllByText('Nei')[1]!);

        await userEvent.click(screen.getByText('Legg til inntekt'));

        expect(screen.getByText('Hvilken type inntekt har du hatt?')).toBeInTheDocument();
    });

    it('skal vise andre inntekter som en egen boks i sammendraget', async () => {
        render(<ForForeldrepengerMedAndreInntekter />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

        expect(screen.getByText('Legg til inntekt')).toBeInTheDocument();

        expect(screen.queryByText('Dine andre inntekter')).not.toBeInTheDocument();
        expect(screen.getByText('Jobb i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Københavns Kommune')).toBeInTheDocument();
    });

    it('skal fjerne en annen inntekt fra context-arrayet', async () => {
        const saveAndreInntektskilder = vi.fn();
        render(<ForForeldrepengerMedAndreInntekter saveAndreInntektskilder={saveAndreInntektskilder} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Fjern Jobb i utlandet' }));

        expect(saveAndreInntektskilder).toHaveBeenCalledWith([]);
        expect(screen.queryByRole('heading', { name: 'Jobb i utlandet' })).not.toBeInTheDocument();
    });

    it('skal appende en ny inntekt til eksisterende inntekter', async () => {
        const saveAndreInntektskilder = vi.fn();
        render(<ForForeldrepengerMedAndreInntekter saveAndreInntektskilder={saveAndreInntektskilder} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));
        await userEvent.click(screen.getByRole('radio', { name: /Annen pensjonsgivende inntekt/ }));
        await userEvent.click(screen.getByRole('button', { name: 'Neste' }));
        await userEvent.click(screen.getByRole('radio', { name: 'Etterlønn eller sluttvederlag' }));
        await userEvent.type(screen.getByLabelText('Perioden den gjelder fra'), '01.01.2024');
        await userEvent.type(screen.getByLabelText('Til'), '31.01.2024');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(saveAndreInntektskilder).toHaveBeenCalledWith([
            expect.objectContaining({ type: 'JOBB_I_UTLANDET' }),
            {
                type: 'ETTERLØNN_SLUTTPAKKE',
                fom: '2024-01-01',
                tom: '2024-01-31',
            },
        ]);
    });

    it('skal vise selvstendig næring som en egen boks i sammendraget', async () => {
        render(<ForForeldrepengerMedSelvstendigNæring />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(screen.getByText('Arbeid som selvstendig næringsdrivende')).toBeInTheDocument();
        expect(screen.getByText('Kari Konsulent')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Fjern Kari Konsulent/ })).not.toBeInTheDocument();
    });

    it('skal fjerne manuelt lagt til egen næring fra context', async () => {
        const saveEgenNæring = vi.fn();
        render(<ForForeldrepenger egenNæring={manueltLagtTilNæring} saveEgenNæring={saveEgenNæring} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Fjern Fiskebåten' }));

        expect(saveEgenNæring).toHaveBeenCalledWith(undefined);
        expect(screen.queryByRole('heading', { name: 'Fiskebåten' })).not.toBeInTheDocument();
    });

    it('skal ikke kunne fjerne egen næring når den kommer fra registeret', async () => {
        render(<ForForeldrepengerMedSelvstendigNæring egenNæring={manueltLagtTilNæring} />);

        await screen.findAllByText('Arbeidsforhold og inntekt');

        expect(screen.queryByRole('button', { name: /Fjern/ })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Fiskebåten' })).not.toBeInTheDocument();
    });

    it('skal hoppe over inntektstypesteget når selvstendig næring finnes i registeret', async () => {
        render(<ForForeldrepengerMedSelvstendigNæring />);

        await screen.findAllByText('Arbeidsforhold og inntekt');
        await userEvent.click(screen.getByRole('button', { name: 'Legg til inntekt' }));

        expect(
            screen.getByRole('radiogroup', {
                name: 'Hvilken annen type pensjonsgivende inntekt har du hatt de siste 10 månedene?',
            }),
        ).toBeInTheDocument();
        expect(screen.queryByText('Hvilken type inntekt har du hatt?')).not.toBeInTheDocument();
    });

    it('skal ikke vise feilmelding', async () => {
        const saveOnNext = vi.fn();

        render(<ForSvangerskapspenger saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Nei')[0]!);

        await userEvent.click(screen.getAllByText('Nei')[1]!);

        await userEvent.click(screen.getAllByText('Ja')[2]!);
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.queryByText('Du må oppgi om du har arbeidet som frilanser de siste 4 ukene.'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText('Du må oppgi om du har hatt inntekt som selvstendig næringsdrivende de siste 4 ukene.'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText('Du må oppgi om du har arbeidet i utlandet de siste 4 ukene.'),
        ).not.toBeInTheDocument();

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            harHattArbeidIUtlandet: true,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        });
    });

    it('skal avslutte søknad', async () => {
        const onAvsluttOgSlett = vi.fn();

        render(<ForSvangerskapspenger onFortsettSenere={vi.fn()} onAvsluttOgSlett={onAvsluttOgSlett} />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Slett søknaden')[0]!);
        await userEvent.click(screen.getAllByText('Slett søknaden')[1]!);

        expect(onAvsluttOgSlett).toHaveBeenCalledTimes(1);
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<ForSvangerskapspenger onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Barnet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'BARNET_PATH');
    });
});
