import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';

import * as stories from './OppsummeringFpEllerEsSide.stories';

const {
    MorHarTjentMerEnn200000OgHarRettTilFp,
    MorHarTjentMindreEnn200000OgHarRettTilFpOgEs,
    MorHarIkkeRettJobberIkkeINorgeMenIUtlandet,
    FarHarIkkeRett,
    MorHarRettTilEs,
    FarKanHaRettTilFp,
} = composeStories(stories);

describe('<OppsummeringFpEllerEsSide>', () => {
    it('skal vise oppsummering for mor som har tjent mer enn 200 000', async () => {
        render(<MorHarTjentMerEnn200000OgHarRettTilFp />);

        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett til foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText(/Når du har rett til foreldrepenger kan du også/)).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett til foreldrepenger?')).toBeInTheDocument();

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

        expect(screen.getByText('Du har rett til foreldrepenger eller engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Du kan velge mellom engangsstønad eller foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hva er foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();
        expect(
            screen.getByText(/Når du har rett til foreldrepenger kan du også ha rett til engangsstønad./),
        ).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett til foreldrepenger?')).toBeInTheDocument();

        const harRettFp = screen.getAllByTestId('harRettFp');
        expect(within(harRettFp[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harRettFp[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harRettFp[1]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettFp[2]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        const harRettEs = screen.getAllByTestId('harRettEs');
        expect(within(harRettEs[0]).getByText(/Du må i gjennomsnitt/)).toBeInTheDocument();
        expect(within(harRettEs[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harRettEs[1]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettEs[1]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett til engangsstønad?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som ikke har rett fordi hun bor i utlandet og jobber der', async () => {
        render(<MorHarIkkeRettJobberIkkeINorgeMenIUtlandet />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText(/Det ser ut som at du verken har rett til foreldrepenger/)).toBeInTheDocument();
        expect(screen.getByText(/Du kan ha rett til pengestøtte tilsvarende/)).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett til engangsstønad?')).toBeInTheDocument();

        const harIkkeRettEs = screen.getAllByTestId('harIkkeRettEs');
        expect(within(harIkkeRettEs[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettEs[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettEs[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettEs[1]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText(/Du oppfyller mest sannsynlig ikke/)).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett til foreldrepenger?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for far som ikke har rett', async () => {
        render(<FarHarIkkeRett />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText(/Det ser ut som at du verken har rett til foreldrepenger/)).toBeInTheDocument();
        expect(screen.getByText(/Du har ikke rett til engangsstønad når/)).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett til engangsstønad?')).toBeInTheDocument();

        const harIkkeRettEs = screen.getAllByTestId('harIkkeRettEs');
        expect(within(harIkkeRettEs[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettEs[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettEs[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettEs[1]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettEs[2]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        expect(screen.getByText(/Din situasjon som far eller medmor/)).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[0]).getByText(/Du må ha hatt inntekt/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett til foreldrepenger?')).toBeInTheDocument();
    });

    it('skal vise oppsummering for mor som har rett til engangsstønad', async () => {
        render(<MorHarRettTilEs />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du har rett til engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Hva er engangsstønad?')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg rett til engangsstønad?')).toBeInTheDocument();

        const harRettEs = screen.getAllByTestId('harRettEs');
        expect(within(harRettEs[0]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harRettEs[0]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        const harIkkeRettFp = screen.getAllByTestId('harIkkeRettFp');
        expect(within(harIkkeRettFp[1]).getByText(/Du må i gjennomsnitt tjene/)).toBeInTheDocument();
        expect(within(harIkkeRettFp[1]).getByText('Du oppfyller ikke dette kravet')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du må være medlem av folketrygden')).toBeInTheDocument();
        expect(within(harIkkeRettFp[2]).getByText('Du oppfyller dette kravet')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor har jeg ikke rett til foreldrepenger?')).toBeInTheDocument();
    });

    it('skal vise annen formulering (kan) for far som har rett til engangsstønad', async () => {
        render(<FarKanHaRettTilFp />);
        expect(await screen.findByText('Resultat')).toBeInTheDocument();

        expect(screen.getByText('Du kan ha rett til foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Hvorfor kan jeg ha rett til foreldrepenger?')).toBeInTheDocument();
    });
});
