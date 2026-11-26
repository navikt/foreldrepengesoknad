import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor } from '@testing-library/react';

import { IntlProvider, SidetittelProvider, uiMessages } from '@navikt/fp-ui';

import * as stories from './PlanleggerStepPage.stories';

const { Default } = composeStories(stories);

describe('<PlanleggerStepPage>', () => {
    it('skal vise steg', async () => {
        render(<Default />);

        expect(await screen.findByText('Fordeling')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 2')).toBeInTheDocument();
        expect(screen.getByText('Steginnhold')).toBeInTheDocument();
    });

    it('skal sette sidetittel for valgt steg', async () => {
        render(
            <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: uiMessages.nb }}>
                <SidetittelProvider appTittel="Planlegg foreldrepenger">
                    <Default />
                </SidetittelProvider>
            </IntlProvider>,
        );

        await waitFor(() => {
            expect(document.title).toBe('Fordeling – Steg 1 av 2 – Planlegg foreldrepenger');
        });
    });
});
