import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './MorFarAnnenForelderHarRettIEOS.stories';
import dayjs from 'dayjs';

const {
    UttaksplanAdopsjonFarSøkerMorHarRettIEOS,
    UttaksplanAdopsjonMorSøkerFarHarRettIEOS,
    UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger,
    UttaksplanFødselMorSøkerFarHarRettIEOSPrematur,
} = composeStories(stories);

const farEllerMedMorSøkerAdopsjon = [
    UttaksplanAdopsjonFarSøkerMorHarRettIEOS,
    UttaksplanAdopsjonMorSøkerFarHarRettIEOS,
];

describe('<UttaksplanInfo - annen forelder har rett i EØS>', () => {
    // FIXME Noko tull med locale og datoar
    it.skip.each(farEllerMedMorSøkerAdopsjon)(
        'Skal fungere for adopsjon der far/mor søker og mor/far har rett i EØS',
        async (FarEllerMedMorSøker) => {
            render(<FarEllerMedMorSøker />);

            expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
            expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

            await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

            expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Omsorgsovertakelsen 15. mars 2021'));

            expect(screen.getByText('Neste steg')).toBeInTheDocument();

            //Skal ikke vise informasjon om dag/fellesperiode fordelingen mellom mor og far
            expect(screen.queryByText('dager', { exact: false })).not.toBeInTheDocument();
            expect(screen.queryByText('Fellesperiode', { exact: false })).not.toBeInTheDocument();
        },
    );
    it('Skal fungere for fødsel der far søker, mor har rett i EØS og det er tvillinger', async () => {
        render(<UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInput = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInput, dayjs().format('15.09.2021'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        expect(screen.getByText('uker med flerbarnsuker', { exact: false }));
        expect(screen.queryByText('Fellesperiode', { exact: false })).not.toBeInTheDocument();
    });
    it('Skal fungere for fødsel der mor søker, far har rett i EØS og det er prematur fødsel', async () => {
        render(<UttaksplanFødselMorSøkerFarHarRettIEOSPrematur />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.getByText('Stønadsperioden din er forlenget med', { exact: false }));
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getByText('Jeg tok ikke ut foreldrepenger før termin')).toBeInTheDocument();

        const førsteDagInput = screen.getByLabelText('Når ønsker du å starte perioden?');
        await userEvent.type(førsteDagInput, dayjs().format('15.09.2021'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        expect(screen.queryByText('Fellesperiode', { exact: false })).not.toBeInTheDocument();
    });
});
