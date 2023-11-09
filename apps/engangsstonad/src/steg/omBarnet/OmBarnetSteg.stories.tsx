import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Kjønn } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { Action, EsDataContext, EsDataType } from 'appData/EsDataContext';
import withRouter from 'storybook/decorators/withRouter';
import { Path } from 'appData/paths';
import OmBarnetSteg from './OmBarnetSteg';

export default {
    title: 'OmBarnetSteg',
    component: OmBarnetSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.OM_BARNET,
    },
};

const Template: StoryFn<{
    søkersituasjon: SøkersituasjonEnum;
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
