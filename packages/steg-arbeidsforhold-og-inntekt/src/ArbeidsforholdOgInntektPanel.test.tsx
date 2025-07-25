import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './ArbeidsforholdOgInntektPanel.stories';

const { ForSvangerskapspenger } = composeStories(stories);

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

    it('skal ikke vise feilmelding', async () => {
        const saveOnNext = vi.fn();

        render(<ForSvangerskapspenger saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

        await userEvent.click(screen.getAllByText('Nei')[0]);

        await userEvent.click(screen.getAllByText('Nei')[1]);

        await userEvent.click(screen.getAllByText('Ja')[2]);
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

        await userEvent.click(screen.getAllByText('Slett søknaden')[0]);
        await userEvent.click(screen.getAllByText('Slett søknaden')[1]);

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
