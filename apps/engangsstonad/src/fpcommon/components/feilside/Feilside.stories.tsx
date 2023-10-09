import { StoryFn } from '@storybook/react';
import Feilside from './Feilside';
import IntlProvider from 'intl/IntlProvider';
import { useIntl } from 'react-intl';
import { lenker } from 'fpcommon/util/lenker';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'Feilside',
    component: Feilside,
};

const Wrapper = () => {
    const intl = useIntl();
    return (
        <Feilside
            dokumenttittel="NAV Engangsstønad"
            ingress="Dette er en ingress"
            tittel="Dette er en tittel"
            illustrasjon={{
                tittel: intl.formatMessage({ id: 'intro.generellFeil.tittel' }),
                tekst: intl.formatMessage({ id: 'intro.generellFeil.ingress' }),
                veileder: {
                    ansikt: 'skeptisk',
                },
                lenke: {
                    tekst: intl.formatMessage({ id: 'intro.generellFeil.brukerstøtte' }),
                    url: lenker.brukerstøtte,
                },
            }}
            setLanguage={() => undefined}
            språkkode="nb"
        />
    );
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <Wrapper />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
