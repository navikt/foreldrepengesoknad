import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { MemoryRouter } from 'react-router-dom';

import { Kjønn } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Situasjon } from '@navikt/fp-types';

import OmBarnetSteg from './OmBarnetSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'OmBarnetSteg',
    component: OmBarnetSteg,
};

const Template: StoryFn<{
    søkersituasjon: Situasjon;
    kjønn: Kjønn;
    gåTilNesteSide: (action: Action) => void;
    mellomlagreOgNaviger?: () => Promise<void>;
}> = ({ søkersituasjon, kjønn, gåTilNesteSide, mellomlagreOgNaviger = promiseAction() }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[Path.OM_BARNET]}>
            <EsDataContext
                initialState={{ [ContextDataType.SØKERSITUASJON]: { situasjon: søkersituasjon } }}
                onDispatch={gåTilNesteSide}
            >
                <OmBarnetSteg kjønn={kjønn} mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>
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
