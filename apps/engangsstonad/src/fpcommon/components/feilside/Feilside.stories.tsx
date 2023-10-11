import { StoryFn } from '@storybook/react';
import Feilside from './Feilside';
import IntlProvider from 'intl/IntlProvider';
import { lenker } from 'fpcommon/util/lenker';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'Feilside',
    component: Feilside,
};

const Wrapper = () => {
    return (
        <Feilside
            dokumenttittel="NAV Engangsstønad"
            ingress="Dette er en ingress"
            tittel="Dette er en tittel"
            illustrasjon={{
                tittel: 'Oops,',
                tekst: 'Noe gikk dessverre galt. Vennligst prøv igjen senere. Dersom det fremdeles oppstår feil kontakt brukerstøtte.',
                veileder: {
                    ansikt: 'skeptisk',
                },
                lenke: {
                    tekst: 'Kontakt brukerstøtte her',
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
