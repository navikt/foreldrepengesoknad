import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from '../../../storybook/stories/steps/uttaksplan-info/mor-far-adopsjon/MorFarAdopsjon.stories';

const { UttaksplanMedAleneomsorg } = composeStories(stories);

const PERIODE_LENGDE_LABEL = 'Hvor lang periode med foreldrepenger har dere valgt?';
const GÅ_VIDERE_KNAPP = 'Gå videre';
const VELG_DATO_DATOFELT = 'Velg dato';

describe('<UttaksplanInfo_MorFarAdopsjon>', () => {
    it('skal fylle ut dekningsgrad og velge omsorgovertakelsedato før en kan gå videre når en har aleneomsorg', async () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(await screen.findByText('3 + 0 uker')).toBeInTheDocument();
        //FIXME (TOR) Denne teksten er feil. Gjeld fødsel
        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel'
            )
        ).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('Omsorgsovertakelsen 15. March 2021'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(screen.queryByText(VELG_DATO_DATOFELT)).not.toBeInTheDocument();
    });

    it('skal fylle ut dekningsgrad og velge annen dato før en kan gå videre når en har aleneomsorg', async () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(await screen.findByText('3 + 0 uker')).toBeInTheDocument();
        //FIXME (TOR) Denne teksten er feil. Gjeld fødsel
        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel'
            )
        ).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        userEvent.click(screen.getByText('Annen dato'));

        expect(await screen.findByText(VELG_DATO_DATOFELT)).toBeInTheDocument();

        userEvent.type(screen.getByText(VELG_DATO_DATOFELT), '2021-06-17');

        //FIXME (TOR) Kvifor funkar ikkje denne?
        //expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
