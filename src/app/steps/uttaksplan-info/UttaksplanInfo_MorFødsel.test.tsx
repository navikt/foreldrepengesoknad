import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/uttaksplan-info/mor-fødsel/MorFødsel.stories';

const {
    UttaksplanMedAleneomsorg,
    UttaksplanMedPrematurFødsel,
    UttaksplanMedDeltUttak,
    UttaksplanMedFlerbarnsukerTvillinger,
} = composeStories(stories);

const PERIODE_LENGDE_LABEL = 'Hvor lang periode med foreldrepenger har dere valgt?';
const GÅ_VIDERE_KNAPP = 'Gå videre';
const PERIODE_START_DATOFELT = 'Når ønsker du å starte perioden?';
const UKER_FELLESPERIODE_LABEL = 'Hvor mange uker skal du ha av fellesperioden?';
const IKKE_FORELDREPENGER_FØR_TERMIN = 'Jeg tok ikke ut foreldrepenger før termin';

describe('<UttaksplanInfo_MorFødsel>', () => {
    it('skal fylle ut dekningsgrad før en kan gå videre når en har aleneomsorg', async () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('3 + 56 uker')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel'
            )
        ).toBeInTheDocument();
        expect(screen.getByText(PERIODE_START_DATOFELT)).toBeInTheDocument();
        expect(screen.queryByText(UKER_FELLESPERIODE_LABEL)).not.toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal vise info om at stønadsperioden er forlenget når en har prematur fødsel', async () => {
        render(<UttaksplanMedPrematurFødsel />);

        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(
            screen.getByText(
                'Stønadsperioden din er forlenget med 8 uker og 3 dager siden du har født før svangerskapsuke 33.'
            )
        ).toBeInTheDocument();

        userEvent.click(screen.getByText('67.6 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('3 + 64.6 uker')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel'
            )
        ).toBeInTheDocument();
        expect(screen.getByText(PERIODE_START_DATOFELT)).toBeInTheDocument();
        expect(screen.queryByText(UKER_FELLESPERIODE_LABEL)).not.toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal vise info om delt uttak ved valg av 100 prosent foreldrepenger', async () => {
        render(<UttaksplanMedDeltUttak />);

        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText('TALENTFULL MYGGs del')).not.toBeInTheDocument();
        expect(screen.queryByText(PERIODE_START_DATOFELT)).not.toBeInTheDocument();
        expect(screen.queryByText(UKER_FELLESPERIODE_LABEL)).not.toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        expect(screen.getByText('3 + 15 uker')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('16 uker')).toBeInTheDocument();
        expect(screen.getByText('Espen Utviklers del')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(screen.getByText('8 av 16 uker med fellesperiode')).toBeInTheDocument();

        expect(screen.getByText(PERIODE_START_DATOFELT)).toBeInTheDocument();
        expect(screen.getAllByText(UKER_FELLESPERIODE_LABEL)[0]).toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal vise veileder info om mor velger å ikke ta foreldrepenger før fødsel', async () => {
        render(<UttaksplanMedDeltUttak />);
        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        userEvent.click(screen.getByText(IKKE_FORELDREPENGER_FØR_TERMIN));
        expect(
            await screen.findByText(
                'Når du ikke starter foreldrepengeperioden 3 uker før termindato mister du rett til foreldrepenger disse dagene.'
            )
        ).toBeInTheDocument();
    });

    it('skal vise info om delt uttak ved valg av 80 prosent foreldrepenger', async () => {
        render(<UttaksplanMedDeltUttak />);
        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();

        userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        expect(screen.getByText(PERIODE_START_DATOFELT)).toBeInTheDocument();
        expect(screen.getAllByText(UKER_FELLESPERIODE_LABEL)[0]).toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal vise info om tvillingsfødsel ved valg av 100 prosent foreldrepenger', async () => {
        render(<UttaksplanMedFlerbarnsukerTvillinger />);
        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();

        expect(screen.queryByText('TALENTFULL MYGGs del')).not.toBeInTheDocument();
        expect(screen.queryByText(PERIODE_START_DATOFELT)).not.toBeInTheDocument();
        expect(screen.queryByText(UKER_FELLESPERIODE_LABEL)).not.toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('66 uker med 100 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        expect(screen.getByText('3 + 15 uker')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('33 uker')).toBeInTheDocument();
        expect(screen.getByText('Espen Utviklers del')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(
            screen.getByText('Dere har 17 uker med flerbarnsuker som dere kan dele', { exact: false })
        ).toBeInTheDocument();
        expect(screen.getByText('17 av 33 uker med fellesperiode')).toBeInTheDocument();

        expect(screen.getByText(PERIODE_START_DATOFELT)).toBeInTheDocument();
        expect(screen.getAllByText(UKER_FELLESPERIODE_LABEL)[0]).toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal vise info om tvillingsfødsel ved valg av 80 prosent foreldrepenger', async () => {
        render(<UttaksplanMedFlerbarnsukerTvillinger />);

        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText('TALENTFULL MYGGs del')).not.toBeInTheDocument();
        expect(screen.queryByText(PERIODE_START_DATOFELT)).not.toBeInTheDocument();
        expect(screen.queryByText(UKER_FELLESPERIODE_LABEL)).not.toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('80 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        expect(screen.getByText('3 + 19 uker')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('39 uker')).toBeInTheDocument();
        expect(screen.getByText('Espen Utviklers del')).toBeInTheDocument();
        expect(screen.getByText('19 uker')).toBeInTheDocument();

        expect(
            screen.getByText('Dere har 21 uker med flerbarnsuker som dere kan dele', { exact: false })
        ).toBeInTheDocument();
        expect(screen.getByText('20 av 39 uker med fellesperiode')).toBeInTheDocument();

        expect(screen.getByText(PERIODE_START_DATOFELT)).toBeInTheDocument();
        expect(screen.getAllByText(UKER_FELLESPERIODE_LABEL)[0]).toBeInTheDocument();
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
