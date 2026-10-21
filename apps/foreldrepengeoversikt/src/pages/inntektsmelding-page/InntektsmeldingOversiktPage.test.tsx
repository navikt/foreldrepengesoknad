import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import * as stories from './InntektsmeldingOversiktPage.stories';

const { MedInntektsmeldinger, Laster, IngenAktiveInntektsmeldinger } = composeStories(stories);

describe('<InntektsmeldingOversiktPage>', () => {
    it('skal vise aktive inntektsmeldinger', async () => {
        await MedInntektsmeldinger.run();

        expect(await screen.findByText('Laksinor')).toBeInTheDocument();
        expect(screen.queryByText('Saksoversikt')).not.toBeInTheDocument();
    });

    it('skal vise lasteindikator og ikke sende brukeren videre mens inntektsmeldingene lastes', async () => {
        await Laster.run();

        expect(await screen.findByText('Henter inntektsmelding…')).toBeInTheDocument();
        expect(screen.queryByText('Saksoversikt')).not.toBeInTheDocument();
    });

    it('skal sende brukeren tilbake til saksoversikten når det ikke finnes aktive inntektsmeldinger', async () => {
        await IngenAktiveInntektsmeldinger.run();

        expect(await screen.findByText('Saksoversikt')).toBeInTheDocument();
    });
});
