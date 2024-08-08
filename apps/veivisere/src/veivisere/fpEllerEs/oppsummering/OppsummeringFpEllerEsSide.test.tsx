import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OppsummeringFpEllerEsSide.stories';

const {
    MorHarTjentMerEnn200000OgHarRettTilFpOgEs,
    MorHarTjentMindreEnn200000OgHarRettTilFpOgEs,
    FarHarTjentMindreEnn200000OgHarRettTilFpOgEs,
    MorHarIkkeRett,
    MorKanHaRettTilEs,
    FarKanHaRettTilEs,
} = composeStories(stories);

describe('<OppsummeringSide>', () => {
    it('skal vise oppsummering for mor som har tjent mer enn 200 000', async () => {
        render(<MorHarTjentMerEnn200000OgHarRettTilFpOgEs />);

        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett på foreldrepenger')).toBeInTheDocument();
        expect(
            screen.getByText(/Når du har rett på foreldrepenger kan du også ha rett på engangsstønad./),
        ).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett på foreldrepenger?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som har tjent mindre enn 200 000', async () => {
        render(<MorHarTjentMindreEnn200000OgHarRettTilFpOgEs />);

        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett på foreldrepenger eller engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Du kan velge mellom engangsstønad eller foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hva er foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();
        expect(
            screen.getByText(/Når du har rett på foreldrepenger kan du også ha rett på engangsstønad./),
        ).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett på foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Hvorfor har jeg rett på engangsstønad?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for far som har tjent mindre enn 200 000', async () => {
        render(<FarHarTjentMindreEnn200000OgHarRettTilFpOgEs />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett på foreldrepenger eller engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Du kan velge mellom engangsstønad eller foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hva er foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();
        expect(
            screen.getByText(/Når du har rett på foreldrepenger kan du også ha rett på engangsstønad./),
        ).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett på foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Hvorfor kan jeg ha rett på engangsstønad?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som ikke har rett', async () => {
        render(<MorHarIkkeRett />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(
            screen.getByText('Det ser ut som at du verken har rett på foreldrepenger eller engangsstønad'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Foreldrepenger skal erstatte inntekten din for en periode når du skal være hjemme med barn.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Når du har rett på foreldrepenger kan du også ha rett på engangsstønad./),
        ).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett på foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Hvorfor har jeg ikke rett på engangsstønad?')).toBeInTheDocument();
    });
    it('skal vise oppsummering for mor som har rett på engangsstønad', async () => {
        render(<MorKanHaRettTilEs />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett på engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett på engangsstønad?')).toBeInTheDocument();
        expect(screen.getByText('Hvorfor har jeg ikke rett på foreldrepenger?')).toBeInTheDocument();
    });
    it('skal vise oppsummering for mor som har rett på engangsstønad', async () => {
        render(<FarKanHaRettTilEs />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett på engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor kan jeg ha rett på engangsstønad?')).toBeInTheDocument();
        expect(screen.getByText('Hvorfor har jeg ikke rett på foreldrepenger?')).toBeInTheDocument();
    });
});
