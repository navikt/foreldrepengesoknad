import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import Inntektsinformasjon from './Inntektsinformasjon';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _sokerinfo from 'storybook/storydata/sokerinfo/sokerinfo.json';
import _context from 'storybook/storydata/soknad/soknad.json';

const defaultExport = {
    title: 'steps/Inntektsinformasjon',
    component: Inntektsinformasjon,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface InntektsinformasjonStoryProps {
    søkerinfo: SøkerinfoDTO;
    context: SvangerskapspengerContextState;
}

const søkerinfo = _sokerinfo as any;
const context = _context as any;

const Template: StoryFn<InntektsinformasjonStoryProps> = ({ søkerinfo, context }) => {
    return (
        <SvangerskapspengerStateMock søkerinfo={søkerinfo} context={context}>
            <Inntektsinformasjon />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    søkerinfo,
    context,
};
