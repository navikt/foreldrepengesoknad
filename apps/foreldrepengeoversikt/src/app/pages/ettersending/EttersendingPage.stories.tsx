import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { attachmentApi } from '@navikt/fp-api';
import IntlProvider from 'app/intl/IntlProvider';
import { Ytelse } from 'app/types/Ytelse';
import EttersendingPage from './EttersendingPage';

import '@navikt/ds-css';

export default {
    title: 'EttersendingPage',
    component: EttersendingPage,
};

const Template: StoryFn<{ skalFeileOpplasting: boolean }> = ({ skalFeileOpplasting }) => {
    const apiMock = new MockAdapter(attachmentApi);
    if (!skalFeileOpplasting) {
        apiMock.onPost('test/storage/vedlegg').reply(200);
    }

    return (
        <IntlProvider locale="nb">
            <div style={{ backgroundColor: 'white', padding: '50px' }}>
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
                    valgtSaksnr="1"
                />
            </div>
        </IntlProvider>
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
