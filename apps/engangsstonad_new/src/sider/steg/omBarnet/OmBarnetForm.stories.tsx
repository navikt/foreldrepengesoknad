import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Kjønn } from '@navikt/fp-common';
import OmBarnetForm from './OmBarnetForm';
import IntlProvider from '../../../intl/IntlProvider';
import { Søkersituasjon } from '../sokersituasjon/SøkersituasjonForm';

import '@navikt/ds-css';
import '../../../fpcommon/styles/globals.less';

export default {
    title: 'OmBarnetForm',
    component: OmBarnetForm,
};

const Template: StoryFn<{ søkersituasjon: Søkersituasjon; kjønn: Kjønn }> = ({ søkersituasjon, kjønn }) => {
    return (
        <IntlProvider språkkode="nb">
            <OmBarnetForm
                kjønn={kjønn}
                søkersituasjon={{ situasjon: søkersituasjon }}
                lagreOmBarnet={action('button-click')}
                avbrytSøknad={action('button-click')}
            />
        </IntlProvider>
    );
};

export const VisSideForAdopsjonKvinne = Template.bind({});
VisSideForAdopsjonKvinne.args = {
    søkersituasjon: Søkersituasjon.ADOPSJON,
    kjønn: 'K',
};

export const VisSideForAdopsjonMann = Template.bind({});
VisSideForAdopsjonMann.args = {
    søkersituasjon: Søkersituasjon.ADOPSJON,
    kjønn: 'M',
};

export const VisSideForFodsel = Template.bind({});
VisSideForFodsel.args = {
    søkersituasjon: Søkersituasjon.FØDSEL,
};
