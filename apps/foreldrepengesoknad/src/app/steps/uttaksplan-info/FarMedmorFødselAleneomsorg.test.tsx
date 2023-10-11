import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './FarMedmorFodselAleneomsorg.stories';

const { UttaksplanInfoFarMedmorFødselAleneomsorg } = composeStories(stories);

const GÅ_VIDERE_KNAPP = 'Neste steg';

describe('<UttaksplanInfo_FarMedmorFødselAleneomsorg>', () => {
    // FIXME Noko tull med locale og datoar
    it.skip('skal ved aleneomrsorg der far/medmor søker vise riktig dato på omsorgsovertakelse', async () => {
        render(<UttaksplanInfoFarMedmorFødselAleneomsorg />);
        expect(await screen.findByText('Perioden din med foreldrepenger')).toBeInTheDocument();
        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));
        expect(await screen.findByText('Når skal du starte foreldrepengene dine?')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsen 24. mars 2022')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText('Omsorgsovertakelsen 24. mars 2022'));
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
