import { composeStories } from '@storybook/react-vite';
import { render, waitFor } from '@testing-library/react';

import { SidetittelProvider } from '../../sidetittel/Sidetittel';
import * as stories from './Step.stories';

const { Default } = composeStories(stories);

describe('<Step>', () => {
    it('skal sette sidetittel med stegnavn, stegnummer og apptittel', async () => {
        render(
            <SidetittelProvider appTittel="Søknad om foreldrepenger">
                <Default />
            </SidetittelProvider>,
        );

        await waitFor(() => expect(document.title).toBe('Annet – Steg 2 av 3 – Søknad om foreldrepenger'));
    });

    it('skal sette tilbake apptittel når steget forsvinner', async () => {
        const { rerender } = render(
            <SidetittelProvider appTittel="Søknad om foreldrepenger">
                <Default />
            </SidetittelProvider>,
        );
        await waitFor(() => expect(document.title).toBe('Annet – Steg 2 av 3 – Søknad om foreldrepenger'));

        rerender(<SidetittelProvider appTittel="Søknad om foreldrepenger">Kvittering</SidetittelProvider>);

        await waitFor(() => expect(document.title).toBe('Søknad om foreldrepenger'));
    });
});
