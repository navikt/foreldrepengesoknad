import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
    MorOgFarKunFarHarRett,
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
                'Både Klara og Espen har jobbet 6 av de siste 10 månedene, og har tjent mer enn 65 080 kr det siste året.',
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
            screen.getByText('Barnet skal adopteres med omsorgsovertakelse 10. okt. 2024 og ble født 10. juli 2024.'),
        ).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Både Klara og Esther har jobbet 6 av de siste 10 månedene, og har tjent mer enn 65 080 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde og fordeling')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Dere valgte 100 % foreldrepenger i 49 uker og fordeler fellesperioden med 5 uker til Klara og 11 uker til Esther.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise en periode ved fødsel far og far', async () => {
        render(<FarOgFarFødsel />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dere valgte 100 % i 40 uker.')).toBeInTheDocument();
        expect(screen.getByText(/Periode:/)).toBeInTheDocument();
        expect(screen.getByText(/25. nov. 2024 – 07. mars 2025/)).toBeInTheDocument();
    });

    it('skal vise perioder for begge fedrene ved adopsjon far og far', async () => {
        render(<FarOgFarAdopsjonKunFar1HarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Periode:')).toBeInTheDocument();
        expect(screen.getByText('14. okt. 2024 – 18. juli 2025')).toBeInTheDocument();
        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
    });

    it('skal vise info der det er flere forsørgere og kun mor har rett til foreldrepenger', async () => {
        render(<KunMorHarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText('Klara har jobbet 6 av de siste 10 månedene og tjent mer enn 65 080 kr det siste året.'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Espen har ikke jobbet 6 av de siste 10 månedene og tjent mer enn 65 080 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % foreldrepenger i 49 uker.')).toBeInTheDocument();
    });

    it('skal vise at mor som er ufør aleneforsørger ikke har rett på foreldrepenger', async () => {
        render(<AleneforsørgerMorErUfør />);
        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Du har ikke rett til foreldrepenger')).toBeInTheDocument();
    });

    it('skal vise info for far og far, kun far 2 har rett', async () => {
        render(<OppsummeringFarOgFarKunFar2HarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Barnet har termin 24. okt. 2024.')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Espen har ikke jobbet 6 av de siste 10 månedene og tjent mer enn 65 080 kr det siste året.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Hugo har jobbet 6 av de siste 10 månedene og tjent mer enn 65 080 kr det siste året.'),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % foreldrepenger i 46 uker.')).toBeInTheDocument();

        expect(screen.getByText('Dere valgte 100 % i 46 uker.')).toBeInTheDocument();
        expect(screen.getByText('24. okt. 2024 – 10. sep. 2025')).toBeInTheDocument();
    });
    it('skal vise info om hvor mye-steget der det er flere forsørgere og begge har rett til foreldrepenger - fødsel', async () => {
        render(<FlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getAllByText('Hvor mye?')).toHaveLength(2);
        expect(
            screen.getByText(
                'Klara vil få rundt 2 308 kr per dag hvis dere velger 100 % foreldrepenger eller 1 846 kr per dag med 80 %.',
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                'Espen vil få rundt 3 003 kr per dag hvis dere velger 100 % foreldrepenger eller 2 403 kr per dag med 80 %.',
            ),
        ).toBeInTheDocument();
    });
    it('skal vise info om barnehage - fødsel', async () => {
        render(<FlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mye?')).toHaveLength(2);
        expect(screen.getAllByText('Barnehageplass')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();
    });
    it('skal ikke vise info om barnehage – adopsjon', async () => {
        render(<FarOgFarAdopsjonKunFar1HarRett />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);

        expect(screen.getByText('Planen deres')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mye?')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.queryByText('Barnehageplass')).not.toBeInTheDocument();
    });
    it('skal kun vise fars uttak i hvor mye-steget, der det er mor og far, men kun far rett til foreldrepenger', async () => {
        render(<MorOgFarKunFarHarRett />);
        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        const hvorMyeHeading = screen.getAllByText('Hvor mye?')[0];
        const expansionCard = hvorMyeHeading.closest('.navds-expansioncard');
        if (expansionCard) {
            const vismerButton = expansionCard.querySelector('button[aria-expanded="false"]');
            if (vismerButton) {
                await userEvent.click(vismerButton);
            }
        }
        expect(
            screen.getByText(
                'Espen vil få rundt 46 kr per dag hvis dere velger 100 % foreldrepenger eller 37 kr per dag med 80 %.',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Klara vil få rundt')).not.toBeInTheDocument();
    });
});
