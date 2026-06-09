import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './ArbeidsforholdOgInntektPanel.stories';

import messages from './intl/messages/nb_NO.json';

const { ForSvangerskapspenger } = composeStories(stories);

describe('<ArbeidsforholdOgInntektPanel>', () => {
    it('skal vise feilmelding hvis spørsmål ikke er besvart', async () => {
        render(<ForSvangerskapspenger />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);
        expect(screen.getByText('Har du jobbet og hatt inntekt som frilanser de siste 4 ukene?')).toBeInTheDocument();
        expect(
            screen.getByText('Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 4 ukene?'),
        ).toBeInTheDocument();
        expect(screen.getByText(messages['inntektsinformasjon.hattArbeidIUtlandet'])).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.frilans.påkrevd'])).toHaveLength(2);
        expect(
            screen.getAllByText(messages['valideringsfeil.hattInntektSomNæringsdrivende.påkrevd']),
        ).toHaveLength(2);
        expect(screen.getAllByText(messages['valideringsfeil.hattArbeidIUtlandet.påkrevd'])).toHaveLength(2);
    });

    it('skal ikke vise feilmelding', async () => {
        const saveOnNext = vi.fn();

        render(<ForSvangerskapspenger saveOnNext={saveOnNext} />);

        expect(await screen.findAllByText('Arbeidsforhold og inntekt')).toHaveLength(2);

        await userEvent.click(screen.getAllByText(messages['inntektsinformasjon.nei'])[0]!);

        await userEvent.click(screen.getAllByText(messages['inntektsinformasjon.nei'])[1]!);

        await userEvent.click(screen.getAllByText('Ja')[2]!);
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.queryByText(messages['valideringsfeil.frilans.påkrevd']),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(messages['valideringsfeil.hattInntektSomNæringsdrivende.påkrevd']),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(messages['valideringsfeil.hattArbeidIUtlandet.påkrevd']),
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
