import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import ArbeidIUtlandetStep from '../arbeid-i-utlandet/ArbeidIUtlandetStep';
import _context from 'storybook/storydata/soknad/soknad.json';
import ArbeidIUtlandet from './ArbeidIUtlandetStep';

const defaultExport = {
    title: 'steps/ArbeidIUtlandet',
    component: ArbeidIUtlandet,
    decorators: [withRouterProvider, withIntlProvider, withSvangerskapspengerContextProvider],
};

export default defaultExport;

interface ArbeidIUtlandetStoryProps {
    contextWithArbeidIUtlandet: SvangerskapspengerContextState;
}

const context = _context as any;
const contextWithArbeidIUtlandet = {
    ...context,
    søknad: {
        ...context.søknad,
        søker: {
            ...context.søknad.søker,
            harHattAnnenInntekt: true,
        },
    },
} as SvangerskapspengerContextState;

const Template: StoryFn<ArbeidIUtlandetStoryProps> = ({ contextWithArbeidIUtlandet }) => {
    return (
        <SvangerskapspengerStateMock context={contextWithArbeidIUtlandet}>
            <ArbeidIUtlandetStep />
        </SvangerskapspengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    contextWithArbeidIUtlandet,
};
