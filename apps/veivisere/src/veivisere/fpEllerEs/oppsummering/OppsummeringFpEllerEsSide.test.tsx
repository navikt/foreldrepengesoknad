import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';

import * as stories from './OppsummeringFpEllerEsSide.stories';

const {
    MorHarTjentMerEnn200000OgHarRettTilFpOgEs,
    MorHarTjentMindreEnn200000OgHarRettTilFpOgEs,
    MorHarIkkeRett,
    FarHarIkkeRett,
    MorHarRettTilEs,
    FarKanHaRettTilFp,
} = composeStories(stories);

describe('<OppsummeringFpEllerEsSide>', () => {
    it('skal vise oppsummering for mor som har tjent mer enn 200 000', async () => {
        render(<MorHarTjentMerEnn200000OgHarRettTilFpOgEs />);

        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett på foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText(/Når du har rett på foreldrepenger kan du også/)).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett på foreldrepenger?')).toBeInTheDocument();

        const harRettFp = screen.getAllByTestId('harRettFp');
        expect(within(harRettFp[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harRettFp[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harRettFp[1]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettFp[2]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
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

        const harRettFp = screen.getAllByTestId('harRettFp');
        expect(within(harRettFp[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harRettFp[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harRettFp[1]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettFp[2]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        const harRettEs = screen.getAllByTestId('harRettEs');
        expect(within(harRettEs[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harRettEs[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettEs[1]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettEs[1]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett på engangsstønad?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som ikke har rett', async () => {
        render(<MorHarIkkeRett />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText(/Det ser ut som at du verken har rett på foreldrepenger/)).toBeInTheDocument();
        expect(screen.getByText(/Du har ikke rett på engangsstønad når/)).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett på engangsstønad?')).toBeInTheDocument();

        const harIkkeRettEs = screen.getAllByTestId('harIkkeRettEs');
        expect(within(harIkkeRettEs[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettEs[0]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettEs[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettEs[1]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett på foreldrepenger?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for far som ikke har rett', async () => {
        render(<FarHarIkkeRett />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText(/Det ser ut som at du verken har rett på foreldrepenger/)).toBeInTheDocument();
        expect(screen.getByText(/Du har ikke rett på engangsstønad når/)).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett på engangsstønad?')).toBeInTheDocument();

        const harIkkeRettEs = screen.getAllByTestId('harIkkeRettEs');
        expect(within(harIkkeRettEs[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettEs[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettEs[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettEs[1]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();

        expect(screen.getByText(/Din situasjon som far eller medmor/)).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett på foreldrepenger?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som har rett på engangsstønad', async () => {
        render(<MorHarRettTilEs />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett på engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett på engangsstønad?')).toBeInTheDocument();

        const harRettEs = screen.getAllByTestId('harRettEs');
        expect(within(harRettEs[0]).getByText('Du må ha hatt inntekt 6 av de 10 siste månedene')).toBeInTheDocument();
        expect(within(harRettEs[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettEs[1]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettEs[1]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett på foreldrepenger?')).toBeInTheDocument();
    });

    it('skal vise annen formulering (kan) for far som har rett på engangsstønad', async () => {
        render(<FarKanHaRettTilFp />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du kan ha rett på foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor kan jeg ha rett på foreldrepenger?')).toBeInTheDocument();
    });
});
