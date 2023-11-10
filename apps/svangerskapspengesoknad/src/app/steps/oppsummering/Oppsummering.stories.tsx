import { StoryFn } from '@storybook/react';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import _context from 'storybook/storydata/soknad/soknad.json';
import Oppsummering from './Oppsummering';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';

const defaultExport = {
    title: 'steps/Oppsummering',
    component: Oppsummering,
    decorators: [withRouterProvider, withSvangerskapspengerContextProvider],
};

export default defaultExport;

interface OppsummeringProps {
    søkerinfo: SøkerinfoDTO;
    context: SvangerskapspengerContextState;
}

const context = _context as any;

const Template: StoryFn<OppsummeringProps> = () => {
    return (
        <SvangerskapspengerStateMock context={context}>
            <Oppsummering />
        </SvangerskapspengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
};
