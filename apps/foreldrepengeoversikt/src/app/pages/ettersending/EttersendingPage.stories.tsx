import { StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import '@navikt/ds-css';

import OversiktRoutes from 'app/routes/routes';
import { Ytelse } from 'app/types/Ytelse';

import EttersendingPage from './EttersendingPage';

export default {
    title: 'EttersendingPage',
    component: EttersendingPage,
};

const queryClient = new QueryClient();

const Template: StoryFn<{ skalFeileOpplasting: boolean }> = ({ skalFeileOpplasting }) => {
    // TODO: Hvordan mocke fetch i dette caset? Testene kjører grønt anyways.

    return (
        <div style={{ backgroundColor: 'white', padding: '50px' }}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.ETTERSEND}/1`]}>
                    <Routes>
                        <Route
                            element={
                                <EttersendingPage
                                    saker={{
                                        engangsstønad: [
                                            {
                                                ytelse: Ytelse.ENGANGSSTØNAD,
                                                saksnummer: '1',
                                                sakAvsluttet: false,
                                                gjelderAdopsjon: false,
                                                familiehendelse: {
                                                    fødselsdato: '2020-01-01',
                                                    antallBarn: 1,
                                                },
                                            },
                                        ],
                                        foreldrepenger: [],
                                        svangerskapspenger: [],
                                    }}
                                />
                            }
                            path={`/${OversiktRoutes.ETTERSEND}/:saksnummer`}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        </div>
    );
};

export const SkalIkkeFeileOpplasting = Template.bind({});
SkalIkkeFeileOpplasting.args = {
    skalFeileOpplasting: false,
};

export const SkalFeileOpplasting = Template.bind({});
SkalFeileOpplasting.args = {
    skalFeileOpplasting: true,
};
