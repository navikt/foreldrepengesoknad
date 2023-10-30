import { StoryFn } from '@storybook/react';
import IntlProvider from 'app/intl/IntlProvider';
import { Ytelse } from 'app/types/Ytelse';
import EttersendingPage from './EttersendingPage';

import '@navikt/ds-css';

export default {
    title: 'EttersendingPage',
    component: EttersendingPage,
};

const Template: StoryFn = () => {
    return (
        <IntlProvider locale="nb">
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
        </IntlProvider>
    );
};

export const Default = Template.bind({});
