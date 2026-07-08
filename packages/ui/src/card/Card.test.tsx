import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Card.stories';

const { Storleikar, Toner, Statar, Valgt, TomDagOgManglandeDekning, KlikkbartVsStatisk } = composeStories(stories);

describe('<Card>', () => {
    it('skal vise innhald for kvar storleik (micro/small/medium/xl)', async () => {
        render(<Storleikar />);
        expect(await screen.findByText('Mødrekvote')).toBeInTheDocument();
        expect(screen.getByText('Fars periode')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepengar')).toBeInTheDocument();
    });

    it('skal gje kvar tone si eiga soft bakgrunnsfarge', async () => {
        render(<Toner />);
        const accentKort = (await screen.findByText('accent')).closest('div');
        expect(accentKort?.className).toContain('bg-ax-bg-accent-soft');

        const dangerKort = screen.getByText('danger').closest('div');
        expect(dangerKort?.className).toContain('bg-ax-bg-danger-soft');
    });

    it('skal falle tilbake til nøytral styling når ingen tone er sett', async () => {
        render(<Toner />);
        const utenToneKort = (await screen.findByText('Ingen tone')).closest('div');
        expect(utenToneKort?.className).toContain('bg-ax-bg-default');
    });

    it('skal vise state-badge uavhengig av tone, og aldri bytte ut bakgrunnen', async () => {
        render(<Statar />);
        const advarselBadge = await screen.findByText('Mangler aktivitet');
        expect(advarselBadge.className).toContain('bg-ax-bg-warning-soft');

        const kollisjonBadge = screen.getByText('Overlappar med søknad');
        expect(kollisjonBadge.className).toContain('bg-ax-bg-danger-soft');

        // Sjølve kortet skal framleis ha tone-bakgrunnen sin (accent), ikkje ei state-farge.
        const ufullstendigKort = screen.getByText('Ufullstendig').closest('div[class*="bg-ax-bg-accent-soft"]');
        expect(ufullstendigKort).toBeInTheDocument();
    });

    it('skal invertere til sterk bakgrunn og kontrastfarga tekst når selected er sett', async () => {
        render(<Valgt />);
        const valgtKort = (await screen.findAllByText('Valgt'))[0]!.closest('div');
        expect(valgtKort?.className).toContain('bg-ax-bg-accent-strong');

        const ikkjeValgtKort = screen.getAllByText('Ikkje valgt')[0]!.closest('div');
        expect(ikkjeValgtKort?.className).toContain('bg-ax-bg-accent-soft');
    });

    it('skal vise skravert mønster for kort som manglar dekning, utan å ha ein tone', async () => {
        render(<TomDagOgManglandeDekning />);
        const manglerDekningKort = (await screen.findByText('Mangler dekning')).closest('div');
        expect(manglerDekningKort?.getAttribute('style')).toContain('repeating-linear-gradient');
    });

    it('skal rendre ein tom sirkel-indikator for ein dag utan periode enno', async () => {
        render(<TomDagOgManglandeDekning />);
        expect(await screen.findByText('Ingen periode enno')).toBeInTheDocument();
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
