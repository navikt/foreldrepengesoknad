import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import VelgArbeid from './VelgArbeid';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _sokerinfo from 'storybook/storydata/sokerinfo/sokerinfo.json';
import _context from 'storybook/storydata/soknad/soknad.json';

const defaultExport = {
    title: 'steps/VelgArbeid',
    component: VelgArbeid,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface VelgArbeidStoryProps {
    contextUtenTilretteleggingValg: SvangerskapspengerContextState;
}

const context = _context as any;
const contextUtenTilretteleggingValg = {
    ...context,
    søknad: { ...context.søknad, tilrettelegging: [] },
} as SvangerskapspengerContextState;

const Template: StoryFn<VelgArbeidStoryProps> = ({ contextUtenTilretteleggingValg }) => {
    return (
        <SvangerskapspengerStateMock context={contextUtenTilretteleggingValg}>
            <VelgArbeid />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    contextUtenTilretteleggingValg,
};
