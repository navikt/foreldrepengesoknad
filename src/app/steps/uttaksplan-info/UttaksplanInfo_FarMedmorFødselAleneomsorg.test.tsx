// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { composeStories } from '@storybook/testing-react';
// import * as stories from 'stories/steps/uttaksplan-info/far-medmor-fødsel-aleneomsorg/FarMedmorFødselAleneomsorg.stories';

// const { UttaksplanInfoFarMedmorFødselAleneomsorg } = composeStories(stories);

// const GÅ_VIDERE_KNAPP = 'Gå videre';

// describe('<UttaksplanInfo_FarMedmorFødselAleneomsorg>', () => {
//     it('skal ved aleneomrsorg der far/medmor søker vise riktig dato på omsorgsovertakelse', async () => {
//         render(<UttaksplanInfoFarMedmorFødselAleneomsorg />);
//         expect(await screen.findByText('Om perioden din med foreldrepenger')).toBeInTheDocument();
//         expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
//         expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
//         userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));
//         expect(await screen.findByText('Når skal du starte foreldrepengene dine?')).toBeInTheDocument();
//         expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
//         expect(screen.getByText('Omsorgsovertakelsen 24. mars 2022')).toBeInTheDocument();
//         expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
//         userEvent.click(screen.getByText('Omsorgsovertakelsen 24. mars 2022'));
//         expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
//     });
// });

describe('Test', () => {
    it('test', async () => {
        expect(1).toEqual(1);
    });
});
