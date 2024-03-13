import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import '@navikt/ds-css';

import { attachmentApi } from '@navikt/fp-api';

import OversiktRoutes from 'app/routes/routes';
import { Ytelse } from 'app/types/Ytelse';

import EttersendingPage from './EttersendingPage';

export default {
    title: 'EttersendingPage',
    component: EttersendingPage,
};

const Template: StoryFn<{ skalFeileOpplasting: boolean }> = ({ skalFeileOpplasting }) => {
    const apiMock = new MockAdapter(attachmentApi);
    if (!skalFeileOpplasting) {
        apiMock.onPost('test/storage/engangsstonad/vedlegg').reply(200);
    }

    return (
        <div style={{ backgroundColor: 'white', padding: '50px' }}>
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
