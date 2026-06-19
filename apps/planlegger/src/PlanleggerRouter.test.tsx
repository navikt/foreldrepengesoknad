import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './Planlegger.stories';

const { OppsummeringUtenData } = composeStories(stories);

describe('<PlanleggerRouter> datakrav-guard', () => {
    it(
        'skal redirecte til start i stedet for å krasje når oppsummering åpnes uten data',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(OppsummeringUtenData.parameters.msw);

            render(<OppsummeringUtenData />);

            // Mangler HVEM_PLANLEGGER/OM_BARNET -> guard sender bruker til startsiden,
            // i stedet for at notEmpty kaster «Data er ikke oppgitt» og siden krasjer.
            expect(await screen.findByText('Planleggeren består av to deler:')).toBeInTheDocument();
        }),
    );
});
