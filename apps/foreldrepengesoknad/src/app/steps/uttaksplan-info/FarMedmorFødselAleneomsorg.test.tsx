import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './FarMedmorFodselAleneomsorg.stories';

const {
    FarMedmorFødselAleneomsorgDekningsgrad100,
    FarMedmorFødselAleneomsorgDekningsgrad80,
    FarMedmorFødselAleneomsorgFør1Okt2021,
} = composeStories(stories);

const GÅ_VIDERE_KNAPP = 'Neste steg';

describe('<UttaksplanInfo_FarMedmorFødselAleneomsorg>', () => {
    // TODO Noko tull med locale og datoar
    it.skip('skal ved aleneomsorg der far/medmor søker 100% dekningsgrad vise riktig fordelingsinformasjon og riktig dato på omsorgsovertakelse', async () => {
        render(<FarMedmorFødselAleneomsorgDekningsgrad100 />);
        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('46 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('Disse ukene kan brukes når som helst før barnet er 3 år.')).toBeInTheDocument();
        expect(screen.getByText('Når skal du starte foreldrepengene dine?')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsen 24. mars 2022')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText('Omsorgsovertakelsen 24. mars 2022'));
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
    it.skip('skal ved aleneomsorg der far/medmor søker 80% dekningsgrad vise riktig fordelingsinformasjon', async () => {
        render(<FarMedmorFødselAleneomsorgDekningsgrad80 />);
        expect(await screen.findByText('56 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('Disse ukene kan brukes når som helst før barnet er 3 år.')).toBeInTheDocument();
        expect(screen.getByText('Når skal du starte foreldrepengene dine?')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsen 24. mars 2022')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText('Omsorgsovertakelsen 24. mars 2022'));
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
    it.skip('skal ved aleneomsorg der far/medmor søker for barn født etter 1 okt 2021 vise riktig fordelingsinformasjon', async () => {
        render(<FarMedmorFødselAleneomsorgFør1Okt2021 />);
        expect(await screen.findByText('46 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('Disse ukene kan brukes når som helst før barnet er 3 år.')).toBeInTheDocument();
        expect(screen.getByText('Når skal du starte foreldrepengene dine?')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsen 24. mars 2022')).toBeInTheDocument();
        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText('Omsorgsovertakelsen 24. mars 2022'));
        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
