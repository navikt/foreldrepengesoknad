import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/uttaksplan-info/mor-far-annen-forelder-har-rett-i-eos/MorFarAnnenForelderHarRettIEOS.stories';
import dayjs from 'dayjs';

const {
    UttaksplanAdopsjonFarSøkerMorHarRettIEOS,
    UttaksplanAdopsjonMorSøkerFarHarRettIEOS,
    UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,
    UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,
} = composeStories(stories);

const PERIODE_LENGDE_LABEL = 'Hvor lang periode med foreldrepenger ønsker du?';
const NÅR_ØNSKER_DU_Å_STARTE = 'Når ønsker du å starte perioden?';
const NÅR_FØRSTE_DAG = 'Når er din første dag med foreldrepenger?';
const GÅ_VIDERE_KNAPP = 'Gå videre';

const farEllerMedMorSøkerAdopsjon = [
    UttaksplanAdopsjonFarSøkerMorHarRettIEOS,
    UttaksplanAdopsjonMorSøkerFarHarRettIEOS,
];

describe('<UttaksplanInfo - annen forelder har rett i EØS>', () => {
    it.each(farEllerMedMorSøkerAdopsjon)(
        'Skal fungere for adopsjon der far/mor søker og mor/far har rett i EØS',
        async (FarEllerMedMorSøker) => {
            render(<FarEllerMedMorSøker />);

            expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
            expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

            await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

            expect(await screen.findByText(NÅR_ØNSKER_DU_Å_STARTE)).toBeInTheDocument();

            await userEvent.click(screen.getByText('Omsorgsovertakelsen 15. mars 2021'));

            expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();

            //Skal ikke vise informasjon om dag/fellesperiode fordelingen mellom mor og far
            expect(screen.queryByText('dager', { exact: false })).not.toBeInTheDocument();
            expect(screen.queryByText('Fellesperiode', { exact: false })).not.toBeInTheDocument();
        }
    );
    it('Skal fungere for fødsel der far søker, mor har rett i EØS og det er tvillinger', async () => {
        render(<UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger />);

        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(await screen.findByText(NÅR_FØRSTE_DAG)).toBeInTheDocument();

        const førsteDagInput = screen.getByLabelText(NÅR_FØRSTE_DAG);
        await userEvent.type(førsteDagInput, dayjs().format('15.09.2021'));
        await userEvent.tab();
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        expect(await screen.findByText('uker med flerbarnsuker', { exact: false }));
        expect(screen.queryByText('Fellesperiode', { exact: false })).not.toBeInTheDocument();
    });
    it('Skal fungere for fødsel der mor søker, far har rett i EØS og det er prematur fødsel', async () => {
        render(<UttaksplanFødselMorSøkerFarHarRettIEOSPrematur />);

        expect(await screen.findByText(PERIODE_LENGDE_LABEL)).toBeInTheDocument();
        expect(await screen.findByText('Stønadsperioden din er forlenget med', { exact: false }));
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(await screen.findByText(NÅR_ØNSKER_DU_Å_STARTE)).toBeInTheDocument();
        expect(await screen.findByText('Jeg tok ikke ut foreldrepenger før termin')).toBeInTheDocument();

        const førsteDagInput = screen.getByLabelText(NÅR_ØNSKER_DU_Å_STARTE);
        await userEvent.type(førsteDagInput, dayjs().format('15.09.2021'));
        await userEvent.tab();
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();

        expect(screen.queryByText('Fellesperiode', { exact: false })).not.toBeInTheDocument();
    });
});
