import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Kjønn } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Action, EsDataContext, EsDataType } from 'appData/EsDataContext';
import withRouter from 'storybook/decorators/withRouter';
import { Path } from 'appData/paths';
import OmBarnetSteg from './OmBarnetSteg';
import { Situasjon } from '@navikt/fp-types';

export default {
    title: 'OmBarnetSteg',
    component: OmBarnetSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.OM_BARNET,
    },
};

const Template: StoryFn<{
    søkersituasjon: Situasjon;
    kjønn: Kjønn;
    gåTilNesteSide: (action: Action) => void;
}> = ({ søkersituasjon, kjønn, gåTilNesteSide }) => {
    initAmplitude();
    return (
        <EsDataContext
            initialState={{ [EsDataType.SØKERSITUASJON]: { situasjon: søkersituasjon } }}
            onDispatch={gåTilNesteSide}
        >
            <OmBarnetSteg kjønn={kjønn} />
        </EsDataContext>
    );
};

export const VisSideForAdopsjonKvinne = Template.bind({});
VisSideForAdopsjonKvinne.args = {
    søkersituasjon: 'adopsjon',
    kjønn: 'K',
    gåTilNesteSide: action('button-click'),
};

export const VisSideForAdopsjonMann = Template.bind({});
VisSideForAdopsjonMann.args = {
    søkersituasjon: 'adopsjon',
    kjønn: 'M',
    gåTilNesteSide: action('button-click'),
};

export const VisSideForFodsel = Template.bind({});
VisSideForFodsel.args = {
    søkersituasjon: 'fødsel',
    gåTilNesteSide: action('button-click'),
};
