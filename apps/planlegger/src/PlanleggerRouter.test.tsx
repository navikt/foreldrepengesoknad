import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import { ContextDataMap, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import * as oppsummeringStories from './steps/oppsummering/OppsummeringSteg.stories';
import { MedDatakrav } from './PlanleggerRouter';

const { FlereForsørgereHundreProsentTermin } = composeStories(oppsummeringStories);

const { hvemPlanlegger, omBarnet } = FlereForsørgereHundreProsentTermin.args;

const renderGuard = (initialState: ContextDataMap) =>
    render(
        <MemoryRouter initialEntries={[PlanleggerRoutes.OPPSUMMERING]}>
            <PlanleggerDataContext initialState={initialState}>
                <Routes>
                    <Route
                        path={PlanleggerRoutes.OPPSUMMERING}
                        element={
                            <MedDatakrav steg={PlanleggerRoutes.OPPSUMMERING}>
                                <h1>Oppsummering</h1>
                            </MedDatakrav>
                        }
                    />
                    <Route path="/" element={<h1>Om planleggeren</h1>} />
                </Routes>
            </PlanleggerDataContext>
        </MemoryRouter>,
    );

describe('<MedDatakrav> datakrav-guard', () => {
    it.each([
        { beskrivelse: 'all påkrevd data mangler', initialState: {} },
        { beskrivelse: 'hvem planlegger mangler', initialState: { [ContextDataType.OM_BARNET]: omBarnet } },
        { beskrivelse: 'om barnet mangler', initialState: { [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger } },
    ])('skal sende bruker til start når $beskrivelse', async ({ initialState }) => {
        renderGuard(initialState);

        expect(await screen.findByRole('heading', { name: 'Om planleggeren' })).toBeInTheDocument();
        expect(screen.queryByText('Oppsummering')).not.toBeInTheDocument();
    });

    it('skal rendre steget når all påkrevd data finnes', async () => {
        renderGuard({
            [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
            [ContextDataType.OM_BARNET]: omBarnet,
        });

        expect(await screen.findByRole('heading', { name: 'Oppsummering' })).toBeInTheDocument();
        expect(screen.queryByText('Om planleggeren')).not.toBeInTheDocument();
    });
});
