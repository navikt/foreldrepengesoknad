import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import VelgArbeid from './VelgArbeid';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
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
    søkerinfo: SøkerinfoDTO;
    context: SvangerskapspengerContextState;
}

const søkerinfo = _sokerinfo as any;
const context = _context as any;

const Template: StoryFn<VelgArbeidStoryProps> = ({ søkerinfo, context }) => {
    return (
        <SvangerskapspengerStateMock søkerinfo={søkerinfo} context={context}>
            <VelgArbeid />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    søkerinfo,
    context,
};
