import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Card.stories';

const { TyperOgStorleikar, TreVisuelleKanaler, States, KlikkbartVsStatisk } = composeStories(stories);

describe('<Card>', () => {
    it('skal vise innhald for kvar storleik (micro/small/medium/xl)', async () => {
        render(<TyperOgStorleikar />);
        expect(await screen.findAllByText('Mors periode')).not.toHaveLength(0);
        expect(screen.getAllByText('Fars periode').length).not.toBe(0);
        expect(screen.getAllByText('Fellesperiode').length).not.toBe(0);
        expect(screen.getAllByText('Ferie').length).not.toBe(0);
    });

    it('skal gje tone-kanalen si eiga soft bakgrunnsfarge', async () => {
        render(<TreVisuelleKanaler />);
        const berreToneKort = (await screen.findByText('Berre tone')).closest('div');
        expect(berreToneKort?.className).toContain('bg-ax-bg-accent-soft');
    });

    it('skal falle tilbake til nøytral styling når ingen tone er sett', async () => {
        render(<States />);
        const ingenPlanKort = (await screen.findByText('Ingen plan')).closest('div');
        expect(ingenPlanKort?.className).toContain('bg-ax-bg-default');
    });

    it('skal vise state-badge uavhengig av tone, og aldri bytte ut bakgrunnen', async () => {
        render(<States />);
        const ufullstendigBadge = await screen.findByText('Ufullstendig');
        expect(ufullstendigBadge.className).toContain('bg-ax-bg-warning-soft');

        const overlappBadge = screen.getByText('Overlapp');
        expect(overlappBadge.className).toContain('bg-ax-bg-danger-soft');

        // Sjølve korta skal framleis ha tone-bakgrunnen sin (accent), ikkje ei state-farge.
        const ufullstendigKort = ufullstendigBadge.closest('div[class*="bg-ax-bg-accent-soft"]');
        expect(ufullstendigKort).toBeInTheDocument();
        const overlappKort = overlappBadge.closest('div[class*="bg-ax-bg-accent-soft"]');
        expect(overlappKort).toBeInTheDocument();
    });

    it('skal invertere til sterk bakgrunn og kontrastfarga tekst når selected er sett', async () => {
        render(<TreVisuelleKanaler />);
        const valgtKort = (await screen.findByText('Tone + state + valgt')).closest('div');
        expect(valgtKort?.className).toContain('bg-ax-bg-accent-strong');

        const ikkjeValgtKort = screen.getByText('Tone + state').closest('div');
        expect(ikkjeValgtKort?.className).toContain('bg-ax-bg-accent-soft');
    });

    it('skal vise skravert mønster for kort som manglar dekning, utan å ha ein tone', async () => {
        render(<States />);
        const udekketKort = (await screen.findByText('Udekket dag')).closest('div');
        expect(udekketKort?.getAttribute('style')).toContain('repeating-linear-gradient');
    });

    it('skal rendre ein tom sirkel-indikator for ein dag utan periode enno', async () => {
        render(<States />);
        expect(await screen.findByText('Ingen plan')).toBeInTheDocument();
    });

    it('skal rendre <button> når onClick er sett, elles ein <div>', async () => {
        render(<KlikkbartVsStatisk />);
        const klikkbartKort = (await screen.findByText('Klikkbar')).closest('button');
        expect(klikkbartKort).toBeInTheDocument();
        expect(klikkbartKort?.tagName).toBe('BUTTON');

        const statiskKort = screen.getByText('Berre visning').closest('button');
        expect(statiskKort).not.toBeInTheDocument();
    });
});
