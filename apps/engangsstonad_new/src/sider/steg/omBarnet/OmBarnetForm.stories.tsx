import { StoryFn } from '@storybook/react';
import { Kjønn } from '@navikt/fp-common';
import OmBarnetForm from './OmBarnetForm';
import IntlProvider from '../../../intl/IntlProvider';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { EsDataType } from '../../../EsDataContext';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'OmBarnetForm',
    component: OmBarnetForm,
    decorators: [withRouterProvider],
};

const Template: StoryFn<{ søkersituasjon: SøkersituasjonEnum; kjønn: Kjønn }> = ({ søkersituasjon, kjønn }) => {
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper
                initialState={{ [EsDataType.SØKERSITUASJON]: { situasjon: søkersituasjon } }}
                dataTypeToLogWhenChanges={EsDataType.OM_BARNET}
            >
                <OmBarnetForm kjønn={kjønn} />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const VisSideForAdopsjonKvinne = Template.bind({});
VisSideForAdopsjonKvinne.args = {
    søkersituasjon: SøkersituasjonEnum.ADOPSJON,
    kjønn: 'K',
};

export const VisSideForAdopsjonMann = Template.bind({});
VisSideForAdopsjonMann.args = {
    søkersituasjon: SøkersituasjonEnum.ADOPSJON,
    kjønn: 'M',
};

export const VisSideForFodsel = Template.bind({});
VisSideForFodsel.args = {
    søkersituasjon: SøkersituasjonEnum.FØDSEL,
};
