import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import Barnet from './Barnet';
import _context from 'storybook/storydata/soknad/soknad.json';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';

const defaultExport = {
    title: 'steps/Barnet',
    component: Barnet,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

const context = _context as any;
const contextUtenOppgittBarn = {
    ...context,
    søknad: { ...context.søknad, barn: undefined! },
} as SvangerskapspengerContextState;

const Template: StoryFn = () => {
    return (
        <SvangerskapspengerStateMock context={contextUtenOppgittBarn}>
            <Barnet />
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({});
Default.args = {
    contextUtenOppgittBarn,
};
