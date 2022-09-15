import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/uttaksplan-info/mor-far-annen-forelder-har-rett-i-eos/MorFarAnnenForelderHarRettIEOS.stories';
import dayjs from 'dayjs';

const { UttaksplanFarSøkerMorHarRettIEOS, UttaksplanMorSøkerFarHarRettIEOS } = composeStories(stories);

const PERIODE_LENGDE_LABEL = 'Hvor lang periode med foreldrepenger ønsker du?';
const NÅR_ØNSKER_DU_Å_STARTE = 'Når ønsker du å starte perioden?';
const NÅR_FØRSTE_DAG = 'Når er din første dag med foreldrepenger?';
const GÅ_VIDERE_KNAPP = 'Gå videre';

const farEllerMedMorSøker = [UttaksplanFarSøkerMorHarRettIEOS, UttaksplanMorSøkerFarHarRettIEOS];

describe('<UttaksplanInfo_FarSøkeMorHarRettIEØS>', () => {
    it.each(farEllerMedMorSøker)(
        'Skal fungere for adopsjon der far/mor søker og mor/far har rett i EØS',
        async (FarEllerMedMorSøker) => {
            render(<FarEllerMedMorSøker />);

            expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
            expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

            await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

            expect(await screen.findByText(NÅR_ØNSKER_DU_Å_STARTE)).toBeInTheDocument();

            await userEvent.click(screen.getByText('Omsorgsovertakelsen 15. mars 2021'));
            expect(await screen.findByText(NÅR_FØRSTE_DAG)).toBeInTheDocument();

            expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
            const førsteDagInput = screen.getByLabelText(NÅR_FØRSTE_DAG);
            await userEvent.type(førsteDagInput, dayjs().format('15.09.2021'));
            await userEvent.tab();
            expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();

            expect(screen.queryByText('dager', { exact: false })).not.toBeInTheDocument();
            expect(screen.queryByText('Fellesperiode', { exact: false })).not.toBeInTheDocument();
        }
    );
});
