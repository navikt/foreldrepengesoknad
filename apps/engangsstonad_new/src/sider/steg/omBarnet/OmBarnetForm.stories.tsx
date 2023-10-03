import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Kjønn } from '@navikt/fp-common';
import OmBarnetForm from './OmBarnetForm';
import IntlProvider from '../../../intl/IntlProvider';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { Action, EsDataType } from 'appData/EsDataContext';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { Path } from 'appData/paths';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

export default {
    title: 'OmBarnetForm',
    component: OmBarnetForm,
    decorators: [withRouterProvider],
    parameters: {
        routerDecoratorInitUrl: Path.OM_BARNET,
    },
};

const Template: StoryFn<{
    søkersituasjon: SøkersituasjonEnum;
    kjønn: Kjønn;
    gåTilNesteSide: (action: Action) => void;
}> = ({ søkersituasjon, kjønn, gåTilNesteSide }) => {
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper
                initialState={{ [EsDataType.SØKERSITUASJON]: { situasjon: søkersituasjon } }}
                onDispatch={gåTilNesteSide}
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
    gåTilNesteSide: action('button-click'),
};

export const VisSideForAdopsjonMann = Template.bind({});
VisSideForAdopsjonMann.args = {
    søkersituasjon: SøkersituasjonEnum.ADOPSJON,
    kjønn: 'M',
    gåTilNesteSide: action('button-click'),
};

export const VisSideForFodsel = Template.bind({});
VisSideForFodsel.args = {
    søkersituasjon: SøkersituasjonEnum.FØDSEL,
    gåTilNesteSide: action('button-click'),
};
