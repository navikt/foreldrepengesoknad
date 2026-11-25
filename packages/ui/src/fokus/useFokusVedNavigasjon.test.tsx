import { render, screen } from '@testing-library/react';

import { useFokusVedNavigasjon } from './useFokusVedNavigasjon';

const Side = ({ nøkkel }: { nøkkel: string }) => {
    const ref = useFokusVedNavigasjon<HTMLHeadingElement>(nøkkel);
    return <h2 ref={ref}>{nøkkel}</h2>;
};

const SideMedHeader = ({ nøkkel }: { nøkkel?: string }) => {
    const ref = useFokusVedNavigasjon<HTMLDivElement>(nøkkel);
    return (
        <div ref={ref}>
            <p>Ikon</p>
            {nøkkel && <h1>{nøkkel}</h1>}
        </div>
    );
};

const settBrukeraktivering = (hasBeenActive: boolean) => {
    Object.defineProperty(navigator, 'userActivation', { value: { hasBeenActive }, configurable: true });
};

describe('useFokusVedNavigasjon', () => {
    afterEach(() => {
        Reflect.deleteProperty(navigator, 'userActivation');
        history.replaceState(null, '');
    });

    it('skal ikke flytte fokus ved innlasting, men flytte fokus til overskriften ved stegbytte', () => {
        settBrukeraktivering(false);
        const { rerender } = render(<Side key="steg1" nøkkel="Steg 1" />);

        expect(screen.getByRole('heading', { name: 'Steg 1' })).not.toHaveFocus();
        expect(document.body).toHaveFocus();

        settBrukeraktivering(true);
        rerender(<Side key="steg2" nøkkel="Steg 2" />);

        const overskrift = screen.getByRole('heading', { name: 'Steg 2' });
        expect(overskrift).toHaveFocus();
        expect(overskrift).toHaveAttribute('tabindex', '-1');
    });

    it('skal ikke flytte fokus når samme steg monteres på nytt', () => {
        settBrukeraktivering(true);
        const { unmount } = render(<Side nøkkel="Steg A" />);
        expect(screen.getByRole('heading', { name: 'Steg A' })).toHaveFocus();
        unmount();

        render(<Side nøkkel="Steg A" />);
        expect(screen.getByRole('heading', { name: 'Steg A' })).not.toHaveFocus();
    });

    it('skal flytte fokus når brukeren kommer tilbake til samme side via en ny navigering', () => {
        settBrukeraktivering(true);
        history.replaceState({ key: 'besøk1' }, '');
        const { unmount } = render(<Side nøkkel="Steg B" />);
        expect(screen.getByRole('heading', { name: 'Steg B' })).toHaveFocus();
        unmount();

        history.pushState({ key: 'besøk2' }, '');
        render(<Side nøkkel="Steg B" />);
        expect(screen.getByRole('heading', { name: 'Steg B' })).toHaveFocus();
    });

    it('skal fokusere h1 i containeren', () => {
        settBrukeraktivering(true);
        render(<SideMedHeader nøkkel="/sak/1" />);

        expect(screen.getByRole('heading', { level: 1, name: '/sak/1' })).toHaveFocus();
    });

    it('skal vente med fokus til nøkkelen er satt', () => {
        settBrukeraktivering(true);
        const { rerender } = render(<SideMedHeader />);
        expect(document.body).toHaveFocus();

        rerender(<SideMedHeader nøkkel="/sak/2" />);
        expect(screen.getByRole('heading', { level: 1, name: '/sak/2' })).toHaveFocus();
    });
});
