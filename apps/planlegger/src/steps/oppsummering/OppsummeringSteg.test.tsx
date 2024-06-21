import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OppsummeringSteg.stories';

const {
    KunMorHarRett,
    FlereForsørgereHundreProsentTermin,
    FlereForsørgereHundreProsentAdopsjon,
    AleneforsørgerMorErUfør,
    FarOgFarFødsel,
    FarOgFarAdopsjonKunFar1HarRett,
    HarIkkeRett,
    OppsummeringFarOgFarKunFar2HarRett,
} = composeStories(stories);

describe('<OppsummeringSteg>', () => {
    it('skal vise info der det er flere forsørgere og ingen har rett til foreldrepenger', async () => {
        render(<HarIkkeRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Ingen av dere har rett til foreldrepenger')).toBeInTheDocument();

        expect(
            screen.getByText('Basert på svarene deres har ingen av dere rett på foreldrepenger.'),
        ).toBeInTheDocument();
    });

    it('skal vise info der det er flere forsørgere og begge har rett til foreldrepenger - fødsel', async () => {
        render(<FlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Både Klara og Espen har hatt opptjening 6 av de siste 10 månedene og har tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde og fordeling')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Dere valgte 100 % foreldrepenger i 49 uker og fordeler fellesperioden med 5 uker til Klara og 11 uker til Espen.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise info der det er flere forsørgere og begge har rett til foreldrepenger - adopsjon', async () => {
        render(<FlereForsørgereHundreProsentAdopsjon />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(
            screen.getByText('Barnet skal adopteres med omsorgsovertakelse 10. okt. 2022 og ble født 10. juli 2022.'),
        ).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Både Klara og Esther har hatt opptjening 6 av de siste 10 månedene og har tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde og fordeling')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Dere valgte 100 % foreldrepenger i 46 uker og fordeler fellesperioden med 5 uker til Klara og 11 uker til Esther.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise en periode ved fødsel far og far', async () => {
        render(<FarOgFarFødsel />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Perioden med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % i 49 uker.')).toBeInTheDocument();
        expect(screen.getByText(/Periode:/)).toBeInTheDocument();
        expect(screen.getByText(/24. okt. 2022 – 08. sep. 2023/)).toBeInTheDocument();
    });

    it('skal vise perioder for begge fedrene ved adopsjon far og far', async () => {
        render(<FarOgFarAdopsjonKunFar1HarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Perioden med foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Periode:')).toBeInTheDocument();
        expect(screen.getByText('25. okt. 2022 – 21. okt. 2022')).toBeInTheDocument();
    });

    it('skal vise info der det er flere forsørgere og kun mor har rett til foreldrepenger', async () => {
        render(<KunMorHarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Klara har hatt opptjening 6 av de siste 10 månedene og tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Espen har ikke hatt opptjening 6 av de siste 10 månedene og tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % foreldrepenger i 49 uker.')).toBeInTheDocument();
    });

    it('skal vise info der det er mor er ufør aleneforsørger', async () => {
        render(<AleneforsørgerMorErUfør />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Du har ikke rett til foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Barnet har termin 24. okt. 2022.')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Klara er ufør.')).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Du valgte 100 % foreldrepenger i 49 uker.')).toBeInTheDocument();
    });

    it('skal vise info for far og far, kun far 2 har rett', async () => {
        render(<OppsummeringFarOgFarKunFar2HarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Barnet har termin 24. okt. 2022.')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Espen har ikke hatt opptjening 6 av de siste 10 månedene og tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Hugo har hatt opptjening 6 av de siste 10 månedene og tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % foreldrepenger i 49 uker.')).toBeInTheDocument();

        expect(screen.getByText('Perioden med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % i 49 uker.')).toBeInTheDocument();
        expect(screen.getByText('24. okt. 2022 – 08. sep. 2023')).toBeInTheDocument();
    });
});
