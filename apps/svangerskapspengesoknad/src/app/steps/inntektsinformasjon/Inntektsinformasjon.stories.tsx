import { StoryFn } from '@storybook/react';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import Inntektsinformasjon from './Inntektsinformasjon';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _context from 'storybook/storydata/soknad/soknad.json';

const defaultExport = {
    title: 'steps/Inntektsinformasjon',
    component: Inntektsinformasjon,
    decorators: [withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

interface InntektsinformasjonStoryProps {
    context: SvangerskapspengerContextState;
}

const context = _context as any;

const Template: StoryFn<InntektsinformasjonStoryProps> = ({ context }) => {
    return (
        <SvangerskapspengerStateMock context={context}>
            <Inntektsinformasjon />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    context,
};
