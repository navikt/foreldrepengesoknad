import { render, screen } from '@testing-library/react';

import { useFokusVedNavigasjon } from './useFokusVedNavigasjon';

const Side = ({ nøkkel }: { nøkkel: string }) => {
    const ref = useFokusVedNavigasjon<HTMLHeadingElement>(nøkkel);
    return <h2 ref={ref}>{nøkkel}</h2>;
};

const SideSomLaster = ({ lastet }: { lastet: boolean }) => {
    const ref = useFokusVedNavigasjon<HTMLHeadingElement>('/sak/1');
    return lastet ? <h1 ref={ref}>Din sak</h1> : <p>Laster</p>;
};

const SideMedStegtittel = ({ nøkkel }: { nøkkel: string }) => {
    const sideRef = useFokusVedNavigasjon<HTMLHeadingElement>(nøkkel);
    return (
        <main>
            <h1 ref={sideRef}>Planlegger</h1>
            <Side nøkkel={nøkkel} />
        </main>
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

    it('skal flytte fokus når brukeren går tilbake til en side via nettleserens tilbake-knapp', () => {
        settBrukeraktivering(true);
        history.replaceState({ key: 'steg' }, '');
        const { unmount } = render(<Side nøkkel="Steg C" />);
        expect(screen.getByRole('heading', { name: 'Steg C' })).toHaveFocus();
        unmount();

        window.dispatchEvent(new PopStateEvent('popstate', { state: { key: 'steg' } }));
        render(<Side nøkkel="Steg C" />);
        expect(screen.getByRole('heading', { name: 'Steg C' })).toHaveFocus();
    });

    it('skal vente med fokus til overskriften er rendret', () => {
        settBrukeraktivering(true);
        const { rerender } = render(<SideSomLaster lastet={false} />);
        expect(document.body).toHaveFocus();

        rerender(<SideSomLaster lastet />);
        expect(screen.getByRole('heading', { name: 'Din sak' })).toHaveFocus();
    });

    it('skal fokusere den innerste overskriften når to overskrifter på samme side bruker samme nøkkel', () => {
        settBrukeraktivering(true);
        render(<SideMedStegtittel nøkkel="/barnehageplass" />);

        expect(screen.getByRole('heading', { name: '/barnehageplass' })).toHaveFocus();
    });

    it('skal ikke flytte fokus til overskriften ved fragmentnavigering på samme side', () => {
        settBrukeraktivering(true);
        history.replaceState({ key: 'skjema' }, '');
        const { rerender } = render(<Side nøkkel="Skjema" />);
        const felt = document.createElement('input');
        document.body.append(felt);
        felt.focus();

        history.pushState(null, '', '#felt');
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
        rerender(<Side nøkkel="Skjema" />);

        expect(felt).toHaveFocus();
        felt.remove();
    });
});
